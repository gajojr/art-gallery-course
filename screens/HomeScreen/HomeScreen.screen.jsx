import { StatusBar } from 'expo-status-bar';
import {
	useFonts,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { Container } from './HomeScreen.style';

import ScreenTitle from '../../components/HomeScreenComponents/ScreenTitle/ScreenTitle.component';
import ImagesContainer from '../../components/HomeScreenComponents/ImagesContainer/ImagesContainer.component';
import IntroText from '../../components/HomeScreenComponents/IntroText/IntroText.component';
import LogInBtn from '../../components/HomeScreenComponents/LogInBtn/LogInBtn.component';
import SignUpBtn from '../../components/HomeScreenComponents/SignUpBtn/SignUpBtn.component';

export default function HomeScreen() {
	const [loaded, error] = useFonts({
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (error) {
		return <></>;
	}

	return (
		<Container
			source={require('../../assets/images/home-page-background.png')}
			resizeMode='cover'
		>
			<ScreenTitle />
			<ImagesContainer />
			<IntroText />
			<LogInBtn />
			<SignUpBtn />
			<StatusBar style='auto' />
		</Container>
	);
}
