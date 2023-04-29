import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Components/counter/counterSlice.js';
import sightingReducer from './Slices/sightingSlice.js';

export default configureStore({
  reducer: {
    counter: counterReducer,
    sighting: sightingReducer,
  }
})