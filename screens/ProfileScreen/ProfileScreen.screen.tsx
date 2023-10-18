import { SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
	ButtonText,
	Container,
	EditProfileOptions,
	FormWrapper,
	OptionsWrapper,
	ViewProfileOption,
} from './ProfileScreen.style';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Header from '../../components/ProfileScreenComponents/Header/Header.component';

const ProfileScreen = () => {
	const navigation = useNavigation();
	const userInfo = useSelector((state: RootState) => state.auth);
	const [mode, setMode] = useState('view');
	const [loaded, error] = useFonts({
		Poppins_700Bold,
	});

	if (!loaded || error) {
		return <></>;
	}

	return (
		<Container>
			<Header navigation={navigation} />
			<FormWrapper
				contentContainerStyle={{
					alignItems: 'center',
				}}
			>
				<OptionsWrapper>
					<ViewProfileOption
						onPress={() => setMode('view')}
						active={mode === 'view'}
					>
						<ButtonText>Profile</ButtonText>
					</ViewProfileOption>
					<EditProfileOptions
						onPress={() => setMode('edit')}
						active={mode === 'edit'}
					>
						<ButtonText>Edit</ButtonText>
					</EditProfileOptions>
				</OptionsWrapper>
				{/* {mode === 'edit' ? (
					<EditProfileForm user={userInfo} />
				) : (
					<ProfilePreview user={userInfo} />
				)} */}
			</FormWrapper>
		</Container>
	);
};

export default ProfileScreen;
