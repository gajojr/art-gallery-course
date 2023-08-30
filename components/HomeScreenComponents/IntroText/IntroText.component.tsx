import { StyledText } from './IntroText.style';
import { Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';

const IntroText = () => {
	const [loaded, error] = useFonts({
		Poppins_500Medium,
	});

	if (error) {
		return <></>;
	}

	return <StyledText>Become an artist or a collector</StyledText>;
};

export default IntroText;
