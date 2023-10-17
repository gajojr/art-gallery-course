export enum AuthType {
	EMAIL = 'email',
	GOOGLE = 'google',
	APPLE = 'apple',
}

export interface IUser {
	authenticated: boolean;
	authType: AuthType;
	username: string;
	emailAddress: string;
	profileImgUrl: string;
	fullname: string;
	bio: string;
	twitter: string;
	instagram: string;
	website: string;
}
