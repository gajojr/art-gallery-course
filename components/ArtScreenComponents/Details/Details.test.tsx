import { render } from '../../../test-utils';
import Details from './Details.component';
import { useFonts } from '@expo-google-fonts/poppins';
import store from '../../../redux/store';
import { selectUsername } from '../../../redux/reducers/Auth';

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@expo-google-fonts/poppins', () => ({
	useFonts: jest.fn(() => [true, null]),
}));

const mockDetails = {
	id: '1',
	name: 'Artwork',
	price: 100,
	description: 'This is a description',
	creator: 'Artist',
	currentOwner: 'Owner',
	imageUrl: 'https://example.com/artwork.jpg',
};

describe('Details', () => {
	it('renders correctly', () => {
		const { getByText } = render(
			<Details
				id={'1'}
				details={mockDetails}
			/>
		);

		expect(getByText('Artwork')).toBeTruthy();
		expect(getByText('100 USD')).toBeTruthy();
		expect(getByText('This is a description')).toBeTruthy();
		expect(getByText('Created by Artist')).toBeTruthy();
	});

	it('should not render when fonts are not loaded', () => {
		(useFonts as jest.Mock).mockImplementationOnce(() => [false, null]);
		const { queryByText } = render(
			<Details
				id={'1'}
				details={mockDetails}
			/>
		);

		expect(queryByText('Artwork')).toBeNull();
	});

	it('displays the buy button if current owner is not the user', () => {
		const { queryByText } = render(
			<Details
				id='1'
				details={mockDetails}
			/>
		);

		expect(queryByText('Buy Now')).toBeTruthy();
	});

	it('should not display the buy button if current owner is the user', () => {
		const customDetails = { ...mockDetails, currentOwner: 'testUser' };
		store.dispatch(selectUsername('testUser'));
		const { queryByText } = render(
			<Details
				id='1'
				details={customDetails}
			/>
		);

		expect(queryByText('Buy Now')).toBeNull();
	});
});
