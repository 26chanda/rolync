import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import './SignUp.css';

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [showTooltip, setShowTooltip] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [success, setSuccess] = useState(''); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);

    if (e.target.name === 'password') {
      validatePassword(e.target.value);  
    }
  };

 
  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const uppercaseValid = /[A-Z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialCharValid = /[@$!%*?&]/.test(password);

    setPasswordValidation({
      length: lengthValid,
      uppercase: uppercaseValid,
      number: numberValid,
      specialChar: specialCharValid,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, password, confirmPassword } = formData;


    if (!currentPassword || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }


    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    if (!passwordValidation.length || !passwordValidation.uppercase || !passwordValidation.number || !passwordValidation.specialChar) {
      setError('Password must meet all requirements');
      return;
    }

    setError('');
    
    try {

      const response = await axios.put('/api/change-password', {
        currentPassword,
        newPassword: password,
      },
      {
        withCredentials: true 
      });


      if (response.status === 200) {
        setSuccess('Password changed successfully');
        setShowModal(true);  
      }
    } catch (error) {
      setError('Failed to change password. Please check your current password.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleLogoutFromAllDevices = async () => {
    try {

      await axios.post('/api/logout-from-all-devices', {}, {
        withCredentials: true, 
      });
      localStorage.removeItem('token');
      localStorage.removeItem('formData'); 
      navigate('/login');
    } catch (error) {
      
    }
  };

  const handleStayLoggedIn = () => {
    setShowModal(false);
    navigate('/home');  
  };

  const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

    const tooltipStyle = {
    position: 'absolute',
    top: '50%',
    right: '-266px',
    transform: 'translateY(-50%)',
    backgroundColor: '#f9f9f9',
    border: '1px solid rgba(153, 153, 153, 0.97)',
    borderRadius: '4px',
    padding: '10px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
    zIndex: 10,
    width: '250px',
    color: 'red',  
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    right: '250px',
    transform: 'translateY(-50%)',
    width: '0',
    height: '0',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '10px solid rgba(153, 153, 153, 0.97)',
  };

  return (
    
    <Container fluid className="signup-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="d-flex justify-content-center">
          <div className="signup-form">
            <h2 className="signup-welcome-text">Change Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="CurrentPassword" className="signup-form-group" style={{ marginBottom: '20px' }}>
                <Form.Control
                  type={showCurrentPassword ? 'text' : 'password'} 
                  placeholder="Current Password"
                  className="signup-form-control"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  style={{color: formData.currentPassword ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px'
                  }}
                />
                <span className="signup-show-password" style={{fontWeight:"800"}} onClick={() => setShowCurrentPassword(!showCurrentPassword)} >
                  {showCurrentPassword ? 'Hide' : 'Show'}
                </span>
              </Form.Group>

              <Form.Group controlId="formPassword" className="signup-form-group position-relative" style={{ marginBottom: '20px' }}>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  className="signup-form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setShowTooltip(true)} 
                  onBlur={() => setShowTooltip(false)} 
                  style={{color: formData.password ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '475px'
                  }}
                />
                {/* Password requirements tooltip */}
                {showTooltip && (
                  <div style={tooltipStyle}>
                    <div style={arrowStyle}></div>
                    <ul style={{ paddingLeft: '15px', marginBottom: 0, listStyleType: 'none', textAlign: 'left' }}>
                      <li style={{ color: passwordValidation.length ? 'green' : 'red' }}>
                        {passwordValidation.length ? '✔' : '✖'} At least 8 characters
                      </li>
                      <li style={{ color: passwordValidation.uppercase ? 'green' : 'red' }}>
                        {passwordValidation.uppercase ? '✔' : '✖'} At least 1 uppercase letter
                      </li>
                      <li style={{ color: passwordValidation.number ? 'green' : 'red' }}>
                        {passwordValidation.number ? '✔' : '✖'} At least 1 number
                      </li>
                      <li style={{ color: passwordValidation.specialChar ? 'green' : 'red' }}>
                        {passwordValidation.specialChar ? '✔' : '✖'} At least 1 special character
                      </li>
                    </ul>
                  </div>
                )}
                <span className="signup-show-password" style={{fontWeight:"800"}} onClick={toggleShowPassword} >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="signup-form-group" style={{ marginBottom: '20px' }}>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  className="signup-form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{color: formData.confirmPassword? '#000000' : 'rgba(0, 0, 0, 0.5)',
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
                className={`signup-continue-btn button-with-shadow`}
                style={{
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
                  cursor: 'pointer',
                }}
                block
              >
                Submit 
              </Button>
            </Form>

          
             <Modal show={showModal} onHide= {handleStayLoggedIn} centered= {modalStyle}>
              <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Password changed successfully. Would you like to log out from all devices?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" 
                onClick={handleStayLoggedIn}
                style={{backgroundColor: 'gray', color: 'white'}}>
                  No, take me to the homepage
                </Button>
                <Button variant="primary" 
                onClick={handleLogoutFromAllDevices} 
                style={{ backgroundColor: '#00BBF0', color: 'white' }}>
                  Yes, log me out from all devices
                </Button>
              </Modal.Footer>
            </Modal>
                
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
