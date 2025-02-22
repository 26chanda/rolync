// api.js
import axios from 'axios';

export const createItem = async (item) => {
  try {
    const response = await axios.post('http://localhost:5001/api/finalSubmit', item); // Ensure the endpoint is correct
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error.response.data;
  }
};
