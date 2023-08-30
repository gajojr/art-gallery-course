import React from 'react';
import { render } from '../../../test-utils';
import ImagesContainer from './ImagesContainer.component';

describe('Images Container', () => {
	it('renders three images', () => {
		const { queryByTestId } = render(<ImagesContainer />);
		const smallImg1 = queryByTestId('smallImg1');
		const smallImg2 = queryByTestId('smallImg2');
		const bigImg = queryByTestId('bigImg');

		expect(smallImg1).toBeTruthy();
		expect(smallImg2).toBeTruthy();
		expect(bigImg).toBeTruthy();
	});
});
