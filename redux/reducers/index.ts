import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/Auth';

const rootReducer = combineReducers({
	auth: authReducer,
});

export default rootReducer;
