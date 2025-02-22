import {  useNavigate } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import './SpecializedRoles.css';
import CardComponent from './CardComponent.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

const SpecializedRoles = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  
  const [isMobile, setIsMobile] = useState(false); 
  const sidebarRef = useRef(null);  
  

 
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);  
  };
  handleResize();  
  window.addEventListener('resize', handleResize); 
  return () => window.removeEventListener('resize', handleResize);  
}, []);


 
useEffect(() => {
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);  
    }
  };
  if (isSidebarOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);  
  };
}, [isSidebarOpen]);


 
  const cardData = [
    {
      id: '670df5f19c36fc726b41621a',
      image: '/ReadMoreImage/Sameer Ranjan.jpg',
      name: 'Sameer Ranjan',
      company: 'Catenate Corp',
      position: 'Chief Technology Officer',
    },
    {
      id: '670df5f19c36fc726b416212',
      image: '/ReadMoreImage/Poorwa Kunwar.jpg',
      name: 'Poorwa Kunwar',
      company: 'Catenate Corp',
      position: 'AI and Data Product Owner',
    },
    {
      id: '670df5f19c36fc726b416206',
      image: 'ReadMoreImage/Mona Mona.jpg',
      name: 'Mona Mona',
      company: 'Google',
      position: 'Gen AI Solution Architect',
    },
    {
      id: '670df5f19c36fc726b416204',
      image: 'ReadMoreImage/Mohammed Wasim.jpg',
      name: 'Mohammed Wasim',
      company: 'Molson Coors Beverage Company',
      position: 'Senior Data Insights Analyst ',
    },
    {
      id: '670df5f19c36fc726b41621e',
      image: '/ReadMoreImage/Shaiba Jhunjhunwala.jpg',
      name: 'Shaiba Jhunjhunwala',
      company: 'Deloitte',
      position: 'Data Consultant ',
    },
    {
      id: '670df5f19c36fc726b4161de',
      image: 'ReadMoreImage/Anshul Jaiswal.jpg',
      name: 'Anshul Jaiswal',
      company: 'McCain',
      position: 'Supply Chain Analyst ',
    },
    
    {
      id: '670df5f19c36fc726b4161d2',
      image: 'ReadMoreImage/Aashna Guhe.jpg',
      name: 'Aashna Guhe',
      company: 'Medium Gaint',
      position: 'Media Operating & Reporting ',
    },
    {
      id: '670df5f19c36fc726b416220',
      image: 'ReadMoreImage/Shawhin Talebi.jpg',
      name: 'Shawhin Tabebi',
      company: 'Shawhin Talebi Ventures LLC',
      position: 'AI Educator & Advisor',
    },
    {
      id: '670df5f19c36fc726b41622a',
      image: 'ReadMoreImage/Sriharshitha Avasarala.jpg',
      name: 'Sriharshitha Avasarala',
      company: 'On-Target Supplies and logistics',
      position: 'AI Specialist',
    },
    {
      id: '670df5f19c36fc726b4161e2',
      image: 'ReadMoreImage/Archie Makwana.jpg',
      name: 'Archie Makwana',
      company: 'Essilor Luxottica',
      position: 'Supply Chain Analyst',
    },
    {
      id: '670df5f19c36fc726b4161f4',
      image: 'ReadMoreImage/Karan Desai.jpg',
      name: 'Karan Desai',
      company: 'The Stem Practice Company',
      position: 'Advanced Technologies Intern',
    },
  
 
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  

  return (
    <Container fluid style={{ padding: 0, backgroundColor: '#F5F5F7', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '0 40px', marginTop:'50px',
      }}>
        <Row>
        {!isMobile && (
        <Col xs={3} style={{ backgroundColor: '#F5F5F7', padding: '20px' }}>
          <div style={{ marginTop: '34px' }}>
             <div style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop:'-10px',
                marginLeft:"-15px"
              }}>
                <div>
            <hr  style={{marginTop:"20px" , marginBottom:"70px"}}></hr>
  <div style={{ fontWeight: 'bold', marginBottom: '28px' , fontSize:"21px" }}>People in different roles</div>
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
        navigate('/data-engineer');
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
    value="Specialized-Roles'"
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
  <hr  style={{marginTop:"92px" , marginBottom:"10px"}}></hr>
</div>
            </div>
            </div>
             
          </Col> )}

          <Col xs={isMobile ? 12 : 9} style={{ paddingLeft: '0'  , marginBottom:"30px"}}>
          {isMobile && !isSidebarOpen && (
  <div className="three-dot-menu" onClick={toggleSidebar}>
    <span style={{ fontSize: '20px', lineHeight: '20px' }}>⋮⋮⋮</span>
  </div>
)}
          <div id='other-carrrrd' style={{ backgroundColor: '#FFFFFF', padding: '20px', marginTop: '43px', marginLeft: '8px', height: '97%' , borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom :"30px" }}>
  {/* Content goes here */}

              <Row>
              <div id='cardother' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '18px' }}>
      {cardData.map(card => (
        <CardComponent
          key={card.id}
          id={card.id}
          image={card.image}
          name={card.name}
          company={card.company}
          position={card.position}
        />
      ))}
    </div>
</Row>

             
<div style={{ textAlign: 'center', marginTop: '20px' }}>
                   </div>
            </div>

            {/* Sidebar for smaller screens */}
            {isSidebarOpen && (
              <div
               ref={sidebarRef}  

                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  height: '100vh',
                  width: '250px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.5)',
                  zIndex: 1000,
                  padding: '20px',
                }}
              >
                <h4 style={{ textAlign: 'left' , fontWeight:"bold" ,marginBottom:"20px"  , fontSize:"17px"}}>People in different roles</h4>
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
                          navigate('/data-engineer');
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
                      value="Specialized-Roles'"
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
                    Specialized Roles
                  </label>
                </div>
              </div>
            )}








          </Col>
        </Row>
      </div>
      <Footer />
    </Container>
  );
};

export default SpecializedRoles;