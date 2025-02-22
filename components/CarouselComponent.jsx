import React, { useState, useEffect } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarouselComponent = ({ cardChunks, CardComponent }) => {
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 576) {
        setVisibleCards(1); 
      } else if (window.innerWidth < 768) {
        setVisibleCards(2); 
      } else {
        setVisibleCards(3); 
      }
    };

    updateVisibleCards(); 

    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Helper function to create chunks of cards based on the number of visible cards
  const createCardChunks = (cards, size) => {
    const chunks = [];
    for (let i = 0; i < cards.length; i += size) {
      chunks.push(cards.slice(i, i + size));
    }
    return chunks;
  };

  const dynamicCardChunks = createCardChunks(cardChunks.flat(), visibleCards);

  return (
    <Carousel
      interval={3000}
      prevIcon={
        <FaChevronLeft
          size={50}
          style={{
            color: '#000',
            position: 'absolute',
            left: '-30px',
            top: '46%',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '17px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 1)',
            zIndex: '1000',
          }}
        />
      }
      nextIcon={
        <FaChevronRight
          size={50}
          style={{
            color: '#000',
            position: 'absolute',
            right: '-30px',
            top: '46%',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '17px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 1)',
            zIndex: '1000',
          }}
        />
      }
    >
      {dynamicCardChunks.map((chunk, chunkIndex) => (
        <Carousel.Item key={chunkIndex}>
          <Row className="justify-content-center">
            {chunk.map((card) => (
              <Col key={card.id} xs={12} md={6} lg={4}> 
                <CardComponent
                  id={card.id}
                  image={card.profilePic}
                  name={card.name}
                  company={card.company}
                  position={card.role}
                />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;