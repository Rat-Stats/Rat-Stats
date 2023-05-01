import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    number_sightings: 0,
    profile_picture: '',
    favorite_rat: '',
    created_at: Date.now(),
  }, 
  reducers: {
    UPDATE_USER: (state, action) => {
      state.username = action.payload.username
    }
  }
})