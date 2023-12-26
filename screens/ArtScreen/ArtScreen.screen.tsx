import {
	DrawerContentComponentProps,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import { Container } from './ArtScreen.style';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import MenuScreen from '../../components/MenuScreen/MenuScreen.screen';
// import Header
// import Details
import { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Drawer = createDrawerNavigator();

export interface DetailsProps {
	creator: string;
	currentOwner: string;
	imageUrl: string;
	description: string;
	name: string;
	price: number;
}

const ArtScreen = ({ route }: { route: { params: { id: string } } }) => {
	const [loaded, error] = useFonts({
		Poppins_700Bold,
	});
	const [artDetails, setArtDetails] = useState<DetailsProps>(
		{} as DetailsProps
	);
	const [loading, setLoading] = useState<boolean>(false);

	console.log(route.params.id);

	useEffect(() => {
		if (!route.params.id) {
			return;
		}

		const fetchArtDetails = async () => {
			try {
				const db = getFirestore();
				const artRef = doc(db, 'art', route.params.id);
				const artSnap = await getDoc(artRef);

				if (artSnap.exists()) {
					const data = artSnap.data();
					const storage = getStorage();
					const imageRef = ref(storage, data?.imageUrl);
					const downloadUrl = await getDownloadURL(imageRef);

					setArtDetails({ ...data, imageUrl: downloadUrl } as DetailsProps);
				} else {
					console.log('No such document!');
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchArtDetails().catch(console.error);
	}, [route.params.id]);

	if (!loaded || error || !route.params.id) {
		return <></>;
	}

	return (
		<Container>
			{/* <Header /> */}
			{/* <Details /> */}
		</Container>
	);
};

const DrawerContent = (props: DrawerContentComponentProps) => {
	return <MenuScreen {...props} />;
};

const Wrapper = ({ route }: { route: { params: { id: string } } }) => {
	return (
		<Drawer.Navigator
			initialRouteName='Art'
			drawerContent={(props) => <DrawerContent {...props} />}
			screenOptions={{
				headerShown: false,
				drawerPosition: 'right',
			}}
		>
			<Drawer.Screen
				name='Art'
				// @ts-ignore
				component={ArtScreen}
				initialParams={{ id: route.params.id }}
			/>
		</Drawer.Navigator>
	);
};

export default Wrapper;
