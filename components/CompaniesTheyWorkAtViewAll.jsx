import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import './CompaniesTheyWorkAtViewAll.css';

const CompaniesTheyWorkViewAll = () => {
  const companyLogos = [
    { src: 'images/amazon.png', alt: 'Amazon', width: '140px'},
    { src: 'images/microsoft.png', alt: 'Microsoft', width: '140px' },
    { src: 'images/google.png', alt: 'Google', width: '140px' },
    { src: 'images/Walmart-Logo.png', alt: 'Walmart', width: '160px' },
    { src: 'images/Deloitte-Logo.png', alt: 'Deloitte', width: '140px', height: '71px' },
    { src: 'images/altium.png', alt: 'Altium', width: '140px' },
    { src: 'images/landmark.png', alt: 'Landmark', width: '140px' },
    { src: 'images/catenate.jpeg', alt: 'Catenate', width: '140px', },
    { src: 'images/lumen.webp', alt: 'Lumen', width: '140px' },
    { src: 'images/amtrac.png', alt: 'Amtrak', width: '140px', },
    { src: 'images/cognizant.jpeg', alt: 'Cognizant', width: '100px', height: '90px' },
    { src: 'images/abb.png', alt: 'ABB', width: '140px', height: '76px'  },
    { src: 'images/airbus.png', alt: 'Airbus', width: '140px', height: '56px'  },
    { src: 'images/vistra.png', alt: 'Vistra', width: '140px', height: '116px' },
    { src: 'images/dental.png', alt: 'Dental', width: '140px', height: '96px' },
    { src: 'images/bcbc.webp', alt: 'BCBC', width: '140px' },
    { src: 'images/Ford-Logo.png', alt: 'Ford', width: '140px' },
    { src: 'images/mscain.png', alt: 'McCain', width: '149px'},
    { src: 'images/kellonava.png', alt: 'Kellanova', width: '152px', height: '61px' },
    { src: 'images/logo-richemont-horizontal-1.jpg', alt: 'RICHMONT', width: '160px' },
    { src: 'images/dede.png', alt: 'DEDE', width: '149px', height: '70px' },
    { src: 'images/nvidia.png', alt: 'Nvidia', width: '160px' },
    { src: 'images/nabors.jpeg', alt: 'Nabors', width: '120px', height: '91px' },
    { src: 'images/Fedex-logo.png', alt: 'Fedex', width: '149px', height: '70px' },
    { src: 'images/Molson-Coors-Preferred-Logo-ON-WHITE-01-1.png', alt: 'Molson', width: '160px' },
    { src: 'images/cintra_logo.jpeg', alt: 'Cintra', width: '160px' },
    { src: 'images/bunge.png', alt: 'Bunge', width: '149px',  },
    { src: 'images/jll.png', alt: 'JLL', width: '160px' },
    { src: 'images/uts.jpg', alt: 'UTS', width: '131px', height: '79px' },

    // Add more company logos as needed
  ];

  return (
    <Container fluid className="companies-view-all-container">
    {/* Header Section */}
    <Row>
      <Header />
    </Row>

    {/* Main Content Section */}
    <div className="companies-content">
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <div className="companies-box">
            <h3 className="companies-title">VIEW ALL COMPANIES</h3>
            <div className="companies-logo-grid">
              {companyLogos.map((company, index) => (
                <div key={index} className="company-logo-item">
                  <img
                    src={company.src}
                    alt={company.alt}
                    style={{ width: company.width, height: company.height || 'auto', objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default CompaniesTheyWorkViewAll;