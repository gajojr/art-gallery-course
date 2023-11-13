import { fireEvent, render } from '../../test-utils';
import MenuScreen from './MenuScreen.screen';

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@expo-google-fonts/poppins', () => {
	const originalModule = jest.requireActual('@expo-google-fonts/poppins');
	return {
		__esModule: true,
		...originalModule,
		useFonts: jest.fn().mockReturnValue([true, null]),
	};
});

jest.mock('@clerk/clerk-expo', () => ({
	useAuth: jest.fn().mockReturnValue({
		isLoaded: true,
		signOut: jest.fn(),
	}),
}));

describe('MenuScreen', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render the menu with the navigation drawer and menu items', () => {
		const navigation = {
			closeDrawer: jest.fn(),
			navigate: jest.fn(),
		};

		const { getByText } = render(<MenuScreen navigation={navigation} />);

		expect(getByText('Gallery')).toBeTruthy();
		expect(getByText('Profile')).toBeTruthy();
		expect(getByText('My art')).toBeTruthy();
		expect(getByText('Log out')).toBeTruthy();
	});

	it('should navigate to the gallery screen when gallery link is pressed', () => {
		const navigation = {
			closeDrawer: jest.fn(),
			navigate: jest.fn(),
		};

		const { getByText } = render(<MenuScreen navigation={navigation} />);

		fireEvent.press(getByText('Gallery'));

		expect(navigation.navigate).toHaveBeenCalledWith('Gallery');
	});

	it('should navigate to the Profile screen when Profile link is pressed', () => {
		const navigation = {
			closeDrawer: jest.fn(),
			navigate: jest.fn(),
		};

		const { getByText } = render(<MenuScreen navigation={navigation} />);

		fireEvent.press(getByText('Profile'));

		expect(navigation.navigate).toHaveBeenCalledWith('Profile');
	});

	it('should not render anything if fonts are not loaded or there is an error', () => {
		const navigation = {
			closeDrawer: jest.fn(),
			navigate: jest.fn(),
		};
		const { useFonts } = require('@expo-google-fonts/poppins');
		useFonts.mockReturnValue([false, new Error('Font failed to load')]);
		const { queryByText } = render(<MenuScreen navigation={navigation} />);

		expect(queryByText('Gallery')).toBeNull();
		expect(queryByText('Profile')).toBeNull();
		expect(queryByText('My art')).toBeNull();
		expect(queryByText('Log Out')).toBeNull();
	});

	it('should not render anything if auth is not loaded', () => {
		const navigation = {
			closeDrawer: jest.fn(),
			navigate: jest.fn(),
		};
		const { useAuth } = require('@clerk/clerk-expo');
		useAuth.mockReturnValue([true, jest.fn()]);
		const { queryByText } = render(<MenuScreen navigation={navigation} />);

		expect(queryByText('Gallery')).toBeNull();
		expect(queryByText('Profile')).toBeNull();
		expect(queryByText('My art')).toBeNull();
		expect(queryByText('Log Out')).toBeNull();
	});
});
