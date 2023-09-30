import { render, fireEvent, act } from '../../../../test-utils';
import AppleAuthBtn from './AppleAuthBtn.component';
import { useOAuth } from '@clerk/clerk-expo';
import { setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

jest.mock('@clerk/clerk-expo', () => ({
	useOAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
	setDoc: jest.fn(),
	doc: jest.fn(),
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
	useDispatch: () => jest.fn(),
}));

describe('AppleAuthBtn', () => {
	it('should initiate OAuth flow when AppleAuthBtn button is clicked', async () => {
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'test-session-id',
			setActive: jest.fn(),
			signUp: {
				emailAddress: 'test@example.com',
			},
		});
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});

		const { getByTestId } = render(<AppleAuthBtn />);

		const button = getByTestId('Btn');
		await act(() => {
			fireEvent.press(button);
		});

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);
	});

	it('should sign up successfully wiht Apple OAuth', async () => {
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'test-session-id',
			setActive: jest.fn(),
			signUp: {
				emailAddress: 'test@example.com',
			},
		});
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});

		const { getByTestId } = render(<AppleAuthBtn />);

		const button = getByTestId('Btn');
		await act(() => {
			fireEvent.press(button);
		});

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);
		expect(setDoc).toHaveBeenCalledWith(undefined, {
			fullname: '',
			emailAddress: 'test@example.com',
			username: '',
			profileImgUrl: '',
			authType: 'apple',
			creationDate: expect.anything(),
		});
	});

	it('should handle failure to start OAuth flow', async () => {
		const error = new Error('Failed to start OAuth flow');
		const startOAuthFlowMock = jest.fn().mockRejectedValue(error);
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});
		jest.spyOn(console, 'log').mockImplementation(() => {});

		const { getByTestId } = render(<AppleAuthBtn />);

		const button = getByTestId('Btn');
		await act(async () => {
			fireEvent.press(button);
		});

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenCalledWith(error);
	});

	it('should handle failure to set the session', async () => {
		const error = new Error('Failed to set the session');
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'test-session-id',
			setActive: jest.fn().mockImplementation(() => {
				throw error;
			}),
			signUp: {
				emailAddress: 'test@example.com',
			},
		});
		(useOAuth as jest.Mock).mockReturnValue({
			startOAuthFlow: startOAuthFlowMock,
		});
		jest.spyOn(console, 'log').mockImplementation(() => {});

		const { getByTestId } = render(<AppleAuthBtn />);

		const button = getByTestId('Btn');
		await act(async () => {
			fireEvent.press(button);
		});

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenCalledWith(error);
	});

	it('should handle failure to store the user data', async () => {
		const error = new Error('Failed to store user data');
		const startOAuthFlowMock = jest.fn().mockResolvedValue({
			createdSessionId: 'test-session-id',
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
		jest.spyOn(console, 'log').mockImplementation(() => {});

		const { getByTestId } = render(<AppleAuthBtn />);

		const button = getByTestId('Btn');
		await act(async () => {
			fireEvent.press(button);
		});

		expect(startOAuthFlowMock).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenCalledWith(error);
	});
});
