import { configureStore } from '@reduxjs/toolkit';
import sightingReducer from './Slices/sightingSlice.js';
import userReducer from './Slices/userSlice.js';

export default configureStore({
	reducer: {
		sighting: sightingReducer,
		user: userReducer,
	},
});
