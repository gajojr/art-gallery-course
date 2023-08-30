import React from 'react';
import { BolderTitlePart, ScreenTitleWrapper } from './ScreeTitle.style';
import {
	useFonts,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const ScreenTitle = () => {
	const [loaded, error] = useFonts({
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (error) {
		return <></>;
	}

	return (
		<ScreenTitleWrapper>
			<BolderTitlePart>Virtual </BolderTitlePart>
			gallery
		</ScreenTitleWrapper>
	);
};

export default ScreenTitle;
