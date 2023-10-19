import { fireEvent, render } from '../../../test-utils';
import Header from './Header.component';

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

describe('Header', () => {
	it('should render a header component with a back arrow and menu icon', async () => {
		const navigation = {
			canGoBack: jest.fn(),
			goBack: jest.fn(),
		};

		const { findByTestId } = render(<Header navigation={navigation} />);
		const arrowIcon = await findByTestId('ArrowIcon');
		const menuIcon = await findByTestId('MenuIcon');

		expect(arrowIcon).toBeTruthy();
		expect(menuIcon).toBeTruthy();
	});

	it('should navigate back when back arrow is clicked and navigation prop is provided', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { findByTestId } = render(<Header navigation={navigation} />);
		const arrowIcon = await findByTestId('ArrowIcon');
		fireEvent.press(arrowIcon);

		expect(navigation.canGoBack).toHaveBeenCalled();
		expect(navigation.goBack).toHaveBeenCalled();
	});

	it('should toggle menu icon between open and close states when clicked', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { findByTestId } = render(<Header navigation={navigation} />);
		const menuIcon = await findByTestId('IconWrapper');

		fireEvent.press(menuIcon);

		expect((await findByTestId('MenuIcon')).props.source).toEqual(
			require('../../../assets/images/menu-close.png')
		);
	});

	it('should return empty fragment when font fails to load due an error', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { useFonts } = require('@expo-google-fonts/poppins');
		useFonts.mockReturnValue([false, new Error('Font loading error')]);

		const { queryByTestId } = render(<Header navigation={navigation} />);
		expect(queryByTestId('HeaderComponent')).toBeNull();
	});
});
