import { UPDATE_PROFILE_PICTURE } from '../actions/profileActions.js';

// Define the initial state for the profile
const initialState = {
  profilePicture: '',  // Initially, the profile picture is empty
};

// Profile reducer to handle the state changes
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_PICTURE:
      return {
        ...state,  // Copy the existing state
        profilePicture: action.payload,  // Update the profile picture
      };
    default:
      return state;  // Return current state by default
  }
};
