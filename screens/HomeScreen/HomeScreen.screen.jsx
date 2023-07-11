import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import {
	useFonts,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

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
			<ScreenTitle>
				<BolderTitlePart>Virtual </BolderTitlePart>
				gallery
			</ScreenTitle>
			<ImagesContainer>
				<TopContainer>
					<SmallImg
						source={require('../../assets/images/home-page-digital-art1.png')}
					/>
					<SmallImg
						source={require('../../assets/images/home-page-digital-art2.png')}
					/>
				</TopContainer>
				<BigImg
					source={require('../../assets/images/home-page-digital-art3.png')}
				/>
			</ImagesContainer>
			<IntroText>Become an artist or a collector</IntroText>
			<TouchableOpacity>
				<AuthBtn
					colors={['#B24E9D', '#7E3BA1']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<AuthBtnText>Log In</AuthBtnText>
				</AuthBtn>
			</TouchableOpacity>
			<TouchableOpacity>
				<AuthBtn
					colors={['#7E3BA1', '#B24E9D']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<AuthBtnText>Create account</AuthBtnText>
				</AuthBtn>
			</TouchableOpacity>
			<StatusBar style='auto' />
		</Container>
	);
}

const Container = styled.ImageBackground`
	flex: 1;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const ScreenTitle = styled.Text`
	margin-top: 40px;
	font-size: 36px;
	font-family: 'Poppins_500Medium';
	color: #fff;
	margin-bottom: 25px;
`;

const BolderTitlePart = styled.Text`
	font-size: 36px;
	font-family: 'Poppins_700Bold';
`;

const ImagesContainer = styled.View`
	flex-direction: column;
	width: 100%;
`;

const TopContainer = styled.View`
	padding: 10px;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

const SmallImg = styled.Image`
	width: 48%;
	border-radius: 7px;
`;

const BigImg = styled.Image`
	width: 96%;
	border-radius: 8px;
	align-self: center;
	margin-top: 15px;
`;

const IntroText = styled.Text`
	margin-top: 26px;
	font-size: 20px;
	font-family: 'Poppins_500Medium';
	color: #fff;
`;

const AuthBtn = styled(LinearGradient)`
	width: 200px;
	border-radius: 8px;
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.54;
	shadow-radius: 20px;
	elevation: 20;
	align-items: center;
	justify-content: center;
	padding: 10px;
	margin: 10px;
`;

const AuthBtnText = styled.Text`
	font-size: 20px;
	background-color: transparent;
	color: #fff;
`;
