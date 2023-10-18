import styled, { css } from 'styled-components/native';
import { StatusBar, TouchableOpacityProps } from 'react-native';

export const Container = styled.SafeAreaView`
	width: 100%;
	height: 100%;
	align-items: center;
	background-color: #1b1b1b;
	padding-top: ${StatusBar.currentHeight}px;
`;

export const FormWrapper = styled.ScrollView`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const OptionsWrapper = styled.View`
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

export const ViewProfileOption = styled.TouchableOpacity<
	TouchableOpacityProps & { active: boolean }
>`
	${optionBtnStyle};
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;
	background-color: ${({ active }) => (active ? '#9263ff' : 'transparent')};
`;

export const EditProfileOptions = styled.TouchableOpacity<
	TouchableOpacityProps & { active: boolean }
>`
	${optionBtnStyle};
	border-bottom-right-radius: 10px;
	border-top-right-radius: 10px;
	background-color: ${({ active }) => (active ? '#9263ff' : 'transparent')};
`;

export const ButtonText = styled.Text`
	color: #fff;
	font-family: Poppins_700Bold;
	font-size: 18px;
	text-align: center;
`;
