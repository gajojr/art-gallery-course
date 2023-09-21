import {
	ComponentWrapper,
	LinkText,
	LinkWrapper,
	PreText,
} from './LogInLink.style';
import {
	useFonts,
	Poppins_300Light,
	Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { NavigationProp } from '@react-navigation/native';

const LogInLink = ({
	navigation,
}: {
	navigation:
		| NavigationProp<ReactNavigation.RootParamList>
		| {
				navigate: Function;
		  }
		| undefined;
}) => {
	const [loaded, error] = useFonts({
		Poppins_300Light,
		Poppins_400Regular,
	});

	if (!loaded || error) {
		return <></>;
	}

	return (
		<ComponentWrapper>
			<PreText>Already have an account?</PreText>
			<LinkWrapper onPress={() => navigation?.navigate('SignIn' as never)}>
				<LinkText>Log In</LinkText>
			</LinkWrapper>
		</ComponentWrapper>
	);
};

export default LogInLink;
