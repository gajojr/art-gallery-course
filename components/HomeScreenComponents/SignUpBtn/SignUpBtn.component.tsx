import { TouchableOpacity } from 'react-native';
import { AuthBtn, AuthBtnText } from './SignUpBtn.style';

const SignUpBtn = () => {
	return (
		<TouchableOpacity>
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
