import styled from 'styled-components/native';
import OpticonIcon from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const MenuContainer = styled.SafeAreaView`
	flex: 1;
	background-color: #222;
	padding: 20px;
	background-color: #242424;
`;

export const MenuIcon = styled.Image.attrs({
	testID: 'MenuIcon',
})``;

export const LinkWrapper = styled.TouchableOpacity`
	width: 100%;
	flex-direction: row;
	padding: 10px;
	align-items: center;
`;

export const LinkText = styled.Text`
	color: rgba(255, 255, 255, 0.85);
	font-family: Poppins_300Light;
	font-size: 18px;
	margin-left: 10px;
`;

export const HomeIcon = styled(OpticonIcon)``;

export const AccountIcon = styled(MaterialCommunityIcon)``;

export const GalleryIcon = styled(IonIcon)``;

export const LogutIcon = styled(IonIcon)``;
