import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/cardData.js';

const SearchBar = ({ onToggleHeader }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);  
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const results = data.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (id) => {
    navigate(`/employee-profile/${id}`);
    setSearchTerm('');  
    setSuggestions([]);  
  };

  const handleFocus = () => {
    if (window.innerWidth < 768) {
      setIsExpanded(true);  
      onToggleHeader(false);  
    }
  };

  const handleBlur = () => {
    if (searchTerm === '' && window.innerWidth < 768) {
      setIsExpanded(false);  
      onToggleHeader(true); 
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Container for input and custom search icon */}
      <div style={{
        position: 'relative',
        marginLeft: window.innerWidth < 768 ? (isExpanded ? '-30px' : '75px') : '158px',  
        transition: 'margin-left 0.3s ease, width 0.3s ease', 
      }}>
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search people by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onFocus={handleFocus}  
          onBlur={handleBlur}  
          style={{
            width: window.innerWidth < 768 ? (isExpanded ? '280px' : '150px') : '300px', 
            transition: 'width 0.3s ease',  
            padding: '10px',
            paddingLeft: window.innerWidth < 768 ? '40px' : '40px',  
            borderRadius: '20px',
            border: 'none',
            height: '34px',
            outline: 'none',
            boxShadow: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
          }}
        />
      </div>

      {suggestions.length > 0 && (
 <ul style={{
  listStyle: 'none',
  padding: '0',
  margin: '5px 0 0 0',
  marginLeft: window.innerWidth < 768 ? (isExpanded ? '-30px' : '75px') : '158px',  
  border: '1px solid #ccc',
  borderRadius: '5px',
  position: 'absolute',
  width: window.innerWidth < 768 ? (isExpanded ? '280px' : '150px') : '300px',  
  background: 'white',
  zIndex: 1
}}>
  {suggestions.map(person => (
    <li key={person.id} onClick={() => handleSuggestionClick(person.id)} style={{
      padding: '10px',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    }}>
      <img
        src={person.image}
        alt={person.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/ReadMoreImage/image.png';  
        }}
        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
      />
      <div>
        <strong>{person.name}</strong>
        <p style={{ margin: '0', fontSize: '12px', color: 'gray' }}>{person.position} at {person.company}</p>
      </div>
    </li>
  ))}
</ul>

)}

    </div>
  );
};

export default SearchBar;