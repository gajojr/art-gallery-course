import styled from 'styled-components/native';

export const ImagesContainerWrapper = styled.View`
	flex-direction: column;
	width: 100%;
`;

export const TopContainer = styled.View`
	padding: 10px;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

export const SmallImg = styled.Image`
	width: 48%;
	border-radius: 7px;
`;

export const BigImg = styled.Image`
	width: 96%;
	border-radius: 8px;
	align-self: center;
	margin-top: 15px;
`;
