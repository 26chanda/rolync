import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AboutUs.css';
import Footer from './Footer';
import Header from './Header';
const AboutUs = () => {


  return (
    <Container fluid className="container-fluid">
    <Row >
        <Header />
    </Row>
      <Col xs={12} style={{ padding: '20px' , marginTop:'50px' }}>
        <Row className="wide-row">
          <Col xs={12} className="roshan">
            <h3 className="card-km">About Us</h3>
            <p style={{ textAlign: 'justify' }}>
            At Rolync, we're revolutionizing the job search process for students at the University of Texas at Dallas (UTD) who are passionate about Data Science, Analytics, and Artificial Intelligence. Our platform empowers students with all the crucial information they need before applying for any position, helping them strategically align their skills and interests with the right roles.

We're committed to increasing students' chances of success by providing tailored resources, from detailed company insights to personalized job recommendations. Our goal is to be a supportive partner in their journey, offering mentorship, training, and guidance to prepare them for the competitive job market.

As we continue to evolve, we'll be adding more tools and services to ensure every student is equipped with the knowledge and confidence to thrive in their chosen field. Join us in reshaping the future of career exploration and job placement for aspiring professionals in Data Science, Analytics, and AI.
            </p>
          </Col>
        </Row>
        
        <Row className="wide-row">
          <Col xs={12} className="roshan">
            <h3 style={{ textAlign: 'center' }} className="title">Our Mission</h3>
            <p style={{ textAlign:"justify", marginBottom: '20px', marginTop: '33px' }}> 
            At Rolync, we empower individuals with tailored resources and personalized guidance to strategically align their skills with the right career opportunities. We are dedicated to providing data-driven insights, mentorship, and training to enhance students' chances of success in their interested fields!
            </p>
          </Col>
        </Row>
        <Row className="wide-row">
          <Col xs={12} className="roshan">
            <h3 style={{ textAlign: 'center'}} className="title">Our Vision</h3>
            <p  style={{ textAlign:"justify"  ,marginBottom: '20px',  marginTop: '33px' }}> 
            We want to become the leading platform for career exploration, offering comprehensive tools and resources that enable individuals from various fields to confidently navigate their professional paths. We aim to foster an ecosystem where every person can thrive, equipped with the knowledge and support they need to achieve their goals.
                       </p>
          </Col>
        </Row>
        <Row className="wide-row" style={{ marginBottom: '7px' }}>
          <Col xs={12} className="roshan">
            <h3 style={{ textAlign: 'center' }} className="title">Our Values</h3>
            <ul style={{ textAlign: 'justify', marginTop: '33px', listStyleType: 'decimal', paddingLeft: '20px' }}>
  <li><strong>Empowerment:</strong> We believe in empowering individuals by providing the tools, insights, and resources necessary to make informed career decisions. Whether through mentorship, training, or personalized guidance, we enable people to take control of their professional journeys.</li>
  <li><strong>Tailored Support:</strong> We are committed to offering personalized, data-driven solutions that align with each individual's unique skills, interests, and career goals. By focusing on customization, we ensure that every user receives relevant and actionable insights for success.</li>
  <li><strong>Innovation:</strong> At Rolync, we continuously evolve by integrating cutting-edge technologies and methodologies into our platform. Our goal is to redefine the career exploration process, ensuring users have access to the latest trends, data, and industry insights.</li>
  <li><strong>Trust and Collaboration:</strong> Building trust is at the core of our relationships. We foster an environment where individuals feel confident in their choices, supported by transparent information and collaboration with experts and peers alike.</li>
  <li><strong>Inclusivity:</strong> We believe in creating opportunities for individuals from all fields and backgrounds. By offering resources for a wide range of industries, we aim to support diverse talents and help them thrive in their chosen paths.</li>
  <li><strong>Excellence:</strong> We strive for excellence in everything we do, from the quality of our platform to the insights we provide. Our commitment is to deliver the highest standards of service, ensuring that users are well-prepared for the competitive job market.</li>
</ul>
        
          </Col>
        </Row>
       
      </Col>
      <Footer />
    </Container>
  );
};

export default AboutUs;