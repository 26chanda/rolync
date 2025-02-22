import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Header from './Header';
import { Col } from 'react-bootstrap';
import Footer from './Footer';


const Faq = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleQuestion = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center', // Center content instead of using large margin
    padding: '40px',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    width: '100%', // Ensure full width of the screen without overflow
    overflow: 'hidden',
  };

  const faqSectionStyle = {
    width: '45%',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    marginTop:'6px',
    alignItems: 'center'
  };

  const faqTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const questionBoxStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#4a4e52z",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    maxHeight: "50px", // collapsed height
    overflow: "hidden",
  };

  const expandedQuestionBoxStyle = {
    ...questionBoxStyle,
    maxHeight: "150px", 
  };

  return (
    <div style={{ overflowX: 'hidden' }}> 
      <Header />
      
      <Col xs={12} style={{ padding: '21px' }}></Col>

      
      <Col xs={12} style={{ padding: '32px', backgroundColor: "#4a4e52", textAlign: "center", borderBottom: "0px", width: "100%", marginTop: '15px' }}>
        <h3 style={{ margin: "20px", color: "white", fontSize: "50px", fontWeight: "bold" }}>Frequently Asked Questions</h3>
        <p style={{ textAlign: 'center', color: "white", fontSize: "18px" }}></p>
      </Col>
   
      <div style={containerStyle}>
        {/* FAQ Section */}
        <div style={faqSectionStyle}>
          <h3 style={faqTitleStyle}>Questions.</h3>
          {/* <div> */}
          <div
    style={expanded === 1 ? expandedQuestionBoxStyle : questionBoxStyle}
    onClick={() => toggleQuestion(1)}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>1. What is Rolync?</span>
      <FaChevronDown />
    </div>
    <div>
      <p style={{ marginTop: '10px' }}>
        Rolync is a career exploration platform designed to help individuals align their skills and interests with the right opportunities in data science, analytics, and artificial intelligence. We offer tailored resources, company insights, and mentorship to increase the chances of career success.

      </p>
    </div>
  </div>


  <div
    style={expanded === 2 ? expandedQuestionBoxStyle : questionBoxStyle}
    onClick={() => toggleQuestion(2)}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>2.⁠ ⁠Who is Rolync for?
</span>
      <FaChevronDown />
    </div>
    <div>
      <p style={{ marginTop: '10px' }}>
      Rolync is primarily aimed at students and early-career professionals who are passionate about data science, analytics, and artificial intelligence. We focus on providing resources and guidance for individuals seeking opportunities in these fields.
      </p>
    </div>
  </div>

  <div
    style={expanded === 3 ? expandedQuestionBoxStyle : questionBoxStyle}
    onClick={() => toggleQuestion(3)}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>3.⁠ ⁠How does Rolync help in career development?
</span>
      <FaChevronDown />
    </div>
    <div>
      <p style={{ marginTop: '10px' }}>
      Rolync offers a variety of services to support career growth, including personalized guidance, company insights, and mentorship. We focus on aligning your skills with the right roles in data, analytics, and AI, ensuring you are well-prepared for the competitive job market.
      </p>
    </div>
  </div>

  <div
    style={expanded === 4 ? expandedQuestionBoxStyle : questionBoxStyle}
    onClick={() => toggleQuestion(4)}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>4.⁠ ⁠What makes Rolync different from other career platforms?
</span>
      <FaChevronDown />
    </div>
    <div>
      <p style={{ marginTop: '10px' }}>
      Unlike many platforms that offer generalized advice, Rolync provides targeted support for data, analytics, and AI roles. Our platform combines personalized insights, mentorship, and comprehensive tools to give users a strategic advantage in their job search.
      </p>
    </div>
  </div>

  <div
    style={expanded === 5 ? expandedQuestionBoxStyle : questionBoxStyle}
    onClick={() => toggleQuestion(5)}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>5.⁠ ⁠Can I receive mentorship through Rolync?
</span>
      <FaChevronDown />
    </div>
    <div>
      <p style={{ marginTop: '10px' }}>
      Yes! Rolync offers mentorship opportunities where experienced professionals guide individuals through their career journeys, helping them prepare for roles in data science, analytics, and AI by sharing industry knowledge and best practices.
      </p>
    </div>
  </div>

  <div
    style={expanded === 6 ? expandedQuestionBoxStyle : questionBoxStyle}
    onClick={() => toggleQuestion(6)}
  >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span> 6.⁠ ⁠Does Rolync focus only on data science, analytics, and AI?
  </span>
      <FaChevronDown />
    </div>
    <div>
      <p style={{ marginTop: '10px' }}>
      Yes, our current focus is on fields related to data science, analytics, and artificial intelligence. As we grow, we plan to expand to other fields, but for now, our expertise and resources are dedicated to these areas.
      </p>
    </div>
  </div>        

  <div
    style={expanded === 7 ? expandedQuestionBoxStyle : questionBoxStyle}
    onClick={() => toggleQuestion(7)}
  >

  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span> 7.⁠ ⁠How can I get started with Rolync?
      </span>
      <FaChevronDown />
    </div>
    <div>
      <p style={{ marginTop: '10px' }}>
      To get started with Rolync, you can sign up on our platform and create a profile. From there, you'll have access to tailored resources, mentorship opportunities, and more to support your career development.
      </p>
    </div>
  </div>  

  <div
    style={expanded === 8 ? expandedQuestionBoxStyle : questionBoxStyle}
    onClick={() => toggleQuestion(8)}
  >

  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span> 8.⁠ ⁠What is Rolync's long-term vision?
      </span>
      <FaChevronDown />
    </div>
    <div>
      <p style={{ marginTop: '10px' }}>
Rolync's long-term vision is to create a supportive ecosystem where individuals in data science, analytics, and AI can confidently navigate their career paths. We aim to become the leading platform for career exploration in these fields, equipping users with the knowledge and tools they need to achieve their professional goals.
      </p>
    </div>
  </div>
</div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;