import React from 'react';
import { render } from '../../../test-utils';
import IntroText from './IntroText.component';

describe('Intro Text', () => {
	it('renders the correct text', () => {
		const { queryByText } = render(<IntroText />);
		const introText = queryByText('Become an artist or a collector');
		expect(introText).toBeTruthy();
	});
});
