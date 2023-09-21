import { fireEvent, render, waitFor } from '../../../test-utils';
import Header from './Header.component';

describe('Header', () => {
	it('should navigate to previous screen when back button is clicked', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		jest.doMock('@expo-google-fonts/poppins', () => ({
			Poppins_500Medium: 'Poppins_500Medium',
			useFonts: jest.fn().mockReturnValue([true, null]),
		}));

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

		jest.doMock('@expo-google-fonts/poppins', () => ({
			Poppins_500Medium: 'Poppins_500Medium',
			useFonts: jest.fn().mockReturnValue([true, null]),
		}));

		const { findByTestId } = render(<Header navigation={navigation} />);

		expect(await findByTestId('HeaderComponent')).toBeTruthy();
		expect(await findByTestId('IconWrapper')).toBeTruthy();
		expect(await findByTestId('PageTitle')).toBeTruthy();
		expect(await findByTestId('PlaceholderView')).toBeTruthy();
	});

	it('should return empty fragment when font fails to load', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		jest.doMock('@expo-google-fonts/poppins', () => ({
			Poppins_500Medium: 'Poppins_500Medium',
			useFonts: jest.fn().mockReturnValue([false, 'error']),
		}));

		const { queryByTestId } = render(<Header navigation={navigation} />);

		expect(queryByTestId('HeaderComponent')).toBeNull();
	});

	it('should return empty fragment when font fails to load', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(true),
			goBack: jest.fn(),
		};

		jest.doMock('@expo-google-fonts/poppins', () => ({
			Poppins_500Medium: 'Poppins_500Medium',
			useFonts: jest.fn().mockReturnValue([false, null]),
		}));

		const { queryByTestId } = render(<Header navigation={navigation} />);

		expect(queryByTestId('HeaderComponent')).toBeNull();
	});

	it('should not render back button when navigation cannot go back', async () => {
		const navigation = {
			canGoBack: jest.fn().mockReturnValue(false),
			goBack: jest.fn(),
		};

		jest.doMock('@expo-google-fonts/poppins', () => ({
			Poppins_500Medium: 'Poppins_500Medium',
			useFonts: jest.fn().mockReturnValue([true, null]),
		}));

		const { queryByTestId } = render(<Header navigation={navigation} />);

		expect(queryByTestId('IconWrapper')).toBeNull();
	});

	it('should not render back button when navigation is undefined', async () => {
		jest.doMock('@expo-google-fonts/poppins', () => ({
			Poppins_500Medium: 'Poppins_500Medium',
			useFonts: jest.fn().mockReturnValue([true, null]),
		}));

		const { queryByTestId } = render(<Header navigation={undefined} />);

		expect(queryByTestId('IconWrapper')).toBeNull();
	});
});
