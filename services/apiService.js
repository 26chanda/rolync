// src/services/apiService.js

import axios from 'axios';




export const fetchJobData = async () => {
  try {
    const response = await axios.get('/api/jobs');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching job data');
  }
};

export const fetchUserProfiles = async () => {
  try {
    const response = await axios.get('/api/user-profiles');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user profiles');
  }
};
