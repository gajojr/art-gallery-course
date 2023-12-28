import {
	ArtImage,
	FeaturedArtWrapper,
	ImagesWrapper,
	LinkWrapper,
	SectionTitle,
	SoldArtWrapper,
	SoldOverlay,
	Wrapper,
} from './ArtDetails.style';
import {
	useFonts,
	Poppins_400Regular,
	Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const ArtDetails = ({
	images,
}: {
	images: {
		id: string;
		currentOwner: string;
		creator: string;
		href: string;
		src: {
			uri: string;
		};
	}[];
}) => {
	const navigation = useNavigation<DrawerNavigationProp<any>>();
	const [loaded, error] = useFonts({
		Poppins_400Regular,
		Poppins_600SemiBold,
	});

	if (!loaded || error) {
		return <></>;
	}

	return (
		<Wrapper contentContainerStyle={{ alignItems: 'center' }}>
			<FeaturedArtWrapper testID='FeaturedArtWrapper'>
				<SectionTitle>Featured</SectionTitle>
				<ImagesWrapper>
					{images
						.filter((image) => image.currentOwner === image.creator)
						.map((image) => {
							return (
								<LinkWrapper
									testID={`LinkWrapper-${image.id}`}
									key={image.id}
									onPress={() => navigation.navigate('Art', { id: image.id })}
								>
									<ArtImage
										testID='FeaturedImage'
										source={image.src}
									/>
								</LinkWrapper>
							);
						})}
				</ImagesWrapper>
			</FeaturedArtWrapper>
			<SoldArtWrapper testID='SoldArtWrapper'>
				<SectionTitle>Sold</SectionTitle>
				<ImagesWrapper>
					{images
						.filter((image) => image.currentOwner !== image.creator)
						.map((image) => {
							return (
								<LinkWrapper
									key={image.id}
									onPress={() => navigation.navigate('Art', { id: image.id })}
								>
									<ArtImage
										testID='SoldImage'
										source={image.src}
									/>
									<SoldOverlay
										source={require('../../../assets/images/sold.png')}
									/>
								</LinkWrapper>
							);
						})}
				</ImagesWrapper>
			</SoldArtWrapper>
		</Wrapper>
	);
};

export default ArtDetails;
