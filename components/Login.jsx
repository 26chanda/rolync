import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      try {
 
        const decryptedPassword = CryptoJS.AES.decrypt(savedFormData.password, 'secret_key').toString(CryptoJS.enc.Utf8);
  
        setFormData({ email: savedFormData.email, password: decryptedPassword });
      } catch (error) {
        console.error('Error decrypting password:', error);
        localStorage.removeItem('formData'); 
      }
    }
  }, []);
  
  
  const handleLogin = async (e) => {

    e.preventDefault();
    
    try {
      
      const response = await axios.post(
        'http://localhost:5001/api/auth/login',
        { email: formData.email, password: formData.password },
        { withCredentials: true }  
      );

      if (response.status === 200) {
        const { token } = response.data;

        localStorage.setItem('token', token);
        const encryptedPassword = CryptoJS.AES.encrypt(formData.password, 'secret_key').toString();
        localStorage.setItem('formData', JSON.stringify({ email: formData.email, password: encryptedPassword }));

        navigate('/home');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this website!',
        url: window.location.href,
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="login-left-side">
          <video 
            src="/images-1/Website mock.mp4" type="video/mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{
              width: '103%', 
              height: '386px', 
              objectFit: 'fill',
              marginTop: '25px', 
              marginLeft: '40px',
              backgroundColor: 'transparent' 
            }}
          />

        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <div className="login-form">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="login-welcome-text">Welcome to Rolync</h2>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon 
                  icon={faShareAlt} 
                  size="1x" 
                  className="share-icon" 
                  color='#007bff'
                  onClick={handleShareClick} 
                  style={{ opacity: 0.7, position: 'relative', top: '-17px', marginRight: '6px' }} 
                />
                <span 
                  style={{ cursor: 'pointer', opacity: 0.7, color:'#007bff', position: 'relative', top: '-17px', marginRight: '-3px' }} 
                  onClick={handleShareClick}
                >
                  Share
                </span>
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail">
                <Form.Control 
                  type="email" 
                  placeholder="Enter Your UTD email address" 
                  className="login-form-control" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{color: formData.email ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="position-relative">
                <Form.Control 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="login-form-control" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{color: formData.password ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(153, 153, 153, 0.97)',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    height: '40px',
                    marginTop: '15px'
                  }}
                />
                <span className="login-show-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                className="login-btn button-with-shadow" 
                style={{ width: '100%' }} 
              >
                LOG IN
              </Button>
              
              <p className="login-forgot-password">
                Forgot Password? 
                <span 
                  style={{ color: '#007bff', cursor: 'pointer' }} 
                  onClick={() => navigate('/forget-pass')}
                >
                  Click Here
                </span>
              </p>
              <Button 
                variant="success" 
                type="button" 
                className="signup-btn button-with-shadow" 
                 
                onClick={() => navigate('/signup')}
              >
                SIGN UP
              </Button>
              <p className="login-signup-note">*Use UTD email address</p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;



