import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal, Alert } from 'react-bootstrap';
import './AdditionalInformation.css';
import { createItem } from '../api.js';
import RolyncLogo from '../icons/ROLYNC1.png'; 

function AdditionalInformation() {
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('additionalInformation'));
    if (savedFormData) {
      setLinkedin(savedFormData.linkedin || '');
      setPortfolio(savedFormData.portfolio || '');
      setHobbies(savedFormData.hobbies || '');
      setAgreement(savedFormData.agreement || false);
    }
  }, []);

  const handleChange = (setter, key) => (e) => {
    const { value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setter(newValue);

    const formData = {
      linkedin: key === 'linkedin' ? newValue : linkedin,
      portfolio: key === 'portfolio' ? newValue : portfolio,
      hobbies: key === 'hobbies' ? newValue : hobbies,
      agreement: key === 'agreement' ? newValue : agreement,
    };
    localStorage.setItem('additionalInformation', JSON.stringify(formData));

    if (formData.linkedin && formData.agreement) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!linkedin) {
      setError('Please provide your LinkedIn profile.');
      return;
    }

    if (!agreement) {
      setError('You must agree to the user agreement and privacy policy.');
      return;
    }

    // Retrieve data from local storage
    const signUpData = JSON.parse(localStorage.getItem('formData')) || {};
    const academicInfo = JSON.parse(localStorage.getItem('academicInfo')) || {};
    const careerInterests = JSON.parse(localStorage.getItem('careerInterests')) || {};
    const previousExperience = JSON.parse(localStorage.getItem('previousExperience')) || {};

    // Combine all data
    const combinedData = {
      ...signUpData,
      ...academicInfo,
      ...careerInterests,
      ...previousExperience,
      linkedin,
      portfolio, 
      hobbies,   
    };

    try {
      await createItem(combinedData);
      setShowModal(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Email already exists') {
        setError('Email already exists. Please use a different email.');
      } else {
        setError('Failed to submit information.');
      }
    }
  };

  const handleOkClick = () => {
    setShowModal(false);
    navigate('/login');
  };

  const isFormValid = linkedin && agreement;


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
    cursor: isFormValid ? 'pointer' : 'not-allowed',
    opacity: isFormValid ? 1 : 0.7,
  };

  return (
    <Container fluid style={{ background: '#F5F5F7', height: '100vh' }}>
      <div className="additional-info-logo">
        <img src={RolyncLogo} alt="Rolync Logo" />
      </div>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="d-flex justify-content-center">
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', maxWidth: '551px', width: '100%', margin: 'auto' }}>
            <h2 style={{ color: 'rgba(0, 0, 0, 0.5)', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' }}>Additional Information</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formLinkedin" style={formGroupStyle}>
                <Form.Control
                  type="text"
                  placeholder="LinkedIn"
                  value={linkedin}
                  onChange={handleChange(setLinkedin, 'linkedin')}
                  style={{
                    color: linkedin ? '#000000' : 'rgba(0, 0, 0, 0.5)', /* Black when text is entered, gray otherwise */
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px',
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formPortfolio" style={formGroupStyle}>
                <Form.Control
                  type="text"
                  placeholder="Portfolio/Personal Website"
                  value={portfolio}
                  onChange={handleChange(setPortfolio, 'portfolio')}
                  style={{
                    color: portfolio ? '#000000' : 'rgba(0, 0, 0, 0.5)', 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px',
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formHobbies" style={formGroupStyle}>
                <Form.Control
                  type="text"
                  placeholder="Hobbies and Interests"
                  value={hobbies}
                  onChange={handleChange(setHobbies, 'hobbies')}
                  style={{
                    color: hobbies ? '#000000' : 'rgba(0, 0, 0, 0.5)', 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px',
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formAgreement" className="d-flex align-items-center" style={{ marginBottom: '20px' }}>
                <input
                  type="checkbox"
                  checked={agreement}
                  onChange={handleChange(setAgreement, 'agreement')}
                  style={{ marginRight: '10px' }}
                />
                <label style={{ color: 'black' }}>
                  Agree to <a href="/terms" style={{ color: '#00BBF0' }}>User Agreement</a> and <a href="/privacy-policy" style={{ color: '#00BBF0' }}>Privacy Policy</a> of Rolync
                </label>
              </Form.Group>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="primary"
                  type="submit"
                  className={`continue-btn button-with-shadow ${isFormValid ? 'valid' : 'invalid'}`}
                  style={buttonStyle}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submission Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your information has been submitted successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOkClick} style={{ backgroundColor: '#00BBF0', border: 'none', width: '150px', height: '35px', padding: '5px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)', color: '#ffffff', fontWeight: 'bold' }}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdditionalInformation;
