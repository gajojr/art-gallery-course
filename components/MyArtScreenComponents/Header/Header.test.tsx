import { fireEvent, render } from '../../../test-utils';
import Header from './Header.componet';
import { useNavigation } from '@react-navigation/native';

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@expo-google-fonts/poppins', () => {
	const originalModule = jest.requireActual('@expo-google-fonts/poppins');
	return {
		__esModule: true,
		...originalModule,
		useFonts: jest.fn(() => [true, null]),
	};
});

jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useNavigation: jest.fn(),
	};
});

describe('Header', () => {
	let mockNavigation: {
		canGoBack: jest.Mock;
		goBack: jest.Mock;
		openDrawer: jest.Mock;
	};

	beforeEach(() => {
		mockNavigation = {
			canGoBack: jest.fn(),
			goBack: jest.fn(),
			openDrawer: jest.fn(),
		};
		(useNavigation as jest.Mock).mockReturnValue(mockNavigation);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render a header component with a back arrow and menu icon', async () => {
		const { findByTestId } = render(<Header />);
		const arrowIcon = await findByTestId('ArrowIcon');
		const menuIcon = await findByTestId('MenuIcon');

		expect(arrowIcon).toBeTruthy();
		expect(menuIcon).toBeTruthy();
	});

	it('should navigate back when back arrow is clicked and navigation prop is provided', async () => {
		const { findByTestId } = render(<Header />);
		const menuIcon = await findByTestId('IconWrapper');

		fireEvent.press(menuIcon);

		expect((await findByTestId('MenuIcon')).props.source).toEqual(
			require('../../../assets/images/menu-close.png')
		);
	});

	it('should toggle menu icon between open and close when menu icon is clicked', async () => {
		const { findByTestId } = render(<Header />);
		const menuIcon = await findByTestId('IconWrapper');

		fireEvent.press(menuIcon);

		expect((await findByTestId('MenuIcon')).props.source).toEqual(
			require('../../../assets/images/menu-close.png')
		);
	});

	it('should return empty fragment when font fails to load due an error', async () => {
		const { useFonts } = require('@expo-google-fonts/poppins');
		useFonts.mockReturnValue([false, new Error('error')]);

		const { queryByTestId } = render(<Header />);
		expect(queryByTestId('HeaderComponent')).toBeNull();
	});
});
