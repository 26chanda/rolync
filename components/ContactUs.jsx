import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Footer from './Footer.jsx';
import Header from './Header.jsx';

const ContactUs = () => {


  return (
    <Container 
      fluid 
      style={{ 
        padding: 0, 
        backgroundColor: '#F5F5F7', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowX: 'hidden' 
      }}
    >
      <Row>
        <Header />
      </Row>
      <Col xs={12} style={{ padding: '20px' }}>
        <Row 
          style={{ 
            marginLeft: "-23px", 
            backgroundColor: "#4a4e52", 
            width: '103%',
            marginTop: "-15px", 
            marginBottom: "35px", 
            height: "181px" 
          }}
        >
            <h3 
              style={{ 
                margin: "20px", 
                color: "white", 
                fontSize: "30px", 
                fontWeight: "bold", 
                marginTop: "30px", 
                marginBottom: "-10px",
                textAlign: 'center', 

              }}
            >
              How can we help you Today
            </h3>
            <p 
              style={{ 
                textAlign: 'center', 
                color: "white", 
                marginTop: "34px", 
                fontSize: "18px" 
              }}
            >
              Don't hesitate to reach out if you have any inquiries. We're committed to helping you and making your experience as smooth as possible.
            </p>

        </Row>

        <Row 
          style={{ 
            marginLeft: "35px", 
            marginBottom: "-11px", 
            width: "94%", 
            marginRight: "20px", 
            marginTop: "-10px", 
            backgroundColor: "white", 
            boxShadow: "5px 4px 8px rgba(0, 0, 0, 0.1)", 
            padding: '20px',
            borderRadius: '4px'
          }}
        >
          <Col xs={10} style={{ marginTop: "25px" }}>
            <Row>
              <Col md={6} style={{ paddingRight: '40px' }}>
                <h4 
                  style={{ 
                    marginBottom: "20px", 
                    fontWeight: "bold", 
                    marginLeft: "9%", 
                    fontSize: "34px" 
                  }}
                >
                  Contact US
                </h4>
                <p 
                  style={{ 
                    marginLeft: "auto", 
                    marginRight: "auto", 
                    marginTop: "30px", 
                    width: "300%", 
                    textAlign: 'justify' 
                  }}
                >
                  Your inquiries matter to us! Contact us today, and we'll be sure to respond quickly. For career advice, our knowledgeable consultants are eager to assist you in shaping your future.
                </p>
                <p 
                  style={{ 
                    marginLeft: "auto", 
                    marginRight: "auto", 
                    marginTop: "60px", 
                    fontSize: "20px" 
                  }}
                >
                  Email:&nbsp;&nbsp;
                  <a 
                    href="info.rolync@gmail.com" 
                    style={{ color: '#00BBF0', textDecoration: 'none' }}
                  >
                    info.rolync@gmail.com
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Footer />
    </Container>
  );
};

export default ContactUs;
