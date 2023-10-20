import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 88%;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;

export const ImageContainer = styled.View`
	margin-top: 20px;
	margin-bottom: 20px;
	width: 160px;
	height: 160px;
	background-color: transparent;
	border-radius: 80px;
	align-self: center;
	border-color: #9263ff;
	border-width: 3px;
	shadow-color: #a463f8;
	shadow-offset: 0px 1px;
	shadow-opacity: 0.8;
	shadow-radius: 4px;
`;

export const StyledImage = styled.Image.attrs({
	testID: 'profileImg',
})`
	width: 100%;
	height: 100%;
	border-radius: 80px;
	position: absolute;
`;

export const Label = styled.Text`
	margin-top: 20px;
	color: #fff;
	font-family: Poppins_400Regular;
	font-size: 18px;
	margin-bottom: 8px;
`;

export const SocialMedia = styled.View`
	display: flex;
	flex-direction: column;
`;

export const SocialMediaEntity = styled.View`
	margin-top: 20px;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const SocialMediaIcon = styled(Icon)``;

export const SocialMediaIcon2 = styled(Icon2)``;
