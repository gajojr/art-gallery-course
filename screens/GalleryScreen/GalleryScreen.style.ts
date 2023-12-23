import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

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
