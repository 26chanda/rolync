import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';

const RolesNewPage = () => {
  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden'  }}>
      <Row>
        <Header />
      </Row>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', marginTop: '100px', marginBottom:"80px" }}>
        <Row style={{ width: '100%', justifyContent: 'center', margin: 0  , height:"300px"}}>
          {/* Centered Container for Message */}
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
              overflow: 'hidden'  // Ensure no scrollbars within the box
            }}>
              <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>Roles Coming Soon!</h3>
              <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' }}>
                We appreciate your interest in exploring new roles with us. While we don't have any roles available at the moment, we are continuously working to bring new and exciting opportunities your way.
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </Container>
  );
};

export default RolesNewPage;