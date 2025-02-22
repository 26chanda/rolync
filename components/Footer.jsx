import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';  
import { faLinkedin, faInstagram} from '@fortawesome/free-brands-svg-icons'; 

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ 
      backgroundColor: '#000', 
      color: '#FFFFFF', 
      padding: '20px 0', 
      textAlign: 'center', 
      width: '100vw', 
      bottom: 0,
    }}>
      <Row>
        <Col xs={12} className="mb-3">
          {/* Social Media Icons */}
          <div>
            <a href="https://www.linkedin.com/company/rolync/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', marginRight: '15px' }}>
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://www.instagram.com/rolync_1?igsh=eTQxN3lybzRndzBs" target="_blank" rel="noopener noreferrer" style={{ color: 'white', marginRight: '15px' }}>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </Col>

        <Col xs={12} className="mb-3">
          {/* Navigation Links */}
          <div>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/Career')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Careers</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/privacy')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Privacy Statement</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/terms')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Terms of Use</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/contact-us')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Contact Us</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/cookies')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Cookies</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/faq')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>FAQ</span>
          </div>
        </Col>

        <Col xs={12} className="mb-3">
          {/* Footer Links */}
          <div>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/home')} 
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Home</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/company-view')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Companies</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/about-us')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>About Us</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/roles')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Roles</span>
            <span className="mx-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/blogs')}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Blogs</span>
          </div>
        </Col>

        <Col xs={12}>
        <p>
          <span role="img" aria-label="Copyright">©️</span> 2024 Rolync. All Rights Reserved. |&nbsp;
          <a href="mailto:info.rolync@gmail.com" style={{ color: 'white', textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
            info.rolync@gmail.com
       </a>
       </p>
      </Col>
      </Row>
    </footer>
  );
};

export default Footer;