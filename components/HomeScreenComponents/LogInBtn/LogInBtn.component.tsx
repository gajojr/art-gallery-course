import { TouchableOpacity } from 'react-native';
import { AuthBtn, AuthBtnText } from './LogInBtn.style';

const LogInBtn = () => {
	return (
		<TouchableOpacity>
			<AuthBtn
				colors={['#B24E9D', '#7E3BA1']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<AuthBtnText>Log In</AuthBtnText>
			</AuthBtn>
		</TouchableOpacity>
	);
};

export default LogInBtn;
