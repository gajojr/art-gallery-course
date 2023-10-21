import { AuthType } from '../../../redux/types/Auth';
import { fireEvent, render, waitFor } from '../../../test-utils';
import EditProfileForm from './EditProfileForm.component';

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
	where: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
	getStorage: jest.fn(),
	ref: jest.fn(),
	deleteObject: jest.fn(),
}));

jest.mock('firebase/compat/app', () => ({
	apps: [],
	initializeApp: jest.fn(),
	storage: jest.fn().mockReturnThis(),
	ref: jest.fn().mockReturnThis(),
	getDownloadURL: jest
		.fn()
		.mockResolvedValue('https://example.com/profile.jpg'),
}));

jest.mock('firebase/compat/storage', () => {});

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(),
}));

jest.mock('expo-image-picker', () => ({
	launchImageLibraryAsync: jest.fn().mockResolvedValue({
		cancelled: false,
		assets: [
			{
				uri: 'path/to/mock/image.jpg',
			},
		],
	}),
	MediaTypeOptions: {
		All: 'All',
	},
}));

describe('Edit Profile Form', () => {
	it('should render profile details correctly', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: 'john_doe',
			emailAddress: 'john.doe@example.com',
			profileImgUrl: 'https://example.com/profile.jpg',
			fullname: 'John Doe',
			bio: 'Lorem ipsum dolor sit amet',
			twitter: 'john_doe',
			instagram: 'john_doe',
			website: 'https://example.com',
		};

		const { getByTestId } = render(<EditProfileForm user={user} />);

		const usernameInput = getByTestId('usernameInput');
		const fullnameInput = getByTestId('fullnameInput');
		const emailInput = getByTestId('emailInput');
		const bioInput = getByTestId('bioInput');
		const twitterInput = getByTestId('twitterInput');
		const instagramInput = getByTestId('instagramInput');
		const websiteInput = getByTestId('websiteInput');

		expect(usernameInput.props.value).toEqual(user.username);
		expect(fullnameInput.props.value).toEqual(user.fullname);
		expect(emailInput.props.value).toEqual(user.emailAddress);
		expect(bioInput.props.value).toEqual(user.bio);
		expect(twitterInput.props.value).toEqual(user.twitter);
		expect(instagramInput.props.value).toEqual(user.instagram);
		expect(websiteInput.props.value).toEqual(user.website);
	});

	it("should display the user's profile image correctly", async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: 'john_doe',
			emailAddress: 'john.doe@example.com',
			profileImgUrl: 'https://example.com/profile.jpg',
			fullname: 'John Doe',
			bio: 'Lorem ipsum dolor sit amet',
			twitter: 'john_doe',
			instagram: 'john_doe',
			website: 'https://example.com',
		};

		const { getByTestId } = render(<EditProfileForm user={user} />);

		await waitFor(() => {
			expect(getByTestId('profileImage').props.source.uri).toBe(
				user.profileImgUrl
			);
		});
	});

	it('should allow the user to upload the new profile image', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: 'john_doe',
			emailAddress: 'john.doe@example.com',
			profileImgUrl: 'https://example.com/profile.jpg',
			fullname: 'John Doe',
			bio: 'Lorem ipsum dolor sit amet',
			twitter: 'john_doe',
			instagram: 'john_doe',
			website: 'https://example.com',
		};

		const { getByTestId } = render(<EditProfileForm user={user} />);

		fireEvent.press(getByTestId('uploadImageButton'));

		await waitFor(() => {
			expect(getByTestId('profileImage').props.source.uri).toBe(
				'path/to/mock/image.jpg'
			);
		});
	});

	it('should handle the case when user provides an invalid username', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: '%%',
			emailAddress: 'john.doe@example.com',
			profileImgUrl: 'https://example.com/profile.jpg',
			fullname: 'John Doe',
			bio: 'Lorem ipsum dolor sit amet',
			twitter: 'john_doe',
			instagram: 'john_doe',
			website: 'https://example.com',
		};

		const { getByTestId, getByText } = render(<EditProfileForm user={user} />);

		const saveButton = getByTestId('SaveButton');
		fireEvent.press(saveButton);

		await waitFor(() => {
			expect(
				getByText('Username can only contain letters, number and underscores')
			).toBeTruthy();
		});
	});

	it('should handle the case when fullname is not valid', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: 'john_doe',
			emailAddress: 'john.doe@example.com',
			profileImgUrl: 'https://example.com/profile.jpg',
			fullname: '1234gsfd',
			bio: 'Lorem ipsum dolor sit amet',
			twitter: 'john_doe',
			instagram: 'john_doe',
			website: 'https://example.com',
		};

		const { getByTestId, getByText } = render(<EditProfileForm user={user} />);

		const saveButton = getByTestId('SaveButton');
		fireEvent.press(saveButton);

		await waitFor(() => {
			expect(
				getByText(
					'Fullname must contain only letters and have a length between 3 and 50'
				)
			).toBeTruthy();
		});
	});

	it('should handle the case when twitter is not valid', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: 'john_doe',
			emailAddress: 'john.doe@example.com',
			profileImgUrl: 'https://example.com/profile.jpg',
			fullname: 'John Doe',
			bio: 'Lorem ipsum dolor sit amet',
			twitter: '%%',
			instagram: 'john_doe',
			website: 'https://example.com',
		};

		const { getByTestId, getByText } = render(<EditProfileForm user={user} />);

		const saveButton = getByTestId('SaveButton');
		fireEvent.press(saveButton);

		await waitFor(() => {
			expect(getByText('Invalid twitter handle')).toBeTruthy();
		});
	});

	it('should handle the case when instagram is not valid', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: 'john_doe',
			emailAddress: 'john.doe@example.com',
			profileImgUrl: 'https://example.com/profile.jpg',
			fullname: 'John Doe',
			bio: 'Lorem ipsum dolor sit amet',
			twitter: 'john_doe',
			instagram: '%%',
			website: 'https://example.com',
		};

		const { getByTestId, getByText } = render(<EditProfileForm user={user} />);

		const saveButton = getByTestId('SaveButton');
		fireEvent.press(saveButton);

		await waitFor(() => {
			expect(getByText('Invalid Instagram handle')).toBeTruthy();
		});
	});

	it('should handle the case when website is not valid', async () => {
		const user = {
			authenticated: true,
			authType: AuthType.EMAIL,
			username: 'john_doe',
			emailAddress: 'john.doe@example.com',
			profileImgUrl: 'https://example.com/profile.jpg',
			fullname: 'John Doe',
			bio: 'Lorem ipsum dolor sit amet',
			twitter: 'john_doe',
			instagram: 'john_doe',
			website: 'fs://example.com',
		};

		const { getByTestId, getByText } = render(<EditProfileForm user={user} />);

		const saveButton = getByTestId('SaveButton');
		fireEvent.press(saveButton);

		await waitFor(() => {
			expect(getByText('Invalid URL')).toBeTruthy();
		});
	});
});
