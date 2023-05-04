import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	username: 'hank',
	password: 'hello',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser: (state, action) => {
			state.username = action.payload;
			console.log('username in state:', state.username);
		},
		updatePassword: (state, action) => {
			state.password = action.payload;
			console.log('password in state:', state.password);
		},
	},
});

export const { updateUser, updatePassword } = userSlice.actions;

export default userSlice.reducer;
