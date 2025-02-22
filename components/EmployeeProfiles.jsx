import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './EmployeeProfiles.css'; 

const extensions = ['.jpg', '.jpeg', '.png'];

const checkImageExists = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      return response.ok;  
    } catch (error) {
      return false;  
    }
  };


const generateImagePath = async (profileName) => {
    for (let ext of extensions) {
      const profileImage = `/ReadMoreImage/${profileName.trim()}${ext}`;

      const exists = await checkImageExists(profileImage); 
      if (exists) {
        return profileImage;  
      }
    }
    return 'https://via.placeholder.com/150'; 
  };

const EmployeeProfiles = () => {
  const [profileData, setProfileData] = useState({
    profilePic: 'https://via.placeholder.com/150',
    summary: 'Loading...',
    personalInfo: {},  
    workExperience: {},
    skills: {},
    education: {},
    careerInsights: 'Loading career insights...',
    name: ''
  });

  const [activeSection, setActiveSection] = useState('workExperience');
  const sectionsRef = useRef({
    personalInfo: null,  
    workExperience: null,
    skills: null,
    education: null,
    careerInsights: null,

    
  });

  const { id } = useParams();

  const firstName = profileData.name?.split(' ')[0] || 'Profile';

  const [showTooltip, setShowTooltip] = useState(false);

  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/profile/${id}`,{
          withCredentials: true,  // Sends cookies with request
        });
        const profileName = response.data.Name || 'Profile';
        const imagePath = await generateImagePath(profileName);
        
        
        setProfileData({
          ...response.data,
          personalInfo: response.data.additionalDetails,
          profilePic: imagePath,   
          name: profileName,  
        });
      } catch (error) {
      }
    };

    fetchProfileData();
  }, [id]);


  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = Object.keys(sectionsRef.current).map(key => {
        const rect = sectionsRef.current[key].getBoundingClientRect();
        return {
          section: key,
          top: rect.top,
          bottom: rect.bottom,
        };
      });
  
      const active = sectionOffsets.find(sec => sec.top <= window.innerHeight / 2 && sec.bottom >= window.innerHeight / 2);
      
      if (active && active.section !== activeSection) {
        setActiveSection(active.section);
      }
    };
  
    // Add scroll listener to the .scrollable-content div
    const scrollableDiv = document.querySelector('.scrollable-content');
    scrollableDiv.addEventListener('scroll', handleScroll);
  
    return () => {
      scrollableDiv.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);
  

  const scrollToSection = (section) => {
    const scrollableDiv = document.querySelector('.scrollable-content');  
    const targetSection = sectionsRef.current[section];   
    // Calculate the top offset of the target section relative to the scrollable div
    const scrollPosition = targetSection.offsetTop - scrollableDiv.offsetTop;
  
    scrollableDiv.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'  // Smooth scroll within the scrollable div
    });
  
    setActiveSection(section);   
  };


  // 
  //
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this article!',
        url: window.location.href, 
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  }; 
  //
  // 

  
  return (
    

    <div className="edit-profile-page" style={{ backgroundColor: '#F5F5F7' }}>
  <Header />

  <section className="profile-section">
    <article
      className="profile-pic" style={{ flex: '-20 0 200px',
            height: '280px',
            overflow: 'hidden',
            marginRight: '20px',
            borderRadius: '8px',
            border: 'none',
            marginLeft:"64px",
            width :"350px"}}
    >
      <img
        src={profileData.profilePic}
        alt="Profile"
      />
    </article>

    <article className="profile-info">
      <h2 className="profile-name">{profileData.name}</h2>
      <p className="profile-summary">{profileData.summary}</p>

      <article className="profile-actions">
        
           <div style={{ position: 'relative', display: 'inline-block' }}>
      <FontAwesomeIcon
        icon={faShareAlt}
        className="icon-share"
        style={{ cursor: 'pointer', marginLeft: '-19px' }} 
        onClick={handleShareClick}
        onMouseEnter={() => setShowTooltip(true)}  
        onMouseLeave={() => setShowTooltip(false)}  
      />
      {showTooltip && (
        <span
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)', 
            color: '#fff', 
            textAlign: 'center', 
            borderRadius: '5px', 
            padding: '5px', 
            position: 'absolute', // Position relative to parent
            zIndex: 1, // Ensure it appears above other elements
            bottom: '100%', // Position above the icon
            left: '50%', // Center it horizontally
            transform: 'translateX(-50%)', 
            marginBottom: '5px', 
            whiteSpace: 'nowrap', 
            fontSize: '12px', 
          }}
        >
          Share
        </span>
      )}
    </div>
      </article>
    </article>
  </section>



      <div className='main-ccont' style={{ minHeight: '122vh', width: '90%', padding: '0 0', marginTop: '40px', marginBottom: '40px' }}>
        <Row   className='editprofile-Row' style={{ height: '111vh', marginTop:"0px",marginRight:"auto",marginBottom:"0px", boxShadow: '4px 8px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', borderRadius: '8px' }}>
          
          <h2 style={{ textAlign: 'left', marginTop: '30px', marginLeft: '10px', fontWeight: 'bold' }}>
          {firstName}'s Info</h2>
          <hr style={{ width: 'calc(100% - 180px)', border: 'none',position: 'absolute', borderBottom: '1px solid #000000', margin: '70px 0 0 0', marginTop: '90px' }} />


          <div style={{ display: 'flex', width: '100%',}}>
         

          <Col xs={3} className='sside' style={{ position: 'relative' }}>
          <div className="sticky-sidebar" style={{
            position: 'sticky',
            left: "23px",
            top: '10px',
            backgroundColor: '#FFFFFF',
            marginTop: '24px', 
            borderRadius: '0 0 0 16px',

            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // for cleaner look
          }}>
    <ul className="lllinks " style={{ padding: 0, margin: 0, listStyle: 'none' }}>
      {['personalInfo', 'workExperience', 'skills', 'education', 'careerInsights'].map((section, index) => (
        <li 
          key={section} 
          className={activeSection === section ? 'active' : ''} 
          style={{
            marginBottom: '0',
            borderBottom: index !== 4 ? '1px solid #ddd' : 'none',
            padding: '0',
            position: 'relative',
            borderTop: index === 0 ? '1px solid #ddd' : 'none' // Border at the top of the first item
          }}
        >
          <a
           href={`#${section}`}

            onClick={() => scrollToSection(section)}
            style={{ 
              padding: '15px 12px', 
              display: 'block', 
              textDecoration: 'none',
              color: activeSection === section ? '#fff' : '#000', 
              backgroundColor: activeSection === section ? '#333' : '#F5F5F7',
              borderRadius: activeSection === section ? '0px 0px 0px -54px' : '0'
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
          </a>
          
        </li>
      ))}
    </ul>
  </div>
</Col>


            <Col  style={{ overflowX:" hidden" }} xs={9}>
              <div className="scrollable-content" 
            
              >
                <section ref={(el) => (sectionsRef.current.personalInfo = el)} id="personalInfo">
                  
                  <h2 className="section-heading">Personal Info</h2>
                  <p  className="personal-info" style={{ marginLeft: '65px', marginBottom: '30px', lineHeight: '2.5' }}>
  <strong  className="info-label" style={{ marginRight: '172px' }}>Country:</strong>
  <span className="info-data" >{profileData.personalInfo?.country || 'N/A'}</span>
  <br />
  
  <strong className="info-label" style={{ marginRight: '192px' }}>State:</strong>
  <span className="info-data" >{profileData.personalInfo?.state || 'N/A'}</span>
  <br />
  
  <strong className="info-label" style={{ marginRight: '85px' }}>Spoken Languages:</strong>
  <span className="info-data" >{profileData.personalInfo?.spokenLanguages ? profileData.personalInfo.spokenLanguages.split(', ').join(', ') : 'N/A'}</span>
  <br />
  
  <strong className="info-label" style={{ marginRight: '129px' }}>LinkedIn URL:</strong>
<span className="info-data">
  {profileData.personalInfo?.LinkedInURL ? (
    <a
      id="linkdinurl"
      href={profileData.personalInfo.LinkedInURL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {profileData.personalInfo.LinkedInURL}
    </a>
  ) : (
    'N/A'
  )}
</span>
<br />
</p>
 </section>
                
                <section ref={(el) => (sectionsRef.current.workExperience = el)} id="workExperience">
                  <h2 className="section-heading">Work Experience</h2>
                  <p  className="personal-info" style={{ marginLeft: '65px', marginBottom: '30px', lineHeight: '2' }}>
  <strong className="info-label" style={{ marginRight: '74px' }}>Experience in the US</strong>
  <span className="info-data" >{profileData.workExperience.USExperience || 'N/A'}</span>
  <br />

  <strong className="info-label" style={{ marginRight: '175px' }}>Domain</strong>
  <span className="info-data" >{profileData.workExperience.domain || 'N/A'}</span>
  <br />

  <div>
    <strong className="info-label" style={{ paddingRight: '145px', position: 'relative', top: '40px' }}>Expertise In</strong>
    <ul className="expertise-data" style={{ paddingLeft: '145px' }}>
      {profileData.workExperience.issuesAddressed && profileData.workExperience.issuesAddressed.length > 0
        ? profileData.workExperience.issuesAddressed
            .join(', ')
            .split(',')
            .map((issue, index) => (
              <li key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', paddingLeft: '71px' }}>
  <span className="yes-data" style={{ marginRight: '10px', color: '#28a745' }}>✓</span>
  <span>{`${issue.trim().endsWith('.') ? issue.trim() : issue.trim() + '.'}`}</span>

</li>


            ))
        : 'N/A'}
    </ul>
  </div>

  <br />

  <div>
  <strong className="info-label" style={{ paddingRight: '145px', display: 'block' }}>
    Daily Roles &<br />
    Responsibilities
  </strong><ul className="DailyRoles" style={{ paddingLeft: '145px', marginBottom: '5px',marginTop:'-60px',listStyleType: 'none' }}>
    {profileData.workExperience.responsibilities && profileData.workExperience.responsibilities.length > 0
      ? profileData.workExperience.responsibilities.map((item, index) => (
        <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', paddingLeft: '71px' }}>
        <span id='dailyYesData' style={{ marginRight: '8px', color: '#28a745' }}>✓</span>
        <span style={{ marginTop: '-2px' }}>
  {`${item.trim().endsWith('.') ? item : item + '.'}`}
</span>
     </li>
      
        ))
      : 'N/A'}
  </ul>            
</div>

<div>
  <strong className="info-label" style={{ marginRight: '75px' }}>Work Engagement</strong>
  <span className="info-data" >{profileData.workExperience.workEngagement || 'N/A'}</span>
  <br />

  <div  style={{ marginTop: '20px' }}>
    <strong  className="info-label" style={{ marginRight: '20px' }}>
      Experience in the<br />
      Home Country
    </strong>
    <span className="info-data" style={{ marginLeft: '83px',position: 'relative', top: '-5px' }}>
    <span className="exp" > {profileData.workExperience.homeCountryExperience || 'N/A'}</span>
    </span>
  </div>
  <br />
</div>

</p>


                </section>
                
                <section className="info-label" ref={(el) => (sectionsRef.current.skills = el)} id="skills">
        <h2 className="section-heading">Skills</h2>

                  <div  style={{ marginLeft: '65px', marginBottom: '35px', lineHeight: '2.5' }}>

  <div className="skills-column" style={{ display: 'flex' }}>
    {/* First Column: Technical Skills */}
    <div style={{ flex: 1, marginRight: '20px' }}>
    <p>
  <strong className="technical-skills-heading" >Top Technical Skills </strong>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '30px' }}>
    {profileData.skills.topTechnicalSkills
      ? profileData.skills.topTechnicalSkills.map((skill, index) => (
          <span id='TechnicalSkills' key={index} style={{ marginBottom: '5px' }}>
            {skill}
          </span>
        ))
      : 'N/A'}
  </div>
</p>


    </div>

    {/* Second Column: Used Daily */}
    <div style={{ display: 'flex', flexDirection: 'row', }}>
  {/* First Column: Used Daily */}
  <div   className="skills-column" style={{ flex: 1, marginRight: '280px' }}>
  <p>
  <strong id = "usedbyheading" style={{ display: 'block', marginBottom: '5px', marginLeft: '160px' }}>UsedDaily</strong>
  {profileData.skills.usedDaily
    ? profileData.skills.usedDaily.map((skill, index) => (
        <span id='usedskills' key={index} 
        className={skill === '✓' ? 'tick' : skill === '✗' ? 'cross' : ''}
        style={{ display: 'block', marginLeft: '190px' , marginBottom:'5px'}}>{skill}</span>
      ))
    : 'N/A'}
</p>

  </div>

  {/* Third Column: Importance */}
  <div className="skills-column"  style={{ flex: 1 }}>
  <p>
  <strong  id="imptskills" style={{ marginRight: '40px' }}>Importance</strong><br />
  {profileData.skills.Importance && profileData.skills.Importance.length > 0 ? (
    profileData.skills.Importance.map((item, index) => (
      <span  id = "importanceSkills" key={index} style={{ display: 'block', marginLeft: '40px' , marginBottom:'5px'}}>{item}</span>
    ))
  ) : (
    'N/A'
  )}
</p>


  </div>
</div>
</div>

  {/* New Section: Necessary for Job and Gained on Job */}
  <div style={{ marginTop: '20px' }}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
    {/* Necessary for Job Section */}
    <div>
    <p style={{ display: 'flex', flexDirection: 'column' }}>
  <strong className="nec-job" style={{ display: 'block', marginBottom: '5px' }}>
    Necessary for Job
  </strong>
  {profileData.skills.necessarySkill
    ? profileData.skills.necessarySkill.map((skill, index) => (
        <span 
          className='necForJob' 
          key={index} 
          style={{ display: 'inline', marginBottom: '5px', marginLeft: '25px' }} 
        >
          {skill}
        </span>
      ))
    : 'N/A'}
</p>


    </div>

{/* At the Time of Startup Section */}
    <div style={{ marginLeft: '240px' }}> 
    <p>
  <strong className='Application-stage'>Application stage</strong>
  {profileData.skills.AtApplicationStage
    ? profileData.skills.AtApplicationStage.map((skill, index) => (
        <span 
          id='ApplicationStage' 
          key={index} 
          className={skill === '✓' ? 'tick' : ''} 
          style={{ display: 'block', marginLeft: '56px' }} 
        >
          {skill}
        </span>
      ))
    : 'N/A'}
</p>

</div>

  </div>

  {/* Gained on Job and At Employment Section */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
  {/* Gained on Job Section */}
  <div>
  <strong className='GainedONJOB' style={{ display: 'block', marginBottom: '5px' }}>
    Gained on Job
  </strong>
  {profileData.skills.gainedOnJob
    ? profileData.skills.gainedOnJob.map((skill, index) => (
        <span 
          id='GainedSkills' 
          key={index} 
          style={{ display: 'block', marginLeft: '25px' }} 
        >
          {skill}
        </span>
      ))
    : 'N/A'}
</div>


  {/* New Dash Column */}
  <div>
  <p  id='Dash' style={{ paddingLeft: '160px' }}>
  <strong  style={{ display: 'block', marginBottom: '5px',visibility: 'hidden'  }}>Dash</strong>
  {profileData.skills.Dash
    ? profileData.skills.Dash.map((skill, index) => (
        <span key={index} style={{ display: 'block', marginLeft: '10px', marginBottom: '2px' }}>{skill}</span>
      ))
    : 'N/A'}
</p>
</div>
   {/* At Employment Section */}
  <div>
  <p style={{ paddingLeft: '120px' }}>
  <strong id="atemployment" style={{ display: 'block', marginBottom: '5px' }}>
    At Employment
  </strong>
  {profileData.skills.AtEmployment
    ? profileData.skills.AtEmployment.map((skill, index) => (
        <span 
          id="employSkills" 
          key={index} 
          className={skill === '✓' ? 'tick' : ''} 
          style={{ display: 'block', marginLeft: '45px' }} 
        >
          {skill}
        </span>
      ))
    : 'N/A'}
</p>

  </div>
</div>
</div>
</div>
</section>
 <section ref={(el) => (sectionsRef.current.education = el)} id="education">
                  <h2 className="section-heading">Education</h2>
                  <p   className="personal-info" style={{ marginLeft: '65px', marginBottom: '30px' }}>
  <strong  className="edu-label">University</strong>
  <span  className="education" style={{ marginLeft: '132px' }}>{profileData.education.university || 'N/A'}</span>
  <br /><br />
  <strong className="edu-label">Major</strong>
  <span className="education" style={{ marginLeft: '167px' }}>{profileData.education.major || 'N/A'}</span>
  <br /><br />
  <strong className="edu-label">Graduation Year</strong>
  <span className="education" style={{ marginLeft: '87px' }}>{profileData.education.graduationYear || 'N/A'}</span>
  <br /><br />
  <strong className="edu-label">Degree</strong>
  <span className="education" style={{ marginLeft: '154px' }}>{profileData.education.degree || 'N/A'}</span>
  <br /><br />
  <strong className="edu-label">International Student</strong>
  <span className="education" style={{ marginLeft: '48px' }}>{profileData.education.internationalStudent ? 'Yes' : 'No'}</span>
</p>

                </section>

                <section ref={(el) => (sectionsRef.current.careerInsights = el)} id="careerInsights">
                  <h2 className="section-heading">Career Insights</h2>
                  <p style={{ marginLeft: '65px', marginBottom: '30px' }}>
                  <span className="career-data" >  {profileData.careerInsights || 'Insert Employee\'s Reflection or Insight'}</span>
                  </p>
                </section>
              </div>
            </Col>
          </div>

        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeProfiles;
