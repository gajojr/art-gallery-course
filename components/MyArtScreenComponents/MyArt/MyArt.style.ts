import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 100%;
	align-items: center;
	margin-top: 20px;
`;

export const AllArtWrapper = styled.View`
	width: 90%;
`;

export const SoldArtWrapper = styled.View`
	width: 90%;
`;

export const SectionTitle = styled.Text`
	color: #fff;
	font-family: Questrial_400Regular;
	font-size: 22px;
	margin-top: 5px;
`;

export const ImagesWrapper = styled.ScrollView.attrs({
	horizontal: true,
})`
	flex-direction: row;
	overflow-x: scroll;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const LinkWrapper = styled.TouchableOpacity`
	margin-right: 10px;
`;

export const ArtImage = styled.Image`
	border-radius: 10px;
`;

export const SoldOverlay = styled.Image`
	position: absolute;
	width: 50%;
	height: 50%;
	left: 50%;
	transform: rotate(30deg);
`;
