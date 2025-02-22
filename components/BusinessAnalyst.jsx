import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import './BusinessAnalyst.css';
import CardComponent from './CardComponent.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

const Business_Analyst = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); 
  const sidebarRef = useRef(null); 

  // Check if the screen size is mobile
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); 
  };
  handleResize(); 
  window.addEventListener('resize', handleResize); 
  return () => window.removeEventListener('resize', handleResize); 
}, []);



// Close the sidebar if clicked outside
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
      id: '670df5f19c36fc726b416202',
      image: 'ReadMoreImage/Manoj Gudala.jpg', 
      name: 'Manoj Gudala',
      company: 'Kellanova',
      position: 'Business Intelligence Analyst',
    },
    {
      id: '670df5f19c36fc726b4161d5',
      image: 'ReadMoreImage/Aasish Tammana.jpg', 
      name: 'Aasish Tammana',
      company: 'Altium ',
      position: 'Business Intelligence Analyst',
    },
    {
      id: '670df5f19c36fc726b4161ea',
      image: '/ReadMoreImage/Disha Sirsat.jpg', 
      name: 'Disha Sirsat',
      company:'Jefferson Dental' ,
      position: 'Business System Analyst',
    },
    {
      id: '670df5f19c36fc726b416228',
      image: 'ReadMoreImage/Shukla Shanthakumara.jpg', 
      name:'Shukla Shanthakumara',
      company:'NVIDIA Corporation ' ,
      position: 'Business System Analyst',
    },
    {
      id: '670df5f19c36fc726b4161e8',
      image: 'ReadMoreImage/Devashish Kedar.jpg', 
      name: 'Devashish Kedar',
      company:'Ford' ,
      position: 'Business System Analyst',
    },
    {
      id: '670df5f19c36fc726b4161e6',
      image: 'ReadMoreImage/Asmita Shetty.jpg', 
      name: 'Asmita Shetty',
      company: 'Fortrea',
      position: 'Business Analyst',
    },

    {
      id: '670df5f19c36fc726b416238',
      image: 'ReadMoreImage/Vinal Jain.jpg', 
      name: 'Vinal Jain',
      company: 'Celebal technology',
      position: 'Business Intelligence Analyst',
    },
    {
      id: '670df5f19c36fc726b41620e',
      image: 'ReadMoreImage/Niral Shah.jpg', 
      name: 'Niral Shah',
      company: 'Globe Life Insurance',
      position: 'Business Analyst',
    },

    {
      id: '670df5f19c36fc726b41621c',
      image: 'ReadMoreImage/Santhosh Sekar.jpg',
      name: 'Santhosh Sekar',
      company: 'Amazon',
      position: 'Business Intelligence Engineer',
    },
    {
      id: '670df5f19c36fc726b4161d9',
      image: 'ReadMoreImage/Akash Navneeth.jpg', 
      name: 'Akash Navneeth',
      company: 'Ericsson',
      position: 'Business Intelligence Analyst',
    },
    {
      id: '670df5f19c36fc726b416226',
      image: 'ReadMoreImage/Shubham Ralli.jpg', 
      name: 'Shubham Ralli',
      company: 'University of Texas at Dallas',
      position: 'Business Intelligence Analyst',
    },
    {
      id: '670df5f19c36fc726b416214',
      image: 'ReadMoreImage/Raul Dhruva.jpg', 
      name: 'Raul Dhruva',
      company: 'Splunk',
      position: 'Business Intelligence Analyst',
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
      accentColor: '#d1d1d1', // Light color for radio button
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
  <hr  style={{marginTop:"92px" , marginBottom:"10px"}}></hr>

              </div>
            </div>
            </div>
          </Col>
        )}
          <Col xs={isMobile ? 12 : 9}   style={{ paddingLeft: '0'  , marginBottom:"30px"}}>
          <div   id='Businesscarrrrd'   style={{ backgroundColor: '#FFFFFF', padding: '20px', marginTop: '43px', marginLeft: '8px', height: '97%' , borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom :"30px" }}>

              <Row>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '18px' }}>
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


            {isMobile && !isSidebarOpen && (
  <div className="three-dot-menu" onClick={toggleSidebar}>
    <span style={{ fontSize: '20px', lineHeight: '20px' }}>⋮⋮⋮</span>
  </div>
)}  
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

export default Business_Analyst;