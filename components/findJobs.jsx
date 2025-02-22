import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

const FindJobs = ()  => {
  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden'  }}>

      <Row>
        <Header />
      </Row>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', marginTop: '60px' }}>
  <Row style={{ width: '100%', justifyContent: 'center', margin: 0 }}>

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
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden'  
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>Jobs Coming Soon!</h3>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' }}>
          Thank you for your interest in finding the best job opportunities with us. Currently, we don't have any job openings available. However, we're working diligently to bring you exciting new opportunities.
        </p>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' }}>
          Please check back soon for updates on job openings. In the meantime, explore other sections of our website for valuable resources and career guidance to help you prepare for your next big opportunity.
        </p>
      </div>
    </Col>
  </Row>
</div>
      <Footer />
    </Container>
  );
};

export default FindJobs;