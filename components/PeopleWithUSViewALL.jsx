import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardComponent from './CardComponent.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import cardData from '../data/cardData.js';  

const PeopleWithUSViewALL = () => {

  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh' }}>
      <Row>
        <Header />
      </Row>
      <div style={{ padding: '40px' }}>
        <Row>
          {/* Center the column using mx-auto and limit the span on larger screens */}
          <Col xs={12} md={10} lg={8} className="mx-auto" style={{ paddingLeft: '0', marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '20px', 
              height: 'auto', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              marginTop: '50px', 
              textAlign: "center",
              maxWidth: '1250px', 
              width: '100%' 
            }}>
              <h3 style={{ textAlign: 'center', marginBottom: '25px' }}>VIEW ALL PROFILES</h3>
              <Row style={{marginTop:"0px"}}>
                {cardData.map(card => (
                  <Col 
                  style={{marginTop:"-18px"}}
                    key={card.id} 
                    xs={12} sm={6} md={4} // 1 card on extra small, 2 on small, and 3 on medium and up
                    className="d-flex justify-content-center mb-4"
                  >
                    <CardComponent
                      id={card.id}
                      image={card.image}
                      name={card.name}
                      company={card.company}
                      position={card.position}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </Container>
  );
};

export default PeopleWithUSViewALL;