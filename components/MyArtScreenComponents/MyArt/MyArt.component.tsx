import {
	AllArtWrapper,
	ArtImage,
	ImagesWrapper,
	LinkWrapper,
	SectionTitle,
	SoldArtWrapper,
	SoldOverlay,
	Wrapper,
} from './MyArt.style';
import { useFonts, Questrial_400Regular } from '@expo-google-fonts/questrial';

const images = [
	{
		href: 'https://www.google.com/',
		src: require('../../../assets/images/nft1.png'),
	},
	{
		href: 'https://www.google.com/',
		src: require('../../../assets/images/nft2.png'),
	},
	{
		href: 'https://www.google.com/',
		src: require('../../../assets/images/nft1.png'),
	},
	{
		href: 'https://www.google.com/',
		src: require('../../../assets/images/nft2.png'),
	},
];

const MyArt = () => {
	const [loaded, error] = useFonts({
		Questrial_400Regular,
	});

	if (!loaded || error) {
		return null;
	}

	return (
		<Wrapper>
			<AllArtWrapper>
				<SectionTitle>All</SectionTitle>
				<ImagesWrapper>
					{images.map((image, index) => (
						<LinkWrapper
							onPress={() => console.log(image.href)}
							key={index}
						>
							<ArtImage source={image.src} />
						</LinkWrapper>
					))}
				</ImagesWrapper>
			</AllArtWrapper>
			<SoldArtWrapper>
				<SectionTitle>Sold</SectionTitle>
				<ImagesWrapper>
					{images.map((image, index) => (
						<LinkWrapper
							onPress={() => console.log(image.href)}
							key={index}
						>
							<ArtImage source={image.src} />
							<SoldOverlay
								source={require('../../../assets/images/sold.png')}
							/>
						</LinkWrapper>
					))}
				</ImagesWrapper>
			</SoldArtWrapper>
		</Wrapper>
	);
};

export default MyArt;
