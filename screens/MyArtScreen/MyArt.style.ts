import { StatusBar, TouchableOpacityProps } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.SafeAreaView`
	width: 100%;
	height: 100%;
	align-items: center;
	background-color: #1b1b1b;
	padding-top: ${StatusBar.currentHeight}px;
`;

export const FormWrapper = styled.ScrollView`
	width: 100%;
	flex-direction: column;
`;

export const OptionsWrappers = styled.View`
	margin-top: 30px;
	width: 90%;
	display: flex;
	flex-direction: row;
	border: 1px solid #9263ff;
	border-radius: 10px;
`;

const optionBtnStyle = css`
	text-align: center;
	flex: 1;
	padding: 15px;
`;

export const ViewProfileOptions = styled.TouchableOpacity<
	TouchableOpacityProps & { active: boolean }
>`
	${optionBtnStyle}
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;
	background-color: ${({ active }) => (active ? '#9263ff' : 'transparent')};
`;

export const EditProfileOptions = styled.TouchableOpacity<
	TouchableOpacityProps & { active: boolean }
>`
	${optionBtnStyle}
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;
	background-color: ${({ active }) => (active ? '#9263ff' : 'transparent')};
`;

export const ButtonText = styled.Text`
	color: #fff;
	font-size: 18px;
	text-align: center;
	font-family: Poppins_700Bold;
`;
