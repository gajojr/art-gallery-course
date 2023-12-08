import { render, fireEvent, act, waitFor } from '../../../test-utils';
import ArtForm from './ArtForm.componen';
import * as ImagePicker from 'expo-image-picker';
import { addDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

jest.mock('expo-font');
jest.mock('expo-asset');
jest.mock('expo-file-system');

jest.mock('@expo-google-fonts/poppins', () => ({
	useFonts: jest.fn(() => [true, null]),
}));

jest.mock('firebase/firestore', () => ({
	doc: jest.fn(),
	setDoc: jest.fn(),
	getFirestore: jest.fn(),
	addDoc: jest.fn(),
}));

jest.mock('firebase/compat/app', () => ({
	apps: [],
	initializeApp: jest.fn(),
}));

jest.mock('firebase/compat/storage', () => {});

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(),
}));

jest.mock('expo-image-picker', () => ({
	launchImageLibraryAsync: jest.fn().mockResolvedValue({
		assets: [{ uri: 'path/to/mock/image.jpg' }],
		cancelled: false,
	}),
	MediaTypeOptions: {
		All: 'All',
	},
}));

describe('ArtForm', () => {
	it('renders correctly', () => {
		const { getByText } = render(<ArtForm setMode={jest.fn()} />);

		expect(getByText('Upload new art')).toBeTruthy();
		expect(getByText('Name')).toBeTruthy();
		expect(getByText('Description')).toBeTruthy();
		expect(getByText('Price (10$-1000$)')).toBeTruthy();
	});

	it('allows image selection', async () => {
		(ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
			cancelled: false,
			assets: [{ uri: 'path/to/mock/image.jpg' }],
		});

		const { getByTestId } = render(<ArtForm setMode={jest.fn()} />);
		const uploadButton = getByTestId('UploadBtn');

		await act(async () => {
			fireEvent.press(uploadButton);
		});

		expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
	});

	it('allows input for name, description, price and license type', async () => {
		const { getByTestId } = render(<ArtForm setMode={jest.fn()} />);
		const nameInput = getByTestId('NameInput');
		const descriptionInput = getByTestId('DescriptionInput');
		const priceInput = getByTestId('PriceInput');

		fireEvent.changeText(nameInput, 'Test Art');
		fireEvent.changeText(descriptionInput, 'This is a test description');
		fireEvent.changeText(priceInput, '100');

		expect(nameInput.props.value).toBe('Test Art');
		expect(descriptionInput.props.value).toBe('This is a test description');
		expect(priceInput.props.value).toBe('100');
	});

	it('validates input before submission', () => {
		const mockAlert = jest.spyOn(Alert, 'alert');

		const { getByText } = render(<ArtForm setMode={jest.fn()} />);
		const publishButton = getByText('Publish');

		fireEvent.press(publishButton);

		expect(mockAlert).toHaveBeenCalledWith('Please upload an image');
		mockAlert.mockRestore();
	});

	it('handles file upload', async () => {
		(addDoc as jest.Mock).mockResolvedValueOnce({ id: 'new-doc-id' });

		const { getByTestId } = render(<ArtForm setMode={jest.fn()} />);
		const nameInput = getByTestId('NameInput');
		const uploadButton = getByTestId('UploadBtn');

		fireEvent.changeText(nameInput, 'Test Art');
		fireEvent.press(uploadButton);

		await waitFor(() => {
			expect(getByTestId('UploadedImage').props.source.uri).toBe(
				'path/to/mock/image.jpg'
			);
		});
	});

	it('handles form submission error', async () => {
		const mockAlert = jest.spyOn(Alert, 'alert');
		const { getByTestId } = render(<ArtForm setMode={jest.fn()} />);
		const nameInput = getByTestId('NameInput');
		const publishButton = getByTestId('PublishBtn');

		fireEvent.changeText(nameInput, 'Test Art');
		fireEvent.press(publishButton);

		await waitFor(() => {
			expect(mockAlert).toHaveBeenCalledWith('Please upload an image');
		});

		mockAlert.mockRestore();
	});
});
