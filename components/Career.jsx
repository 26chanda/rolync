import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

const Career = () => {
  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh', display: 'flex', flexDirection: 'column',  overflowX: 'hidden'  }}>

      <Row >
      <div style={{ width: '100%', padding: 0, margin: 0 }}>
          <Header />
        </div>
      </Row>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', marginTop: '40px' }}>
        <Row style={{ width: '100%', justifyContent: 'center', margin: 0  , height:"450px"}}>
         
          <Col md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              textAlign: 'center',
              padding: '30px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              backgroundColor: '#fff',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              height:"400px",
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              overflow: 'hidden'  
            }}>
              <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>Your Career Journey Starts Here</h3>
              <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' }}>
                At Rolync, we are dedicated to empowering your career growth by connecting you with the best opportunities and mentors. Whether you're seeking a new job, an internship, or career guidance, we are here to support you every step of the way.
              </p>
              <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' }}>
                Currently, we don't have any job openings available, but we're continuously updating our platform. Please check back soon, and in the meantime, explore other resources on Rolync to prepare for your next big opportunity.
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </Container>
  );
};

export default Career;