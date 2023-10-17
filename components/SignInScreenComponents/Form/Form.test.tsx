import { fireEvent, render, waitFor } from '../../../test-utils';
import Form from './Form.component';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSignIn } from '@clerk/clerk-expo';
import { Alert } from 'react-native';

jest.mock('react-native', () => {
	const rn = jest.requireActual('react-native');
	rn.Alert.alert = jest.fn();
	return rn;
});

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@expo-google-fonts/poppins', () => ({
	useFonts: jest.fn().mockReturnValue([true, null]),
}));

jest.mock('firebase/firestore', () => ({
	doc: jest.fn(),
	setDoc: jest.fn(),
	getFirestore: jest.fn(),
}));

jest.mock('firebase/compat/app', () => ({
	apps: [],
	initializeApp: jest.fn(),
}));

jest.mock('firebase/compat/storage', () => {});

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
}));

jest.mock('@clerk/clerk-expo', () => ({
	useSignIn: jest.fn(),
}));

describe('Form', () => {
	it('should display an error message when email address is in an invalid format', async () => {
		(useSignIn as jest.Mock).mockImplementation(() => ({
			isLoaded: true,
			signIn: {
				create: jest.fn(),
			},
		}));

		const { findByTestId, getByTestId } = render(<Form />);

		const emailInput = await findByTestId('emailInput');
		fireEvent.changeText(emailInput, 'invalidemail');

		const signInBtn = await findByTestId('SignInButton');

		fireEvent.press(signInBtn);

		await waitFor(() => {
			expect(getByTestId('emailInputError')).toBeTruthy();
		});
	});

	it('should display an error message when password is too short', async () => {
		(useSignIn as jest.Mock).mockImplementation(() => ({
			isLoaded: true,
			signIn: {
				create: jest.fn(),
			},
		}));

		const { findByTestId, getByTestId } = render(<Form />);

		const passwordInput = await findByTestId('passwordInput');
		fireEvent.changeText(passwordInput, '1234');

		const signInBtn = await findByTestId('SignInButton');

		fireEvent.press(signInBtn);

		await waitFor(() => {
			expect(getByTestId('passwordInputError')).toBeTruthy();
		});
	});

	it('should sing in when all fields are filled', async () => {
		const mockNavigation = { navigate: jest.fn() };
		(useNavigation as jest.Mock).mockReturnValue(mockNavigation);

		const mockDispatch = jest.fn();
		(useDispatch as jest.Mock).mockReturnValue(mockDispatch);

		const mockSignIn = {
			isLoaded: true,
			signIn: {
				create: jest.fn(),
			},
			setActive: jest.fn(),
		};
		(useSignIn as jest.Mock).mockReturnValue(mockSignIn);

		const { findByTestId } = render(<Form />);

		const emailInput = await findByTestId('emailInput');
		const passwordInput = await findByTestId('passwordInput');

		fireEvent.changeText(emailInput, 'test@example.com');
		fireEvent.changeText(passwordInput, 'password123');

		const signInBtn = await findByTestId('SignInButton');

		fireEvent.press(signInBtn);

		await waitFor(() => {
			expect(mockSignIn.signIn.create).toHaveBeenCalledWith({
				identifier: 'test@example.com',
				password: 'password123',
			});
		});
	});

	it('should display an error message when there is an error in the sing-in process', async () => {
		(useSignIn as jest.Mock).mockImplementation(() => ({
			isLoaded: true,
			signIn: {
				create: jest.fn(() => Promise.reject(new Error('Sign-in failed'))),
			},
		}));

		const { getByText, findByTestId } = render(<Form />);

		const emailInput = await findByTestId('emailInput');
		const passwordInput = await findByTestId('passwordInput');

		fireEvent.changeText(emailInput, 'test@example.com');
		fireEvent.changeText(passwordInput, 'password123');

		const signInBtn = await findByTestId('SignInButton');

		fireEvent.press(signInBtn);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith('Error occurred, try again');
		});
	});
});
