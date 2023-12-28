import {
	DrawerContentComponentProps,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import { Container, WrapperScroll } from './UserProfileScreen.style';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import MenuScreen from '../../components/MenuScreen/MenuScreen.screen';
import Header from '../../components/UserProfileScreenComponents/Header/Header.component';
import { useState, useEffect } from 'react';
import { IUser } from '../../redux/types/Auth';
import {
	DocumentData,
	QuerySnapshot,
	collection,
	getDocs,
	getFirestore,
	where,
	query,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Details from '../../components/UserProfileScreenComponents/Details/Details.component';
import ArtDetails from '../../components/UserProfileScreenComponents/ArtDetails/ArtDetails.component';

const Drawer = createDrawerNavigator();

export interface ArtDetailsProps {
	creator: string;
	currentOwner: string;
	description: string;
	imageUrl: string;
	name: string;
	price: number;
	id: string;
	href: string;
	src: {
		uri: string;
	};
}

const UserProfileScreen = ({
	route,
}: {
	route: { params: { username: string } };
}) => {
	const [userDetails, setUserDetails] = useState<IUser>({} as IUser);
	const [artDetails, setArtDetails] = useState<ArtDetailsProps[]>([]);
	const [loaded, error] = useFonts({
		Poppins_700Bold,
	});

	useEffect(() => {
		const fetchUserAndArtDetails = async () => {
			const username = route.params.username;
			if (!username) {
				return;
			}

			try {
				const db = getFirestore();
				const userQuery = query(
					collection(db, 'users'),
					where('username', '==', username)
				);
				const userSnap = await getDocs(userQuery);

				if (userSnap.empty) {
					return;
				} else {
					console.log('No user found');
				}

				const userData = userSnap.docs[0].data();
				setUserDetails(userData as IUser);

				const creatorQuery = query(
					collection(db, 'art'),
					where('creator', '==', username)
				);
				const creatorSnap = await getDocs(creatorQuery);

				const ownerQuery = query(
					collection(db, 'art'),
					where('currentOwner', '==', username)
				);
				const ownerSnap = await getDocs(ownerQuery);

				const artDetailsSet = new Set<ArtDetailsProps>();
				const storage = getStorage();

				const addArtDetails = async (snap: QuerySnapshot<DocumentData>) => {
					for (const docSnap of snap.docs) {
						const data = docSnap.data();
						const imageRef = ref(storage, data.imageUrl);
						const downloadUrl = await getDownloadURL(imageRef);
						artDetailsSet.add({
							...data,
							imageUrl: downloadUrl,
							src: {
								uri: downloadUrl,
							},
						} as ArtDetailsProps);
					}
				};

				await Promise.all([
					addArtDetails(creatorSnap),
					addArtDetails(ownerSnap),
				]);

				setArtDetails([...artDetailsSet]);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserAndArtDetails().catch(console.error);
	}, [route.params.username]);

	if (!loaded || error) {
		return <></>;
	}

	return (
		<Container>
			<WrapperScroll contentContainerStyle={{ alignItems: 'center' }}>
				<Header />
				<Details user={userDetails as IUser} />
				<ArtDetails images={artDetails as ArtDetailsProps[]} />
			</WrapperScroll>
		</Container>
	);
};

const DrawerContent = (props: DrawerContentComponentProps) => {
	return <MenuScreen {...props} />;
};

const Wrapper = ({ route }: { route: { params: { username: string } } }) => {
	return (
		<Drawer.Navigator
			initialRouteName='UserProfile'
			screenOptions={{
				drawerPosition: 'right',
				headerShown: false,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name='UserProfile'
				// @ts-ignore
				component={UserProfileScreen}
				initialParams={{ username: route.params.username }}
			/>
		</Drawer.Navigator>
	);
};

export default Wrapper;
