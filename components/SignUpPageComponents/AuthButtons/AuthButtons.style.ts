import styled from 'styled-components/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export const Wrapper = styled.View`
	margin-top: 30px;
	width: 84%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const ButtonWrapper = styled.TouchableOpacity`
	width: 48%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #fff;
	border-radius: 7px;
	padding: 10px;
`;

export const Icon = styled(AntDesignIcon)``;
