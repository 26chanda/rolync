import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import axios from 'axios';   



const QuestionnairePage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);   
  const [questionHistory, setQuestionHistory] = useState([]);   
  const [selectedDepartments, setSelectedDepartments] = useState([]);   
  const [selectedOption, setSelectedOption] = useState('');   
  const [remainingDepartments, setRemainingDepartments] = useState([]);  
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState(null);   
  const [finalQuestion, setFinalQuestion] = useState(false);  
  const [finalSelections, setFinalSelections] = useState([]);   
  const [submitError, setSubmitError] = useState(null); 

 
  const departmentQuestion = {
    id: 1,
    question: "Which department sparks your curiosity the most? Whether you're drawn to analyzing financial trends, optimizing operations, shaping HR strategies, building IT solutions, or driving innovation—where do you see yourself making the biggest impact?",
    options: [
      'Finance',
      'Operations',
      'HR',
      'Information Technology',
      'Research & Development'
    ]
  };

  const finalHardcodedQuestion = {
    id: 'final',
    question: "In the real world, please tell us what an ideal day looks like if you start working in the data field. Please select all kinds of responsibilities you would want to have daily? (Select at least 5.)",
    options: [
      'Collecting, cleaning, and ensuring the accuracy and integrity of data.',
      'Monitoring and improving data quality.',
      'Developing, maintaining, and working with databases, data warehousing, ETL processes, and data pipelines.',
      'Automating data collection and reporting processes.',
      'Ensuring data security and compliance with regulatory standards.',
      'Conducting A/B testing and experimental design for data-driven decision-making.',
      'Performing statistical analysis to identify trends and patterns in data.',
      'Developing and refining predictive models, forecasting trends, and guiding strategic decisions.',
      'Optimizing algorithms and processes for scalability and efficiency.',
      'Deploying models into production, monitoring performance, and iterating based on feedback.',
      'Implementing continuous integration and continuous deployment (CI/CD) pipelines for ML models.',
      'Designing interactive dashboards to communicate insights and support decision-making.',
      'Interpreting data results, generating reports, and presenting actionable insights to stakeholders.',
      'Collaborating with other departments to understand data needs and inform business decisions.',
      'Developing and maintaining data products or tools for internal and external use.',
      'Documenting data processes, methodologies, and quality improvements.'
    ]
  };

  // Define the keyword map for final question options
  const responsibilityKeywordMap = {
    "Collecting, cleaning, and ensuring the accuracy and integrity of data.": "Data Cleaning",
    "Monitoring and improving data quality.": "Data Quality",
    "Developing, maintaining, and working with databases, data warehousing, ETL processes, and data pipelines.": "Databases and ETL",
    "Automating data collection and reporting processes.": "Automation",
    "Ensuring data security and compliance with regulatory standards.": "Data Security",
    "Conducting A/B testing and experimental design for data-driven decision-making.": "A/B Testing",
    "Performing statistical analysis to identify trends and patterns in data.": "Statistical Analysis",
    "Developing and refining predictive models, forecasting trends, and guiding strategic decisions.": "Predictive Modeling",
    "Optimizing algorithms and processes for scalability and efficiency.": "Algorithm Optimization",
    "Deploying models into production, monitoring performance, and iterating based on feedback.": "Model Deployment",
    "Implementing continuous integration and continuous deployment (CI/CD) pipelines for ML models.": "CI/CD Pipelines",
    "Designing interactive dashboards to communicate insights and support decision-making.": "Dashboard Design",
    "Interpreting data results, generating reports, and presenting actionable insights to stakeholders.": "Data Interpretation",
    "Collaborating with other departments to understand data needs and inform business decisions.": "Collaboration",
    "Developing and maintaining data products or tools for internal and external use.": "Data Products",
    "Documenting data processes, methodologies, and quality improvements.": "Documentation"
  };

  // Function to store the departments selected in session storage
  const storeDepartments = (departments) => {
    sessionStorage.setItem('departments', JSON.stringify(departments));   
  };

  // Function to store the responsibilities selected in session storage (store keywords only)
  const storeResponsibilities = (responsibilities) => {
    const keywords = responsibilities.map(option => responsibilityKeywordMap[option]);  
    sessionStorage.setItem('responsibilities', JSON.stringify(keywords));   
  };

  // Function to store the problems selected in session storage (store the latest problem for each department)
  const storeProblemKeyword = (department, keyword) => {
    let problems = JSON.parse(sessionStorage.getItem('problems')) || [];

    // Check if a problem for this department already exists
    const existingIndex = problems.findIndex(p => p.startsWith(`${department}:`));
    
    if (existingIndex !== -1) {
      // If it exists, replace it
      problems[existingIndex] = `${department}: ${keyword}`;
    } else {
      // If it's a new department, add it
      problems.push(`${department}: ${keyword}`);
    }

    sessionStorage.setItem('problems', JSON.stringify(problems));   
  };



  // Function to fetch a question by its ID
  const fetchQuestionById = async (department, questionId = 'q1', updateHistory = true) => {
    try {
      setLoading(true);
      setError(null);

      // Encode the question ID to handle special characters
      const encodedQuestionId = encodeURIComponent(questionId);

      const response = await axios.get(`http://localhost:5001/api/questions/${department}/question/${encodedQuestionId}`, {
        withCredentials: true,   
      });

      if (response.data && response.data.question) {
        if (updateHistory && currentQuestion) {
          // Push the current question to history before updating it to the next one
          setQuestionHistory(prevHistory => [...prevHistory, currentQuestion]);
        }
        setCurrentQuestion(response.data.question);
        setSelectedOption('');  // Reset the selected option for the new question
      } else {
        setError('Invalid response from server.');
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');   
      } else {
        setError('Failed to load the question. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the selection of departments (for the first question)
  const handleDepartmentSelection = (department) => {
    setSelectedDepartments((prev) => {
      let updatedDepartments;
      if (prev.includes(department)) {
        updatedDepartments = prev.filter(d => d !== department);  
      } else {
        updatedDepartments = [...prev, department];  
      }
      storeDepartments(updatedDepartments);  
      return updatedDepartments;
    });
  };

  // Function to handle option selections (for q1 question)
  const handleOptionSelection = (optionKey) => {
    setSelectedOption(optionKey);   

    // Store the keyword for q1 if applicable
    if (currentQuestion && currentQuestion.question_id === 'q1') {
      const selectedKeyword = currentQuestion.options[optionKey].keyword;
      const currentDepartment = remainingDepartments[0];   
      storeProblemKeyword(currentDepartment, selectedKeyword);   
    }
  };

  // Function to handle option selections for final hardcoded question (responsibilities)
  const handleFinalOptionSelection = (option) => {
    setFinalSelections((prev) => {
      let updatedSelections;
      if (prev.includes(option)) {
        updatedSelections = prev.filter(opt => opt !== option);
      } else {
        updatedSelections = [...prev, option];
      }
      storeResponsibilities(updatedSelections);   
      return updatedSelections;
    });
  };


const handleSubmit = () => {
    // Retrieve departments, problems, and responsibilities from session storage
    const departments = JSON.parse(sessionStorage.getItem('departments')) || [];
    const problems = JSON.parse(sessionStorage.getItem('problems')) || [];
    const responsibilities = JSON.parse(sessionStorage.getItem('responsibilities')) || [];
  
    // Extract just the problem keywords by removing the department names
    const problemKeywords = problems.map((problem) => {
      return problem.split(": ")[1];  // Split by ": " and get the second part (the problem keyword)
    });
  
    // Prepare the data to send (departments, problems, responsibilities as keywords)
    const dataToSend = {
      departments: departments,           
      problems: problemKeywords,          
      responsibilities: responsibilities  
    };

    // Send the data to the Node.js backend
    axios.post('http://localhost:5001/api/submit-responses', dataToSend, {
      withCredentials: true,  // Sends cookies with request
    })
    .then((response) => {
 
  
      // Assuming the backend sends back matched profiles
      if (response.data.success) {
        const matchedProfiles = response.data.matchedProfiles;
  
        // Navigate to the /matching-findYourDream page with matched profiles
        navigate('/matching-findYourDream', { state: { matchedProfiles } });
      } else {
        console.error('Error in response:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error sending data to backend (Node.js):', error);
    });
  };
  

  // Function to handle "Next" button click and fetch the next question
  const handleNextClick = () => {

    if (finalQuestion) {
      if (finalSelections.length < 5) {
        setSubmitError('Please select at least 5 responsibilities to proceed.');  
      } else {
        setSubmitError(null);  
        handleSubmit();  
      }     
    } else if (!currentQuestion) {
      if (selectedDepartments.length > 0) {
        setRemainingDepartments([...selectedDepartments]);  // Track remaining departments
        const selectedDepartment = selectedDepartments[0];
        fetchQuestionById(selectedDepartment, 'q1');
      } else {
        setError('Please select at least one department.');
      }
    } else if (selectedOption) {
      const nextQuestionId = currentQuestion.options[selectedOption]?.nextQuestion;
      if (nextQuestionId) {
        fetchQuestionById(remainingDepartments[0], nextQuestionId);  // Continue in the same department
      } else {
        const newRemainingDepartments = remainingDepartments.slice(1);  // Move to the next department
        if (newRemainingDepartments.length > 0) {
          setRemainingDepartments(newRemainingDepartments);
          fetchQuestionById(newRemainingDepartments[0], 'q1');  // Start from the first question of the next department
        } else {
          setFinalQuestion(true);  // All departments processed, show the final hardcoded question
        }
      }
    } else {
      setError('Please select at least one option to continue.');
    }
  };

  // Function to handle the "Back" button to go to the previous question or homepage
  const handleBackClick = () => {
    if (finalQuestion) {
      setFinalQuestion(false);  // Go back to the last question before final
    } else if (!currentQuestion) {
      navigate('/home');   
    } else if (questionHistory.length > 0) {
      const previousQuestion = questionHistory.pop();  
      setCurrentQuestion(previousQuestion);  
      setQuestionHistory([...questionHistory]);  // Update the history (remove last question)
      setSelectedOption('');  // Reset the selection for the previous question
    } else {
      setCurrentQuestion(null);  // Reset to the first hardcoded question
      setSelectedDepartments([]);   
    }
  };

  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        marginTop: '50px',
        position: 'relative',  
      }}>
        <Row>
          <Col md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              textAlign: 'center',
              padding: '30px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              backgroundColor: '#fff',
              maxWidth: '800px',
              width: '100%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              {loading ? (
                <p>Loading questions...</p>
              ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
              ) : (
                <>
                  {finalQuestion ? (
                    <>
                      <h3 style={{ color: 'black', marginBottom: '20px', fontSize: '24px' }}>Final Question</h3>
                      <p style={{ fontSize: '18px', color: 'black', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' }}>
                        {finalHardcodedQuestion.question}
                      </p>

                      <Form style={{ textAlign: 'left', marginBottom: '20px' }}>
                        {finalHardcodedQuestion.options.map((option, index) => (
                          <Form.Check
                            key={index}
                            type="checkbox"
                            label={option}
                            name="finalQuestion"
                            value={option}
                            checked={finalSelections.includes(option)}
                            onChange={() => handleFinalOptionSelection(option)}   
                            style={{ marginBottom: '10px' }}
                            id={`checkbox-final-${index}`}
                          />
                        ))}
                      </Form>

                      {submitError && (
                        <p style={{ color: 'red', marginBottom: '20px' }}>{submitError}</p>  // Error message for submission
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          variant="secondary"
                          onClick={handleBackClick}
                          style={{ color: '#333', borderRadius: '5px', padding: '10px 20px' }}
                        >
                          &lt; Back
                        </Button>

                        <Button
                          variant="primary"
                          onClick={handleNextClick}
                          style={{ backgroundColor: '#00BBF0 !important', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px' }}
                        >
                          Submit
                        </Button>
                      </div>
                    </>
                  ) : !currentQuestion ? (
                    <>
                      <Button
                        variant="secondary"
                        onClick={handleBackClick}
                        style={{ position: 'relative', top: '380px', left: '-320px', color: '#333', borderRadius: '5px', padding: '9px 20px' }}
                      >
                        &lt; Back
                      </Button>

                      <h3 style={{ color: 'black', marginBottom: '20px', fontSize: '24px' }}>Question {departmentQuestion.id}</h3>
                      <p style={{ fontSize: '18px', color: 'black', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' }}>
                        {departmentQuestion.question}
                      </p>

                      <Form style={{ textAlign: 'left', marginBottom: '20px' }}>
                        {departmentQuestion.options.map((option, index) => (
                          <Form.Check
                            key={index}
                            type="checkbox"  
                            label={option}
                            name="department"
                            value={option}
                            checked={selectedDepartments.includes(option)}
                            onChange={() => handleDepartmentSelection(option)}  
                            style={{ marginBottom: '10px' }}
                            id={`checkbox-${index}`}
                          />
                        ))}
                      </Form>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="primary"
                          onClick={handleNextClick}
                          style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px' }}
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 style={{ color: 'black', marginBottom: '20px', fontSize: '24px' }}>Question {currentQuestion.id}</h3>
                      <p style={{ fontSize: '18px', color: 'black', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' }}>
                        {currentQuestion.question}
                      </p>

                      <Form style={{ textAlign: 'left', marginBottom: '20px' }}>
                        {Object.entries(currentQuestion.options).map(([key, option], index) => (
                          <Form.Check
                            key={index}
                            type="radio"   
                            label={option.text}
                            name="problemFocus"
                            value={key}
                            checked={selectedOption === key}
                            onChange={() => handleOptionSelection(key)}   
                            style={{ marginBottom: '10px' }}
                            id={`radio-${index}`}
                          />
                        ))}
                      </Form>

                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          variant="secondary"
                          onClick={handleBackClick}
                          style={{ color: '#333', borderRadius: '5px', padding: '10px 20px' }}
                        >
                          &lt; Back
                        </Button>

                        <Button
                          variant="primary"
                          onClick={handleNextClick}
                          style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px' }}
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <Footer />
    </Container>
  );
};

export default QuestionnairePage;
