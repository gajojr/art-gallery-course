import * as WebBrowser from 'expo-web-browser';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../../../hooks/useWarmUpBrowser';
import { ButtonWrapper, Icon } from '../AuthButtons.style';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../../../firebase-config';
import { useDispatch } from 'react-redux';
import {
	selectAuthType,
	selectAuthenticated,
	selectBio,
	selectEmailAddress,
	selectFullname,
	selectInstagram,
	selectProfileImgUrl,
	selectTwitter,
	selectUsername,
	selectWebsite,
} from '../../../../redux/reducers/Auth';
import { Alert } from 'react-native';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthBtn = () => {
	useWarmUpBrowser();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const user = useUser();
	const { startOAuthFlow } = useOAuth({
		strategy: 'oauth_google',
	});

	useEffect(() => {
		if (!user.user?.primaryEmailAddress?.emailAddress) {
			return;
		}

		(async () => {
			try {
				const email = user.user?.primaryEmailAddress?.emailAddress;
				const docRef = doc(db, 'users', email as string);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					dispatch(selectAuthenticated(true));
					dispatch(selectAuthType('google'));
					dispatch(selectEmailAddress(email));
					dispatch(selectFullname(data.fullname));
					dispatch(selectProfileImgUrl(data.profileImgUrl));
					dispatch(selectUsername(data.username));
					dispatch(selectBio(data.bio));
					dispatch(selectTwitter(data.twitter));
					dispatch(selectInstagram(data.instagram));
					dispatch(selectWebsite(data.website));
					navigation.navigate('Profile' as never);
				} else {
					console.log('No such document!');
				}
			} catch (err) {
				console.error('Failed to get user data:', err);
				return;
			}
		})();
	}, [user]);

	const googleSingin = async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow();

			if (createdSessionId && setActive) {
				setActive({ session: createdSessionId });
			} else {
				console.log('failed to sign in');
			}
		} catch (err) {
			Alert.alert('Error occurred, try again');
			console.log(err);
		}
	};

	return (
		<ButtonWrapper onPress={googleSingin}>
			<Icon
				name='google'
				color='#fff'
				size={30}
			/>
		</ButtonWrapper>
	);
};

export default GoogleAuthBtn;
