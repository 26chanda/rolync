
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import './DataAnalyst.css';
import CardComponent from './CardComponent.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

const DataAnalyst = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); 
  const sidebarRef = useRef(null); 


useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); 
  };
  handleResize(); // 
  window.addEventListener('resize', handleResize); 
  return () => window.removeEventListener('resize', handleResize); 
}, []);



useEffect(() => {
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false); // Close the sidebar if click is outside
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
      id: '670df5f19c36fc726b416222',
      image: 'ReadMoreImage/Shirin Sehgal.jpg', 
      name: 'Shirin Sehgal',
      company: 'Vistra Corp',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b4161f0',
      image: 'ReadMoreImage/Gautam Iyer.jpg', 
      name: 'Gautam Iyer',
      company: 'Richemont',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b416216',
      image: '/ReadMoreImage/Ryan Turley.jpg', 
      name: 'Ryan Turley',
      company: 'JLL',
      position: 'Sr. Data Quality Analyst',
    },
    {
      id: '670df5f19c36fc726b416236',
      image: '/ReadMoreImage/Venkata Naga Sai Kumar Bysani.jpg', 
      name: 'VENKATA SAI KUMAR',
      company: 'BCBS Of SC',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b4161dc',
      image: 'ReadMoreImage/Anjali Joshi.jpg', 
      name: 'Anjali Joshi',
      company: 'ABB',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b41622e',
      image: '/ReadMoreImage/Sumer Pariani.jpg', 
      name: 'Sumer Pariani',
      company: 'Microsoft',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b4161fa',
      image: 'ReadMoreImage/Madhav Bhatia.jpg', 
      name: 'Madhav Bhatia',
      company: 'Latent View Analytics',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b41623a',
      image: 'ReadMoreImage/Yashasvi Sharma.jpg', 
      name: 'Yashasvi Sharma',
      company: 'Airbus',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b41622c',
      image: 'ReadMoreImage/Suchi Jain.jpg', 
      name: 'Suchi Jain',
      company: 'HEXStream',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b41620c',
      image: 'ReadMoreImage/Nipun Chauhan.jpg', 
      name: 'Nipun Chauhan',
      company: 'ACEP',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b416232',
      image: 'ReadMoreImage/Swathi Sridhar.jpg', 
      name: 'Swathi Sridhar',
      company: 'Bunge',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b416230',
      image: 'ReadMoreImage/Swapnil Banduke.jpg', 
      name: 'Swapnil Banduke ',
      company: 'Eversana',
      position: 'Data Analyst',
    },
    {
      id: '670df5f19c36fc726b41620a',
      image: 'ReadMoreImage/Neha Mukund Ramanujam Lnu.jpg', 
      name: 'Neha Mukund Ramanujam',
      company: 'Christus health',
      position: 'Data Analyst',
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
          
            <div style={{ marginTop: '34px' , marginBottom:"49px"}}>
            
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

          <Col xs={isMobile ? 12 : 9} style={{ paddingLeft: '0'  , marginBottom:"30px"}}>
          <div  id='Anacarrrrd' style={{ backgroundColor: '#FFFFFF', padding: '20px', marginTop: '43px', marginLeft: '8px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom :"30px" }}>

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

export default DataAnalyst;