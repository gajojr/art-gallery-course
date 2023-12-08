import { render, waitFor } from '../../../test-utils';
import MyArt from './MyArt.component';
import * as firebase from 'firebase/firestore';
import { getStorage, getDownloadURL } from 'firebase/storage';

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('firebase/firestore', () => ({
	getFirestore: jest.fn(),
	collection: jest.fn(),
	getDocs: jest.fn(),
	query: jest.fn(),
	where: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
	getStorage: jest.fn(),
	ref: jest.fn(),
	getDownloadURL: jest.fn(),
}));

jest.mock('@expo-google-fonts/questrial', () => ({
	useFonts: jest.fn(() => [true, null]),
}));

describe('MyArt', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		const mockFirestore = {};
		(firebase.getFirestore as jest.Mock).mockReturnValue(mockFirestore);
		(firebase.collection as jest.Mock).mockReturnValue('art');
		(firebase.query as jest.Mock).mockResolvedValue('art-query');
		(firebase.where as jest.Mock).mockResolvedValue('art-where');
		const mockSnapshot = {
			docs: [
				{
					data: () => ({
						src: {
							uri: 'https://firebasestorage.googleapis.com/v0/b/artgallery-696b0.appspot.com/o/art%2F9D1BB31C-0CD3-4911-B37F-9DC76EE28C21.jpg?alt=media&token=34420539-b17c-411a-964b-4b87d1924391',
						},
						currentOwner: 'owner1',
					}),
				},
			],
		};

		(firebase.getDocs as jest.Mock).mockResolvedValue(mockSnapshot);
		(getStorage as jest.Mock).mockReturnValue({});
		(getDownloadURL as jest.Mock).mockResolvedValue(
			'https://firebasestorage.googleapis.com/v0/b/artgallery-696b0.appspot.com/o/art%2F9D1BB31C-0CD3-4911-B37F-9DC76EE28C21.jpg?alt=media&token=34420539-b17c-411a-964b-4b87d1924391'
		);
	});

	it('renders correctly when fonts are loaded', async () => {
		const { getByText } = render(<MyArt />);

		await waitFor(() => {
			expect(getByText('All')).toBeTruthy();
			expect(getByText('Sold')).toBeTruthy();
		});
	});

	it('displays art images after fetching', async () => {
		const { findAllByTestId } = render(<MyArt />);

		const images = await findAllByTestId('ArtImage');
		expect(images.length).toBeGreaterThan(0);
	});

	it('shows sold overlay on sold art', async () => {
		const { getByTestId } = render(<MyArt />);

		await waitFor(() => {
			expect(getByTestId('SoldOverlay')).toBeTruthy();
		});
	});

	it('fetches art on component mount', async () => {
		render(<MyArt />);

		await waitFor(() => {
			expect(firebase.getDocs).toHaveBeenCalled();
		});
	});

	it('handles errros during fetchArt', async () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

		(firebase.getDocs as jest.Mock).mockRejectedValue(new Error('Async error'));

		render(<MyArt />);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
		});
	});
});
