import { NavigationProp } from '@react-navigation/native';
import {
	ComponentWrapper,
	LinkText,
	LinkWrapper,
	PreText,
} from './SignUpLink.style';
import {
	useFonts,
	Poppins_300Light,
	Poppins_400Regular,
} from '@expo-google-fonts/poppins';

const SignUpLink = ({
	navigation,
}: {
	navigation:
		| NavigationProp<ReactNavigation.RootParamList>
		| { navigate: Function }
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
			<PreText>Don't have an account?</PreText>
			<LinkWrapper onPress={() => navigation?.navigate('SignUp' as never)}>
				<LinkText>Sign Up</LinkText>
			</LinkWrapper>
		</ComponentWrapper>
	);
};

export default SignUpLink;
