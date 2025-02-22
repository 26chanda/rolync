import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import './Jobs2.css';


const Jobs2 = () => {


  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row>
        <Header />
      </Row>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
  <Row>

    <Col md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        textAlign: 'center',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#fff',
        maxWidth: '600px',
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>Exciting Opportunities Coming Soon!</h3>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px'  , textAlign: "justify"}}>
          We're currently updating our job listings to bring you the best opportunities available. Stay tuned and check back soon for the latest updates. 
          Your next great career move is just around the corner!
        </p>
      
      </div>
    </Col>
  </Row>
</div>
      <Footer />
    </Container>
  )};
  
export default Jobs2;




