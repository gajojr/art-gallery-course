import React from 'react';
import { render } from '../../../test-utils';
import LogInBtn from './LogInBtn.component';

describe('Log In Btn', () => {
	it('renders the correct text', () => {
		const { queryByText } = render(<LogInBtn />);
		const logInBtn = queryByText('Log In');
		expect(logInBtn).toBeTruthy();
	});
});
