import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Modal, Button } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import { useSelector, useDispatch } from 'react-redux';  
import { updateProfilePicture } from '../actions/profileActions';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleHamburgerClick = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  const handleLogout = () => {
    setShowModal(true); 
  };

  const handleLogoutFromAllDevices = async () => {
    try {
      await axios.post('/api/logout-from-all-devices', {}, {
        withCredentials: true, 
      });

      localStorage.removeItem('token');
      localStorage.removeItem('formData');
      navigate('/login');
    } catch (error) {
    
    }
  };

  const handleSingleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('formData');
    navigate('/login'); 
  };
  
  const profilePicture = useSelector((state) => state.profile.profilePicture);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!profilePicture) { 
        try {
          const response = await axios.get('/api/userprofile/personal-info/', {
            withCredentials: true,
          });
          const { profilePicture } = response.data;
          const finalProfilePictureUrl = profilePicture.startsWith('http') ? profilePicture : `https://rolync.com${profilePicture}`;
          
          dispatch(updateProfilePicture(finalProfilePictureUrl));  
        } catch (err) {
        }
      }
    };

    fetchProfilePicture();
  }, [dispatch, profilePicture]);

  return (
    <>
      <Row
        style={{
          backgroundColor: '#000',
          position: 'fixed',
          top: 0,
          width: '100vw', // Full viewport width
          zIndex: 1000,
          margin: 0,  // No margin to avoid overflow
          padding: 0,  // No padding
          left: 0,
          height: '57px'
        }}
      >
        <Col
          xs={2}
          style={{
            color: '#FFFFFF',
            textAlign: 'center',
            cursor: 'pointer',
            paddingLeft: '40px',
            fontSize: '24px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => navigate('/home')}
        >
          {/* Hamburger Icon for Small Screens */}
          <div className="d-block d-md-none" style={{ marginRight: '10px', marginLeft: '-20px' }}>
            <FontAwesomeIcon
              icon={faBars}
              style={{ color: '#fff', cursor: 'pointer' }}
              onClick={handleHamburgerClick}
            />
          </div>
        
          ROLYNC
        </Col>

        <Col
          xs={7}
          style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
        >
          <div style={{ position: 'relative', width: '45%' }}>

            <SearchBar />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#ccc',
                marginLeft: '148px',
              }}
            />
          </div>
        </Col>

        <Col
          xs={3}
          className="headerup"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            color: '#FFFFFF',
            alignItems: 'center',
            paddingLeft: '0px',
          }}
        >
          <div className="d-none d-md-flex" style={{ marginRight: 'auto' }}>
            <div
              className="underline-on-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 20px',
                cursor: 'pointer',
                color: '#FFFFFF',
                textDecoration: 'none',
              }}
              onClick={() => navigate('/home')}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              HOME
            </div>
            <div
              className="underline-on-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 20px',
                cursor: 'pointer',
                color: '#FFFFFF',
                textDecoration: 'none',
              }}
              onClick={() => navigate('/company-view')}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              COMPANIES
            </div>
            <div
              className="underline-on-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 20px',
                cursor: 'pointer',
                color: '#FFFFFF',
                textDecoration: 'none',
              }}
              onClick={() => navigate('/roles')}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              ROLES
            </div>
            <div
              className="underline-on-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 20px',
                cursor: 'pointer',
                color: '#FFFFFF',
                textDecoration: 'none',
              }}
              onClick={() => navigate('/blogs')}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              BLOGS
            </div>
          </div>

          {/* Profile Image */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              marginLeft: '20px',
            }}
          >
            
            <img
              src={profilePicture && profilePicture !== '' ? profilePicture : '/ReadMoreImage/profileiconpng.png'}
              alt="Profile"
              style={{ width: '24.5px', height: '24.5px', borderRadius: '50%', cursor: 'pointer', marginBottom: '2px' }}
              onError={(e) => { 
                e.target.src = '/ReadMoreImage/profileiconpng.png'; 
              }}
              onClick={handleProfileClick}
            />

            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '30px',
                  right: '0',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ddd',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  zIndex: 1000,
                  width: '200px',
                  padding: '10px',
                }}
              >
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  <li
                    style={{ padding: '10px', cursor: 'pointer', fontSize: '16px', color: '#333' }}
                    onClick={() => navigate('/profile-one')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    My Profile
                  </li>
                  <li
                    style={{ padding: '10px', cursor: 'pointer', fontSize: '16px', color: '#333' }}
                    onClick={() => navigate('/contact-us')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    Contact Us
                  </li>
                  <li
                    style={{ padding: '10px', cursor: 'pointer', fontSize: '16px', color: '#333' }}
                    onClick={() => navigate('/accountSet')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    Account Settings
                  </li>
                  <li
                    style={{ padding: '10px', cursor: 'pointer', fontSize: '16px', color: '#333' }}
                    onClick={handleLogout}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    Sign Out
                  </li>

                  <li
                    style={{ padding: '10px', cursor: 'pointer', fontSize: '16px', color: '#333' }}
                    onClick={() => navigate('/help-center')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    Help Center
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Col>

        {/* Hamburger Menu Dropdown for Small Screens */}
        {showHamburgerMenu && (
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '0',
              backgroundColor: '#000',
              width: '100%',
              padding: '10px 0',
              zIndex: 1000,
            }}
          >
            <ul style={{ listStyle: 'none', padding: '0', margin: '0', color: '#fff', textAlign: 'center' }}>
              <li style={{ padding: '10px 0' }} onClick={() => navigate('/home')}>
                HOME
              </li>
              <li style={{ padding: '10px 0' }} onClick={() => navigate('/company-view')}>
                COMPANIES
              </li>
              <li style={{ padding: '10px 0' }} onClick={() => navigate('/roles')}>
                ROLES
              </li>
              <li style={{ padding: '10px 0' }} onClick={() => navigate('/blogs')}>
                BLOGS
              </li>
            </ul>
          </div>
        )}
      </Row>

      {/* Logout Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to log out from all devices or just this session?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSingleLogout}>
            No, just this session
          </Button>
          <Button variant="primary" onClick={handleLogoutFromAllDevices} style={{ backgroundColor: '#00BBF0' }}>
            Yes, log me out from all devices
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
