import {
	ArrowIcon,
	HeaderComponent,
	IconWrapper,
	MenuIcon,
	MenuIconWrapper,
} from './Header.style';
import { Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import { NavigationProp } from '@react-navigation/native';
import { useState } from 'react';

const Header = ({
	navigation,
}: {
	navigation:
		| NavigationProp<ReactNavigation.RootParamList>
		| { canGoBack: Function; goBack: Function }
		| undefined;
}) => {
	const [loaded, error] = useFonts({
		Poppins_500Medium,
	});
	const [menuOpen, setMenuOpen] = useState(false);

	if (error || !loaded) {
		return <></>;
	}

	return (
		<HeaderComponent>
			<IconWrapper
				onPress={() => {
					if (navigation?.canGoBack()) {
						navigation?.goBack();
					}
				}}
			>
				<ArrowIcon
					name='left'
					color='#fff'
					size={24}
				/>
			</IconWrapper>
			<MenuIconWrapper onPress={() => setMenuOpen(!menuOpen)}>
				<MenuIcon
					source={
						menuOpen
							? require('../../../assets/images/menu-open.png')
							: require('../../../assets/images/menu-close.png')
					}
				/>
			</MenuIconWrapper>
		</HeaderComponent>
	);
};

export default Header;
