import { fireEvent, render } from '../../../test-utils';
import ArtDetails from './ArtDetails.component';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: jest.fn(),
}));

jest.mock('@expo-google-fonts/poppins', () => ({
	useFonts: jest.fn().mockReturnValue([true, null]),
}));

const mockImages = [
	{
		id: '1',
		currentOwner: 'owner1',
		creator: 'creator1',
		href: 'lint-to-art1',
		src: {
			uri: 'image-source1',
		},
	},
	{
		id: '2',
		currentOwner: 'owner2',
		creator: 'creator2',
		href: 'lint-to-art2',
		src: {
			uri: 'image-source2',
		},
	},
	{
		id: '3',
		currentOwner: 'owner1',
		creator: 'owner1',
		href: 'lint-to-art3',
		src: {
			uri: 'image-source3',
		},
	},
];

describe('ArtDetails', () => {
	let mockNavigation: {
		canGoBack: jest.Mock;
		goBack: jest.Mock;
		openDrawer: jest.Mock;
		navigate: jest.Mock;
	};

	beforeEach(() => {
		mockNavigation = {
			canGoBack: jest.fn(),
			goBack: jest.fn(),
			openDrawer: jest.fn(),
			navigate: jest.fn(),
		};

		(useNavigation as jest.Mock).mockReturnValue(mockNavigation);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders correctly', () => {
		const { getByTestId } = render(<ArtDetails images={mockImages} />);

		expect(getByTestId('FeaturedArtWrapper')).toBeTruthy();
		expect(getByTestId('SoldArtWrapper')).toBeTruthy();
	});

	it('navigates to the Art screen when an image is pressed', () => {
		const { getByTestId } = render(<ArtDetails images={mockImages} />);

		fireEvent.press(getByTestId('LinkWrapper-3'));

		expect(mockNavigation.navigate).toHaveBeenCalledWith('Art', { id: '3' });
	});

	it('displays featured art when currentOwner === creator', () => {
		const { getAllByTestId } = render(<ArtDetails images={mockImages} />);

		const featuredImages = getAllByTestId('FeaturedImage');
		expect(featuredImages.length).toBe(1);
	});

	it('displays sold art when currentOwner !== creator', () => {
		const { getAllByTestId } = render(<ArtDetails images={mockImages} />);

		const featuredImages = getAllByTestId('SoldImage');
		expect(featuredImages.length).toBe(2);
	});

	it('displays sold overlay for sold art', () => {
		const { getAllByTestId } = render(<ArtDetails images={mockImages} />);
		const soldOverlays = getAllByTestId('SoldOverlay');
		expect(soldOverlays.length).toBe(2);
	});
});
