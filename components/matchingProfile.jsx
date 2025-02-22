// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Container, Row } from 'react-bootstrap';
// import Footer from './Footer.jsx';
// import Header from './Header.jsx';
// import './MatchingProfile.css';
// import { useDispatch } from 'react-redux';
// import { updateProfilePicture } from '../actions/profileActions';
// import axios from 'axios';

// const extensions = ['.jpg', '.jpeg', '.png'];

// const checkImageExists = async (imageUrl) => {
//   try {
//     const response = await fetch(imageUrl);
//     return response.ok;
//   } catch (error) {
//     return false;
//   }
// };

// const generateImagePath = async (profileName) => {
//   for (let ext of extensions) {
//     const profileImage = `/ReadMoreImage/${profileName.trim()}${ext}`;
//     const exists = await checkImageExists(profileImage);
//     if (exists) {
//       return profileImage;
//     }
//   }
//   return '/ReadMoreImage/image.png';
// };

// const MatchingProfile = () => {
//   const location = useLocation();
//   const { matchedProfiles } = location.state || {};
//   const [name, setName] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [profileImages, setProfileImages] = useState({});
//   const [profilePicture, setProfilePicture] = useState('');

//   useEffect(() => {
//     const fetchAllProfileImages = async () => {
//       const images = {};
//       if (matchedProfiles && matchedProfiles.length > 0) {
//         for (let profile of matchedProfiles) {
//           const imagePath = await generateImagePath(profile.Name.trim());
//           images[profile.Name] = imagePath;
//         }
//         setProfileImages(images);
//       }
//     };
//     fetchAllProfileImages();
//   }, [matchedProfiles]);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get('/api/userprofile/personal-info/', {
//           withCredentials: true,
//         });
//         const { profilePicture, name } = response.data;

//         setName(name || 'User');
//         const finalProfilePictureUrl = profilePicture.startsWith('https') ? profilePicture : `https://rolync.com${profilePicture}`;
//         setProfilePicture(finalProfilePictureUrl);

//         dispatch(updateProfilePicture(finalProfilePictureUrl));
//       } catch (err) {}
//     };

//     fetchProfileData();
//   }, [dispatch]);

//   const handleProfileClick = (objectId) => {
//     navigate(`/employee-profile/${objectId}`);
//   };

//   return (
//     <Container fluid className="container-fluid" style={{ padding: 0 }}>
//       <Row>
//         <Header />
//       </Row>

//       <div className="content">
//         <div
//           className="user-section"
//           style={{
//             backgroundImage: 'url("/images-1/matchingProfile.jpeg")',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             padding: '100px 0',
//             position: 'relative',
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'rgba(255, 255, 255, 0.8)',
//               padding: '30px',
//               borderRadius: '10px',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               textAlign: 'center',
//               maxWidth: '800px',
//               margin: '0 auto',
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginTop: '50px',
//               gap: '-51px'
//             }}
//           >
//             <div
//               style={{
//                 width: '280px',
//                 height: '200px',
//                 borderRadius: '0px%',
//                 overflow: 'hidden',
//                 marginRight: '40px',
//               }}
//             >
//               <img 
//                 src={profilePicture || '/ReadMoreImage/MatchingProfile.jpg'}  
//                 alt="Profile"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = '/ReadMoreImage/MatchingProfile.jpg';   
//                 }}
//                 style={{ width: '280px', height: '210px', objectFit: 'contain', borderRadius: '0px', marginLeft: '-12px' }}
//               />
//             </div>
//             <div className="user-description">
//               <h2 style={{ fontSize: '34px', fontWeight: 'bold' }}>
//               {name || 'User'} 
//               </h2>
//             </div>
//           </div>
//         </div>

//         <div className="profile-matches">
//           <h3 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '52px' }}>Matched Results</h3>
//           <div className="scrollable-list" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//             {matchedProfiles && matchedProfiles.length > 0 ? (
//               matchedProfiles.map((profile, index) => {
//                 const profileImage = profileImages[profile.Name] || '/ReadMoreImage/image.png';
//                 return (
//                   <div
//                     key={index}
//                     className="profile-card"
//                     onClick={() => handleProfileClick(profile.ObjectId)}
//                     style={{ marginBottom: '10px', cursor: 'pointer', position: 'relative', padding: '15px', border: '1px solid #ddd', borderRadius: '10px' }}
//                   >
//                     <div
//                       className="match-percentage"
//                       style={{
//                         position: 'absolute',
//                         top: '10px',
//                         right: '10px',
//                         backgroundColor: '#007bff',
//                         color: '#fff',
//                         padding: '5px 10px',
//                         borderRadius: '5px',
//                         fontSize: '16px',
//                         fontWeight: 'bold',
//                       }}
//                     >
//                       {profile.matchPercentage || 0}% Match
//                     </div>
//                     <img
//                       src={profileImage}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = '/ReadMoreImage/image.png';
//                       }}
//                       alt={profile.Name}
//                       style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
//                     />
//                     <div style={{ marginLeft: '15px' }}>
//                       <h3>{profile.Name}</h3>
//                       <p>{profile.Summary || 'No summary available'}</p>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>No profiles matched.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </Container>
//   );
// };

// // export default MatchingProfile;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Container, Row } from 'react-bootstrap';
// import Footer from './Footer.jsx';
// import Header from './Header.jsx';
// import './MatchingProfile.css';
// import { useDispatch } from 'react-redux';
// import { updateProfilePicture } from '../actions/profileActions';
// import axios from 'axios';

// const extensions = ['.jpg', '.jpeg', '.png'];

// const checkImageExists = async (imageUrl) => {
//   try {
//     const response = await fetch(imageUrl);
//     return response.ok;
//   } catch (error) {
//     return false;
//   }
// };

// const generateImagePath = async (profileName) => {
//   for (let ext of extensions) {
//     const profileImage = `/ReadMoreImage/${profileName.trim()}${ext}`;
//     const exists = await checkImageExists(profileImage);
//     if (exists) {
//       return profileImage;
//     }
//   }
//   return '/ReadMoreImage/image.png';
// };

// const MatchingProfile = () => {
//   const location = useLocation();
//   const { matchedProfiles } = location.state || {};
//   const [name, setName] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [profileImages, setProfileImages] = useState({});
//   const [profilePicture, setProfilePicture] = useState('');

//   useEffect(() => {
//     const fetchAllProfileImages = async () => {
//       const images = {};
//       if (matchedProfiles && matchedProfiles.length > 0) {
//         for (let profile of matchedProfiles) {
//           const imagePath = await generateImagePath(profile.Name.trim());
//           images[profile.Name] = imagePath;
//         }
//         setProfileImages(images);
//       }
//     };
//     fetchAllProfileImages();
//   }, [matchedProfiles]);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get('/api/userprofile/personal-info/', {
//           withCredentials: true,
//         });
//         const { profilePicture, name } = response.data;

//         setName(name || 'User');
//         const finalProfilePictureUrl = profilePicture.startsWith('https') ? profilePicture : `https://rolync.com${profilePicture}`;
//         setProfilePicture(finalProfilePictureUrl);

//         dispatch(updateProfilePicture(finalProfilePictureUrl));
//       } catch (err) {}
//     };

//     fetchProfileData();
//   }, [dispatch]);

//   const handleProfileClick = (objectId) => {
//     navigate(`/employee-profile/${objectId}`);
//   };

//   return (
//     <Container fluid className="container-fluid" style={{ padding: 0 }}>
//       <Row>
//         <Header />
//       </Row>

//       <div className="content">
//         <div
//           className="user-section"
//           style={{
//             backgroundImage: 'url("/images-1/matchingProfile.jpeg")',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             padding: '100px 0',
//             position: 'relative',
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'rgba(255, 255, 255, 0.8)',
//               padding: '30px',
//               borderRadius: '10px',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               textAlign: 'center',
//               maxWidth: '800px',
//               margin: '0 auto',
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginTop: '50px',
//               gap: '-51px'
//             }}
//           >
//             <div
//               style={{
//                 width: '280px',
//                 height: '200px',
//                 borderRadius: '0px%',
//                 overflow: 'hidden',
//                 marginRight: '40px',
//               }}
//             >
//               <img 
//                 src={profilePicture || '/ReadMoreImage/MatchingProfile.jpg'}  
//                 alt="Profile"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = '/ReadMoreImage/MatchingProfile.jpg';   
//                 }}
//                 style={{ width: '280px', height: '210px', objectFit: 'contain', borderRadius: '0px', marginLeft: '-12px' }}
//               />
//             </div>
//             <div className="user-description">
//               <h2 style={{ fontSize: '34px', fontWeight: 'bold' }}>
//               {name || 'User'} 
//               </h2>
//             </div>
//           </div>
//         </div>

//         <div className="profile-matches">
//           <h3 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '52px' }}>Matched Results</h3>
//           <div className="scrollable-list" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//             {matchedProfiles && matchedProfiles.length > 0 ? (
//               matchedProfiles.map((profile, index) => {
//                 const profileImage = profileImages[profile.Name] || '/ReadMoreImage/image.png';
//                 return (
//                   <div
//                     key={index}
//                     className="profile-card"
//                     onClick={() => handleProfileClick(profile.ObjectId)}
//                     style={{ marginBottom: '10px', cursor: 'pointer', position: 'relative', padding: '15px', border: '1px solid #ddd', borderRadius: '10px' }}
//                   >

//                     <img
//                       src={profileImage}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = '/ReadMoreImage/image.png';
//                       }}
//                       alt={profile.Name}
//                       style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
//                     />
//                     <div style={{ marginLeft: '15px' }}>
//                       <h3>{profile.Name}</h3>
//                       <p>{profile.Summary || 'No summary available'}</p>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>No profiles matched.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </Container>
//   );
// };

// export default MatchingProfile;



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import './MatchingProfile.css';
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from '../actions/profileActions';
import axios from 'axios';

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
  return '/ReadMoreImage/image.png';
};

const MatchingProfile = () => {
  const location = useLocation();
  const { matchedProfiles } = location.state || {};
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImages, setProfileImages] = useState({});
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchAllProfileImages = async () => {
      const images = {};
      if (matchedProfiles && matchedProfiles.length > 0) {
        for (let profile of matchedProfiles) {
          const imagePath = await generateImagePath(profile.Name.trim());
          images[profile.Name] = imagePath;
        }
        setProfileImages(images);
      }
    };
    fetchAllProfileImages();
  }, [matchedProfiles]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/userprofile/personal-info/', {
          withCredentials: true,
        });
        const { profilePicture, name } = response.data;

        setName(name || 'User');
        const finalProfilePictureUrl = profilePicture.startsWith('https') ? profilePicture : `https://rolync.com${profilePicture}`;
        setProfilePicture(finalProfilePictureUrl);

        dispatch(updateProfilePicture(finalProfilePictureUrl));
      } catch (err) {}
    };

    fetchProfileData();
  }, [dispatch]);

  const handleProfileClick = (objectId) => {
    navigate(`/employee-profile/${objectId}`);
  };

  return (
    <Container fluid className="container-fluid" style={{ padding: 0 }}>
      <Row>
        <Header />
      </Row>

      <div className="content">
        <div
          className="user-section"
          style={{
            backgroundImage: 'url("/images-1/matchingProfile.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '100px 0',
            position: 'relative',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '50px',
              gap: '-51px'
            }}
          >
            <div
              style={{
                width: '280px',
                height: '200px',
                borderRadius: '0px%',
                overflow: 'hidden',
                marginRight: '40px',
              }}
            >
              <img 
                src={profilePicture || '/ReadMoreImage/MatchingProfile.jpg'}  
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/ReadMoreImage/MatchingProfile.jpg';   
                }}
                style={{ width: '280px', height: '210px', objectFit: 'contain', borderRadius: '0px', marginLeft: '-12px' }}
              />
            </div>
            <div className="user-description">
              <h2 style={{ fontSize: '34px', fontWeight: 'bold' }}>
              {name || 'User'} 
              </h2>
            </div>
          </div>
        </div>

        <div className="profile-matches">
          <h3 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '52px' }}>Matched Results</h3>
          <div className="scrollable-list" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {matchedProfiles && matchedProfiles.length > 0 ? (
              matchedProfiles.map((profile, index) => {
                const profileImage = profileImages[profile.Name] || '/ReadMoreImage/image.png';
                return (
                  <div
                    key={index}
                    className="profile-card"
                    onClick={() => handleProfileClick(profile.ObjectId)}
                    style={{ 
                      marginBottom: '10px', 
                      cursor: 'pointer', 
                      position: 'relative', 
                      padding: '15px', 
                      border: '1px solid #ddd', 
                      borderRadius: '10px', 
                      display: 'flex', 
                      alignItems: 'center' 
                    }}
                  >
                    <img
                      src={profileImage}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/ReadMoreImage/image.png';
                      }}
                      alt={profile.Name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                    <div style={{ marginLeft: '15px', flexGrow: 1 }}>
                      <h3>{profile.Name}</h3>
                      <p>{profile.Summary || 'No summary available'}</p>
                    </div>
                    <p 
                      style={{ 
                        position: 'absolute', 
                        bottom: '07px', 
                        right: '19px', 
                        color: 'blue', 
                        fontWeight: 'bold' 
                      }}
                    >
                      Similarity Score: {profile['Similarity Score'].toFixed(0)}%
                    </p>
                  </div>
                );
              })
            ) : (
              <p>No profiles matched.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
};

export default MatchingProfile;
