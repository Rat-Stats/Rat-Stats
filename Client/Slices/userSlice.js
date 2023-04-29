import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    number_sightings: 0,
    profile_picture: '',
    favorite_rate: '',
    created_at: Date.now(),
  }
})