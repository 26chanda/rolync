import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

const Blogs = () => {
  

  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden'  }}>
 <Row >
        <Header />
    </Row>


<div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  padding: '40px', 
  height: '70vh' ,
  flex: 1
}}>
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
        <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>No Content to Display Yet</h3>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px', textAlign: "justify" }}>
          Our blog is currently under construction, but exciting articles are on the way! Please check back soon to explore fresh insights, tips, and stories. 
          We're working hard to bring you content that inspires and informs.
        </p>
      </div>
    </Col>
  </Row>
</div>

      
      <Footer />
    </Container>
  );
};

export default Blogs;