import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import './ResetPassword.css'; 

function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [showTooltip, setShowTooltip] = useState(false);  

  const location = useLocation(); 
  const navigate = useNavigate();  

  const { email } = location.state || {};

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'newPassword') {
      validatePassword(value);  
    }

    if (value) {
      setError('');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;

    // Check password matches
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Check if all password requirements are met
    if (
      !passwordValidation.length ||
      !passwordValidation.uppercase ||
      !passwordValidation.number ||
      !passwordValidation.specialChar
    ) {
      setError('Password does not meet the required criteria.');
      return;
    }

    if (!email) {
      setError('No email found. Please retry the reset password flow.');
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', {
        email, // Email from location.state
        password: newPassword,
      });

      if (response.status === 200) {
        setSuccess('Password reset successfully');
        setError('');
        setTimeout(() => {
          navigate('/login');  
        }, 3000);
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setError('Error updating password. Please try again.');
    }
  };

  const inputStyle = {
    height: '40px',
    width: '475px',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(153, 153, 153, 0.97)',
    borderRadius: '4px',
    paddingLeft: '10px',
    margin: 'auto',
    color: 'black',
  };

  const formGroupStyle = {
    marginBottom: '20px',
    position: 'relative',
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
    cursor: 'pointer',
    opacity: 1,
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="reset-password-container">
      <div className="logo" style={{ position: 'absolute', top: '80px', left: '80px', fontSize: '24px', fontWeight: 'bold' }}>LOGO</div>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col md={6} className="d-flex justify-content-center">
          <div className="reset-password-form">
            <h2 className="reset-password-text">Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleReset}>
              <Form.Group controlId="formNewPassword" style={formGroupStyle}>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="form-control"
                  style={inputStyle}
                  onFocus={() => setShowTooltip(true)}   
                  onBlur={() => setShowTooltip(false)}   
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
                
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" style={formGroupStyle}>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    color: formData.confirmPassword ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    height: '40px',
                    width: '475px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                  }}
                />
                <span
                  className="reset-show-password"
                  onClick={toggleShowPassword}
                  style={{
                    position: 'absolute',
                    right: '7px',
                    bottom: '140%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: " #00BBF0"
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="reset-btn button-with-shadow"
                style={buttonStyle}
              >
                Reset Password
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
