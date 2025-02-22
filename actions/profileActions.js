// Define action type
export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';

// Action creator to update profile picture
export const updateProfilePicture = (profilePictureUrl) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: profilePictureUrl,
});
