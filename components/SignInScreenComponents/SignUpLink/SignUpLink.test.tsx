import { fireEvent, render } from '../../../test-utils';
import SignUpLink from './SignUpLink.component';

describe('SignUpLink', () => {
	it(`should render a component with a "Sign Up" link and a "Don't have an account?" text`, async () => {
		const { findByText } = render(<SignUpLink navigation={undefined} />);

		const preText = await findByText(`Don't have an account?`);
		const logInLink = await findByText('Sign Up');

		expect(preText).toBeTruthy();
		expect(logInLink).toBeTruthy();
	});

	it('should navigate to the "Sign Up" screen when the "Sign In" link is clicked', async () => {
		const navigation = {
			navigate: jest.fn(),
		};

		const { findByText } = render(<SignUpLink navigation={navigation} />);
		const logInLink = await findByText('Sign Up');

		fireEvent.press(logInLink);

		expect(navigation.navigate).toHaveBeenCalledWith('SignUp');
	});

	it('should use Poppins_300Light and Poppins_400Regular fonts', async () => {
		const { findByText } = render(<SignUpLink navigation={undefined} />);

		const preText = await findByText(`Don't have an account?`);
		const logInLink = await findByText('Sign Up');

		expect(preText.props.style.fontFamily).toEqual('Poppins_300Light');
		expect(logInLink.props.style.fontFamily).toEqual('Poppins_400Regular');
	});
});
