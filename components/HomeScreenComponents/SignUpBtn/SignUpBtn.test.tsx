import React from 'react';
import { render } from '../../../test-utils';
import SignUpBtn from './SignUpBtn.component';

describe('Sign Up Btn', () => {
	it('renders the correct text', () => {
		const { queryByText } = render(<SignUpBtn />);
		const signUpBtn = queryByText('Create account');
		expect(signUpBtn).toBeTruthy();
	});
});
