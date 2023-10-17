import { render, fireEvent, act, waitFor } from '../../../../test-utils';
import GoogleAuthBtn from './GoogleAuthBtn.component';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import { doc, getDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

jest.mock('react-native', () => {
	const rn = jest.requireActual('react-native');
	rn.Alert.alert = jest.fn();
	return rn;
});

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@clerk/clerk-expo', () => ({
	useOAuth: jest.fn(),
	useUser: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
	getDoc: jest.fn(),
	doc: jest.fn(),
	getFirestore: jest.fn(),
}));

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(),
}));

jest.mock('firebase/compat/app', () => ({
	apps: [],
	initializeApp: jest.fn(),
}));

jest.mock('firebase/compat/storage', () => {});

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

	it('should iniate OAuth flow when GoogleAuthBtn button is clicked', async () => {
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'test-session-id',
			setActive: jest.fn(),
		});

		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});
		(useUser as jest.Mock).mockReturnValue({
			user: {
				primaryEmailAddress: {
					emailAddress: 'example@gmail.com',
				},
			},
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');

		await act(async () => {
			fireEvent.press(button);
		});

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);
	});

	it('should sign in successfully with Google OAuth', async () => {
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'test-session-id',
			setActive: jest.fn(),
		});

		(doc as jest.Mock).mockReturnValue('users');
		(getDoc as jest.Mock).mockResolvedValue({
			exists: () => true,
			data: () => ({
				fullname: 'Test User',
				emailAddress: 'test@example.com',
				username: 'testuser',
				profileImgUrl: '',
				authType: 'google',
			}),
		});
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});
		(useUser as jest.Mock).mockReturnValue({
			user: {
				primaryEmailAddress: {
					emailAddress: 'test@example.com',
				},
			},
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		await act(async () => {
			fireEvent.press(button);
		});

		expect(getDoc).toHaveBeenLastCalledWith('users');
	});

	it('should handle failure to start OAuth flow', async () => {
		const error = new Error('Failed to start OAuth flow');
		const startOAuthFlowMock = jest.fn().mockRejectedValue(error);
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});
		(useUser as jest.Mock).mockReturnValue({
			user: {
				primaryEmailAddress: {
					emailAddress: 'test@example.com',
				},
			},
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		fireEvent.press(button);

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith('Error occurred, try again');
		});
	});

	it('should handle failure to set the session', async () => {
		const error = new Error('Failed to set the session');
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'some-session-id',
			setActive: jest.fn().mockImplementation(() => {
				throw error;
			}),
		});
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});
		(useUser as jest.Mock).mockReturnValue({
			user: {
				primaryEmailAddress: {
					emailAddress: 'test@example.com',
				},
			},
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		fireEvent.press(button);

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith('Error occurred, try again');
		});
	});

	it('should handle failure to get user data from Firestore', async () => {
		const error = new Error('Failed to get user data');
		(getDoc as jest.Mock).mockRejectedValue(error);
		jest.spyOn(console, 'error').mockImplementation(() => {});

		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'some-session-id',
			setActive: jest.fn(),
		});
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});
		(useUser as jest.Mock).mockReturnValue({
			user: {
				primaryEmailAddress: {
					emailAddress: 'test@example.com',
				},
			},
		});

		const { getByTestId } = render(<GoogleAuthBtn />);

		const button = getByTestId('Btn');
		await act(() => {
			fireEvent.press(button);
		});

		expect(getDoc).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(
			'Failed to get user data:',
			error
		);
	});
});
