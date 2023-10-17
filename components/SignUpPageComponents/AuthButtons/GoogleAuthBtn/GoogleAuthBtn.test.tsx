import { render, fireEvent, act, waitFor } from '../../../../test-utils';
import GoogleAuthBtn from './GoogleAuthBtn.component';
import { useOAuth } from '@clerk/clerk-expo';
import { setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('react-native', () => {
	const rn = jest.requireActual('react-native');
	rn.Alert.alert = jest.fn();
	return rn;
});

jest.mock('@clerk/clerk-expo', () => ({
	useOAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
	setDoc: jest.fn(),
	doc: jest.fn(),
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
	useDispatch: () => jest.fn(),
}));

describe('GoogleAuthBtn', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should initiate OAuth flow when GoogleAuthBtn button is clicked', async () => {
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'test-session-id',
			setActive: jest.fn(),
			signUp: {
				emailAddress: 'test@example.com',
				firstName: 'Test',
				lastName: 'User',
			},
		});

		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		await act(async () => {
			fireEvent.press(button);
		});

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);
	});

	it('should sign up successfully wiht Google OAuth', async () => {
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'test-session-id',
			setActive: jest.fn(),
			signUp: {
				emailAddress: 'test@example.com',
				firstName: 'Test',
				lastName: 'User',
			},
		});

		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		await act(async () => {
			fireEvent.press(button);
		});

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);
		expect(setDoc).toHaveBeenCalledWith(undefined, {
			fullname: 'Test User',
			emailAddress: 'test@example.com',
			username: '',
			profileImgUrl: '',
			authType: 'google',
			creationDate: expect.anything(),
		});
	});

	it('should handle failure to start OAuth flow', async () => {
		const error = new Error('Failed to start OAuth flow');
		const startOAuthFlowMock = jest.fn().mockRejectedValue(error);
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		fireEvent.press(button);

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenLastCalledWith('Error occurred, try again');
		});
	});

	it('should handle failure to set the session', async () => {
		const error = new Error('Failed to set the session');
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'some-session-id',
			setActive: jest.fn().mockImplementation(() => {
				throw error;
			}),
			signUp: {},
		});
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		fireEvent.press(button);

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenLastCalledWith('Error occurred, try again');
		});
	});

	it('should handle failure to store user data in Firestore', async () => {
		const error = new Error('Failed to store user data');
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'some-session-id',
			setActive: jest.fn(),
			signUp: {
				emailAddress: 'test@example.com',
			},
		});
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});
		(setDoc as jest.Mock).mockImplementation(() => {
			throw error;
		});
		jest.spyOn(console, 'error').mockImplementation(() => {});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		await act(() => {
			fireEvent.press(button);
		});

		expect(setDoc).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(
			'Failed to store user data:',
			error
		);
	});
});
