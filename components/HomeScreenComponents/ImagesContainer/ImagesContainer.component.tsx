import {
	BigImg,
	SmallImg,
	TopContainer,
	ImagesContainerWrapper,
} from './ImagesContainer.style';

const ImagesContainer = () => {
	return (
		<ImagesContainerWrapper>
			<TopContainer>
				<SmallImg
					testID='smallImg1'
					source={require('../../../assets/images/home-page-digital-art1.png')}
				/>
				<SmallImg
					testID='smallImg2'
					source={require('../../../assets/images/home-page-digital-art2.png')}
				/>
			</TopContainer>
			<BigImg
				testID='bigImg'
				source={require('../../../assets/images/home-page-digital-art3.png')}
			/>
		</ImagesContainerWrapper>
	);
};

export default ImagesContainer;
