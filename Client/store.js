import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Components/counter/counterSlice.js';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})