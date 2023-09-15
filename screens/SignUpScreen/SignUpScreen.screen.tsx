import React from 'react';
import { Container } from './SignUpScreen.style';
import Header from '../../components/SignUpPageComponents/Header/Header.component';
import Form from '../../components/SignUpPageComponents/Form/Form.component';
import AuthButtons from '../../components/SignUpPageComponents/AuthButtons/AuthButtons.component';
import LogInLink from '../../components/SignUpPageComponents/LogInLink/LogInLink.component';

const SignUp = () => {
	return (
		<Container>
			<Header />
			<Form />
			<AuthButtons />
			<LogInLink />
		</Container>
	);
};

export default SignUp;
