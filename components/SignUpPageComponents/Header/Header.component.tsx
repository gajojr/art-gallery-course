import {
	ArrowIcon,
	HeaderComponent,
	IconWrapper,
	PageTitle,
	PlaceholderView,
} from './Header.style';
import { Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
	const navigation = useNavigation();
	const [loaded, error] = useFonts({
		Poppins_500Medium,
	});

	if (error || !loaded) {
		return <></>;
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
			<PageTitle>Create account</PageTitle>
			<PlaceholderView />
		</HeaderComponent>
	);
};

export default Header;
