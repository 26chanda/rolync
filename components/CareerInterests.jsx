import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import './CareerInterests.css';
import { usStates } from '../utils/usStates'; 
import RolyncLogo from '../icons/ROLYNC1.png'; 

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '40px',
    border: '1px solid rgba(153, 153, 153, 0.97)',
    borderRadius: '4px',
    marginBottom: '20px',
    paddingLeft: '1px',
    backgroundColor: '#FFFFFF',
  }),
  valueContainer: (provided) => ({
    ...provided,
    flexWrap: 'wrap',
    overflow: 'auto',
    maxHeight: '80px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(0, 0, 0, 0.5)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000000',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#00BBF0',
    color: '#FFFFFF',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#FFFFFF',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#FFFFFF',
    ':hover': {
      backgroundColor: '#00BBF0',
      color: '#FFFFFF',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'rgba(153, 153, 153, 0.97)',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
};

function CareerInterests() {
  const [roleOptions, setRoleOptions] = useState([
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Data Engineer', label: 'Data Engineer' },
    { value: 'Data Analyst', label: 'Data Analyst' },
    { value: 'Business Analyst', label: 'Business Analyst' },
    { value: 'ML Engineer/ML Ops', label: 'ML Engineer/ML Ops' },
    { value: 'Product Manager', label: 'Product Manager' },
  ]);
  const [departmentOptions, setdepartmentOptions] = useState([
    { value: 'Information Technology (IT)', label: 'Information Technology (IT)' },
    { value: 'Human Resources (HR)', label: 'Human Resources (HR)' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Aviation', label: 'Aviation' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Research and Development (R&D)', label: 'Research and Development (R&D)' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Procurement', label: 'Procurement' },
    { value: 'Product Management', label: 'Product Management' },
    { value: 'Business Development', label: 'Business Development' },
    { value: 'Corporate Strategy', label: 'Corporate Strategy' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Compliance and Risk Management', label: 'Compliance and Risk Management' },
    { value: 'Health and Safety', label: 'Health and Safety' },
    { value: 'Public Relations (PR)', label: 'Public Relations (PR)' },
    { value: 'Training and Development', label: 'Training and Development' },
    { value: 'Corporate Communications', label: 'Corporate Communications' },
    { value: 'Supply Chain', label: 'Supply Chain' },
    { value: 'Manufacturing', label: 'Manufacturing' },
  ]);
  const [skillsOptions, setSkillsOptions] = useState([
    { value: 'SQL', label: 'SQL' },
    { value: 'Python Programming', label: 'Python Programming' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'Tableau', label: 'Tableau' },
    { value: 'NLP', label: 'NLP' },
    { value: 'Deep Learning', label: 'Deep Learning' },
  ]);

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobLocations, setJobLocations] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('careerInterests'));
    if (savedFormData) {
      setSelectedRoles(savedFormData.selectedRoles || []);
      setSelectedDepartments(savedFormData.selectedDepartments || []);
      setSelectedSkills(savedFormData.selectedSkills || []);
      setJobLocations(savedFormData.jobLocations || []);
    }
  }, []);

  const saveFormDataToLocalStorage = (updatedFormData) => {
    const formData = {
      selectedRoles,
      selectedDepartments,
      selectedSkills,
      jobLocations,
      ...updatedFormData,
    };
    localStorage.setItem('careerInterests', JSON.stringify(formData));
  };

  const handleChangeRoles = (value) => {
    setSelectedRoles(value);
    saveFormDataToLocalStorage({ selectedRoles: value });

    if (value.length > 0 && selectedDepartments.length > 0 && selectedSkills.length > 0 && jobLocations.length > 0) {
      setError('');
    }
  };

  const handleChangeDepartments = (value) => {
    setSelectedDepartments(value);
    saveFormDataToLocalStorage({ selectedDepartments: value });

    if (selectedRoles.length > 0 && value.length > 0 && selectedSkills.length > 0 && jobLocations.length > 0) {
      setError('');
    }
  };

  const handleChangeSkills = (value) => {
    setSelectedSkills(value);
    saveFormDataToLocalStorage({ selectedSkills: value });

    if (selectedRoles.length > 0 && selectedDepartments.length > 0 && value.length > 0 && jobLocations.length > 0) {
      setError('');
    }
  };

  const handleJobLocationsChange = (selectedOptions) => {
    setJobLocations(selectedOptions);
    saveFormDataToLocalStorage({ jobLocations: selectedOptions });

    if (selectedRoles.length > 0 && selectedDepartments.length > 0 && selectedSkills.length > 0 && selectedOptions.length > 0) {
      setError('');
    }
  };

  const handleCreateOption = (inputValue, setOptions, setSelected) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions((prev) => [...prev, newOption]);
    setSelected((prev) => [...prev, newOption]);
    saveFormDataToLocalStorage();

    if (selectedRoles.length > 0 && selectedDepartments.length > 0 && selectedSkills.length > 0 && jobLocations.length > 0) {
      setError('');
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (selectedRoles.length > 0 && selectedDepartments.length > 0 && selectedSkills.length > 0 && jobLocations.length > 0) {
      navigate('/previous-experience');
    } else {
      setError('Please fill in all required fields to continue.');
    }
  };

  const isFormValid = selectedRoles.length > 0 && selectedDepartments.length > 0 && selectedSkills.length > 0 && jobLocations.length > 0;

  return (
    <Container fluid className="career-interests-container">
       <div className="career-interests-logo">
        <img src={RolyncLogo} alt="Rolync Logo" />
      </div>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="d-flex justify-content-center">
          <div className="career-interests-form">
            <h2 className="welcome-text">Career Interests</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleContinue}>
              <Form.Group controlId="formJobRoles">
                <CreatableSelect
                  isMulti
                  options={roleOptions}
                  value={selectedRoles}
                  onChange={handleChangeRoles}
                  onCreateOption={(inputValue) => handleCreateOption(inputValue, setRoleOptions, setSelectedRoles)}
                  styles={customStyles}
                  placeholder="Preferred Job Roles"
                />
              </Form.Group>

              <Form.Group controlId="formDepartments">
                <CreatableSelect
                  isMulti
                  options={departmentOptions}
                  value={selectedDepartments}
                  onChange={handleChangeDepartments}
                  onCreateOption={(inputValue) => handleCreateOption(inputValue, setdepartmentOptions, setSelectedDepartments)}
                  styles={customStyles}
                  placeholder="Departments of Interest"
                />
              </Form.Group>

              <Form.Group controlId="formSkills">
                <CreatableSelect
                  isMulti
                  options={skillsOptions}
                  value={selectedSkills}
                  onChange={handleChangeSkills}
                  onCreateOption={(inputValue) => handleCreateOption(inputValue, setSkillsOptions, setSelectedSkills)}
                  styles={customStyles}
                  placeholder="Skills"
                />
              </Form.Group>

              <Form.Group controlId="formJobLocations">
                <CreatableSelect
                  isMulti
                  options={usStates}  
                  value={jobLocations}  
                  onChange={handleJobLocationsChange} 
                  styles={customStyles}  
                  placeholder="Preferred Job Locations"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={`continue-btn button-with-shadow ${isFormValid ? 'valid' : 'invalid'}`}
                block
                style={{ opacity: isFormValid ? 1 : 0.7 }}
              >
                Continue
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CareerInterests;
