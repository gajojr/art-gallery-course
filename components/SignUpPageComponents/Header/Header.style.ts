import { styled } from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

export const HeaderComponent = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 84%;
`;

export const PageTitle = styled.Text`
	color: #fff;
	text-align: center;
	font-family: Poppins_500Medium;
	font-size: 19px;
`;

export const IconWrapper = styled.TouchableOpacity`
	padding: 6px;
	border: 2px solid #fff;
	border-radius: 10px;
`;

export const ArrowIcon = styled(Icon)``;

export const PlaceholderView = styled.View`
	width: 40px;
	height: 1px;
`;
