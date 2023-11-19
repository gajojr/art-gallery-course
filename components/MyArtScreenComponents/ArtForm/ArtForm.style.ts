import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

export const Wrapper = styled.View`
	width: 100%;
	align-items: center;
	margin-top: 20px;
`;

export const Title = styled.Text`
	color: #fff;
	font-family: Poppins_600SemiBold;
	font-size: 24px;
`;

export const ImageInputWrapper = styled.View`
	width: 200px;
	height: 200px;
	border: 1px solid #9263ff;
	margin-top: 20px;
	align-items: center;
	justify-content: center;
`;

export const PlusIconWrapper = styled.TouchableOpacity``;

export const PlusIcon = styled(Icon)``;

export const UploadedImage = styled.Image`
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

export const TextInputWrapper = styled.View`
	width: 88%;
	margin-top: 20px;
`;

export const Label = styled.Text`
	color: #fff;
	font-family: Poppins_600SemiBold;
	font-size: 18px;
	margin-bottom: 10px;
`;

export const StyledTextInput = styled.TextInput.attrs({
	autoCapitalize: 'none',
	autoCorrect: false,
})`
	border: 1px solid #9263ff;
	border-radius: 10px;
	padding: 10px;
	color: #fff;
	font-size: 18px;
`;

export const PublishButton = styled.TouchableOpacity.attrs({
	testID: 'SignInButton',
})`
	margin-top: 20px;
	border-radius: 8px;
	shadow-color: #000;
	shadow-offset: 0 4px;
	shadow-opacity: 0.5;
	shadow-radius: 20px;
	elevation: 8;
	widht: 88%;
	height: 60px;
`;

export const PublishButtonText = styled.Text`
	color: #fff;
	font-size: 18px;
	text-align: center;
	margin: 10px;
	font-family: Poppins_400Regular;
`;
