import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import WarningIcon from '../icons/warning.png';
import './ForgetPassword.css';
import RolyncLogo from '../icons/ROLYNC1.png'; 

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
  });

  useEffect(() => {
    setError('');
    sessionStorage.removeItem('error');
  }, []);
  
  const [otp, setOtp] = useState('');
  const [otpGenerated, setOtpGenerated] = useState(false);  
  const [otpIdentifier, setOtpIdentifier] = useState('');  
  const [otpReuseIdentifier, setOtpReuseIdentifier] = useState(null); 
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);  
  const [showSpinnerTooltip, setShowSpinnerTooltip] = useState(false);
  const [showSuccessTooltip, setShowSuccessTooltip] = useState(false);
  const [otpSending, setOtpSending] = useState(false);  
  const [otpMessage, setOtpMessage] = useState('');
  const [timer, setTimer] = useState(0);  
  const [canResend, setCanResend] = useState(false);  
  const [isVerified, setIsVerified] = useState(null);   
  const [isVerifying, setIsVerifying] = useState(null);
  const [showVerifyButton, setShowVerifyButton] = useState(false); 

  const [emailExists, setEmailExists] = useState(false);  
  const [emailCheckInProgress, setEmailCheckInProgress] = useState(false); 

  const [storedEmail, setStoredEmail] = useState('');

  const navigate = useNavigate();  

  const formDataRef = useRef(formData.email);


  useEffect(() => {
    const handlePageRefresh = () => {
      if (sessionStorage.getItem('wasRefreshed') === 'true') {
        const otpSent = sessionStorage.getItem('otpSent') === 'true';
        const otpGeneratedInSession = sessionStorage.getItem('otpGenerated') === 'true';
        const otpIdentifierInSession = sessionStorage.getItem('otpIdentifier') || '';

        const emailExists = sessionStorage.getItem('EmailExists') === 'true';
        const storedEmail = sessionStorage.getItem('storedEmail');
        const showSuccessTooltip = sessionStorage.getItem('showSuccessTooltip') === 'true'; 

        if (emailExists) {
          setEmailExists(true);
          setShowSuccessTooltip(true);
        }
        
        setOtpGenerated(otpGeneratedInSession);
        setOtpIdentifier(otpIdentifierInSession);
        setStoredEmail(storedEmail);
        setShowSuccessTooltip(showSuccessTooltip);

        if (otpGeneratedInSession && otpIdentifierInSession) {
          const retrieveOtp = async () => {
            try {
              const response = await axios.post('/api/retrieve-password-reset-otp', {
                identifier: otpIdentifierInSession,
                emailExists,
                otpSent,
                email: storedEmail,
                storedEmail
              });

              if (response.data.message === 'Email already prepared') {
                console.log('Email already prepared:', response.data.mailOptions);
                sessionStorage.setItem('showSuccessTooltip', 'true');
                setShowSuccessTooltip(true);
                setEmailCheckInProgress(false);
                
              } else {
                setShowSuccessTooltip(true);
                sessionStorage.setItem('showSuccessTooltip', 'true');
                setEmailCheckInProgress(false);
              }
            } catch (error) {
              setShowTooltip(true);
              setShowSuccessTooltip(false);
              setEmailCheckInProgress(false);
            }
          };
          retrieveOtp();  
        }
      } else {
        sessionStorage.setItem('wasRefreshed', 'true');
      }

      const savedFormData = JSON.parse(localStorage.getItem('formData'));

      if (savedFormData) {
        setFormData(savedFormData);
      }
    };

    handlePageRefresh();

    const handleBeforeUnload = () => {
      sessionStorage.setItem('wasRefreshed', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    formDataRef.current = formData.email;
  }, [formData.email]);

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));

    const { email } = newFormData;
    if (email) {
      setError(''); // Clear errors if all fields are filled correctly
    }

    if (e.target.name === 'email') {
      setEmailExists(false);
      setShowTooltip(false);
      setShowSuccessTooltip(false);
      setEmailCheckInProgress(false);
      setOtpMessage(''); // Clear the OTP sent success message
      sessionStorage.setItem('storedEmail', newFormData.email);
    }
  };

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleEmailBlur = async () => {
    const { email } = formData;
    const otpGeneratedFromSession = sessionStorage.getItem('otpGenerated') === 'true';

    if (email) {
      if (email !== storedEmail) {
        setShowSuccessTooltip(false);
        setError('');
        setEmailExists(null);
        sessionStorage.setItem('EmailExists', 'null');
        sessionStorage.setItem('storedEmail', email);
        setOtpIdentifier(''); // Clear any previous identifier
        setOtpGenerated(false); // Reset OTP generated status
        sessionStorage.setItem('otpGenerated', 'false'); // Reset in session storage
      } else {
        if (sessionStorage.getItem('EmailExists') === 'true' && otpGeneratedFromSession) {
          setEmailExists(true);
          setOtpGenerated(true); // Restore the state
          setShowSuccessTooltip(true);
          setShowTooltip(false);
          return;
        }
      }

      setEmailCheckInProgress(true);
      setShowTooltip(false);
      setShowSpinnerTooltip(true);

      try {
        const response = await axios.post('/api/generate-password-reset-otp', {
          email,
          identifier: otpIdentifier, 
          otpGenerated: otpGeneratedFromSession || otpGenerated, 
        },
        {
          validateStatus: function (status) {
            return (status >= 200 && status < 300) || (status >= 400 && status < 500);
          },
        });

        if (response.status === 200) {
          const { identifier } = response.data; 
          setOtpIdentifier(identifier); 
          sessionStorage.setItem('otpIdentifier', identifier); 
          setOtpGenerated(true); 
          sessionStorage.setItem('otpGenerated', 'true'); 

          setEmailExists(true);
          setShowTooltip(false);
          setShowSuccessTooltip(true); 
          sessionStorage.setItem('EmailExists', 'true');
          sessionStorage.setItem('storedEmail', email);

        } else if (response.status === 404) {
          setEmailExists(false);
          setShowTooltip(true);
          setShowSuccessTooltip(false);
          setError('Email not found. Please create a new account.');
          console.error('Email not found.');

        } else {
          setError('Unexpected response from the server.');
          console.error('Unexpected response status:', response.status);
        }
      
      } catch (error) {
        if (error.request) {
          console.error('No response received:', error.request);
          setError("Failed to communicate with the server. Please try again.");
        } else {
          console.error('Error setting up request:', error.message);
          setError("An unexpected error occurred. Please try again.");
        }
        setShowTooltip(true);
      } finally {
        setEmailCheckInProgress(false);
        setShowSpinnerTooltip(false);
      }
    } 
  };

  const handleOtpFocus = () => {
    setShowSuccessTooltip(false); // Hide success tooltip when OTP input field is focused
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (e.target.value.length > 0) {
      setCanResend(false);  // Hide the timer
      setShowVerifyButton(true);  // Show the Verify button
    } else {
      setShowVerifyButton(false);  // Hide the Verify button if no OTP entered
    }
    if (e.target.value.length === 0) {
      setShowSuccessTooltip(false);
      setIsVerified(false); // Reset verification state if OTP is cleared
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true); 
    // Start the verification process

    // Clear previous success or error messages when verify is clicked
    setOtpMessage('');
    setError('');

    try {
      const response = await axios.post('/api/verify-password-reset-otp', { email: formData.email, otp });
      if (response.data.message === 'OTP verified successfully') {
        setIsVerified(true);
        setShowSuccessTooltip(true);
        setShowVerifyButton(false);  
      } else {
        setIsVerified(false);
        setShowSuccessTooltip(false);
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setIsVerified(false);
      setShowSuccessTooltip(false);
      setError('Error verifying OTP. Please try again.');
    } finally {
      setIsVerifying(false); // End the verification process
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const { email } = formData;

    if (!email) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isVerified) {
      setError('Please verify your OTP before continuing.');
      return;
    }

    navigate('/reset-password', { state: { email } });
  };

  const handleGetOtp = async () => {
    setOtpMessage('');
    setError('');

    try {
      setOtpSending(true); 
      const response = await axios.post('/api/send-prepared-email-reset-otp', {
        identifier: otpIdentifier, // Use the stored identifier
      });
  
      setOtpMessage(response.data.message === 'Email sent successfully' ? 'OTP sent to your email' : response.data.message);

      setError('');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpMessage('Error sending OTP');
    } finally {
      setOtpSending(false);
    }
  };

  const startTimer = useCallback(() => {
    setTimer(60);  
    setCanResend(false);

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
      });
    }, 1000);

    setTimeout(async () => {
      try {
        const response = await axios.post('/api/prepare-reset-new-otp', { email: formData.email });
        if (response.data.identifier_new) {
          setOtpReuseIdentifier(response.data.identifier_new);
          sessionStorage.setItem('setOtpReuseIdentifier', response.data.identifier_new);  
        }
      } catch (error) {
        console.error('Error preparing new OTP:', error);
      }
    }, 30000);  
  }, [formData.email]);

  useEffect(() => {
    if (otpMessage === 'OTP sent to your email') {
      startTimer();
    }
  }, [otpMessage, startTimer]);

  const handleResendOtp = async () => {
    setOtpMessage('');
    setError('');

    try {
      setOtpSending(true);

      const reuseIdentifier = sessionStorage.getItem('otpReuseIdentifier') || otpReuseIdentifier;
      const response = await axios.post('/api/resend-password-reset-otp', { identifier_new: reuseIdentifier, email: formData.email });
      
      if (response.data.message === 'Email sent successfully') {
        setOtpMessage(response.data.message === 'Email sent successfully' ? 'OTP sent to your email' : response.data.message);
      } else {
        setOtpMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setOtpMessage('Error resending OTP');
    } finally {
      setOtpSending(false);
    }
  };

  const isFormValid = () => {
    const { email } = formData;
    return email && isVerified;
  };


  const formGroupStyle = {
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: isFormValid() ? '#00BBF0' : '#cccccc',
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

  const otpButtonStyle = {
    position: 'absolute',
    right: '2px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '4px',
    color: '#4ab6e2',
    padding: '5px 10px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const emailExistsStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'green',
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const tooltipStyle = {
    position: 'absolute',
    top: '50%',
    right: '-335px',
    transform: 'translateY(-50%)',
    backgroundColor: '#fff',
    border: '1px solid rgba(153, 153, 153, 0.97)',
    borderRadius: '4px',
    padding: '10px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
    zIndex: 10,
    width: '320px',
    fontSize: '14px',
    lineHeight: '1.5',
  };

  return (
    <Container fluid className="forgot-password-container">
       <div className="forgot-password-logo">
        <img src={RolyncLogo} alt="Rolync Logo" />
      </div>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col md={6} className="d-flex justify-content-center">
          <div className="forgot-password-form">
            <h2 className="forgot-password-text">Forgot Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {otpMessage && (
              <Alert 
                variant={otpMessage === 'OTP sent to your email' ? 'success' : 'danger'} 
                style={{ textAlign: 'left', paddingLeft: '20px' }}
              >
                {otpMessage}
              </Alert>
            )}

            <Form onSubmit={handleContinue}>
              <Form.Group controlId="formEmail" style={formGroupStyle}>
              <div style={{ position: 'relative' }}>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                className="form-control"
                style={{
                  color: formData.email ? '#000000' : 'rgba(0, 0, 0, 0.5)',  
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(153, 153, 153, 0.97)',
                  borderRadius: '4px',
                  paddingLeft: '10px',
                  height: '40px',
                  width: '100%',  
                }}
              />
              {emailCheckInProgress && (
                <div className="spinner-container" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                  <div className="spinner" style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(0, 174, 239, 0.15)',
                    borderTop: '2px solid rgba(0, 174, 239, 0.8)',
                    borderRadius: '50%',
                    animation: 'rotation 1s infinite linear'
                  }}></div>
                  {showSpinnerTooltip && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '-100px',
                      transform: 'translateY(-50%)',
                      backgroundColor: '#fff',
                      border: '1px solid rgba(153, 153, 153, 0.97)',
                      borderRadius: '4px',
                      padding: '10px',
                      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                      zIndex: 10,
                      width: '180px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '-10px',
                      transform: 'translateY(-50%)',
                      width: '0',
                      height: '0',
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      borderRight: '10px solid rgba(153, 153, 153, 0.97)',
                    }}></div>
                    <p style={{ margin: 0 }}>Verifying email, please wait</p>
                  </div>
                  )}  
                </div>
              )}

    {!emailCheckInProgress && emailExists && (
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute',
          right: '10px',
          transform: 'translateY(-180%)',
          color: 'green',
          fontSize: '20px',
          fontWeight: 'bold',
        }}>&#10003;</span>

        {showSuccessTooltip && (
          <div style={{ ...tooltipStyle,
            right: '-170px',
            transform: 'translateY(-160%)',
            backgroundColor: '#fff',
            border: '1px solid rgba(153, 153, 153, 0.97)',
            borderRadius: '4px',
            padding: '6px',
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
            zIndex: 10,
            width: '160px',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '-10px',
              transform: 'translateY(-50%)',
              width: '0',
              height: '0',
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '10px solid rgba(153, 153, 153, 0.97)',
            }}></div>
            <p style={{ margin: 0 }}>Email found.</p>
          </div>
        )}
      </div>
    )}

    {showTooltip && (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 'calc(100% + 10px)',
        transform: 'translateY(-50%)',
        backgroundColor: '#fff',
        border: '1px solid rgba(153, 153, 153, 0.97)',
        borderRadius: '4px',
        padding: '6px',
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
        zIndex: 10,
        width: '153px',
        height: '35px',
        fontSize: '14px',
        lineHeight: '1.5',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '-10px',
          transform: 'translateY(-50%)',
          width: '10px',
          height: '',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderRight: '10px solid rgba(153, 153, 153, 0.97)',
        }}></div>
        <img src={WarningIcon} alt="Warning Icon" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
        Email not found.
      </div>
    )}
  </div>
</Form.Group>

<Form.Group controlId="formOtp" style={formGroupStyle} className="position-relative">
  <Form.Control
    type="text"
    placeholder="Verify your email address"
    name="otp"
    value={otp}
    onChange={handleOtpChange}
    onFocus={handleOtpFocus}
    className="form-control"
    style={{
      color: otp ? '#000000' : 'rgba(0, 0, 0, 0.5)',
      backgroundColor: '#FFFFFF',
      border: '1px solid rgba(153, 153, 153, 0.97)',
      borderRadius: '4px',
      paddingLeft: '10px',
      height: '40px',
      width: '100%',
      paddingRight: '100px', 
    }}
  />

  {!isVerified && (
    <>
      {otpSending && (
        <div className="spinner-container" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(0, 174, 239, 0.15)', borderTop: '2px solid rgba(0, 174, 239, 0.8)', borderRadius: '50%', animation: 'rotation 1s infinite linear' }}></div>
        </div>
      )}

      {timer > 0 && !showVerifyButton && !otpSending && (
        <div style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', backgroundColor: 'transparent', padding: '0', color: 'rgba(0, 0, 0, 0.5)', fontSize: '15px'}}>
          <p>Resend OTP in {formatTimer(timer)}</p>
        </div>
      )}

      {canResend && !showVerifyButton && !otpSending && (
        <button
          type="button"
          onClick={handleResendOtp}
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', color: '#00BBF0', cursor: 'pointer', padding: '0', fontSize: '14px', fontWeight: 'bold' }}
        >
          Resend OTP
        </button>
      )}

      {showVerifyButton && (
        <button
          type="button"
          onClick={handleVerifyOtp}
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', color: '#00BBF0', cursor: 'pointer', padding: '0', fontSize: '14px', fontWeight: 'bold' }}
        >
          Verify
        </button>
      )}

      {!otpSending && !showVerifyButton && !canResend && timer === 0 && (
        <button
          type="button"
          onClick={handleGetOtp}
          style={otpButtonStyle}
        >
          Get OTP
        </button>
      )}
    </>
  )}

  {isVerifying && (
    <div className="spinner-container" style={{ position: 'absolute', right: '10px', top: '90%', transform: 'translateY(-50%)' }}>
      <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(0, 174, 239, 0.15)', borderTop: '2px solid rgba(0, 174, 239, 0.8)', borderRadius: '50%'}}></div>
    </div>
  )}

  {isVerified && (
    <div style={{ position: 'relative' }}>
      <span style={{ ...emailExistsStyle, top: '0', transform: 'translateY(-180%)' }}>&#10003;</span>
    </div>
  )}
</Form.Group>

<Button
  variant="primary"
  type="submit"
  className={`continue-btn button-with-shadow ${isFormValid() ? 'valid' : 'invalid'}`}
  style={buttonStyle}
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

export default ForgotPassword;
