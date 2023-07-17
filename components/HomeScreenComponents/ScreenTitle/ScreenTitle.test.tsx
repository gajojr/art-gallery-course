import React from 'react';
import { render } from '../../../test-utils';
import ScreenTitle from './ScreenTitle.component';

describe('Screen Title', () => {
	it('renders the correct text', () => {
		const { queryByText } = render(<ScreenTitle />);
		const screenTitle = queryByText('Virtual gallery');
		expect(screenTitle).toBeTruthy();
	});
});
