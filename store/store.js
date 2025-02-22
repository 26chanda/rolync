import { configureStore } from '@reduxjs/toolkit';  // Import configureStore
import { profileReducer } from '../reducers/profileReducer.js';  // Import your reducer

// Create the Redux store using configureStore
export const store = configureStore({
  reducer: {
    profile: profileReducer,  // Add reducers here
  },
});
