import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './AcademicInfo.css';
import RolyncLogo from '../icons/ROLYNC1.png'; 

function AcademicInfo() {
  const [formData, setFormData] = useState({
    degreeProgram: '',
    major: '',
    customMajor: '',
    graduationDate: '',
    previousDegree: '',
    previousMajor: ''
  });
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('academicInfo'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    localStorage.setItem('academicInfo', JSON.stringify(newFormData));

    if (newFormData.degreeProgram && newFormData.major && newFormData.graduationDate && newFormData.previousDegree && newFormData.previousMajor) {
      setError('');
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const { degreeProgram, graduationDate, major, customMajor, previousDegree, previousMajor } = formData;
  
    // Check if customMajor should be validated
    const isMajorValid = major && (major !== 'Other' || customMajor);
  
    if (!degreeProgram || !graduationDate || !isMajorValid || !previousDegree || !previousMajor) {
      setError('Please fill in all required fields.');
      return;
    }
  
    setError('');
    navigate('/career-interests');
  };
  

  const handleMajorChange = (e) => {
    const value = e.target.value;
    const newFormData = { ...formData, major: value, customMajor: value !== 'Other' ? '' : formData.customMajor };
    setFormData(newFormData);
    localStorage.setItem('academicInfo', JSON.stringify(newFormData));

    if (newFormData.degreeProgram && newFormData.major && newFormData.graduationDate && newFormData.previousDegree && newFormData.previousMajor) {
      setError('');
    }
  };

  const isFormValid = () => {
    const { degreeProgram, major, customMajor, graduationDate, previousDegree, previousMajor } = formData;
    const isMajorValid = major && (major !== 'Other' || customMajor);
    return degreeProgram && isMajorValid && graduationDate && previousDegree && previousMajor;
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#00BBF0',
    border: 'none',
    width: '475px',
    height: '35px',
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: '20px',
    cursor: isFormValid() ? 'pointer' : 'not-allowed',
    opacity: isFormValid() ? 1 : 0.7,
  };

  return (
    <Container fluid className="academic-info-container">
      <div className="academic-info-logo">
        <img src={RolyncLogo} alt="Rolync Logo" />
      </div>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col md={6} className="d-flex justify-content-center">
          <div className="academic-info-form">
            <h2 className="academic-text">Academic Information</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleContinue}>
              <Form.Group controlId="formDegreeProgram" style={formGroupStyle}>
                <Form.Control
                  as="select"
                  name="degreeProgram"
                  value={formData.degreeProgram}
                  onChange={handleChange}
                  className="form-select"
                  style={{
                    color: formData.degreeProgram ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px'
                  }}
                >
                  <option value="" disabled hidden>Current Degree Program</option>
                  <option>Bachelor's</option>
                  <option>Master's</option>
                </Form.Control>
              </Form.Group>


              <Form.Group controlId="formMajor" style={{ ...formGroupStyle, position: 'relative' }}>
                {formData.major === 'Other' ? (
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      type="text"
                      placeholder="Please specify your major"
                      name="customMajor"
                      value={formData.customMajor}
                      onChange={handleChange}
                      className="form-control"
                      style={{
                        color: formData.customMajor ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(153, 153, 153, 0.97)',
                        borderRadius: '4px',
                        paddingLeft: '10px',
                        height: '40px',
                        width: '475px'
                      }}
                    />
                    <span 
                      onClick={() => handleMajorChange({ target: { value: '' }})}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      style={{
                        position: 'absolute', 
                        right: '10px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        cursor: 'pointer', 
                        color: '#00BBF0',
                        fontSize: '20px'
                      }}
                    >
                      ⟲
                    </span>
                    {showTooltip && (
                      <div style={{
                        position: 'absolute',
                        top: '-30px',
                        right: '0',
                        backgroundColor: '#fff',
                        border: '1px solid rgba(153, 153, 153, 0.97)',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                        zIndex: 10,
                      }}>
                        Click the icon to go back to the dropdown
                        <span 
                          onClick={() => setShowTooltip(false)} 
                          style={{ 
                            marginLeft: '10px', 
                            cursor: 'pointer', 
                            color: '#000' 
                          }}
                        >
                          ×
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <Form.Control
                    as="select"
                    name="major"
                    value={formData.major}
                    onChange={handleMajorChange}
                    className="form-select"
                    style={{
                      color: formData.major ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(153, 153, 153, 0.97)',
                      borderRadius: '4px',
                      paddingLeft: '10px',
                      height: '40px',
                      width: '475px'
                    }}
                  >
                    <option value="" disabled hidden>Current Major</option>
                    <option>Computer Science</option>
                    <option>Data Science</option>
                    <option>Business Analytics</option>
                    <option>Information Technology and Management</option>
                    <option>Other</option>
                  </Form.Control>
                )}
              </Form.Group>

              <Form.Group controlId="formGraduationDate" style={formGroupStyle}>
                <Form.Control
                  type="text"
                  placeholder="Expected graduation date (e.g., May 2025)"
                  name="graduationDate"
                  value={formData.graduationDate}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    color: formData.graduationDate ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px'
                  }}
                />
                
              </Form.Group>

              <Form.Group controlId="formPreviousDegree" style={formGroupStyle}>
                <Form.Control
                  as="select"
                  name="previousDegree"
                  value={formData.previousDegree}
                  onChange={handleChange}
                  className="form-select"
                  style={{
                    color: formData.previousDegree ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px'
                  }}
                >
                  <option value="" disabled hidden>Previous Degree Program</option>
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>Phd</option>
                </Form.Control>  
              </Form.Group>

              <Form.Group controlId="formPreviousMajor" style={formGroupStyle}>
                <Form.Control
                  type="text"
                  placeholder="Previous Major"
                  name="previousMajor"
                  value={formData.previousMajor}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    color: formData.previousMajor? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px'
                  }}
                />
                
              </Form.Group>    

              <Button
                variant="primary"
                type="submit"
                className={`continue-btn button-with-shadow ${isFormValid() ? 'valid' : 'invalid'}`}
                style={buttonStyle}
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

export default AcademicInfo;
