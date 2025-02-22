import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import WarningIcon from '../icons/warning.png';
import RolyncLogo from '../icons/ROLYNC1.png'; 
import './SignUp.css';


function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
  const [showPassword, setShowPassword] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [emailVerified, setEmailVerified] = useState(false); 
  const [isDomainVerified, setIsDomainVerified] = useState(false); 
  const [isEmailUnique, setIsEmailUnique] = useState(null);  
  const [emailVerificationInProgress, setEmailVerificationInProgress] = useState(false); 
  const [showTooltip, setShowTooltip] = useState(false);  
  const [showSpinnerTooltip, setShowSpinnerTooltip] = useState(false);
  const [showSuccessTooltip, setShowSuccessTooltip] = useState(false);
  const [otpSending, setOtpSending] = useState(false);  
  const [timer, setTimer] = useState(0); 
  const [canResend, setCanResend] = useState(false); 
  const [isVerified, setIsVerified] = useState(null);  
  const [isVerifying, setIsVerifying] = useState(null);
  const [showVerifyButton, setShowVerifyButton] = useState(false);  
  const [isTyping, setIsTyping] = useState(false);   


  const [storedEmail, setStoredEmail] = useState('');

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);  
  

  const navigate = useNavigate();

  const formDataRef = useRef(formData.email);


  useEffect(() => {
    const handlePageRefresh = () => {
      // Check if the page was refreshed
      if (sessionStorage.getItem('wasRefreshed') === 'true') {
        const otpSent = sessionStorage.getItem('otpSent') === 'true';
        const otpGeneratedInSession = sessionStorage.getItem('otpGenerated') === 'true';
        const otpIdentifierInSession = sessionStorage.getItem('otpIdentifier') || '';
  
        const isDomainVerified = sessionStorage.getItem('isDomainVerified') === 'true';
        const isEmailUnique = sessionStorage.getItem('isEmailUnique') === 'true';
        const emailVerified = sessionStorage.getItem('EmailVerified') === 'true';
        const storedEmail = sessionStorage.getItem('storedEmail');
        const showSuccessTooltip = sessionStorage.getItem('showSuccessTooltip') === 'true';
  
        // Retrieve the isVerified state from sessionStorage
        const isVerifiedFromSession = sessionStorage.getItem('isVerified') === 'true'; 
  
        // Restore the form fields from sessionStorage or localStorage
        const savedFormData = JSON.parse(localStorage.getItem('formData'));
        const savedFirstName = sessionStorage.getItem('firstName');
  
        if (savedFormData) {
          setFormData(savedFormData);  
        }
  
        if (savedFirstName) {
          setFormData((prevData) => ({ ...prevData, firstName: savedFirstName }));
        }
  
        // Delay the comparison until the form email is fully populated
        if (formData.email && storedEmail) {
  
          // Case 1: If the stored email matches the current formData email, restore the states
          if (storedEmail === formData.email) {
            setEmailVerified(emailVerified);  
            setIsVerified(isVerifiedFromSession);  
            setIsDomainVerified(isDomainVerified);  
            setIsEmailUnique(isEmailUnique);  
            setShowSuccessTooltip(showSuccessTooltip);  
          } 
          // Case 2: If the email has changed, reset the states
          else {
            setEmailVerified(false);
            setIsVerified(false);  
            setIsDomainVerified(false);  
            setIsEmailUnique(null);  
            setShowSuccessTooltip(false); 
            sessionStorage.setItem('EmailVerified', 'false');
            sessionStorage.setItem('isVerified', 'false');  
          }
  
          // Restore OTP-related states
          setOtpGenerated(otpGeneratedInSession);
          setOtpIdentifier(otpIdentifierInSession);
  
          // Handle OTP retrieval if it was generated
          if (otpGeneratedInSession && otpIdentifierInSession ) {
            const retrieveOtp = async () => {
              try {
                const response = await axios.post('http://localhost:5001/api/retrieve-otp', {
                  identifier: otpIdentifierInSession,
                  isDomainVerified,
                  isEmailUnique,
                  emailVerified,
                  otpSent,
                  email: storedEmail,  
                  storedEmail,
                });
  
                if (response.data.message === 'Email already prepared' || 
                    response.data.message === 'Email domain verified and email body prepared again') {
                  setShowSuccessTooltip(true);  
                  setEmailVerificationInProgress(false);
                } else {
                  setShowSuccessTooltip(true);  
                  setEmailVerificationInProgress(false);
                }
              } catch (error) {
                console.error('Error retrieving OTP:', error);
                setShowTooltip(false);
                setShowSuccessTooltip(false);
                setOtpGenerated(false);
                setOtpIdentifier('');
                setCanResend(false);
                setEmailVerificationInProgress(false);
              }
            };
            retrieveOtp();
          }
        } else {
          console.log("Email is not yet ready for comparison.");
        }
      } else {
        sessionStorage.setItem('wasRefreshed', 'true');
      }
    };
  
    // Restore form data and run the page refresh comparison logic

    handlePageRefresh();
    
    
    const handleBeforeUnload = () => {
      sessionStorage.setItem('wasRefreshed', 'true');
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formData.email]);
  
  useEffect(() => {
    formDataRef.current = formData.email;
  }, [formData.email]);
  

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));
    sessionStorage.setItem('firstName', newFormData.firstName);  

    const { firstName, lastName, email, password, confirmPassword } = newFormData;

    if (firstName && lastName && email && password && confirmPassword && password === confirmPassword) {
        setError('');
    }

    if (e.target.name === 'email') {
        setIsTyping(true);   
        
        // If the email is changed, reset the verification states immediately
        if (email !== storedEmail) {
            setStoredEmail(email);  
            setEmailVerified(false);  
            setIsVerified(false);       
            setIsDomainVerified(false);  
            setIsEmailUnique(null);    
            setShowTooltip(false);      
            setShowSuccessTooltip(false); 
            setEmailVerificationInProgress(false); 
            setOtpMessage('');        

            sessionStorage.setItem('storedEmail', email);   
            sessionStorage.setItem('EmailVerified', 'false'); 
            sessionStorage.setItem('isVerified', 'false'); 
        }
    }

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

  const handlePasswordFocus = () => {
    setShowPasswordTooltip(true);   
  };
  
  const handlePasswordBlur = () => {
    setShowPasswordTooltip(false);  
  };
  

  // Function to format the timer
const formatTimer = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};


  const handleFirstNameBlur = async () => {
    if (formData.firstName && !otpGenerated) {
      try {
	const response = await axios.post('http://localhost:5001/api/generate-otp');
        const { identifier } = response.data;
        setOtpGenerated(true);  
        setOtpIdentifier(identifier); 
        sessionStorage.setItem('otpGenerated', 'true'); 
        sessionStorage.setItem('otpIdentifier', identifier);  
      } catch (error) {
      }
    }
  };
  
  const handleEmailBlur = async () => {
    setIsTyping(false);
    const { email, firstName } = formData;

    if (email && firstName ) {

      // If email is unchanged and already verified, skip re-verification
      if (email === storedEmail && sessionStorage.getItem('EmailVerified') === 'true') {
        setEmailVerified(true);  
        setIsDomainVerified(true);
        setIsEmailUnique(true);
        setShowSuccessTooltip(true);
        return; // Skip the API call since the email is already verified
  }
      // Check if the email has changed
      if (email !== storedEmail) {
        setShowSuccessTooltip(false);
        setError('');
        setOtpMessage(''); 
        setIsEmailUnique(null); 
      
 
        sessionStorage.setItem('isDomainVerified', 'false');
        sessionStorage.setItem('isEmailUnique', 'null');
        sessionStorage.setItem('EmailVerified', 'false');

      } else if (sessionStorage.getItem('isDomainVerified') === 'true' && sessionStorage.getItem('isEmailUnique') === 'true' && sessionStorage.getItem('EmailVerified') === 'true') {
        setIsDomainVerified(true);
        setIsEmailUnique(true);
        setEmailVerified(true);
        setShowSuccessTooltip(true);
        setShowTooltip(false);
        setEmailVerificationInProgress(false);
        return;
      }

      setEmailVerificationInProgress(true);
      setShowTooltip(false);
      setShowSpinnerTooltip(true);

      try {
        const response = await axios.post('http://localhost:5001/api/verify-email', {
          email,
          firstName,
          identifier: otpIdentifier,
        }, {    validateStatus: function (status) {
          return (status >= 200 && status < 300) || (status >= 400 && status < 500);
        },  
      }
    );

        if (response.status === 200 && response.data.verified) {
          setEmailVerified(true);
          setIsDomainVerified(true);
          setIsEmailUnique(true);
          setShowTooltip(false);
          setShowSuccessTooltip(true); 
          
          sessionStorage.setItem('isDomainVerified', 'true');
          sessionStorage.setItem('isEmailUnique', 'true');
          sessionStorage.setItem('storedEmail', email);
          sessionStorage.setItem('EmailVerified', 'true');
          

        } else if (response.status === 400) { 

          if (response.data.message === 'Invalid email domain') {
          setError('Invalid email domain. Please use a UTD email address.');
          setEmailVerified(false); 
          setIsDomainVerified(false);
          setIsEmailUnique(null); 
          setShowTooltip(true);
          setShowSuccessTooltip(false);
          sessionStorage.setItem('isDomainVerified', 'false');
          sessionStorage.setItem('isEmailUnique', 'null');
          sessionStorage.setItem('EmailVerified', 'false');
          

        } else if (response.data.message === 'Email already exists') {
          setEmailVerified(false);
          setIsDomainVerified(true); 
          setIsEmailUnique(false);
          setShowTooltip(false);
          setShowSuccessTooltip(false);
          sessionStorage.setItem('isDomainVerified', 'true');
          sessionStorage.setItem('isEmailUnique', 'false');
          sessionStorage.setItem('EmailVerified', 'false');
          console.error('Email already exists.');      

        } else {
          setError('Verification failed. Please try again.');
          setEmailVerified(false);
          setShowTooltip(false);
          setShowSuccessTooltip(false);
        }  
      } 
    } catch (error) {
        if (error.request) {
          setError("Failed to communicate with the server. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        setShowTooltip(true);
      } finally {
        setEmailVerificationInProgress(false);
        setShowSpinnerTooltip(false);
      }
  } else if (email === storedEmail && isDomainVerified && isEmailUnique) {
      setShowSuccessTooltip(true);  
    }  
};


  const handleOtpFocus = () => {
    setShowSuccessTooltip(false);  
  };
  
  const handleOtpChange = (e) => {
    setOtp(e.target.value); 
    if (e.target.value.length > 0) {
      setCanResend(false);   
      setShowVerifyButton(true);  
    } else {
      setShowVerifyButton(false);  
  }

    setShowSuccessTooltip(false);  
  };  


  const handleVerifyOtp = async () => {
    setIsVerifying(true);  
    setOtpMessage('');  
    setError('');  
    
    try {
      const response = await axios.post(
        'http://localhost:5001/api/verify-otp',
        { email: formData.email, otp },
        {
          validateStatus: function (status) {
            return (status >= 200 && status < 300) || status === 400;
          },
        }
      );
  
      if (response.status === 200 && response.data.message === 'OTP verified successfully') {
        setIsVerified(true);  
        setEmailVerified(true); 
        setShowSuccessTooltip(true); 
        setShowVerifyButton(false); 
        setError(''); 

        sessionStorage.setItem('EmailVerified', 'true');
        sessionStorage.setItem('storedEmail', formData.email);
        sessionStorage.setItem('isDomainVerified', 'true');
        sessionStorage.setItem('isEmailUnique', 'true');
        sessionStorage.setItem('isVerified', 'true'); 


      } else if (response.status === 400) {
        if (response.data.message === 'Invalid OTP') {
          setError('Invalid OTP. Please try again.');
        } else if (response.data.message === 'OTP has expired') {
          setError('OTP has expired. Please request a new one.');
        } else {
          setError('Verification failed. Please try again.');
        }
        setIsVerified(false);
        setEmailVerified(false);  
        sessionStorage.setItem('isVerified', 'false');   
        sessionStorage.setItem('EmailVerified', 'false');  
        setShowSuccessTooltip(false);  
      }
    } catch (error) {
      // Handle network issues or unexpected server errors
      if (error.request) {
        console.error('No response received:', error.request);
        setError("Failed to communicate with the server. Please try again.");
      } else {
        console.error('Error setting up request:', error.message);
        setError("An unexpected error occurred. Please try again.");
      }
      setIsVerified(false); 
      setShowSuccessTooltip(false); 
    } finally {
      setIsVerifying(false);  
    }
  };
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

        // Check if OTP is verified
    if (!isVerified) {
      setError('Please verify the Email before proceeding.');
      return;
    }

    setError('');
    navigate('/academic-info');
  };

  const handleGetOtp = async () => {
    try {
      setOtpSending(true);  
      const url = 'http://localhost:5001/api/send-prepared-email';
      const response = await axios.post(url, { identifier: otpIdentifier });
      setOtpMessage(response.data.message === 'Email sent successfully' ? 'OTP sent to your email' : response.data.message);
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
        const response = await axios.post('http://localhost:5001/api/prepare-new-otp', { email: formData.email, firstName: formData.firstName  });
        if (response.data.identifier_new) {
          setOtpReuseIdentifier(response.data.identifier_new);
          sessionStorage.setItem('setOtpReuseIdentifier', response.data.identifier_new); 
        }
      } catch (error) {
        console.error('Error preparing new OTP:', error);
      }
    }, 30000);  
  }, [formData.email, formData.firstName]);

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

      const response = await axios.post('http://localhost:5001/api/resend-otp', { identifier_new: reuseIdentifier, email: formData.email, firstName: formData.firstName  });
      
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
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const isPasswordMatch = password === confirmPassword;
    return firstName && lastName && email && password && confirmPassword && isPasswordMatch && isVerified;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const formGroupStyle = {
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: isFormValid() ? '#00BBF0' : '#cccccc',
    border: 'none',
    width: '100%',
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
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#00BBF0',
    cursor: 'pointer',
    padding: '0',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const emailVerifiedStyle = {
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

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    left: '-10px',
    transform: 'translateY(-50%)',
    width: '0',
    height: '0',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '10px solid rgba(153, 153, 153, 0.97)',
  };

  return (
    <Container fluid className="signup-container">
      <div className="signup-logo">
        <img src={RolyncLogo} alt="Rolync Logo" />
      </div>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="d-flex justify-content-center">


          <div className="signup-form">
            <h2 className="signup-welcome-text">Welcome to Rolync</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {otpMessage && <Alert variant={otpMessage === 'OTP sent to your email' ? 'success' : 'danger'}>{otpMessage}</Alert>}
          {!isTyping && isEmailUnique === false && (
          <Alert variant="danger">Email already exists. Please use a different email.</Alert>
          )}

          
            
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFirstName" className="signup-form-group" style={formGroupStyle}>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  className="signup-form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleFirstNameBlur}
                  style={{color: formData.firstName ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '100%'
                  }}

                />
              </Form.Group>

              <Form.Group controlId="formLastName" className="signup-form-group" style={formGroupStyle}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  className="signup-form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{color: formData.lastName ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '100%'
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="signup-form-group position-relative" style={formGroupStyle}>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  className="signup-form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  style={{color: formData.email ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '100%'
                  }}
                />
                {!emailVerificationInProgress && !isDomainVerified && (
                  <span className="signup-note">*Use UTD email address</span>
                )}

                {emailVerificationInProgress && (
                  <div className="spinner-container" style={{ position: 'absolute' }}>
                    <div className="spinner" style={{ position: 'relative', top: '30%', right: '10px', transform: 'translateY(-50%)', width: '20px', height: '20px', border: '2px solid rgba(0, 174, 239, 0.15)', borderTop: '2px solid rgba(0, 174, 239, 0.8)', borderRadius: '50%', animation: 'rotation 1s infinite linear' }}></div>
                    {showSpinnerTooltip && (
                      <div style={tooltipStyle}>
                        <div style={arrowStyle}></div>
                        <p>Verifying domain, please wait</p>
                      </div>
                    )}
                  </div>
                )}

                {emailVerified && (
                  <div style={{ position: 'relativve'}}>
                  <span style={emailVerifiedStyle}>&#10003;</span>
                  {showSuccessTooltip && (
                    <div style={{ ...tooltipStyle, right: '-222px', top: '50%', transform: 'translateY(-50%)',backgroundColor: '#fff',
                      border: '1px solid rgba(153, 153, 153, 0.97)',
                      borderRadius: '4px',
                      padding: '6px',
                      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                      zIndex: 10,
                      width: '205px',
                      fontSize: '14px',
                      lineHeight: '1.5'
                      }}>
                      <div style={arrowStyle}></div>
                      <p style={{ margin: 0 }}>Domain verified successfully.</p>
                    </div>
                  )}
                </div>
                )}

                {showTooltip && (
                  <div style={tooltipStyle}>
                    <div style={arrowStyle}></div>
                    <img src={WarningIcon} alt="Warning Icon" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                    We're sorry. This website is only for UTD students looking for career options in Data Science & Analytics. Use the school's Email address.
                  </div>
                )}
              </Form.Group>

              <Form.Group controlId="formOtp" className="signup-form-group position-relative" style={formGroupStyle}>
                <Form.Control
                  type="text"
                  placeholder="Verify your email address"
                  className="signup-form-control"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  onFocus={handleOtpFocus}
                  style={{  color: otp ? '#000000' : 'rgba(0, 0, 0, 0.5)', 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '100%',
                    paddingRight: '150px' }}  
                />
                <>
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

                  {canResend && !showVerifyButton && !otpSending &&(
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

                  {/* Display Get OTP button if no OTP has been sent yet or after a refresh */}
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
                      <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(0, 174, 239, 0.15)', borderTop: '2px solid rgba(0, 174, 239, 0.8)', borderRadius: '50%', animation: 'rotation 1s infinite linear' }}></div>
                    </div>
                  )}

                {isVerified && showSuccessTooltip && (
                  <div style={{ position: 'relative' }}>
                    <span style={{ ...emailVerifiedStyle, top: '19px', transform: 'translateY(-180%)' }}>&#10003;</span>

                  </div>
                )}


                </>
              </Form.Group>


              <Form.Group controlId="formPassword" className="signup-form-group position-relative" style={formGroupStyle}>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="signup-form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handlePasswordFocus}   
                  onBlur={handlePasswordBlur}  
                  style={{color: formData.password ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '100%',
                   
                  }}
                />
                <span className="signup-show-password" onClick={toggleShowPassword} style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', color: '#00BBF0' }}>
                  {showPassword ? 'Hide' : 'Show'}
                </span>

                  {/* Password Tooltip */}
                {showPasswordTooltip && (
                  <div style={{ position: 'absolute', right: '-220px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#fff', border: '1px solid rgba(153, 153, 153, 0.97)', borderRadius: '4px', padding: '6px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', zIndex: 10, width: '205px', fontSize: '14px', lineHeight: '1.5' }}>
                    <div style={arrowStyle}></div>
                    <p>Password must meet the following criteria:</p>
                    <ul>
                      <li style={{ color: passwordValidation.length ? 'green' : 'red' }}>At least 8 characters long</li>
                      <li style={{ color: passwordValidation.uppercase ? 'green' : 'red' }}>At least one uppercase letter</li>
                      <li style={{ color: passwordValidation.number ? 'green' : 'red' }}>At least one number</li>
                      <li style={{ color: passwordValidation.specialChar ? 'green' : 'red' }}>At least one special character (@$!%*?&)</li>
                    </ul>
                  </div>
                )}

              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="signup-form-group" style={formGroupStyle}>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  className="signup-form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{color: formData.confirmPassword ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    width: '100%'
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={`signup-continue-btn button-with-shadow`}
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

export default SignUp;



