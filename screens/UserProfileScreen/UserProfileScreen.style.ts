import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.SafeAreaView`
	width: 100%;
	align-items: center;
	background-color: #1b1b1b;
	padding-top: ${StatusBar.currentHeight}px;
`;

export const WrapperScroll = styled.ScrollView`
	width: 100%;
	background-color: #1b1b1b;
`;
