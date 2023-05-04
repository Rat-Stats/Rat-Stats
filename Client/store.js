import { configureStore } from '@reduxjs/toolkit';
import sightingReducer from './Slices/sightingSlice.js';
import userReducer from './Slices/userSlice.js';

//⬇️wraps createStore to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.
export default configureStore({
  reducer: {
    // user: userReducer,
    sighting: sightingReducer,
    user: userReducer,
  },
});
