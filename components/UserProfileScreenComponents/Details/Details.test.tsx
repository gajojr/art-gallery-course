import { render, fireEvent } from '../../../test-utils';
import Details from './Details.component';
import { AuthType, IUser } from '../../../redux/types/Auth';
import { Linking } from 'react-native';

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('../../../firebase-config', () => ({
	firebase: {
		storage: jest.fn().mockReturnValue({
			ref: jest.fn().mockReturnValue({
				getDownloadURL: jest.fn().mockResolvedValue('image-url'),
			}),
		}),
	},
}));

describe('Details', () => {
	const mockUser: IUser = {
		username: 'testuser',
		bio: 'This is a bio',
		twitter: 'testtwitter',
		website: 'http://test.com',
		instagram: 'testinstagram',
		profileImgUrl: 'profile-img-url',
		authType: AuthType.EMAIL,
		emailAddress: 'test@gmail.com',
		authenticated: true,
		fullname: 'Test User',
	};

	it('displays the username', () => {
		const { getByText } = render(<Details user={mockUser} />);

		expect(getByText(mockUser.username)).toBeTruthy();
	});

	it('displays the bio when provided', () => {
		const { getByText } = render(<Details user={mockUser} />);

		expect(getByText(mockUser.bio)).toBeTruthy();
	});

	it('opens twitter link when twitter icon is pressed', () => {
		const { getByTestId } = render(<Details user={mockUser} />);

		fireEvent.press(getByTestId('twitter-icon'));

		expect(Linking.openURL).toHaveBeenCalledWith(
			`https://user.twitter/${mockUser.twitter}`
		);
	});

	it('opens website link when website icon is pressed', () => {
		const { getByTestId } = render(<Details user={mockUser} />);

		fireEvent.press(getByTestId('web-icon'));

		expect(Linking.openURL).toHaveBeenCalledWith(mockUser.website);
	});

	it('opens instgram link when instgram icon is pressed', () => {
		const { getByTestId } = render(<Details user={mockUser} />);

		fireEvent.press(getByTestId('instagram-icon'));

		expect(Linking.openURL).toHaveBeenCalledWith(
			`https://instagram.com/${mockUser.instagram}`
		);
	});
});
