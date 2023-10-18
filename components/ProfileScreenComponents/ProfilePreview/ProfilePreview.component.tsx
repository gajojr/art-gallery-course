import {
	ImageContainer,
	Label,
	SocialMedia,
	SocialMediaEntity,
	SocialMediaIcon,
	SocialMediaIcon2,
	StyledImage,
	Wrapper,
} from './ProfilePreview.style';
import {
	useFonts,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { IUser } from '../../../redux/types/Auth';
import { useState, useEffect } from 'react';
import { firebase } from '../../../firebase-config';
import { ImageSourcePropType } from 'react-native';

const fetchImage = async (profileImgUrl: string) => {
	try {
		const url = await firebase
			.storage()
			.ref(profileImgUrl as string)
			.getDownloadURL();
		return url;
	} catch (err) {
		console.error('Error fetching the image URL: ', err);
	}
};

const ProfilePreview = ({ user }: { user: IUser }) => {
	const [loaded, error] = useFonts({
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
	});
	const [profileImg, setProfileImg] = useState<string | { uri: string }>(
		require('../../../assets/images/profile-img-placeholder.png')
	);

	useEffect(() => {
		if (user.profileImgUrl) {
			(async () => {
				const uri = await fetchImage(user.profileImgUrl);
				setProfileImg({ uri } as { uri: string });
			})();
		}
	}, []);

	if (!loaded || error) {
		return <></>;
	}

	return (
		<Wrapper>
			<ImageContainer>
				<StyledImage source={profileImg as ImageSourcePropType}></StyledImage>
			</ImageContainer>
			<Label>Username: {user.username || 'none'}</Label>
			<Label>Fullname: {user.fullname || 'none'}</Label>
			<Label>Email: {user.emailAddress || 'none'}</Label>
			<Label>Bio: {user.bio || 'none'}</Label>
			<SocialMedia>
				<Label>Links:</Label>
				<SocialMediaEntity>
					<SocialMediaIcon
						name='twitter'
						color='#ffffffbd'
						size={40}
					/>
					<Label style={{ marginTop: 0, marginLeft: 25 }}>
						{user.twitter || 'twitter'}
					</Label>
				</SocialMediaEntity>
				<SocialMediaEntity>
					<SocialMediaIcon
						name='instagram'
						color='#ffffffbd'
						size={40}
					/>
					<Label style={{ marginTop: 0, marginLeft: 25 }}>
						{user.instagram || 'instagram'}
					</Label>
				</SocialMediaEntity>
				<SocialMediaEntity>
					<SocialMediaIcon2
						name='web'
						color='#ffffffbd'
						size={40}
					/>
					<Label style={{ marginTop: 0, marginLeft: 25 }}>
						{user.website || 'website'}
					</Label>
				</SocialMediaEntity>
			</SocialMedia>
		</Wrapper>
	);
};

export default ProfilePreview;
