import {
	ImageContainer,
	InputErrorText,
	Label,
	RemoveImgButton,
	RemoveImgButtonText,
	SaveButton,
	SaveButtonText,
	SocialMediaEntity,
	SocialMedia,
	SocialMediaIcon,
	SocialMediaIcon2,
	SocialMediaInput,
	StyledImage,
	TextInput,
	Title,
	UploadIconContainer,
	Wrapper,
} from './EditProfileForm.style';
import {
	useFonts,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { isValidElement, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	ImageSourcePropType,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import db, { firebase } from '../../../firebase-config';
import { IUser } from '../../../redux/types/Auth';
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import {
	selectBio,
	selectFullname,
	selectInstagram,
	selectProfileImgUrl,
	selectTwitter,
	selectUsername,
	selectWebsite,
} from '../../../redux/reducers/Auth';

const EditProfileForm = ({ user }: { user: IUser }) => {
	const dispatch = useDispatch();

	const [isUpdatePending, setIsUpdatePending] = useState(false);

	const [username, setUsername] = useState('');
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [bio, setBio] = useState('');
	const [twitter, setTwitter] = useState('');
	const [instagram, setInstagram] = useState('');
	const [website, setWebsite] = useState('');

	const [usernameError, setUsernameError] = useState('');
	const [fullnameError, setFullnameError] = useState('');
	const [bioError, setBioError] = useState('');
	const [twitterError, setTwitterError] = useState('');
	const [instagramError, setInstagramError] = useState('');
	const [websiteError, setWebsiteError] = useState('');

	const [uploadImageUrl, setUploadeImageUrl] = useState<
		string | { uri: string }
	>(user.profileImgUrl);
	const [imageUri, setImageUri] = useState<string | { uri: string }>('');
	const [loaded, error] = useFonts({
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
	});

	useEffect(() => {
		setUsername(user.username);
		setFullname(user.fullname);
		setEmail(user.emailAddress);
		setBio(user.bio);
		setTwitter(user.twitter);
		setInstagram(user.instagram);
		setWebsite(user.website);
	}, [user]);

	useEffect(() => {
		if (uploadImageUrl) {
			const fetchImage = async () => {
				try {
					const url = await firebase
						.storage()
						.ref(uploadImageUrl as string)
						.getDownloadURL();
					setImageUri({ uri: url });
				} catch (err) {
					console.error('Error fetching the image URL: ', error);
				}
			};

			fetchImage();
		} else {
			setImageUri(
				require('../../../assets/images/profile-img-placeholder.png')
			);
		}
	}, []);

	const handleUpload = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setUploadeImageUrl({ uri: result.assets[0].uri });
			setImageUri({ uri: result.assets[0].uri });
		}
	};

	const updateUser = async (profileImgUrl: string) => {
		try {
			const userRef = doc(db, 'users', email);

			await updateDoc(userRef, {
				bio,
				emailAddress: email,
				fullname,
				instagram,
				profileImgUrl: profileImgUrl === '/profile/' ? '' : profileImgUrl,
				twitter,
				username,
				website,
			});

			console.log('User updated successfully');
			Alert.alert('Profile updated');
		} catch (err) {
			console.log('Error updating the user: ', error);
			Alert.alert('Failed to update the user');
		}
	};

	const validateData = () => {
		let errors: {
			username?: string;
			fullname?: string;
			bio?: string;
			twitter?: string;
			instagram?: string;
			website?: string;
		} = {};

		if (username) {
			const usernameRegex = /^[a-zA-Z0-9_]+$/;
			if (!usernameRegex.test(username)) {
				errors.username =
					'Username can only contain letters, number and underscores';
				setUsernameError(
					'Username can only contain letters, number and underscores'
				);
			}
		}

		if (fullname) {
			const fullNamePattern = /^[a-zA-Z\s]+$/;

			if (
				!fullNamePattern.test(fullname) ||
				fullname.length < 3 ||
				fullname.length > 50
			) {
				errors.fullname =
					'Fullname must contain only letters and have a length between 3 and 50';
				setFullnameError(
					'Fullname must contain only letters and have a length between 3 and 50'
				);
			}
		}

		if (bio) {
			if (bio.length > 200) {
				errors.bio = 'Bio cannont be more than 200 characters';
				setBioError('Bio cannont be more than 200 characters');
			}
		}

		if (twitter) {
			const twitterRegex = /^[a-zA-Z0-9_]{1,15}$/;
			if (!twitterRegex.test(twitter)) {
				errors.twitter = 'Invalid tiwtter handle';
				setTwitterError('Invalid tiwtter handle');
			}
		}

		if (instagram) {
			const instagramRegex = /^[a-zA-Z0-9_.]+$/;
			if (!instagramRegex.test(instagram)) {
				errors.instagram = 'Invalid Instagram username.';
				setInstagramError('Invalid Instagram handle.');
			}
		}

		if (website) {
			const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
			if (!urlRegex.test(website)) {
				errors.website = 'Invalid URL.';
				setWebsiteError('Invalid URL.');
			}
		}

		return {
			isValid: Object.keys(errors).length === 0,
		};
	};

	const checkUsername = async (desiredUsername: string) => {
		if (!desiredUsername.length) {
			return;
		}

		let valid = true;

		const usersCollection = collection(db, 'users');
		const q = query(usersCollection, where('username', '==', desiredUsername));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.docs.length) {
			if (querySnapshot.docs[0].data().emailAddress !== email) {
				valid = false;
			}
		}

		return valid;
	};

	const onSave = async () => {
		setUsernameError('');
		setFullnameError('');
		setBioError('');
		setTwitterError('');
		setInstagramError('');
		setWebsiteError('');
		setIsUpdatePending(true);

		const { isValid } = validateData();
		if (!isValid) {
			setIsUpdatePending(false);
			return;
		}

		if (!(await checkUsername(username))) {
			setIsUpdatePending(false);
			Alert.alert('Username already exists');
			return;
		}

		try {
			let imageUrl: string;

			if (typeof uploadImageUrl === 'object' && 'uri' in uploadImageUrl) {
				imageUrl = uploadImageUrl.uri;
			} else if (typeof uploadImageUrl === 'string') {
				imageUrl = uploadImageUrl;
			} else {
				imageUrl = '';
			}

			let filename = '';
			if (imageUrl.length && user.profileImgUrl !== imageUrl) {
				const { uri } = await FileSystem.getInfoAsync(imageUrl);
				const blob = await new Promise((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.onload = () => {
						resolve(xhr.response);
					};
					xhr.onerror = () => {
						reject(new TypeError('Network request failed'));
					};
					xhr.responseType = 'blob';
					xhr.open('GET', uri, true);
					xhr.send(null);
				});

				filename = (imageUrl as string).substring(
					(imageUrl as string).lastIndexOf('/') + 1
				);
				const reference = firebase.storage().ref('/profile').child(filename);

				if (filename.length) {
					const res = await reference.put(blob as Blob);
					console.log(res);
				}
			}

			if (
				user.profileImgUrl.length &&
				user.profileImgUrl !== `/profile/${filename}`
			) {
				const storage = getStorage();
				const fileRef = ref(storage, user.profileImgUrl);

				if (user.profileImgUrl.length && user.profileImgUrl !== '/profile/') {
					deleteObject(fileRef)
						.then(() => {
							console.log('File deleted successfully');
						})
						.catch((error) => {
							console.error('Error deleting file: ', error);
						});
				}
			}

			await updateUser(`/profile/${filename}`);

			dispatch(selectBio(bio));
			dispatch(selectFullname(fullname));
			dispatch(selectInstagram(instagram));
			dispatch(selectProfileImgUrl(`/profile/${filename}`));
			dispatch(selectTwitter(twitter));
			dispatch(selectUsername(username));
			dispatch(selectWebsite(website));
			Alert.alert('Profile updated');
		} catch (err) {
			setIsUpdatePending(false);
			console.log(err);
		}

		setIsUpdatePending(false);
	};

	if (!loaded || error) {
		return <></>;
	}

	return (
		<Wrapper>
			<Title>Profile Details</Title>
			<TouchableOpacity onPress={handleUpload}>
				<ImageContainer>
					<StyledImage source={imageUri as ImageSourcePropType} />
					{!uploadImageUrl && (
						<UploadIconContainer>
							<Icon
								name='pen'
								size={30}
								color='#FFF'
							/>
						</UploadIconContainer>
					)}
				</ImageContainer>
			</TouchableOpacity>
			{uploadImageUrl ? (
				<RemoveImgButton
					onPress={() => {
						setUploadeImageUrl('');
						setImageUri(
							require('../../../assets/images/profile-img-placeholder.png')
						);
					}}
				>
					<RemoveImgButtonText>REMOVE</RemoveImgButtonText>
				</RemoveImgButton>
			) : null}
			<Label>Username:</Label>
			<TextInput
				placeholder='Enter username'
				value={username}
				onChangeText={setUsername}
			/>
			{usernameError && (
				<InputErrorText testID='usernameInputError'>
					{usernameError}
				</InputErrorText>
			)}
			<Label>Fullname:</Label>
			<TextInput
				placeholder='Enter fullname'
				value={fullname}
				onChangeText={setFullname}
			/>
			{fullnameError && (
				<InputErrorText testID='fullnameInputError'>
					{fullnameError}
				</InputErrorText>
			)}
			<Label>Email:</Label>
			<TextInput
				placeholder='Enter email'
				value={email}
				editable={false}
			/>
			<Label>Bio:</Label>
			<TextInput
				placeholder='Tell us more about yourself'
				value={bio}
				onChangeText={setBio}
				style={{ height: 150 }}
				multiline
				placeholderTextColor='rgba(255, 255, 255, 0.47)'
			/>
			{bioError && (
				<InputErrorText testID='bioInputError'>{bioError}</InputErrorText>
			)}

			<SocialMedia>
				<Label>Links:</Label>
				<SocialMediaEntity>
					<SocialMediaIcon
						name='twitter'
						color='#ffffffbd'
						size={40}
					/>
					<SocialMediaInput
						placeholder='@username'
						value={twitter}
						onChangeText={setTwitter}
					/>
				</SocialMediaEntity>
				{twitterError && (
					<InputErrorText testID='twitterInputError'>
						{twitterError}
					</InputErrorText>
				)}
				<SocialMediaEntity>
					<SocialMediaIcon
						name='instagram'
						color='#ffffffbd'
						size={40}
					/>
					<SocialMediaInput
						placeholder='@username'
						value={instagram}
						onChangeText={setInstagram}
					/>
				</SocialMediaEntity>
				{instagramError && (
					<InputErrorText testID='instagramInputError'>
						{instagramError}
					</InputErrorText>
				)}
				<SocialMediaEntity>
					<SocialMediaIcon2
						name='web'
						color='#ffffffbd'
						size={40}
					/>
					<SocialMediaInput
						placeholder={'website.com'}
						value={website}
						onChangeText={setWebsite}
					/>
				</SocialMediaEntity>
				{websiteError && (
					<InputErrorText testID='websiteInputError'>
						{websiteError}
					</InputErrorText>
				)}
			</SocialMedia>
			<SaveButton
				onPress={onSave}
				disabled={isUpdatePending}
			>
				<LinearGradient
					colors={['#B24E9D', '#7E3BA1']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						borderRadius: 8,
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<SaveButtonText>Save</SaveButtonText>
					{isUpdatePending && (
						<ActivityIndicator
							color='#fff'
							style={{ marginLeft: 10 }}
						/>
					)}
				</LinearGradient>
			</SaveButton>
		</Wrapper>
	);
};

export default EditProfileForm;
