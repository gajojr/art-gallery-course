import { fireEvent, render } from '../../../test-utils';
import Art from './Art.component';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

jest.mock('@expo-google-fonts/questrial', () => {
	return {
		useFonts: jest.fn(() => [true, null]),
	};
});

jest.mock('firebase/firestore', () => ({
	doc: jest.fn(),
	setDoc: jest.fn(),
	getFirestore: jest.fn(),
	collection: jest.fn(),
	query: jest.fn(),
	getDocs: jest.fn(),
	addDoc: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
	getStorage: jest.fn(),
	ref: jest.fn(),
	getDownloadURL: jest.fn(),
}));

jest.mock('firebase/compat/app', () => ({
	apps: [],
	initializeApp: jest.fn(),
}));

jest.mock('firebase/compat/storage', () => {});

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useNavigation: jest.fn(),
	};
});

describe('Art', () => {
	let mockNavigation: {
		navigate: jest.Mock;
	};

	const mockArtData = [
		{
			id: '1',
			currentOwner: 'test1',
			creator: 'test2',
			href: 'url1',
			src: {
				uri: 'url1',
			},
		},
		{
			id: '2',
			currentOwner: 'test2',
			creator: 'test1',
			href: 'url2',
			src: {
				uri: 'url2',
			},
		},
	];

	beforeEach(() => {
		mockNavigation = {
			navigate: jest.fn(),
		};
		(useNavigation as jest.Mock).mockReturnValue(mockNavigation);

		(getFirestore as jest.Mock).mockReturnValue({});
		(collection as jest.Mock).mockReturnValue({});
		(query as jest.Mock).mockReturnValue({});
		(getDocs as jest.Mock).mockResolvedValue({
			docs: mockArtData.map((art) => ({
				data: () => ({
					imageUrl: art.href,
					currentOwner: art.currentOwner,
					creator: art.creator,
				}),
				id: art.id,
			})),
		});

		(getStorage as jest.Mock).mockReturnValue({});
		(ref as jest.Mock).mockReturnValue({});
		(getDownloadURL as jest.Mock).mockResolvedValue('downloadUrl');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render the Art component successfully', async () => {
		const { findAllByTestId } = render(<Art />);
		const artWrappers = await findAllByTestId('LinkWrapper');
		expect(artWrappers.length).toBe(2);
	});

	it('should display sold art when the current owner is not the creator', async () => {
		const { findAllByTestId } = render(<Art />);
		const soldArt = await findAllByTestId('SoldOverlay');
		expect(soldArt.length).toBeGreaterThan(0);
	});

	it('should display featured art when current owner is the creator', async () => {
		const { findAllByTestId } = render(<Art />);
		const artImages = await findAllByTestId('ArtImage');
		fireEvent.press(artImages[0]);
		expect(mockNavigation.navigate).toHaveBeenCalledWith(
			`Art/${mockArtData[0].id}`
		);
	});

	it('should render font loading error by rendering null', async () => {
		const { useFonts } = require('@expo-google-fonts/questrial');
		useFonts.mockReturnValue([false, new Error('font loading error')]);

		const { queryByTestId } = render(<Art />);
		expect(queryByTestId('ArtWrapper')).toBeNull();
	});
});
