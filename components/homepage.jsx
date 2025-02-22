import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './homepage.css';
import CardComponent from './CardComponent';
import CarouselComponent from './CarouselComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer.jsx';
import axios from 'axios';
import Header from './Header.jsx';
import { useDispatch } from 'react-redux';  
import { updateProfilePicture } from '../actions/profileActions';

const cardData = [
  { id: '670df5f19c36fc726b41621a', name: 'Sameer Ranjan', company: 'Catenate', role: 'Chief Technology Officer', profilePic: 'ReadMoreImage/Sameer Ranjan.jpg' },
  { id: '670df5f19c36fc726b4161ec', name: 'Erick Castaneda', company: 'Walmart', role: 'Data Scientist', profilePic: '/ReadMoreImage/Erick Castaneda.jpg' },
  { id: '670df5f19c36fc726b4161e0', name: 'Antara Das', company: 'Cognizant', role: 'Technical Architect Manager', profilePic: '/ReadMoreImage/Antara Das.jpg' },
  { id: '670df5f19c36fc726b416212', name: 'Poorwa Kunwar', company: 'Catenate Corp', role: 'AI and Data Product Owner', profilePic: '/ReadMoreImage/Poorwa Kunwar.jpg' },
  { id: '670df5f19c36fc726b416216', name: 'Ryan Turley', company: 'JLL', role: 'Sr. Data Quality Analyst', profilePic: '/ReadMoreImage/Ryan Turley.jpg' },
  { id: '670df5f19c36fc726b4161ea', name: 'Disha Sirsat', company: 'Jefferson Dental', role: 'Business System Analyst', profilePic: '/ReadMoreImage/Disha Sirsat.jpg' },
  { id: '670df5f19c36fc726b41622e', name: 'Sumer Pariani', company: 'Microsoft', role: 'Data Analyst', profilePic: '/ReadMoreImage/Sumer Pariani.jpg' },
  { id: '670df5f19c36fc726b41621e', name: 'Shaiba Jhunjhunwala', company: 'Deloitte', role: 'Data Consultant', profilePic: '/ReadMoreImage/Shaiba Jhunjhunwala.jpg' },
  { id: '670df5f19c36fc726b416236', name: 'VENKATA SAI KUMAR', company: 'Blue Cross Blue Shield', role: 'Data Analyst', profilePic: '/ReadMoreImage/Venkata Naga Sai Kumar Bysani.jpg' },
  
];

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const HomePage = () => {
  const [name, setName] = useState(''); 
  const [profilePicture, setProfilePicture] = useState(''); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  useEffect(() => {
  }, []);


const handleQuestionnaireClick = () => {
  navigate('/questionnaire-page');
};

const handleJobClick = () => {
  navigate('/find-jobs');
};
  const cardChunks = chunkArray(cardData, 3);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/userprofile/personal-info/', {
          withCredentials: true,
        });
        const { profilePicture, name } = response.data;
        
        setName(name || 'User');
        const finalProfilePictureUrl = profilePicture.startsWith('https') ? profilePicture : `https://rolync.com/${profilePicture}`;
        setProfilePicture(finalProfilePictureUrl);
        
        // Update profile picture in Redux
        dispatch(updateProfilePicture(finalProfilePictureUrl));
      } catch (err) {
      }
    };
  
    fetchProfileData();  
  }, [dispatch]);
  

  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh', display: 'flex', flexDirection: 'column',  overflowX: 'hidden' }}>
      <Header />
      <div style={{ padding: '0 40px', marginTop:'50px',
      }}>
        <Row>
          <Col xs={3} style={{ backgroundColor: '#F5F5F7', padding: '20px' }}>
           
           <div style={{ backgroundColor: '#FFFFFF', marginTop: '6px',padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center', height: '300px', marginBottom: '30px' }}>
              <img 
                src={profilePicture && profilePicture !== '' ? profilePicture : '/ReadMoreImage/profileiconpng.png'} 
                alt="Profile"
                style={{ width: '204px', height: '204px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }}
                onError={(e) => { 
                  e.target.src = '/ReadMoreImage/profileiconpng.png'; 
                }}
              />

              <div style={{ fontWeight: 'bold', marginTop: '10px', fontSize: '24px' }}>
              {name || 'User'} 
                </div>
            </div> 

            <div style={{ marginTop: '30px' }}>
            
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                paddingTop: '50px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop:'-10px',
                height: '549px'
              }}>
                <div>

                <hr  style={{marginTop:"-15px" , marginBottom:"70px"}}></hr>
  <div style={{ fontWeight: 'bold', marginBottom: '28px' , fontSize:"21px", }}>People In Different Roles</div>
  
  <div style={{ marginBottom: '17px' }}>
  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
  <input
    type="radio"
    name="role"
    value="Data Scientist"
    onChange={() => {
      setTimeout(() => {
        navigate('/Data-Scientist');
      }, 100); 
    }}
    style={{
      marginRight: '10px',
      accentColor: '#d1d1d1', 
      width: '16px', 
      height: '16px', 
      cursor: 'pointer',
    }}
  />
  Data Scientist
</label>

</div>

<div style={{ marginBottom: '17px' }}>
<label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
  <input
    type="radio"
    name="role"
    value="Data Analyst"
    onChange={() => {
      setTimeout(() => {
        navigate('/data-analyst');
      }, 100); 
    }}
    style={{
      marginRight: '10px',
      accentColor: '#d1d1d1', 
      width: '16px', 
      height: '16px', 
      cursor: 'pointer',
    }}
  />
  Data Analyst
</label>

</div>

<div style={{ marginBottom: '17px' }}>
<label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
  <input
    type="radio"
    name="role"
    value="Data Engineer"
    onChange={() => {
      setTimeout(() => {
        navigate('/data_engineer');
      }, 100); 
    }}
    style={{
      marginRight: '10px',
      accentColor: '#d1d1d1', 
      width: '16px', 
      height: '16px', 
      cursor: 'pointer',
    }}
  />
  Data Engineer
</label>
</div>

<div style={{ marginBottom: '17px' }}>
  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
  <input
  type="radio"
  name="role"
  value="Business Analyst"
  onChange={() => {
    setTimeout(() => {
      navigate('/Business-Analyst');
    }, 100); 
  }}
  style={{
    marginRight: '10px',
    accentColor: '#d1d1d1',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  }}
/>

    Business Analyst
  </label>
</div>

  <div style={{ marginBottom: '17px' }}>
  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
  <input
    type="radio"
    name="role"
    value="Specialized-Roles"
    onChange={() => {
      setTimeout(() => {
        navigate('/specialized-roles');
      }, 100); 
    }}
    style={{
      marginRight: '10px',
      accentColor: '#d1d1d1', 
      width: '16px', 
      height: '16px', 
      cursor: 'pointer',
    }}
  />
  Sepecialized Roles
</label>

  </div>
  <hr  style={{marginTop:"150px" , marginBottom:"10px"}}></hr>

              </div>
            </div>
            </div>
            
          </Col>
          <Col xs={9} style={{ padding: '20px' }}>
          <div style={{
  backgroundColor: '#FFFFFF',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  height: '300px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  marginBottom: '30px',
  backgroundImage: 'url("/images/website banner.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  marginTop: '6px'
}}>
     <Button
      variant="success"
      style={{
        backgroundColor: '#28a745',
        border: 'none',
        position: 'absolute',
        bottom: '20px',
        left: '40px',
        fontSize: '20px',
        padding: '15px 40px'
      }}
      onClick={handleQuestionnaireClick}
    >
      Get Matched Now!
    </Button>
</div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '25px', borderRadius: '8px', marginTop: '-10px' ,height: '550px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>People With Us</h3>
              <Row>   
            
                 <CarouselComponent cardChunks={cardChunks} CardComponent={CardComponent} />{/* End of carousel section */}
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <a href="/view-all" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>
                    View All Profiles <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </Row>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '15px' }}>
  <h3 style={{ marginBottom: '15px' }}>Companies They Work At</h3>
  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '6px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
    <img src="images/amazon.png" alt="Amazon" style={{ width: '140px', paddingTop: '12px' }} />
    <img src="images/microsoft.png" alt="Microsoft" style={{ width: '140px',height: '150px'  }} />
    <img src="images/google.png" alt="Google" style={{ width: '140px' }} />
    <img src="images/Walmart-Logo.png" alt="Walmart" style={{ width: '180px', height: '140px' }} />
  </div>
  <div style={{ textAlign: 'right', marginTop: '5px' }}>
    <a href="/company-view" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>
      View All <i className="fas fa-arrow-right"></i>
    </a>
  </div>
</div>
            <div
  style={{
    backgroundImage: 'url("/images/coming-soon2.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '2px',
    color: '#FFFFFF',
    height: '300px',
  }}
>
  <div
    style={{
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'end',
      marginTop: '211px',
      marginRight: '-24px',
    }}
  >
 <Button
      variant="success"
      style={{ backgroundColor: '#28a745', border: 'none' }}
      onClick={handleJobClick}
    >
      Find me the best jobs
    </Button>

  </div>
</div>

          </Col>
        </Row>
      </div>
       <Footer />
    </Container>
  );
};


export default HomePage;

