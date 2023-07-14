import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const AuthBtn = styled(LinearGradient)`
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

export const AuthBtnText = styled.Text`
	font-size: 20px;
	background-color: transparent;
	color: #fff;
`;
