import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    number_sightings: 0,
    profile_picture: '',
    favorite_rat: '',
    created_at: ''
  }, 
  reducers: {
    // updates the username
    updateUser: (state, action) => {
      //const { username } = action.payload
      state.username = action.payload;
    },
  }
})

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;