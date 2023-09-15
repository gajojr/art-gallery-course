import { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
	Poppins_300Light,
	Poppins_400Regular,
	useFonts,
} from '@expo-google-fonts/poppins';
import {
	CheckboxContainer,
	CheckboxText,
	ConfirmationInput,
	CreateAccountButton,
	CreateAccountButtonText,
	FormComponent,
	Input,
	InputErrorText,
	Label,
	PasswordInputWrapper,
	VerifyAccountButtonText,
	VerifyButton,
} from './Form.style';
import { LinearGradient } from 'expo-linear-gradient';
import { useSignUp } from '@clerk/clerk-expo';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../../firebase-config';
import { useDispatch } from 'react-redux';
import {
	selectAuthType,
	selectAuthenticated,
	selectEmailAddress,
	selectFullname,
} from '../../../redux/reducers/Auth';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const Form = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [loaded, error] = useFonts({
		Poppins_300Light,
		Poppins_400Regular,
	});

	const { isLoaded, signUp, setActive } = useSignUp();

	const [email, setEmail] = useState('');
	const [fullname, setFullname] = useState('');
	const [password, setPassoword] = useState('');

	const [isFocusedEmail, setIsFocusedEmail] = useState(false);
	const [isFocusedFullName, setIsFocusedFullName] = useState(false);
	const [isFocusedPassword, setIsFocusedPassword] = useState(false);

	const [emailInputError, setEmailInputError] = useState('');
	const [fullnameInputError, setFullnameInputError] = useState('');
	const [passwordInputError, setPasswordInputError] = useState('');

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isChecked, setIsCheked] = useState(false);

	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState(['', '', '', '', '', '']);

	function validateData() {}

	const onSignUpPress = async () => {};

	const onPressVerify = async () => {};

	if (!loaded || error) {
		return <></>;
	}

	return (
		<FormComponent>
			<Label>Email</Label>
			<Input
				editable={!pendingVerification}
				value={email}
				onChangeText={(email: string) => setEmail(email)}
				placeholder='artist@gmail.com'
				placeholderTextColor='#757575'
				onFocus={() => setIsFocusedEmail(true)}
				onBlur={() => setIsFocusedEmail(false)}
				isFocused={isFocusedEmail}
				style={{
					borderColor: isFocusedEmail ? '#A463F8' : '#fff',
					backgroundColor: isFocusedEmail ? '#000' : 'transparent',
				}}
			/>
			{emailInputError && <InputErrorText>{emailInputError}</InputErrorText>}

			<Label>Full Name</Label>
			<Input
				editable={!pendingVerification}
				value={fullname}
				onChangeText={(fullname: string) => setFullname(fullname)}
				placeholder='John Doe'
				placeholderTextColor='#757575'
				onFocus={() => setIsFocusedFullName(true)}
				onBlur={() => setIsFocusedFullName(false)}
				isFocused={isFocusedFullName}
				style={{
					borderColor: isFocusedFullName ? '#A463F8' : '#fff',
					backgroundColor: isFocusedFullName ? '#000' : 'transparent',
				}}
			/>
			{fullnameInputError && (
				<InputErrorText>{fullnameInputError}</InputErrorText>
			)}

			<Label>Password</Label>
			<PasswordInputWrapper isFocused={isFocusedPassword}>
				<Input
					editable={!pendingVerification}
					value={password}
					onChangeText={(password: string) => setPassoword(password)}
					placeholder='at least 8 characters'
					placeholderTextColor='#757575'
					secureTextEntry={!isPasswordVisible}
					onFocus={() => setIsFocusedPassword(true)}
					onBlur={() => setIsFocusedPassword(false)}
					isFocused={isFocusedPassword}
					style={{
						borderColor: isFocusedPassword ? '#A463F8' : '#fff',
						backgroundColor: isFocusedPassword ? '#000' : 'transparent',
					}}
				/>
				<TouchableOpacity
					style={{ padding: 10 }}
					onPress={() => setIsPasswordVisible(!isPasswordVisible)}
				>
					<Icon
						name={isPasswordVisible ? 'eye-with-line' : 'eye'}
						color='#fff'
						size={26}
					/>
				</TouchableOpacity>
			</PasswordInputWrapper>
			{passwordInputError && (
				<InputErrorText>{passwordInputError}</InputErrorText>
			)}
		</FormComponent>
	);
};

export default Form;
