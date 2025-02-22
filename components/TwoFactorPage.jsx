import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

function TwoFactorPage() {
  const [show2FAForm, setShow2FAForm] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleVerificationCodeChange = (e) => setVerificationCode(e.target.value);

  const handle2FASetup = (e) => {
    e.preventDefault();
 
    setMessage('A verification code has been sent to your email.');
    setShow2FAForm(false); 
  };

  return (
    <Container fluid style={{ padding: '0', backgroundColor: "#F5F5F7", minHeight: '100vh' }}>
      <Row>
        <Header />
      </Row>
      <Col xs={12} style={{ padding: '20px' }}>
        <Row style={{ marginLeft: "-23px", backgroundColor: "#00BBF0", width: "102%", marginRight: "20px", marginTop: "20px", marginBottom: "35px", height: "181px" }}>
          <Col xs={12} style={{ padding: '20px', backgroundColor: "#00BBF0", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderBottom: "0px", height: "100%", width: "100%", marginLeft: "5px" }}>
            <h1 style={{ margin: "20px", marginLeft: "69px", color: "white", fontWeight: "bold", marginTop: "61px", fontSize: "46px", marginBottom: "-10px" }}>
              Two-Factor Authentication (2FA) Setup
            </h1>
          </Col>
        </Row>

        <div style={{ 
          backgroundColor: "#ffffff", 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
          maxWidth: '800px', 
          margin: '0 auto' 
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            Why Two-Factor Authentication (2FA) Matters
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Two-Factor Authentication (2FA) enhances your account security by adding an extra layer of protection. This additional step ensures that even if your password is compromised, unauthorized access to your account remains highly unlikely.
          </p>

          <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '15px' }}>
            How 2FA Works
          </h3>
          <ul style={{ fontSize: '16px', lineHeight: '1.5' }}>
            <li><strong>Standard Login:</strong> Access your account with your username and password.</li>
            <li><strong>Two-Factor Authentication:</strong> After your standard login, you’ll be prompted to provide a second factor for verification, which can be:</li>
            <ul style={{ marginLeft: '20px' }}>
              <li>A code sent to your phone via SMS or an authenticator app like Google Authenticator or Authy.</li>
              <li>A biometric factor, such as a fingerprint or facial recognition.</li>
              <li>A physical security key that you insert into your computer.</li>
            </ul>
          </ul>

          <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '15px' }}>
            Benefits of Enabling 2FA
          </h3>
          <ul style={{ fontSize: '16px', lineHeight: '1.5' }}>
            <li><strong>Enhanced Security:</strong> Even if your password is stolen, the second factor keeps your account secure.</li>
            <li><strong>Phishing Protection:</strong> 2FA helps defend against phishing attacks by requiring an additional verification step.</li>
            <li><strong>Data Protection:</strong> Safeguard sensitive information on Roync, such as career goals and personal details.</li>
          </ul>

          <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '15px' }}>
            Real-World Scenario
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Imagine your password is leaked in a data breach. Without 2FA, an attacker could easily access your Roync account. With 2FA enabled, they would also need your phone or security key, making unauthorized access significantly more difficult.
          </p>

          <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '15px' }}>
            How to Enable 2FA
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            To activate Two-Factor Authentication on your Roync account, navigate to the 'Security' tab in your account settings. For assistance, visit our Help & Support section or contact our support team directly.
          </p>

          {!show2FAForm ? (
            <Button 
              variant="primary" 
              style={{ marginTop: '20px' , backgroundColor:"#00BBF0" , border: 'none', }} 
              onClick={() => setShow2FAForm(true)}
            >
              Set Up Two-Factor Authentication
            </Button>
          ) : (
            <div style={{ 
              backgroundColor: "rgb(213 219 225)", 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
              marginTop: '50px'
            }}>
              <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>
                Verify Your Email for 2FA
              </h2>
              <Form onSubmit={handle2FASetup}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email} 
                    onChange={handleEmailChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCode">
                  <Form.Label>Verification Code</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter the verification code" 
                    value={verificationCode} 
                    onChange={handleVerificationCodeChange} 
                    required 
                  />
                </Form.Group>
                <Button 
  variant="primary" 
  type="submit" 
  style={{ 
    marginTop: '20px', 
    backgroundColor: "#00BBF0", 
    border: 'none',  
    borderRadius: '4px',  
    color: 'white' 
  }}
>
  Verify and Set Up 2FA
</Button>
              </Form>
              {message && (
                <p style={{ marginTop: '20px', color: 'green' }}>
                  {message}
                </p>
              )}
            </div>
          )}
        </div>
      </Col>
      <Footer />
    </Container>
  );
}

export default TwoFactorPage;