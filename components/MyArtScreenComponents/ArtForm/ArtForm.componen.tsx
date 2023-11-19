import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import db, { firebase } from '../../../firebase-config';
import SelectDropdown from 'react-native-select-dropdown';
import {
	useFonts,
	Poppins_500Medium,
	Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import {
	ImageInputWrapper,
	Label,
	PlusIcon,
	PlusIconWrapper,
	PublishButton,
	PublishButtonText,
	RemoveImgButton,
	RemoveImgButtonText,
	StyledTextInput,
	TextInputWrapper,
	Title,
	UploadedImage,
	Wrapper,
} from './ArtForm.style';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import store from '../../../redux/store';

const licenseOptions = ['Commercial use', 'Personal use'];

const ArtForm = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [licenseType, setLicenseType] = useState('');
	const [price, setPrice] = useState('');
	const [imageUri, setImageUri] = useState('');
	const [requestPending, setRequestPending] = useState(false);
	const [loaded, error] = useFonts({
		Poppins_500Medium,
		Poppins_600SemiBold,
	});

	if (!loaded || error) {
		return <></>;
	}
};

export default ArtForm;
