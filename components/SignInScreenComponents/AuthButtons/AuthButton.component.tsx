import { Wrapper } from './AuthButtons.style';
import GoogleAuthBtn from './GoogleAuthBtn/GoogleAuthBtn.component';
import AppleAuthBtn from './AppleAuthBtn/AppleAuthBtn.component';

const AuthButton = () => {
	return (
		<Wrapper>
			<GoogleAuthBtn />
			<AppleAuthBtn />
		</Wrapper>
	);
};

export default AuthButton;
