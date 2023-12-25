import { useNavigation } from '@react-navigation/native';
import {
	FeaturedArtWrapper,
	ArtImage,
	ImagesWrapper,
	LinkWrapper,
	SectionTitle,
	SoldArtWrapper,
	SoldOverlay,
	Wrapper,
} from './Art.style';
import { useFonts, Questrial_400Regular } from '@expo-google-fonts/questrial';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const Art = () => {
	const navigation = useNavigation<DrawerNavigationProp<any>>();
	const [images, setImages] = useState<
		{
			id: string;
			currentOwner: string;
			creator: string;
			href: string;
			src: {
				uri: string;
			};
		}[]
	>([]);
	const [loaded, error] = useFonts({
		Questrial_400Regular,
	});

	useEffect(() => {
		const fetchArt = async () => {
			const db = getFirestore();
			const q = query(collection(db, 'art'));

			const querySnapshot = await getDocs(q);
			const storage = getStorage();

			const imageUrls = await Promise.all(
				querySnapshot.docs.map(async (doc) => {
					const { imageUrl, currentOwner, creator } = doc.data();
					const imageRef = ref(storage, imageUrl);
					const downloadUrl = await getDownloadURL(imageRef);
					return {
						id: doc.id,
						currentOwner,
						creator,
						href: downloadUrl,
						src: {
							uri: downloadUrl,
						},
					};
				})
			);

			setImages(imageUrls);
		};

		fetchArt().catch(console.error);
	}, []);

	return (
		<Wrapper>
			<FeaturedArtWrapper>
				<SectionTitle>Featured</SectionTitle>
				<ImagesWrapper>
					{images
						.filter((image) => image.currentOwner === image.creator)
						.map((image, index) => (
							<LinkWrapper
								key={index}
								onPress={() => navigation.navigate(`Art/${image.id}`)}
							>
								<ArtImage source={image.src} />
							</LinkWrapper>
						))}
				</ImagesWrapper>
			</FeaturedArtWrapper>
			<SoldArtWrapper>
				<SectionTitle>Sold</SectionTitle>
				<ImagesWrapper>
					{images
						.filter((image) => image.currentOwner !== image.creator)
						.map((image, index) => (
							<LinkWrapper
								key={index}
								onPress={() => navigation.navigate(`Art/${image.id}`)}
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

export default Art;
