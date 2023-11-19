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

const ArtForm = ({ setMode }: { setMode: Function }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [licenseType, setLicenseType] = useState('');
	const [price, setPrice] = useState('');
	const [imageUri, setImageUri] = useState({ uri: '' });
	const [requestPending, setRequestPending] = useState(false);
	const [loaded, error] = useFonts({
		Poppins_500Medium,
		Poppins_600SemiBold,
	});

	const handleUpload = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.7,
		});

		if (!result.canceled) {
			setImageUri({ uri: result.assets[0].uri });
		}
	};

	const uploadImage = async () => {
		try {
			const imageUrl = imageUri.uri;
			let filename = '';
			if (imageUrl.length) {
				const { uri } = await FileSystem.getInfoAsync(imageUrl);
				const blob = await new Promise((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.onload = function () {
						resolve(xhr.response);
					};
					xhr.onerror = function () {
						reject(new TypeError('Network request failed'));
					};
					xhr.responseType = 'blob';
					xhr.open('GET', uri, true);
					xhr.send(null);
				});

				filename = (imageUrl as string).substring(
					(imageUrl as string).lastIndexOf('/') + 1
				);
				const reference = firebase.storage().ref('/art').child(filename);

				if (filename.length) {
					const res = await reference.put(blob as Blob);
					console.log(res);
				}
			}

			return `/art/${filename}`;
		} catch (error) {
			console.error('Error uploading image: ', error);
			return null;
		}
	};

	const checkInputs = () => {
		if (!imageUri.uri || imageUri.uri === '') {
			Alert.alert('Please upload an image');
			return false;
		}

		if (!licenseType || licenseType === '') {
			Alert.alert('Please select a license type');
			return false;
		}

		return true;
	};

	const publishArt = async () => {
		if (!checkInputs()) {
			return;
		}

		setRequestPending(true);
		const imageUrl = await uploadImage();
		if (!imageUrl) {
			setRequestPending(false);
			Alert.alert('Failed to upload the image');
			return;
		}

		try {
			await addDoc(collection(db, 'art'), {
				creator: store.getState().auth.username,
				currentOwner: store.getState().auth.username,
				name,
				description,
				licenseType,
				price,
				imageUrl,
			});
			setRequestPending(false);
			Alert.alert('Art published successfully');
			setMode('view');
		} catch (err) {
			console.error(err);
			setRequestPending(false);
			Alert.alert('Failed to publish the art');
		}
	};

	if (!loaded || error) {
		return <></>;
	}

	return (
		<Wrapper>
			<Title>Upload new art</Title>
			<ImageInputWrapper>
				{imageUri.uri === '' ? (
					<PlusIconWrapper onPress={handleUpload}>
						<PlusIcon
							name='plus'
							size={90}
							color='#fff'
						/>
					</PlusIconWrapper>
				) : (
					<UploadedImage source={{ uri: imageUri.uri }} />
				)}
			</ImageInputWrapper>
			{imageUri.uri !== '' && (
				<RemoveImgButton onPress={() => setImageUri({ uri: '' })}>
					<RemoveImgButtonText>Remove image</RemoveImgButtonText>
				</RemoveImgButton>
			)}
			<TextInputWrapper>
				<Label>Name</Label>
				<StyledTextInput
					value={name}
					onChangeText={(_name: string) => setName(_name)}
				/>
			</TextInputWrapper>
			<TextInputWrapper>
				<Label>Description</Label>
				<StyledTextInput
					value={description}
					onChangeText={(_description: string) => setDescription(_description)}
				/>
			</TextInputWrapper>
			<TextInputWrapper>
				<Label>Price (10$-1000$)</Label>
				<StyledTextInput
					maxLength={4}
					keyboardType='numeric'
					value={price}
					onChangeText={(_price: string) => setPrice(_price)}
				/>
			</TextInputWrapper>
			<TextInputWrapper>
				<Label>License type</Label>
				<SelectDropdown
					buttonStyle={{
						borderRadius: 10,
						backgroundColor: '#7e3ba1',
					}}
					buttonTextStyle={{
						fontFamily: 'Poppins_500Medium',
						color: '#fff',
					}}
					rowTextStyle={{
						fontFamily: 'Poppins_500Medium',
						color: '#fff',
					}}
					data={licenseOptions}
					defaultValue={'Personal use'}
					rowStyle={{
						backgroundColor: '#7e3ba1',
					}}
					onSelect={(selectedItem: string) => setLicenseType(selectedItem)}
					buttonTextAfterSelection={(selectedItem: string) => selectedItem}
					rowTextForSelection={(item: string) => item}
				/>
			</TextInputWrapper>
			<PublishButton
				onPress={publishArt}
				disabled={requestPending}
			>
				<LinearGradient
					colors={['#b24e9d', '#7e3ba1']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						borderRadius: 8,
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
					}}
				>
					<PublishButtonText>Publish</PublishButtonText>
					{requestPending ? <ActivityIndicator color='#fff' /> : null}
				</LinearGradient>
			</PublishButton>
		</Wrapper>
	);
};

export default ArtForm;
