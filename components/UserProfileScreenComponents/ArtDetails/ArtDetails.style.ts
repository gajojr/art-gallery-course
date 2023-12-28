import styled from 'styled-components/native';

export const Wrapper = styled.ScrollView`
	width: 100%;
	margin-top: 20px;
`;

export const FeaturedArtWrapper = styled.View`
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
	overflox-x: scroll;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const LinkWrapper = styled.TouchableOpacity`
	margin-right: 10px;
`;

export const ArtImage = styled.Image`
	width: 170px;
	height: 170px;
	border-radius: 10px;
`;

export const SoldOverlay = styled.Image.attrs({
	testID: 'SoldOverlay',
})`
	position: absolute;
	width: 50%;
	height: 50%;
	left: 50%;
	transform: rotate(30deg);
`;
