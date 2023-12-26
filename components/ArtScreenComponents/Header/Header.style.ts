import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

export const HeaderComponent = styled.View.attrs({
	testID: 'HeaderComponent',
})`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 84%;
`;

export const IconWrapper = styled.TouchableOpacity.attrs({
	testID: 'IconWrapper',
})`
	padding: 6px;
	border-radius: 10px;
	border: 2px solid #fff;
`;

export const ArrowIcon = styled(Icon).attrs({
	testID: 'ArrowIcon',
})``;

export const MenuIconWrapper = styled.TouchableOpacity``;

export const MenuIcon = styled.Image.attrs({
	testID: 'MenuIcon',
})``;
