import {
	DrawerContentComponentProps,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import {
	ButtonText,
	Container,
	EditProfileOptions,
	FormWrapper,
	OptionsWrappers,
	ViewProfileOptions,
} from './MyArt.style';
import { useState } from 'react';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import MenuScreen from '../../components/MenuScreen/MenuScreen.screen';
import Header from '../../components/MyArtScreenComponents/Header/Header.componet';
import MyArt from '../../components/MyArtScreenComponents/MyArt/MyArt.component';
import ArtForm from '../../components/MyArtScreenComponents/ArtForm/ArtForm.componen';

const Drawer = createDrawerNavigator();

const MyArtScreen = () => {
	const [mode, setMode] = useState('view');
	const [loaded, error] = useFonts({
		Poppins_700Bold,
	});

	if (!loaded || error) {
		return null;
	}

	return (
		<Container>
			<Header />
			<FormWrapper
				contentContainerStyle={{
					alignItems: 'center',
				}}
			>
				<OptionsWrappers>
					<ViewProfileOptions
						onPress={() => setMode('view')}
						active={mode === 'view'}
					>
						<ButtonText>My Art</ButtonText>
					</ViewProfileOptions>
					<EditProfileOptions
						onPress={() => setMode('publish')}
						active={mode === 'publish'}
					>
						<ButtonText>Publish</ButtonText>
					</EditProfileOptions>
				</OptionsWrappers>
				{mode === 'publish' ? <ArtForm setMode={setMode} /> : <MyArt />}
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
			initialRouteName='MyArt'
			screenOptions={{
				drawerPosition: 'right',
				headerShown: false,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name='MyArt'
				component={MyArtScreen}
			/>
		</Drawer.Navigator>
	);
};

export default Wrapper;
