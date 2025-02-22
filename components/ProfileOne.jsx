import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Container, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from '../actions/profileActions'; 


const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);   
  const [modalMessage, setModalMessage] = useState('');   

const [showPopup, setShowPopup] = useState(false);
const [showDropdown, setShowDropdown] = useState(false); 
const fileInputRef = useRef(null);
const [activeSection, setActiveSection] = useState('personal-info');
const [imageType, setImageType] = useState('profile');


const [isMatchesTooltipVisible, setMatchesTooltipVisible] = useState(false);
const [isFavoritesTooltipVisible, setFavoritesTooltipVisible] = useState(false);

const dispatch = useDispatch(); 

const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    location: '',
    gender: '',
    profilePicture: 'https://via.placeholder.com/150',   
    backgroundImage: 'https://via.placeholder.com/1500x200', 
    });
    
const [academicInfo, setAcademicInfo] = useState({
    degreeProgram: '',
    major: '',
    graduationDate: '',
    previousDegree: '',
    previousMajor:''
    });

const [careerInterests, setCareerInterests] = useState({
    jobRoles: [],
    departments: [],
    skills: [],
    preferredLocations: [],
    }); 

  // Temporary state for displaying comma-separated strings
const [jobRolesInput, setJobRolesInput] = useState('');
const [departmentsInput, setDepartmentsInput] = useState('');
const [skillsInput, setSkillsInput] = useState('');
const [preferredLocationsInput, setPreferredLocationsInput] = useState('');    

const [previousExperience, setPreviousExperience] = useState({
    experience: '',
    companyName: '',
    employmentTitle: '',
    department: [],
  });  

const [additionalInformation, setAdditionalInformation] = useState({
    linkedin: '',
    portfolio: '',
    hobbies: '',
  });  

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
  
      const fetchPersonalInfo = async () => {
          try {
            // Fetch personal info only
            const response = await axios.get('/api/userprofile/personal-info/', {
              withCredentials: true,
            });

            console.log('Backend response:', response.data);
  
            const { name, email, phone, dob, location, gender, profilePicture, backgroundImage  } = response.data;

            // If 'dob' is not in MM/DD/YYYY already, format it using JavaScript's Date methods
            const formatDate = (dob) => {
              const date = new Date(dob);
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const year = date.getFullYear();
              return `${month}/${day}/${year}`;
            };

            setPersonalInfo({
              name: name || '',
              email: email || '',
              phone: phone || '',
              dob: dob ? formatDate(dob) : '',
              location: location || '',
              gender: gender || '',
              profilePicture: profilePicture || '/ReadMoreImage/profileiconpng.png',

              backgroundImage: backgroundImage || 'https://via.placeholder.com/1500x200',   
            });

            const finalProfilePictureUrl = profilePicture.startsWith('https') ? profilePicture : `https://rolync.com/${profilePicture}`;
            
            dispatch(updateProfilePicture(finalProfilePictureUrl));
            setLoading(false);
          } catch (err) {
            setError('Failed to fetch personal info');
            setLoading(false);
          }
      };
  
      fetchPersonalInfo();
  }, [dispatch]);  

useEffect(() => {
  
    const fetchSectionData = async () => {
      try {
        setLoading(true);
        switch (activeSection) {
          case 'academic-info':
            const academicResponse = await axios.get('/api/userprofile/academic-info', {
              withCredentials: true,
            });
            const { degreeProgram, major, graduationDate, previousDegree, previousMajor } = academicResponse.data;
            setAcademicInfo({
              degreeProgram: degreeProgram || '',
              major: major || '',
              graduationDate: graduationDate || '',
              previousDegree: previousDegree || '',
              previousMajor: previousMajor || '',
            });
            break;

          case 'career-interest':
            const careerResponse = await axios.get('/api/userprofile/career-interests', {
              withCredentials: true,
            });
            const { preferredJobRoles, departmentOfInterest, skills, preferredJobLocations } = careerResponse.data;
            setCareerInterests({
              jobRoles: preferredJobRoles || [],
              departments: departmentOfInterest || [],
              skills: skills || [],
              preferredLocations: preferredJobLocations || [],
            });

             // Set the inputs to comma-separated strings for display
             setJobRolesInput(preferredJobRoles.join(', '));
             setDepartmentsInput(departmentOfInterest.join(', '));
             setSkillsInput(skills);
             setPreferredLocationsInput(preferredJobLocations.join(', '));
            break;

          case 'previous-experience':
            try {
              const experienceResponse = await axios.get('/api/userprofile/previous-experience', {
                withCredentials: true,
              });
          
              if (experienceResponse.data.length > 0) {
                const { experience, companyName, employmentTitle, department } = experienceResponse.data[0];
        
          
                setPreviousExperience({
                  experience: experience || '',
                  companyName: companyName || '',
                  employmentTitle: employmentTitle || '',
                  department: department || [],
                });

              } else {
                console.log('No previous experience data found.');
              }
          
            } catch (experienceError) {
            }
            break;
          

          case 'Additional Information':
            const additionalResponse = await axios.get('/api/userprofile/additional-information', {
              withCredentials: true,
            });
            const { linkedin, portfolio, hobbies } = additionalResponse.data;
            setAdditionalInformation({
              linkedin: linkedin || '',
              portfolio: portfolio || '',
              hobbies: hobbies || '',
            });
            break;

          default:
            break;
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data for the selected section');
        setLoading(false);
      }
    };

 
    if (activeSection !== 'personal-info') {
      fetchSectionData();
    }
  }, [activeSection]);   
  
// Handle input changes for display
const handleJobRolesChange = (e) => setJobRolesInput(e.target.value);
const handleDepartmentsChange = (e) => setDepartmentsInput(e.target.value);
const handleSkillsChange = (e) => setSkillsInput(e.target.value);
const handlePreferredLocationsChange = (e) => setPreferredLocationsInput(e.target.value);

// Commit changes on blur
const handleJobRolesCommit = () => {
  setCareerInterests({ ...careerInterests, jobRoles: jobRolesInput.split(',').map(role => role.trim()) });
};

const handleDepartmentsCommit = () => {
  setCareerInterests({ ...careerInterests, departments: departmentsInput.split(',').map(dep => dep.trim()) });
};

const handleSkillsCommit = () => {
  setCareerInterests({ ...careerInterests, skills: skillsInput });
};

const handlePreferredLocationsCommit = () => {
  setCareerInterests({ ...careerInterests, preferredLocations: preferredLocationsInput.split(',').map(loc => loc.trim()) });
};

const showModalWithMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

 
const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };  


  const handlePersonalInfoSubmit = async (e = null) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      const parseDate = (dobStr) => {
        const [month, day, year] = dobStr.split('/');
        return new Date(`${year}-${month}-${day}`);
      };
  
      // Create a data object (no FormData needed, only JSON fields)
      const data = {
        firstName: personalInfo.name.split(' ')[0],
        lastName: personalInfo.name.split(' ')[1] || '',
        phone: personalInfo.phone,
        dob: personalInfo.dob ? parseDate(personalInfo.dob).toISOString() : null,
        location: personalInfo.location,
        gender: personalInfo.gender,
      };
  
      // Send a PATCH request to update the personal info
      const response = await axios.patch(
        '/api/userprofile/personalinfo',
        data,
        {
          withCredentials: true, 
        }
      );
  
      if (response.status === 200) {
        showModalWithMessage('Personal info updated successfully');
      }
    } catch (error) {
      showModalWithMessage('Error updating personal info');
    }
  };
  


const handleAcademicInfoSubmit = async (e) => {
    e.preventDefault();  

    try {
      const updateData = {
        degreeProgram: academicInfo.degreeProgram,
        major: academicInfo.major,
        graduationDate: academicInfo.graduationDate,
        previousDegree: academicInfo.previousDegree,
        previousMajor: academicInfo.previousMajor,
      };
  

      const response = await axios.patch('/api/userprofile/academicinfo', updateData, {
        withCredentials: true,  
      });
  
      if (response.status === 200) {
        showModalWithMessage('Academic info updated successfully');
      }
    } catch (error) {
      showModalWithMessage('Error updating Academic Info.');
    }
  };

  
  const handleCareerInterestsSubmit = async (e) => {
    e.preventDefault(); 


    try {

        const updatedCareerInterests = {
            jobRoles: jobRolesInput.split(',').map(role => role.trim()),   
            departments: departmentsInput.split(',').map(dept => dept.trim()),  
            skills: Array.isArray(skillsInput) ? skillsInput : skillsInput.split(',').map(skill => skill.trim()),  
            preferredLocations: preferredLocationsInput.split(',').map(loc => loc.trim()),   
        };


        const response = await axios.patch('/api/userprofile/careerinterests', updatedCareerInterests, {
            withCredentials: true,  
        });

        if (response.status === 200) {
            showModalWithMessage('Career Interests updated successfully');
        }
    } catch (error) {
        showModalWithMessage('Error updating Career Interests.');
    }
};

  
const handlePreviousExperienceSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const updateData = {
        experience: previousExperience.experience,
        companyName: previousExperience.companyName,
        employmentTitle: previousExperience.employmentTitle,
        department: previousExperience.department,
      };
  

      const response = await axios.patch('/api/userprofile/previousexperience', updateData, {
        withCredentials: true,  
      });
  
      if (response.status === 200) {
        showModalWithMessage('Previous Experience updated successfully');
      }
    } catch (error) {
      showModalWithMessage('Error updating Previous Experience.');
    }
  };

  const handleAdditionalInfoSubmit = async (e) => {
    e.preventDefault(); 
    
    
    try {
      const updateData = {
        linkedin: additionalInformation.linkedin,
        portfolio: additionalInformation.portfolio,
        hobbies: additionalInformation.hobbies,
      };
  
      const response = await axios.patch('/api/userprofile/additionalinfo', updateData, {
        withCredentials: true,  
      });
  
      if (response.status === 200) {
        showModalWithMessage('Additional Information updated successfully');
      }
    } catch (error) {
      showModalWithMessage('Error updating Additional Information.');
    }
  }; 

  const handleLinkClick = (section) => {
    setActiveSection(section);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  const handleOptionClick = (option, imageType) => {
    setImageType(imageType); // Set the current image type (profile or background)
  
    if (option === 'upload') {
      // Trigger file input for uploading
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    } else if (option === 'remove') {
      // Handle image removal based on the type of image
      if (imageType === 'profile') {
        handleRemoveProfilePicture();
      } else if (imageType === 'background') {
        handleRemoveBackgroundImage();
      }
  
      // Close popups or dropdowns after the action
      setShowPopup(false);
      setShowDropdown(false);
    }
  };  

  // Function to handle removing profile picture
  const handleRemoveProfilePicture = () => {

    const removeEndpoint = '/api/userprofile/remove-profile-picture';
  
    axios.delete(removeEndpoint, { withCredentials: true })
      .then((response) => {

        console.log('Remove Profile Picture Response:', response.data);
        showModalWithMessage('Profile picture removed successfully');
        setPersonalInfo((prevInfo) => ({
          ...prevInfo,
          profilePicture: '/ReadMoreImage/image.png',
        }));
      })
      .catch((error) => {
        console.error('Error removing profile picture:', error);
        console.error('Response data:', error.response?.data); 
        showModalWithMessage('Error removing profile picture');
      });
  };
  
// Function to handle removing background image
const handleRemoveBackgroundImage = () => {

  const removeEndpoint = '/api/userprofile/remove-background-image';

  axios.delete(removeEndpoint, { withCredentials: true })
    .then((response) => {
      console.log('Remove Background Image Response:', response.data);
      showModalWithMessage('Background image removed successfully');
      setPersonalInfo((prevInfo) => ({
        ...prevInfo,
        backgroundImage: 'https://via.placeholder.com/1500x200',
      }));
    })
    .catch((error) => {
      console.error('Error removing background image:', error);
      console.error('Response data:', error.response?.data);
      showModalWithMessage('Error removing background image');
    });
};


  const handleFileChange = (event, imageType) => {

    const file = event.target.files[0];
  
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        showModalWithMessage("Only JPEG, jpg, and PNG images are allowed.");
        return;
      }
  
      const maxSizeInMB = 5;
      if (file.size / 1024 / 1024 > maxSizeInMB) {
        showModalWithMessage("Image size should not exceed 5MB.");
        return;
      }
  
      const formData = new FormData();
      if (imageType === 'profile') {
        formData.append('profilePicture', file);
      } else if (imageType === 'background') {
        formData.append('backgroundImage', file);
      }
  
      const uploadEndpoint =
        imageType === 'profile'
          ? '/api/upload-profile-picture'
          : '/api/upload-background-image';
  

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);   
      }
  

      axios
        .post(uploadEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',  // Ensure multipart/form-data is used
          },
          withCredentials: true,  
        })
        .then((response) => {
          const uploadedImageUrl =
            response.data.profilePicture || response.data.backgroundImage;
  

          if (imageType === 'profile') {
            setPersonalInfo((prevInfo) => ({
              ...prevInfo,
              profilePicture: uploadedImageUrl,
            }));

            dispatch(updateProfilePicture(uploadedImageUrl));

          } else if (imageType === 'background') {
            setPersonalInfo((prevInfo) => ({
              ...prevInfo,
              backgroundImage: uploadedImageUrl,
            }));
          }

          const uploadEndpoint =
            imageType === 'profile'
              ? '/api/userprofile/upload-profile-picture'
              : '/api/userprofile/upload-background-image';

          axios.post(uploadEndpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
})
            .then(() => {
              showModalWithMessage('Image uploaded and profile updated successfully');
            })
            .catch((error) => {
              showModalWithMessage('Error updating profile information');
            });
  
          // Close popups and dropdowns
          setShowPopup(false);  
          setShowDropdown(false);
        })
        .catch((error) => {
          showModalWithMessage('Error uploading image');
        });
    }
  };
  
  

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  


  return (
    <div className="profile-page">
      <Header />

      <header
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <img
          src={personalInfo.backgroundImage}  
          alt="Profile"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '94%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            marginLeft: '3%',
            marginRight: '24%',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        />

        {/* Background Image Camera Icon with Text Container */}
        <div
          style={{
            position: 'absolute',
            bottom: "2px",
    right: "50px",
            display: 'flex',
            alignItems: 'center',
            padding: '5px 10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '5px',
            cursor: 'pointer',
            color: '#fff',
            zIndex: 3,
          }}
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon icon={faCamera} style={{ marginRight: '5px' }} />
          <span>Edit cover photo</span>
        </div>

        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              right: '10px',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              zIndex: 4,
            }}
          >
            <button
              onClick={() => handleOptionClick('upload', 'background')}
              style={{
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#f0f0f0',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              Upload Photo
            </button>
            <button
              onClick={() => handleOptionClick('remove', 'background')}
              style={{
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#f0f0f0',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              Remove
            </button>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleFileChange(e, imageType)}  
/>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            zIndex: 2,
            marginBottom: '-9%',
            marginLeft: '-71%',
          }}
        >
          <img
            src={personalInfo.profilePicture}  
            alt="Profile"
            style={{
              width: '172px',
              height: '172px',
              borderRadius: '50%',
              border: '3px solid white',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              aria-label="Edit profile picture"
              style={{
                backgroundColor: 'white',
                border: '1px solid #0073b1',
                color: '#0073b1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
              }}
              onClick={togglePopup}
            >
              <FontAwesomeIcon icon={faCamera} />
            </button>

            {showPopup && (
              <div
                style={{
                  position: 'fixed',
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  width: '50%',
                  height: '30%',
                  padding: '24px',
                  marginBottom: '5%',
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '30px',
                      marginBottom: '53px',
                    }}
                  >
                    Choose Profile Picture
                  </h2>
                  <span
                    style={{
                      fontSize: '21px',
                      cursor: 'pointer',
                      color: 'black',
                      marginLeft: 'auto',
                      marginTop: '-6%',
                    }}
                    onClick={() => setShowPopup(false)}
                  >
                    x
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <button
                    style={{
                      flex: 1,
                      margin: '0 5px',
                      padding: '10px',
                      border: 'none',
                      borderRadius: '10px',
                      backgroundColor: '#f0f0f0',
                      color: 'black',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                    onClick={() => handleOptionClick('upload', 'profile')}
                  >
                    Upload
                  </button>
  
                  <button
                    style={{
                      flex: 1,
                      margin: '0 5px',
                      padding: '10px',
                      border: 'none',
                      borderRadius: '10px',
                      backgroundColor: '#f0f0f0',
                      color: 'black',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                    onClick={() => handleOptionClick('remove', 'profile')}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, imageType)} 
            />
          </div>
        </div>
      </header>

      <nav
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #ccc',
          marginTop: '70px',
        }}
      >
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <li style={{ padding: '10px 20px', cursor: 'pointer' }}>
            <a
              href="/profile-one"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '18px',
                fontFamily: 'Arial, sans-serif',
                transition: 'text-decoration 0.3s ease', 

              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}

            >
              About
            </a>
          </li>
          <li
        style={{ position: 'relative', padding: '10px 20px', cursor: 'pointer' }}
        onMouseEnter={() => setMatchesTooltipVisible(true)}
        onMouseLeave={() => setMatchesTooltipVisible(false)}
      >
        <a
          href="/my-matches"
          style={{
            textDecoration: 'none',
            color: 'black',
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            transition: 'text-decoration 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          My Matches
        </a>
        <span
          style={{
            visibility: isMatchesTooltipVisible ? 'visible' : 'hidden',
            opacity: isMatchesTooltipVisible ? '1' : '0',
            width: '130px',  
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            borderRadius: '5px',
            padding: '5px',
            position: 'absolute',
            right: '-120px',  
            top: '50%',
            transform: 'translateY(-50%)',
            whiteSpace: 'normal',  
            overflow: 'visible',  
            textOverflow: 'clip', 
            zIndex: '1',
            transition: 'opacity 0.3s ease',
            border: '1px solid black',
          }}
        >
          This tab is not coded at the moment
        </span>
      </li>

      <li style={{ padding: '10px 20px', cursor: 'pointer' }}>
        <a
          href="/jobs2"
          style={{
            textDecoration: 'none',
            color: 'black',
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            transition: 'text-decoration 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          My Jobs
        </a>
      </li>

      <li style={{ padding: '10px 20px', cursor: 'pointer' }}>
        <a
          href="/mySearch"
          style={{
            textDecoration: 'none',
            color: 'black',
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            transition: 'text-decoration 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          My Searches
        </a>
      </li>

      <li
        style={{ padding: '10px 20px', cursor: 'pointer', position: 'relative' }}
        onMouseEnter={() => setFavoritesTooltipVisible(true)}
        onMouseLeave={() => setFavoritesTooltipVisible(false)}
      >
        <a
          href="/my-favorites"
          style={{
            textDecoration: 'none',
            color: 'black',
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            transition: 'text-decoration 0.3s ease',
          }}
        >
          My Favorites
        </a>
        <span
          style={{
            visibility: isFavoritesTooltipVisible ? 'visible' : 'hidden',
            opacity: isFavoritesTooltipVisible ? '1' : '0',
            width: '140px', 
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            borderRadius: '5px',
            padding: '5px',
            position: 'absolute',
            right: '-130px',  
            top: '50%',
            transform: 'translateY(-50%)',
            whiteSpace: 'normal', 
            overflow: 'visible',  
            textOverflow: 'clip',  
            zIndex: '1',
            transition: 'opacity 0.3s ease',
            border: '1px solid black',
          }}
        >
              This tab is not coded at the moment
        </span>
      </li>
          <li style={{ padding: '10px 20px', cursor: 'pointer' }}>
            <a
              href="/accountSet"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '18px',
                fontFamily: 'Arial, sans-serif',
      transition: 'text-decoration 0.3s ease',  

              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}

            >
              Account Settings
            </a>
          </li>
        </ul>
      </nav>

      <Container fluid style={{ backgroundColor: '#F5F5F7', minHeight: '100vh' , marginBottom:"-140px" }}>
        <div style={{ display: 'flex', margin: '20px', marginRight: 'auto', width: '100%' , marginBottom:"4px"  }}>
        <Col xs={3} style={{ backgroundColor: '#F5F5F7', padding: '20px' ,height:"500px"}}>
  <div
    style={{
      backgroundColor: '#FFFFFF',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      marginLeft :"10px",
      height:"540px",

      marginBottom:"170px"
    }}
  >
    <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop:"10px" }}>About</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px'  , }}>
            <a
              href="#personal-info"
              style={{
                display: 'block',
                padding: '6px 15px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '10px',
                marginTop: '17px',
                marginBottom:"20px",
               
              }}
              onClick={() => handleLinkClick('personal-info')}
              className={activeSection === 'personal-info' ? 'active' : ''}
            >
              Personal Information
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a
              href="#academic-info"
              style={{
                display: 'block',
                padding: '6px 15px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '10px',
                 marginBottom:"20px",
                
              }}
              onClick={() => handleLinkClick('academic-info')}
              className={activeSection === 'academic-info' ? 'active' : ''}
            >
              Academic Information
            </a>
          </li>
          <li style={{ marginBottom: '10px' ,}}>
            <a
              href="#career-interest"
              style={{
                display: 'block',
                padding: '6px 15px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '10px',
                 marginBottom:"20px",
                
              }}
              onClick={() => handleLinkClick('career-interest')}
              className={activeSection === 'career-interest' ? 'active' : ''}
            >
              Career Interest
            </a>
          </li>
          <li style={{ marginBottom: '10px'  }}>
            <a
              href="#previous-experience"
              style={{
                display: 'block',
                padding: '6px 15px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '10px',
                 marginBottom:"20px", 
              }}
              onClick={() => handleLinkClick('previous-experience')}
              className={activeSection === 'previous-experience' ? 'active' : ''}
            >
   Previous Experience
            </a>
          </li>
          <li style={{ marginBottom: '10px'  }}>
            <a
              href="#experience"
              style={{
                display: 'block',
                padding: '6px 15px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '10px',
                 marginBottom:"20px", 
              }}
              onClick={() => handleLinkClick('Additional Information')}
              className={activeSection === 'Additional Information' ? 'active' : ''}
            >
   Additional Information
            </a>
          </li>
        </ul>
      
    
  </div> </Col>

          <Col
            xs={9}
            style={{
              flex: 1,
              padding: '20px',
              marginTop: '50px',
              marginRight:" 71px",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              backgroundColor: '#fff',
              position: 'relative',
              top:'-29px' ,
              overflow: 'auto',
              height: '540px',
              marginLeft: "20px",
             marginBottom:"170px",

            }}
          >
           {activeSection === 'personal-info' && (
  <div>
    <h2 style={{ marginTop: '10px', marginBottom: '30px', marginLeft: '35px'}}>
      Personal info
    </h2>
    <div style={{ marginLeft: '35px' , marginTop:"30px" }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <input
        type="text"
        value = {personalInfo.name}
        placeholder="Name"
        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })} 
        style={{
          width: '48%',
          textAlign: 'left',
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid rgba(153, 153, 153, 0.97)',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          height: "40px",
        }}
      />
      <input
        type="email"
        value={personalInfo.email}
        placeholder="Add Email"
        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}  
        style={{
          width: '48%',
          textAlign: 'left',
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          height: '40px',
        }}
      />
      <style jsx>{`
        input::placeholder {
          color: rgba(0, 0, 0, 0.5); /* Placeholder color */
        }
      `}</style>
    </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <PhoneInput
    country={'us'}  
    value={personalInfo.phone}
    onChange={(phone) => setPersonalInfo({ ...personalInfo, phone })}
    inputStyle={{
      width: '201%',  
      textAlign: 'left',
      marginBottom: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#f9f9f9',
      height: '40px',
      marginLeft:"37px",
      transition: 'border-color 0.3s ease',  
    }}
    buttonStyle={{
      borderRadius: '4px',
      height: '40px',
    }}
    containerClass="phone-input-container"
  />
</div>

     <input
          type="text"
          value={personalInfo.location}
          placeholder="Location"
          onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
          style={{
            width: '48%',
            textAlign: 'left',
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            height: "40px",
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* **** */}
      <input
  type="text"
  value={personalInfo.dob}
  placeholder="Date of Birth (e.g., MM/DD/YYYY)"
  onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
  style={{
    width: '48%',
    textAlign: 'left',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    height: "40px",
  }}
/>
{/* *** */}

<select
  value={personalInfo.gender}
  onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
  style={{
    width: '48%',
    textAlign: 'left',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    height: "40px",
    color: 'rgba(0, 0, 0, 0.5)',  
  }}
>
  <option value="" disabled selected>Select Gender</option>
  <option value="Male" style={{ color: 'black' }}>Male</option>
  <option value="Female" style={{ color: 'black' }}>Female</option>
  <option value="other" style={{ color: 'black' }}>Other</option>
</select>


      </div>

   
    </div>

    <button
      style={{
        backgroundColor: "#00BBF0",
        color: "white",
        borderStyle: "none",
        borderRadius: '5px',
        width: "101px",
        height: "40px",
        marginTop: "17.4%",
        marginLeft: "90.7%"
      }}
      onClick={handlePersonalInfoSubmit}
    >
      Submit
    </button>
  </div>
)}

            {activeSection === 'academic-info' && (  
              <div>
                <h2 style={{ display: 'block',
                      padding: '6px 15px',
                      
                      color: '#333',
                      textDecoration: 'none',
                      borderRadius: '10px',marginLeft: '19px' ,}}>
                  Academic Information
                </h2>
                <div  style={{ marginLeft: '35px' , marginBottom :"20px" , marginTop:"20px" , fontSize:"18px" }}></div>
                <div style={{ marginLeft: '35px' }}>
                <input
                    type="text"
                    value={academicInfo.degreeProgram} 
                    placeholder="Add Current degree"
                    onChange={(e) => setAcademicInfo({ ...academicInfo, degreeProgram: e.target.value })}  
                    style={{
                        width: '80%',
                        textAlign: 'left',
                        marginBottom: '20px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#f9f9f9',
                        height: "40px",
                    }}
                    />

                <input
                type="text"
                value={academicInfo.major}  
                placeholder="Major"
                onChange={(e) => setAcademicInfo({ ...academicInfo, major: e.target.value })}
                style={{
                    width: '80%',
                    textAlign: 'left',
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    height: "40px",
                }}
                />

                <input
                type="text"
                value={academicInfo.graduationDate}  
                placeholder="Graduation Month & Year"
                onChange={(e) => setAcademicInfo({ ...academicInfo, graduationDate: e.target.value })}
                style={{
                    width: '80%',
                    textAlign: 'left',
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    height: "40px",
                }}
                />

                <input
                type="text"
                value={academicInfo.previousDegree}   
                placeholder="Previous Degree"
                onChange={(e) => setAcademicInfo({ ...academicInfo, previousDegree: e.target.value })}
                style={{
                    width: '80%',
                    textAlign: 'left',
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',

                    height: "40px",
                }}
                />

                <input
                type="text"
                value={academicInfo.previousMajor}   
                placeholder="Previous Major"
                onChange={(e) => setAcademicInfo({ ...academicInfo, previousMajor: e.target.value })}
                style={{
                    width: '80%',
                    textAlign: 'left',
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',

                    height: "40px",
                }}
                />      

                </div>
                <button style={{ backgroundColor: "#00BBF0",color: "white",borderStyle: "none", width: "101px", height: "40px" , borderRadius: '5px',   marginTop: "8.8%", marginLeft: "90.7%"}}
                 onClick= {handleAcademicInfoSubmit}
                >Submit</button>
                
                
                {/*  */}
              </div>
            )}
            {activeSection === 'career-interest' && (
              <div>
                <h2 style={{ display: 'block',
                      padding: '6px 15px',
                     
                      color: '#333',
                      textDecoration: 'none',
                      borderRadius: '10px',marginLeft: '16px' , marginBottom:"40px"}}>
                  Career Interest
                </h2>
                <div style={{ marginLeft: '35px' }}>
                <input
  type="text"
  value={jobRolesInput}   
  placeholder="Add preferred job roles"
  onChange={handleJobRolesChange}
  onBlur={handleJobRolesCommit}  
  style={{
    width: '80%',
    textAlign: 'left',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    marginBottom: "20px",
    marginTop: "5px",
    height: "40px",
  }}
/>
<input
  type="text"
  value={departmentsInput}  
  placeholder="Add departments of interest"
  onChange={handleDepartmentsChange}
  onBlur={handleDepartmentsCommit}
  style={{
    width: '80%',
    textAlign: 'left',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    marginBottom: "20px",
    height: "40px",
  }}
/>

<input
  type="text"
  value={skillsInput}  // Regular string
  placeholder="Add skills"
  onChange={handleSkillsChange}
  onBlur={handleSkillsCommit}
  style={{
    width: '80%',
    textAlign: 'left',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    marginBottom: "20px",
    height: "40px",
  }}
/>

<input
  type="text"
  value={preferredLocationsInput}  
  placeholder="Add preferred job locations"
  onChange={handlePreferredLocationsChange}
  onBlur={handlePreferredLocationsCommit}
  style={{
    width: '80%',
    textAlign: 'left',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    marginBottom: "20px",
  }}
/>

                </div>
                <button style={{ backgroundColor: "#00BBF0",color: "white",borderStyle: "none", width: "101px", height: "40px" , borderRadius: '5px',   marginTop: "10.3%", marginLeft: "90.7%"}}
                 onClick= {handleCareerInterestsSubmit}
                >Submit</button>

              </div>
            )}
            {activeSection === 'previous-experience' && (
              <div>
                <h2 style={{display: 'block',
                      padding: '6px 15px',
                     
                      color: '#333',
                      textDecoration: 'none',
                      borderRadius: '10px',marginLeft: '19px' ,  }}>
                  Previous Experience
                </h2>
                <div style={{ marginLeft: '35px' , marginBottom :"20px" , marginTop:"20px" , fontSize:"18px" }}></div>
                <div style={{ marginLeft: '35px' }}>
                <input
                  type="text"
                  value={previousExperience.experience}
                  placeholder="Add Previous Experience"
                  onChange={(e) => setPreviousExperience({ ...previousExperience, experience: e.target.value })}
                  style={{
                    width: '80%',
                    textAlign: 'left',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    marginBottom: "20px",
                    marginTop: "5px",
                    height: "40px",
                  }}
                />

                <input
                  type="text"
                  value={previousExperience.companyName}
                  placeholder="Add Previous Company Name"
                  onChange={(e) => setPreviousExperience({ ...previousExperience, companyName: e.target.value })}
                  style={{
                    width: '80%',
                    textAlign: 'left',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    marginBottom: "20px",
                    height: "40px",
                    borderColor: '#ced4da'
                  }}
                />
                <input
                  type="text"
                  value={previousExperience.employmentTitle}
                  placeholder="Add Employment Title"
                  onChange={(e) => setPreviousExperience({ ...previousExperience, employmentTitle: e.target.value })}
                  style={{
                    width: '80%',
                    textAlign: 'left',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    marginBottom: "20px",
                    height: "40px",
                    borderColor: '#ced4da'
                  }}
                />
                <input
                  type="text"
                  value={previousExperience.department.join(',')}
                  placeholder="Add Department"
                  onChange={(e) => setPreviousExperience({ ...previousExperience, department: e.target.value.split(',').map(s => s.trim()) })}
                  style={{
                    width: '80%',
                    textAlign: 'left',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    marginBottom: "20px",
                    height: "40px",
                    borderColor: '#ced4da'
                  }}
                />

                </div>
                
                
                <button style={{ backgroundColor: "#00BBF0",color: "white",borderStyle: "none", width: "101px", height: "40px" , borderRadius: '5px',    marginTop: "8.3%", marginLeft: "90.7%"}}
                onClick= {handlePreviousExperienceSubmit}
                >Submit</button>
              </div>
            )}

{/* additional */}
{activeSection === 'Additional Information' && (
  <div style={{ marginTop: '20px', marginLeft: '35px', height: "400px" }}>
    <div style={{ marginTop: '-9px' }}>
  <h3 style={{ marginBottom: '30px' }}>Additional Information</h3>
  
</div>
 <Row style={{marginTop:"-10px"}}>
      <Col md={6}>
        <Form.Group controlId="formLinkedIn" style={{ marginBottom: '15px' }}>
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your LinkdIn URL"
            value={additionalInformation.linkedin} 
            onChange={(e) => setAdditionalInformation({ ...additionalInformation, linkedin: e.target.value })} 
           style={{ padding: '10px', borderRadius: '4px', borderColor: '#ced4da', fontSize: '15px' ,   backgroundColor:"#f9f9f9"}}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formPortfolio" style={{ marginBottom: '15px' }}>
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Github URL/Portfolio"
            style={{ padding: '10px', borderRadius: '4px',  border: '1px solid #ccc',fontSize: '15px'  ,  backgroundColor:"#f9f9f9"}}
          />
        </Form.Group>
      </Col>
    </Row>
 <Row style={{}}>
      <Col md={6}>
        <Form.Group controlId="formLanguages" style={{ marginBottom: '15px' }}>
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your the languages you speak."
           style={{ padding: '10px', borderRadius: '4px', borderColor: '#ced4da', fontSize: '15px' ,   backgroundColor:"#f9f9f9"}}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formHobbies" style={{ marginBottom: '15px' }}>
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Hobbies & Interest"
            style={{ padding: '10px', borderRadius: '4px', borderColor: '#ced4da', fontSize: '15px',  backgroundColor:"#f9f9f9" }}
          />
        </Form.Group>
      </Col>
    </Row>

    <Row style={{}}>
      <Col md={6}>
        <Form.Group controlId="formAchievements" style={{ marginBottom: '15px' }}>
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Achievements"
            value={additionalInformation.hobbies} 
            onChange={(e) => setAdditionalInformation({ ...additionalInformation, hobbies: e.target.value })} 
 
           style={{ padding: '10px', borderRadius: '4px', borderColor: '#ced4da', fontSize: '15px' ,   backgroundColor:"#f9f9f9"}}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formCertifications" style={{ marginBottom: '15px' }}>
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter list of certifications"
            value={additionalInformation.hobbies} 
            onChange={(e) => setAdditionalInformation({ ...additionalInformation, portfolio: e.target.value })} 
            style={{ padding: '10px', borderRadius: '4px',  border: '1px solid #ccc',fontSize: '15px'  ,  backgroundColor:"#f9f9f9"}}
          />
        </Form.Group>
      </Col>
      </Row>
      
    <div>
      <button style={{ backgroundColor: "#00BBF0", color: "white", borderStyle: "none", borderRadius: '5px', width: "101px", height: "40px", marginTop: "2%", marginLeft: "90.7%" }}
      onClick= {handleAdditionalInfoSubmit}
      >Submit</button>
    </div>
  </div>
)}

          </Col>
        </div>
      </Container>
      <div style={{}}>      
      
       {/* Modal for feedback */}
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalMessage}</Modal.Body>
      <Modal.Footer>
        <Button 
       style={{ backgroundColor: '#00BBF0', border: 'none' }}
        onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
      <Footer />
      </div>

    </div>
  );
};

export default ProfilePage;


