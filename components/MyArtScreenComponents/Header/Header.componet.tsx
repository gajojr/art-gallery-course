import {
	ArrowIcon,
	HeaderComponent,
	IconWrapper,
	MenuIcon,
	MenuIconWrapper,
} from './Header.style';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
	const navigation = useNavigation<DrawerNavigationProp<any>>();
	const [loaded, error] = useFonts({
		Poppins_500Medium,
	});

	if (!loaded || error) {
		return null;
	}

	return (
		<HeaderComponent>
			<IconWrapper
				onPress={() => {
					if (navigation.canGoBack()) {
						navigation.goBack();
					}
				}}
			>
				<ArrowIcon
					name='left'
					color='#fff'
					size={24}
				/>
			</IconWrapper>
			<MenuIconWrapper
				onPress={() => {
					navigation.openDrawer();
				}}
			>
				<MenuIcon source={require('../../../assets/images/menu-open.png')} />
			</MenuIconWrapper>
		</HeaderComponent>
	);
};

export default Header;
