import { useSelector } from 'react-redux';
import {
	DrawerContentComponentProps,
	createDrawerNavigator,
} from '@react-navigation/drawer';
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
import ProfilePreview from '../../components/ProfileScreenComponents/ProfilePreview/ProfilePreview.component';
import EditProfileForm from '../../components/ProfileScreenComponents/EditProfileForm/EditProfileForm.component';
import MenuScreen from '../../components/MenuScreen/MenuScreen.screen';

const Drawer = createDrawerNavigator();

const ProfileScreen = () => {
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
			<Header />
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
				{mode === 'edit' ? (
					<EditProfileForm user={userInfo} />
				) : (
					<ProfilePreview user={userInfo} />
				)}
			</FormWrapper>
		</Container>
	);
};

const DrawerContent = (props: DrawerContentComponentProps) => {
	return <MenuScreen {...props} />;
};

const Wrapper = () => {
	return (
		<Drawer.Navigator
			initialRouteName='Profile'
			screenOptions={{
				drawerPosition: 'right',
				headerShown: false,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name='Profile'
				component={ProfileScreen}
			/>
		</Drawer.Navigator>
	);
};

export default Wrapper;
