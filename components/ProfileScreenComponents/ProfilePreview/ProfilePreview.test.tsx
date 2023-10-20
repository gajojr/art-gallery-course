import { AuthType } from '../../../redux/types/Auth';
import { render } from '../../../test-utils';
import ProfilePreview from './ProfilePreview.component';

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

describe('Profile Preview', () => {
	it('should display default values for missing user information', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: '',
			emailAddress: '',
			profileImgUrl: '',
			fullname: '',
			bio: '',
			twitter: '',
			instagram: '',
			website: '',
		};

		const { queryByText } = render(<ProfilePreview user={user} />);

		expect(queryByText('Username: none')).toBeTruthy();
		expect(queryByText('Fullname: none')).toBeTruthy();
		expect(queryByText('Email: none')).toBeTruthy();
		expect(queryByText('Bio: none')).toBeTruthy();
		expect(queryByText('twitter')).toBeTruthy();
		expect(queryByText('instagram')).toBeTruthy();
		expect(queryByText('website')).toBeTruthy();
	});

	it('should display a default profile image if the user has no profile image URL', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: 'testuser',
			emailAddress: 'testuser@example.com',
			profileImgUrl: '',
			fullname: 'Test User',
			bio: 'This is a test bio',
			twitter: 'testuser',
			instagram: 'testuser',
			website: 'testuser.com',
		};

		const { findByTestId } = render(<ProfilePreview user={user} />);

		const img = await findByTestId('profileImg');
		expect(img.props.source).toEqual(
			require('../../../assets/images/profile-img-placeholder.png')
		);
	});

	it('should not render anything if fonts fails to load', () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: '',
			emailAddress: '',
			profileImgUrl: '',
			fullname: '',
			bio: '',
			twitter: '',
			instagram: '',
			website: '',
		};

		const { useFonts } = require('@expo-google-fonts/poppins');
		useFonts.mockReturnValue([false, new Error('Font loading error')]);

		const { queryByText } = render(<ProfilePreview user={user} />);

		expect(queryByText('Username: none')).toBeNull();
	});
});
