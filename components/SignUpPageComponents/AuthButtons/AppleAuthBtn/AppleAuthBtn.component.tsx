import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../../../hooks/useWarmUpBrowser';
import { ButtonWrapper, Icon } from '../AuthButtons.style';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../../../firebase-config';
import { useDispatch } from 'react-redux';
import {
	selectAuthType,
	selectAuthenticated,
	selectEmailAddress,
	selectFullname,
} from '../../../../redux/reducers/Auth';

WebBrowser.maybeCompleteAuthSession();

const AppleAuthBtn = () => {
	useWarmUpBrowser();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { startOAuthFlow } = useOAuth({
		strategy: 'oauth_apple',
	});

	const appleSignup = async () => {
		try {
			const { createdSessionId, setActive, signUp } = await startOAuthFlow();

			if (createdSessionId && setActive) {
				setActive({ session: createdSessionId });

				await setDoc(doc(db, 'users', signUp?.emailAddress as string), {
					fullname: '',
					emailAddress: signUp?.emailAddress,
					username: '',
					profileImgUrl: '',
					authType: 'apple',
					creationDate: new Date(),
				});

				dispatch(selectAuthType('apple'));
				dispatch(selectAuthenticated(true));
				dispatch(selectEmailAddress(signUp?.emailAddress));
				dispatch(selectFullname(''));

				navigation.navigate('Profile' as never);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ButtonWrapper onPress={appleSignup}>
			<Icon
				name='apple1'
				color='#fff'
				size={30}
			/>
		</ButtonWrapper>
	);
};

export default AppleAuthBtn;
