import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    ssid: '',
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
    updatePassword: (state, action)=> {
      state.password = action.payload;
    },
    updateSightings: (state, action)=> {
      state.number_sightings = action.payload;
    },
    updateProfile_Picture: (state, action)=> {
      state.profile_picture = action.payload;
    },
    updateFavorite_Rat: (state, action) => {
      state.favorite_rat = action.payload;
    },
    updateCreated_At: (state, action) => {
      state.created_at = action.payload;
    },
    updateSsid: (state, action) => {
      state.ssid = action.payload;
    }
  }
})

export const { updateUser, updatePassword, updateSightings, updateProfile_Picture, updateFavorite_Rat, updateCreated_At, updateSsid } = userSlice.actions;

export default userSlice.reducer;