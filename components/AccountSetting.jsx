import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import axios from 'axios';

const AccountSetting = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('account-security'); 
  const [showModal, setShowModal] = useState(false);

  const handleEnable2FA = () => {
    navigate('/two-factor-auth'); 
  };

  const handleLinkClick = (section) => {
    if (section === 'logout') {
      handleLogout();
    } else if (section === 'profile-information') {
      navigate('/profile-one'); 
    } else if (section === 'help-support') {
      navigate('/help-center'); 
    } else if (section === 'faq') {
      navigate('/faq'); 
    } else {
      setActiveSection(section); 
    }
  };

  const handleLogout = () => {
    setShowModal(true); 
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
      console.error('Error logging out from all devices:', error);
    }
  };

  const handleSingleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('formData');
    navigate('/login'); 
  };

  return (
    <>
      <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', height: '100vh' }}>
        <Row>
          <Header />
        </Row>
        <div style={{ padding: '40px', marginLeft: '20px', marginRight: '20px', marginTop: '54px' }}>
          <Row>
            <Col xs={3} style={{ backgroundColor: '#F5F5F7', padding: '20px', marginTop: '-16px', borderRadius: '8px' , }}>
              <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc', padding: '20px'  ,  borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <h1 style={{ fontSize: '35px', fontFamily: 'Arial, sans-serif', marginBottom: '20px'  }}>
                  Account Settings
                </h1>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['profile-information', 'account-security', 'privacy-setting'].map((section) => (
                    <li key={section} style={{ padding: '10px 0', cursor: 'pointer' }}>
                      <span
                        style={{ textDecoration: 'none', color: 'black', fontSize: '18px', fontFamily: 'Arial, sans-serif', transition: 'text-decoration 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        onClick={() => handleLinkClick(section)}
                      >
                        {section.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                      </span>
                    </li>
                  ))}
                  <li style={{ padding: '10px 0', cursor: 'pointer' }}>
                    <p
                      style={{ margin: 0, color: 'black', fontSize: '18px', fontFamily: 'Arial, sans-serif' }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      onClick={() => handleLinkClick('help-support')}
                    >
                      Help & Support
                    </p>
                  </li>
                  <li style={{ padding: '10px 0', cursor: 'pointer' }}>
                    <p
                      style={{ margin: 0, color: 'black', fontSize: '18px', fontFamily: 'Arial, sans-serif' }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      onClick={() => handleLinkClick('faq')}
                    >
                      FAQ
                    </p>
                  </li>

                  <hr />
                  <li style={{ padding: '10px 0', cursor: 'pointer' }}>
                    <p
                      style={{ margin: 0, color: 'black', fontSize: '18px', fontFamily: 'Arial, sans-serif' }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col xs={9} style={{ paddingLeft: '0' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', marginLeft: '30px', height: '97.5%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

                {/* Account Security */}
                {activeSection === 'account-security' && (
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ textAlign: 'left', marginBottom: '25px', marginTop: '-16px' }}>Account Security</h3>
                    <p style={{ fontSize: "18px" }}>
                      Your privacy is a top priority at Roync. Here, you can customize who can see your information, how your data is shared, and how you wish to be contacted. Take control of your experience by setting your preferences.
                    </p>
                    {/* Add Account Security content here */}
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ textAlign: 'left', marginBottom: '15px' }}>Change Password</h4>
                      <p style={{ fontSize: "16px" }}>
                        It's important to keep your account secure. You can change your password regularly to protect your account.
                      </p>
                      <button
                        onClick={() => navigate('/change-password')}
                        style={{
                          padding: "5px 8px",
                          fontSize: "16px",
                          backgroundColor: "#00BBF0",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginTop: "10px",
                          width:"147px",
                        }}
                      >
                        Change Password
                      </button>
                    </div>

                    {/* Two-factor authentication setup */}
                    <div style={{ marginTop: '40px' }}>
                      <h4 style={{ textAlign: 'left', marginBottom: '15px' }}>Two-Factor Authentication (2FA)</h4>
                      <p style={{ fontSize: "16px" }}>
                        Add an extra layer of security to your account by enabling Two-Factor Authentication (2FA).
                      </p>
                      <button
                        onClick={handleEnable2FA}
                        style={{
                          padding: "5px 8px",
                          fontSize: "16px",
                          backgroundColor: "#00BBF0",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginTop: "10px",
                          width:"147px",
                          
                        }}
                      >
                        Set Up 2FA
                      </button>
                    </div>
                  </div>
                )}
                {/* Add other sections here */}

              </div>
            </Col>
          </Row>
        </div>
        <Row>
          
          <Footer />
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to log out from all devices or just this session?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSingleLogout}>
            No, just this session
          </Button>
          <Button variant="primary" onClick={handleLogoutFromAllDevices} style={{ backgroundColor: '#00BBF0' }}>
            Yes, log me out from all devices
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
  );
};

export default AccountSetting;



