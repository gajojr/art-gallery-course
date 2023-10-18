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
import { useEffect, useState } from 'react';
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

	const handleUpload = async () => {};

	const updateUser = async (profileImgUrl: string) => {};

	const validateData = () => {};

	const checkUsername = async (desiredUsername: string) => {};

	const onSave = () => {};

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
						name='instgram'
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
