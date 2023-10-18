import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 88%;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;

export const Title = styled.Text`
	color: #fff;
	font-family: Poppins_500Medium;
	font-size: 24px;
`;

export const ImageContainer = styled.View`
	margin-top: 20px;
	width: 160px;
	height: 160px;
	background-color: tranparent;
	border-radius: 80px;
	align-self: center;
	border-color: #9263ff;
	border-width: 3px;
	shadow-color: #a463f8;
	shadow-offset: 0px 1px;
	shadow-opacity: 0.8;
	shadow-radius: 4px;
`;

export const StyledImage = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 80px;
	position: absolute;
`;

export const UploadIconContainer = styled.View`
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

export const RemoveImgButton = styled.TouchableOpacity`
	margin-top: 20px;
	background-color: red;
	border: 3px solid #000;
	padding: 10px;
	border-radius: 20px;
	width: 150px;
	align-self: center;
`;

export const RemoveImgButtonText = styled.Text`
	color: #fff;
	font-size: 20px;
	font-family: Poppins_600SemiBold;
	text-align: center;
`;

export const Label = styled.Text`
	margin-top: 20px;
	color: #fff;
	font-family: Poppins_400Regular;
	font-size: 18px;
	margin-bottom: 8px;
`;

export const TextInput = styled.TextInput.attrs({
	autoCapitalize: 'none',
	autoCorrect: false,
})`
	font-family: Poppins_300Light;
	font-size: 16px;
	padding: 10px;
	border-width: 1px;
	border-color: #ccc;
	border-radius: 8px;
	margin-bottom: 20px;
	color: #fff;
`;

export const InputErrorText = styled.Text`
	font-family: Poppins_300Light;
	color: red;
	font-size: 15px;
	margin-top: 5px;
`;

export const SocialMedia = styled.View`
	display: flex;
	flex-direction: column;
`;

export const SocialMediaEntity = styled.View`
    padding: 5px 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-width: 1px;
    border-color: #fff;
    border-radius: 5px;
    margin-bottom 10px;
`;

export const SocialMediaIcon = styled(Icon)``;

export const SocialMediaIcon2 = styled(Icon)``;

export const SocialMediaInput = styled.TextInput.attrs({
	autoCapitalize: 'none',
	autoCorrect: false,
})`
	margin-left: 10px;
	flex: 1;
	font-family: Poppins_300Light;
	font-size: 16px;
	padding: 10px;
	border-width: 0;
	border-color: transparent;
	margin-bottom: 0;
	color: #fff;
`;

export const SaveButton = styled.TouchableOpacity.attrs({
	testID: 'SaveButton',
})`
	margin-top: 20px;
	border-radius: 8px;
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.5;
	shadow-radius: 20px;
	elevation: 8;
	width: 100%;
	height: 60px;
	align-self: center;
`;

export const SaveButtonText = styled.Text`
	color: #fff;
	font-size: 18px;
	text-align: center;
	margin: 10px;
	font-family: Poppins_600SemiBold;
`;
