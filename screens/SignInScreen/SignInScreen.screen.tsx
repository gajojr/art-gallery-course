import React from 'react';
import { Container } from './SingInScreen.style';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/SignInScreenComponents/Header/Header.component';
import Form from '../../components/SignInScreenComponents/Form/Form.component';
import AuthButton from '../../components/SignInScreenComponents/AuthButtons/AuthButton.component';
import SignUpLink from '../../components/SignInScreenComponents/SignUpLink/SignUpLink.component';

const SignUp = () => {
	const navigation = useNavigation();

	return (
		<Container>
			<Header />
			<Form />
			<AuthButton />
			<SignUpLink />
		</Container>
	);
};

export default SignUp;
