import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HelpCenter.css'; 
import Footer from './Footer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faStar } from '@fortawesome/free-regular-svg-icons';
import { faPhoneVolume, faBookOpen, faUsers } from '@fortawesome/free-solid-svg-icons';
import Header from './Header.jsx';

const HelpCenter = () => {
  const navigate = useNavigate();
 
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Row */}
      <Header />

      <Container fluid className="help-center-container" style={{ flex: '1' }}>
        <Row>
          <Col xs={9} style={{ padding: '20px' }}>
            <div className="centered-content" style={{
                backgroundColor: '#4a4e52',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                height: '230px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                marginBottom: '30px',
                marginLeft: '-50px',  // Remove the negative margin
                marginTop: '15px',
                width:"150%",
            }}>
              <h1 className="header" style={{  marginTop:"88px" ,fontWeight:"bold", color: 'white', textAlign: 'center'}}>HOW CAN WE HELP YOU?</h1>
            </div>

            {/* Content Cards */}
            <Row style={{ display: 'flex', backgroundColor: "white" , borderRadius: '8px', padding: '20px', marginTop:"39px", marginBottom:"10px", justifyContent: 'center', marginLeft:"170px", marginRight:"-229px" }}>
              <Col xs={4} style={{ padding: '10px' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} onClick={() => navigate('/profile-one')}>
                  <FontAwesomeIcon icon={faUser} style={{ color: "black", fontSize: '60px', opacity: '0.6' }} />
                  <h3 className="card-title" style={{ marginTop: '10px' }}>PROFILE</h3>
                </div>
              </Col>

              <Col xs={4} style={{ padding: '10px' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }} onClick={() => navigate('/contact-us')}>
                  <FontAwesomeIcon icon={faPhoneVolume} style={{ color: "black", fontSize: '60px', opacity: '0.6' }} />
                  <h3 className="card-title" style={{ marginTop: '10px' }}>SUPPORT</h3>
                </div>
              </Col>

              <Col xs={4} style={{ padding: '10px' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FontAwesomeIcon icon={faEnvelope} style={{ color: "black", fontSize: '60px', opacity: '0.6' }} />
                  <h3 className="card-title" style={{ marginTop: '10px' }}>ALERTS</h3>
                </div>
              </Col>

              {/* Additional cards */}
              <Col xs={4} style={{ padding: '10px' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop :"20px"
                }} onClick={() => navigate('/faq')}>
                  <FontAwesomeIcon icon={faBookOpen} style={{ color: "black", fontSize: '60px', opacity: '0.6' }} />
                  <h3 className="card-title" style={{ marginTop: '10px' }}>FAQ</h3>
                </div>
              </Col>

              <Col xs={4} style={{ padding: '10px' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: "20px"
                }}>
                  <FontAwesomeIcon icon={faStar} style={{ color: "black", fontSize: '60px', opacity: '0.6' }} />
                  <h3 className="card-title" style={{ marginTop: '10px' }}>RATINGS</h3>
                </div>
              </Col>

              <Col xs={4} style={{ padding: '10px' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop:"20px"
                }}>
                  <FontAwesomeIcon icon={faUsers} style={{ color: "black", fontSize: '60px', opacity: '0.6' }} />
                  <h3 className="card-title" style={{ marginTop: '10px' }}>COMPANY</h3>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Footer should be below the content and take full width */}
      <Footer />
    </div>
  );
};

export default HelpCenter;
