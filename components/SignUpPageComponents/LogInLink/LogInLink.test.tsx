import { fireEvent, render } from '../../../test-utils';
import LogInLink from './LogInLink.component';

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@expo-google-fonts/poppins', () => ({
	useFonts: jest.fn().mockReturnValue([true, null]),
}));

describe('LogInLink', () => {
	it('should render a component with a "Log In" link and a "Already have an account" text', async () => {
		const { findByText } = render(<LogInLink navigation={undefined} />);

		const preText = await findByText('Already have an account?');
		const logInLink = await findByText('Log In');

		expect(preText).toBeTruthy();
		expect(logInLink).toBeTruthy();
	});

	it('should navigate to the "SignIn" screen when the "Log In" link is clicked', async () => {
		const navigation = {
			navigate: jest.fn(),
		};

		const { findByText } = render(<LogInLink navigation={navigation} />);
		const logInLink = await findByText('Log In');

		fireEvent.press(logInLink);

		expect(navigation.navigate).toHaveBeenCalledWith('SignIn');
	});

	it('should use Poppins_300Light and Poppins_400Regular fonts', async () => {
		const { findByText } = render(<LogInLink navigation={undefined} />);

		const preText = await findByText('Already have an account?');
		const logInLink = await findByText('Log In');

		expect(preText.props.style.fontFamily).toEqual('Poppins_300Light');
		expect(logInLink.props.style.fontFamily).toEqual('Poppins_400Regular');
	});
});
