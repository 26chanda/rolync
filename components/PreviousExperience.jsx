import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import './PreviousExperience.css';
import RolyncLogo from '../icons/ROLYNC1.png'; 

function PreviousExperience() {
  const [experience, setExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [employmentTitle, setEmploymentTitle] = useState('');
  const [department, setDepartment] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('previousExperience'));
    if (savedFormData) {
      setExperience(savedFormData.experience || '');
      setCompanyName(savedFormData.companyName || '');
      setEmploymentTitle(savedFormData.employmentTitle || '');
      setDepartment(savedFormData.department || []);
    }
  }, []);

  const departmentOptions = [
    { value: 'Information Technology (IT)', label: 'Information Technology (IT)' },
    { value: 'Human Resources (HR)', label: 'Human Resources (HR)' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Aviation', label: 'Aviation' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Research and Development (R&D)', label: 'Research and Development (R&D)' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Procurement', label: 'Procurement' },
    { value: 'Product Management', label: 'Product Management' },
    { value: 'Business Development', label: 'Business Development' },
    { value: 'Corporate Strategy', label: 'Corporate Strategy' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Compliance and Risk Management', label: 'Compliance and Risk Management' },
    { value: 'Health and Safety', label: 'Health and Safety' },
    { value: 'Public Relations (PR)', label: 'Public Relations (PR)' },
    { value: 'Training and Development', label: 'Training and Development' },
    { value: 'Corporate Communications', label: 'Corporate Communications' },
    { value: 'Supply Chain', label: 'Supply Chain' },
    { value: 'Manufacturing', label: 'Manufacturing' },
  ];

  const handleChange = (setter, key) => (e) => {
    const { value } = e.target;

    if (key === 'experience' && value === 'Fresher') {
      setCompanyName('N/A');
      setEmploymentTitle('N/A');
      setDepartment([{ value: 'N/A', label: 'N/A' }]);
    } else if (key === 'experience') {
      setCompanyName('');
      setEmploymentTitle('');
      setDepartment([]);
    }

    setter(value);

    const formData = {
      experience: key === 'experience' ? value : experience,
      companyName: key === 'companyName' ? value : companyName,
      employmentTitle: key === 'employmentTitle' ? value : employmentTitle,
      department: key === 'department' ? value : department,
    };
    localStorage.setItem('previousExperience', JSON.stringify(formData));

    if (formData.experience && formData.companyName && formData.employmentTitle && formData.department.length > 0) {
      setError('');
    }
  };

  const handleDepartmentChange = (selectedOptions) => {
    // Directly store the array of objects (value-label pairs)
    setDepartment(selectedOptions); 
    const formData = {
      experience,
      companyName,
      employmentTitle,
      department: selectedOptions, // Store the full objects here
    };
    localStorage.setItem('previousExperience', JSON.stringify(formData));

    if (experience && companyName && employmentTitle && selectedOptions.length > 0) {
      setError('');
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (experience && companyName && employmentTitle && department.length > 0) {
      navigate('/additional-info');
    } else {
      setError('Please fill in all required fields to continue.');
    }
  };

  const isFormValid = experience && companyName && employmentTitle && department.length > 0;

  return (
    <Container fluid style={{ background: '#F5F5F7', height: '100vh' }}>
       <div className="experience-logo">
        <img src={RolyncLogo} alt="Rolync Logo" />
      </div>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="d-flex justify-content-center">
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', maxWidth: '551px', width: '100%', margin: 'auto' }}>
            <h2 style={{ color: 'rgba(0, 0, 0, 0.5)', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' }}>Previous Experience</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formExperience">
                <Form.Select
                  className="form-control"
                  value={experience}
                  onChange={handleChange(setExperience, 'experience')}
                  style={{
                    width: '475px',
                    height: '40px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    paddingLeft: '10px',
                    color: experience ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <option value="" disabled hidden>
                    Total Work Experience
                  </option>
                  <option value="Fresher">Fresher</option>
                  <option value="Less than 1">Less than 1</option>
                  <option value="1-3">1-3</option>
                  <option value="3-5">3-5</option>
                  <option value="5-7">5-7</option>
                  <option value="7-10">7-10</option>
                  <option value="10+">10+</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formCompanyName">
                <Form.Control
                  type="text"
                  placeholder="Previous Company Name"
                  className="form-control"
                  value={companyName}
                  onChange={handleChange(setCompanyName, 'companyName')}
                  readOnly={experience === 'Fresher'}
                  style={{
                    width: '475px',
                    height: '40px',
                    backgroundColor: experience === 'Fresher' ? '#E9ECEF' : '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    paddingLeft: '10px',
                    color: experience === 'Fresher' ? '#6c757d' : '#000000',
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formEmploymentTitle">
                <Form.Control
                  type="text"
                  placeholder="Previous Employment Title"
                  className="form-control"
                  value={employmentTitle}
                  onChange={handleChange(setEmploymentTitle, 'employmentTitle')}
                  readOnly={experience === 'Fresher'}
                  style={{
                    width: '475px',
                    height: '40px',
                    backgroundColor: experience === 'Fresher' ? '#E9ECEF' : '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    paddingLeft: '10px',
                    color: experience === 'Fresher' ? '#6c757d' : '#000000',
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formDepartment">
                {experience === 'Fresher' ? (
                  <Form.Control
                    type="text"
                    placeholder="Previous Department"
                    className="form-control"
                    value="N/A"
                    readOnly
                    style={{
                      width: '475px',
                      height: '40px',
                      backgroundColor: '#E9ECEF',
                      border: '1px solid rgba(153, 153, 153, 0.97)',
                      borderRadius: '4px',
                      marginBottom: '20px',
                      paddingLeft: '10px',
                      color: '#6c757d',
                    }}
                  />
                ) : (
                  <CreatableSelect
                    isMulti
                    options={departmentOptions}
                    value={department}
                    onChange={handleDepartmentChange}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        minHeight: '40px',
                        border: '1px solid rgba(153, 153, 153, 0.97)',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        paddingLeft: '1px',
                        backgroundColor: '#FFFFFF',
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        flexWrap: 'wrap',
                        overflow: 'auto',
                        maxHeight: '80px',
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: 'rgba(0, 0, 0, 0.5)',
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: '#00BBF0',
                        color: '#FFFFFF',
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: '#FFFFFF',
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        color: '#FFFFFF',
                        ':hover': {
                          backgroundColor: '#00BBF0',
                          color: '#FFFFFF',
                        },
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        color: 'rgba(153, 153, 153, 0.97)',
                      }),
                      indicatorSeparator: () => ({
                        display: 'none',
                      }),
                    }}
                    placeholder="Previous Department"
                  />
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={`continue-btn button-with-shadow ${isFormValid ? 'valid' : 'invalid'}`}
                block
              >
                Continue
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PreviousExperience;
