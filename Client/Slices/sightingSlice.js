import { createSlice } from '@reduxjs/toolkit';

export const sightingSlice = createSlice({
  name: 'sighting',
  initialState: {
    userName: '',
    ratName: '',
    location: {},
    time: Date.now(),
    description: '',
  }, 
  reducers: {
    // we want a reducer that we can call for onchange on the form.Like in the redux
    // unit where when we typed into newlocation, it updated it into state. Then we can send
    // the state off to the database when the user clicks submit.
    UPDATE_USER: (state, action) => {
      // don't have to reassign to mutate the properties because createSlice does this for us
      // under the hood. We can just directy assign
      state.userName = action.payload;
    },
    UPDATE_RAT: (state, action) => {
      state.ratName = action.payload;
    },
    UPDATE_DESCRIPTION: (state, action) => {
      state.description = action.payload;
    },
    UPDATE_LOCATION: (state, action) => {
      state.location = action.payload;
    },
  }
})

export const { UPDATE_USER, UPDATE_RAT, UPDATE_DESCRIPTION, UPDATE_LOCATION} = sightingSlice.actions;

export default sightingSlice.reducer;