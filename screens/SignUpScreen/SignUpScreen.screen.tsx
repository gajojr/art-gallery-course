import React from 'react';
import { Container } from './SignUpScreen.style';
import Header from '../../components/SignUpPageComponents/Header/Header.component';
import Form from '../../components/SignUpPageComponents/Form/Form.component';
import AuthButtons from '../../components/SignUpPageComponents/AuthButtons/AuthButtons.component';
import LogInLink from '../../components/SignUpPageComponents/LogInLink/LogInLink.component';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
	const navigation = useNavigation();

	return (
		<Container>
			<Header navigation={navigation} />
			<Form />
			<AuthButtons />
			<LogInLink navigation={navigation} />
		</Container>
	);
};

export default SignUp;
