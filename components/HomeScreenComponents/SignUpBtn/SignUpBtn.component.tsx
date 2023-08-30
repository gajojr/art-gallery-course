import { TouchableOpacity } from 'react-native';
import { AuthBtn, AuthBtnText } from './SignUpBtn.style';
import { useNavigation } from '@react-navigation/native';

const SignUpBtn = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('SignUp' as never);
			}}
		>
			<AuthBtn
				colors={['#7E3BA1', '#B24E9D']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<AuthBtnText>Create account</AuthBtnText>
			</AuthBtn>
		</TouchableOpacity>
	);
};

export default SignUpBtn;
