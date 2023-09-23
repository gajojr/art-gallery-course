import { fireEvent, render, waitFor } from '../../../test-utils';
import Form from './Form.component';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSignUp } from '@clerk/clerk-expo';
import { Alert } from 'react-native';

jest.mock('react-native', () => {
	const rn = jest.requireActual('react-native');
	rn.Alert.alert = jest.fn();
	return rn;
});

jest.mock('firebase/firestore', () => ({
	doc: jest.fn(),
	setDoc: jest.fn(),
	getFirestore: jest.fn(),
}));

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
	useSignUp: jest.fn(),
}));

describe('Form', () => {
	it('should display and error message when email address is in an invalid format', async () => {
		(useSignUp as jest.Mock).mockImplementation(() => ({
			isLoaded: true,
			signUp: {
				create: jest.fn(),
			},
		}));

		const { findByTestId, getByTestId } = render(<Form />);

		const emailInput = await findByTestId('emailInput');
		fireEvent.changeText(emailInput, 'invalidemail');

		const checkbox = await findByTestId('checkbox');
		fireEvent.press(checkbox);

		const createAccountBtn = await findByTestId('createAccountBtn');

		fireEvent.press(createAccountBtn);

		await waitFor(() => {
			expect(getByTestId('emailInputError')).toBeTruthy();
		});
	});

	it('should display an error message when full name contains invalid characters or is too long/short', async () => {
		(useSignUp as jest.Mock).mockImplementation(() => ({
			isLoaded: true,
			signUp: {
				create: jest.fn(),
			},
		}));

		const { findByTestId, getByTestId } = render(<Form />);

		const fullnameInput = await findByTestId('fullnameInput');
		fireEvent.changeText(fullnameInput, '1234%%%%1234');

		const checkbox = await findByTestId('checkbox');
		fireEvent.press(checkbox);

		const createAccountBtn = await findByTestId('createAccountBtn');

		fireEvent.press(createAccountBtn);

		await waitFor(() => {
			expect(getByTestId('fullnameInputError')).toBeTruthy();
		});
	});

	it.only('should display an error message when password is too short', async () => {
		(useSignUp as jest.Mock).mockImplementation(() => ({
			isLoaded: true,
			signUp: {
				create: jest.fn(),
			},
		}));

		const { findByTestId, getByTestId } = render(<Form />);

		const passwordInput = await findByTestId('passwordInput');
		fireEvent.changeText(passwordInput, '1234');

		const checkbox = await findByTestId('checkbox');
		fireEvent.press(checkbox);

		const createAccountBtn = await findByTestId('createAccountBtn');

		fireEvent.press(createAccountBtn);

		await waitFor(() => {
			expect(getByTestId('passwordInputError')).toBeTruthy();
		});
	});
});
