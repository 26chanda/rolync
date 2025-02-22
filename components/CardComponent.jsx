import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CardComponent = ({ id, image, name, company, position }) => {
  const navigate = useNavigate(); 
  const [screenSize, setScreenSize] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set responsive styles based on screen size
  const getFontSize = () => {
    if (screenSize <= 576) {
      return {
        nameFontSize: '19px',
        companyFontSize: '17px',
        positionFontSize: '14px',
      };
    } else if (screenSize > 576 && screenSize <= 992) {
      return {
        nameFontSize: '20px',
        companyFontSize: '17px',
        positionFontSize: '16px',
      };
    } else {
      return {
        nameFontSize: '22px',
        companyFontSize: '18px',
        positionFontSize: '15px',
      };
    }
  };

  const fontSize = getFontSize();

  const cardStyles = {
    backgroundColor: '#ffffff', 
    width: '290px',
    maxWidth: '290px', 
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    overflow: 'hidden',
    margin: '10px auto', 
    height: "408px", 
  };

  const imageStyles = {
    width: '100%',
    height: '225px', 
    objectFit: 'cover',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    objectPosition: 'top',
  };

  const contentStyles = {
    padding: '20px',
    height: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonStyles = {
    marginTop: '10px',
    borderColor: '#28a745',
    color: '#28a745',
    alignSelf: 'center',
  };

  const handleNavigation = () => {
    console.log('Navigating to profile with id:', id); 
    navigate(`/employee-profile/${id}`);
  };

  return (
    <div style={cardStyles}>
      <img src={image} alt={name} style={imageStyles} />
      <div style={contentStyles}> 
        <div 
          style={{ 
            fontWeight: 'bold', 
            marginTop: '5px',  
            fontSize: fontSize.nameFontSize, 
            whiteSpace: 'nowrap',
            textAlign: 'justify',
          }}
        >
          {name}
        </div>
        <div 
          style={{  
            fontSize: fontSize.companyFontSize,  
            whiteSpace: 'nowrap', 
            textAlign: 'justify',
          }}
        >
          {company}
        </div>
        <div style={{ fontSize: fontSize.positionFontSize }}>{position}</div>
        <Button
          variant="outline-success"
          style={buttonStyles}
          onClick={handleNavigation}
        >
          Read more
        </Button>
      </div>
    </div>
  );
};

export default CardComponent;