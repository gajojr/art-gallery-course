import { createSlice } from '@reduxjs/toolkit';
import { AuthType } from '../types/Auth';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		authenticated: false,
		authType: AuthType.EMAIL,
		username: '',
		emailAddress: '',
		profileImgUrl: '',
		fullname: '',
	},
	reducers: {
		selectAuthenticated: (state, action) => {
			state.authenticated = action.payload;
		},
		selectAuthType: (state, action) => {
			state.authType = action.payload;
		},
		selectUsername: (state, action) => {
			state.username = action.payload;
		},
		selectEmailAddress: (state, action) => {
			state.emailAddress = action.payload;
		},
		selectProfileImgUrl: (state, action) => {
			state.profileImgUrl = action.payload;
		},
		selectFullname: (state, action) => {
			state.fullname = action.payload;
		},
	},
});

export const {
	selectAuthenticated,
	selectAuthType,
	selectUsername,
	selectEmailAddress,
	selectProfileImgUrl,
	selectFullname,
} = authSlice.actions;
export default authSlice.reducer;
