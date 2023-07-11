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
					source={require('../../../assets/images/home-page-digital-art1.png')}
				/>
				<SmallImg
					source={require('../../../assets/images/home-page-digital-art2.png')}
				/>
			</TopContainer>
			<BigImg
				source={require('../../../assets/images/home-page-digital-art3.png')}
			/>
		</ImagesContainerWrapper>
	);
};

export default ImagesContainer;
