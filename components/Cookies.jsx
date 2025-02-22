import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

import Footer from './Footer.jsx';
import Header from './Header.jsx';

const Cookies = () => {


  return (
    <Container fluid style={{ padding: '0', backgroundColor: "#F5F5F7", minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Row>
        <Header />
      </Row>
      <Col xs={12} style={{ padding: '20px' }}>
        <Row style={{ marginLeft: "-23px", backgroundColor: "##4a4e52", width: "102%", marginRight: "20px", marginTop: "20px", marginBottom: "35px", height: "181px" }}>
          <Col xs={12} style={{ padding: '20px', backgroundColor: "#4a4e52", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderBottom: "0px", height: "100%", width: "115%", marginLeft: "5px" }}>
            <h1 style={{ margin: "20px",marginLeft:"69px", color: "white",  fontWeight: "bold", marginTop: "61px",fontSize:"46px",  marginBottom: "-10px", textAlign: 'center'}}>COOKIES</h1>
        
          </Col>
        </Row>
        
         <Col style={{textAlign:"left" , width:"57%" ,marginLeft:"23%" ,marginRight:"20%"}}>
        
         <h4  style={{ textAlign:"left" , fontSize:"26px" , fontWeight:"bold", marginBottom:"21px" , }}>Empowering Your Future, One Cookie at a Time </h4>
         <p  style={{fontSize:"21px"  ,textAlign:"left" }}>At Rolync, we believe in transparency and your right to a tailored experience. Cookies play a key role in making that happen. This policy explains what cookies are, how we use them, and how you can customize your preferences.</p>
          <h3 style={{fontStyle :"bold" ,fontWeight:"700" , fontSize:"37px" , textAlign:"left" , marginTop:"43px"}}>What Are Cookies?</h3>
        <p style={{fontSize:"21px"  , }}  >Cookies are small data files stored on your device when you visit a website. They serve as a memory for the site, enabling it to recognize you and your preferences during future visits. Whether it's your login details, preferred language, or display settings, cookies save you time and provide a smoother experience.</p>
        
         <h3 style={{fontStyle :"bold" ,fontWeight:"700" , fontSize:"37px" , textAlign:"left" , marginTop:"43px"}}>How We Use Cookies</h3>
         <p style={{fontSize:"21px"  , }}  >Our cookies are designed to:</p>
         <p style={{fontSize:"21px"  , }}  >Enhance Your Journey: Ensure that our platform runs smoothly, providing a user-friendly experience that's personalized to your needs.</p>
         <p style={{fontSize:"21px"  , }}  >Remember Your Preferences: Store your settings and choices so that each visit feels like it's tailored just for you.</p>
         <p style={{fontSize:"21px"  , }}  >Optimize Performance: Track and analyze your interactions with our site to identify areas where we can improve and ensure that Rolync is always at its best.</p>
         <p style={{fontSize:"21px"  , }}  >Deliver Tailored Content: Offer recommendations and content that align with your unique interests, career goals, and aspirations.</p>
         


         <h3 style={{fontStyle :"bold" ,fontWeight:"700" , fontSize:"37px" , textAlign:"left" , marginTop:"43px"}}>Types of Cookies We Use</h3>
         <p style={{fontSize:"21px"  , }}  >Essential Cookies: These are critical for the basic operation of our website. Without them, essential services, like logging in and navigating pages, would be compromised.</p>
         <p style={{fontSize:"21px"  , }}  >Performance Cookies: These cookies gather information about how you use Rolync. By analyzing this data, we can enhance site performance and offer a better experience.</p>
         <p style={{fontSize:"21px"  , }}  >Functionality Cookies: These allow us to remember choices you've made, such as your username, language, or region, to provide a more personalized experience.</p>
         <p style={{fontSize:"21px"  , }}  >Targeting/Advertising Cookies: These are used to present you with content and advertisements that are relevant to your interests. They also help us measure the effectiveness of our campaigns.</p>
        
        
         <h3 style={{fontStyle :"bold" ,fontWeight:"700" , fontSize:"37px" , textAlign:"left" , marginTop:"43px"}}>Managing Your Cookie Preferences</h3>
         <p style={{fontSize:"21px"  , }}  >You're in control. Here's how you can manage your cookies:</p>
         <p style={{fontSize:"21px"  , }}  >Adjust Your Browser Settings: Most browsers let you block or delete cookies. Visit your browser's help section for detailed instructions on how to manage these settings.</p>
         <p style={{fontSize:"21px"  , }}  >Opt-Out of Targeted Advertising: You can control how your data is used for advertising by visiting platforms like the Network Advertising Initiative (NAI) or the Digital Advertising Alliance (DAA).</p>
         <p style={{fontSize:"19px"  , }}  >Please note that disabling certain cookies might affect the functionality of our website and limit access to some features.</p>
        
  


 
         <h3 style={{fontStyle :"bold" ,fontWeight:"700" , fontSize:"37px" , textAlign:"left" , marginTop:"43px"}}>Your Privacy Matters</h3>
         <p style={{fontSize:"21px"  , }}  >At Rolync, your privacy is a top priority. Rest assured, any data collected through cookies is handled with the utmost care and is used solely to improve your experience on our platform.</p>

         <h3 style={{fontStyle :"bold" ,fontWeight:"700" , fontSize:"37px" , textAlign:"left" , marginTop:"43px"}}>Changes to This Policy</h3>
         <p style={{fontSize:"21px"  , }}  >We strive to keep our Cookies Policy up to date with the latest practices and regulations. Any changes will be posted here, and we'll notify you if there are significant updates.</p>
         
        

         </Col>

              </Col>
              
      <Footer />
    </Container>
  );
};

export default Cookies;

