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
		bio: '',
		twitter: '',
		instagram: '',
		website: '',
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
		selectBio: (state, action) => {
			state.bio = action.payload;
		},
		selectTwitter: (state, action) => {
			state.twitter = action.payload;
		},
		selectInstagram: (state, action) => {
			state.instagram = action.payload;
		},
		selectWebsite: (state, action) => {
			state.website = action.payload;
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
	selectBio,
	selectTwitter,
	selectInstagram,
	selectWebsite,
} = authSlice.actions;
export default authSlice.reducer;
