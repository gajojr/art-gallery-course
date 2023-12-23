import {
	DrawerContentComponentProps,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import { Container, FormWrapper } from './GalleryScreen.style';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import MenuScreen from '../../components/MenuScreen/MenuScreen.screen';
import Header from '../../components/GalleryScreenComponents/Header/Header.component';
import Art from '../../components/GalleryScreenComponents/Art/Art.component';

const Drawer = createDrawerNavigator();

const GalleryScreen = () => {
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
				<Art />
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
			initialRouteName='Gallery'
			screenOptions={{
				drawerPosition: 'right',
				headerShown: false,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name='Gallery'
				component={GalleryScreen}
			/>
		</Drawer.Navigator>
	);
};

export default Wrapper;
