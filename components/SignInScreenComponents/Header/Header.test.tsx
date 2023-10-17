import { fireEvent, render, waitFor } from '../../../test-utils';
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
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should navigate to previous screen when back button is clicked', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { findByTestId } = render(<Header navigation={navigation} />);

		const iconWrapper = await findByTestId('IconWrapper');

		fireEvent.press(iconWrapper);

		await waitFor(() => {
			expect(navigation.goBack).toHaveBeenCalled();
		});
	});

	it('should render header component with title and back button', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { useFonts } = require('@expo-google-fonts/poppins');
		useFonts.mockReturnValue([true, null]);

		const { findByTestId } = render(<Header navigation={navigation} />);

		expect(await findByTestId('HeaderComponent')).toBeTruthy();
		expect(await findByTestId('IconWrapper')).toBeTruthy();
		expect(await findByTestId('PageTitle')).toBeTruthy();
		expect(await findByTestId('PlaceholderView')).toBeTruthy();
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

	it('should return empty fragment when font it not loaded without error', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		const { useFonts } = require('@expo-google-fonts/poppins');
		useFonts.mockReturnValue([false, null]);

		const { queryByTestId } = render(<Header navigation={navigation} />);

		expect(queryByTestId('HeaderComponent')).toBeNull();
	});
});
