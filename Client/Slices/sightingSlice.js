import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	location: '',
};

export const sightingSlice = createSlice({
	name: 'sighting',
	initialState,
	reducers: {
		updateLocation: (state, action) => {
			state.location = action.payload;
			console.log('location in state:', state.location);
		},
	},
});

export const { updateLocation } = sightingSlice.actions;

export default sightingSlice.reducer;
