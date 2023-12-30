import { useState, useEffect } from 'react';
import {
	BuyButton,
	BuyButtonText,
	Creator,
	Desription,
	Image,
	Name,
	NameAndPriceWrapper,
	Price,
	Wrapper,
} from './Details.style';
import {
	useFonts,
	Poppins_400Regular,
	Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { DetailsProps } from '../../../screens/ArtScreen/ArtScreen.screen';
import store from '../../../redux/store';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useStripe } from '@stripe/stripe-react-native';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import Constants from 'expo-constants';

const Details = ({
	id,
	details,
	setArtDetails,
}: {
	id: string;
	details: DetailsProps;
	setArtDetails: (details: DetailsProps) => void;
}) => {
	const navigation = useNavigation<DrawerNavigationProp<any>>();
	const [loaded, error] = useFonts({
		Poppins_400Regular,
		Poppins_600SemiBold,
	});
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const [loading, setLoading] = useState<boolean>(false);

	const fetchPaymentSheetParams = async (price: number) => {
		const response = await fetch(
			`${Constants?.expoConfig?.extra?.stripeApiUrl}payment-sheet`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					price,
				}),
			}
		);

		const { paymentIntent, ephemeralKey, customer } = await response.json();

		return {
			paymentIntent,
			ephemeralKey,
			customer,
		};
	};

	const initializePaymentSheet = async () => {
		console.log(details);
		const { paymentIntent, ephemeralKey, customer } =
			await fetchPaymentSheetParams(details.price);

		const { error } = await initPaymentSheet({
			merchantDisplayName: 'Art Gallery',
			customerId: customer,
			customerEphemeralKeySecret: ephemeralKey,
			paymentIntentClientSecret: paymentIntent,
			defaultBillingDetails: {
				name: store.getState().auth.username,
			},
		});

		if (error) {
			Alert.alert('Error', 'Failed to initialize payment sheet');
		}
	};

	const openPaymentSheet = async () => {
		setLoading(true);

		const { error } = await presentPaymentSheet();

		if (error) {
			Alert.alert('Error', 'Payment failed');
		} else {
			Alert.alert('Success', 'Payment succeeded');

			try {
				const db = getFirestore();
				const artRef = doc(db, 'art', id);
				const newOwner = store.getState().auth.username;

				await updateDoc(artRef, {
					currentOwner: newOwner,
				});

				setArtDetails({
					...details,
					currentOwner: newOwner,
				});
			} catch (error) {
				console.log('Error updating document', error);
				Alert.alert('Error', 'Failed to update document');
			}
		}

		setLoading(false);
	};

	useEffect(() => {
		if (!details.price) {
			return;
		}
		initializePaymentSheet();
	}, [details]);

	if (!loaded || error) {
		return <></>;
	}

	return (
		<Wrapper>
			<Image source={{ uri: details.imageUrl }} />
			<NameAndPriceWrapper>
				<Name>{details.name}</Name>
				<Price>{details.price} USD</Price>
			</NameAndPriceWrapper>
			<Creator>
				Created by
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('UserProfile', { username: details.creator })
					}
				>
					<Creator> {details.creator}</Creator>
				</TouchableOpacity>
			</Creator>
			<Desription>{details.description}</Desription>
			{details.currentOwner !== store.getState().auth.username ? (
				<BuyButton onPress={openPaymentSheet}>
					<LinearGradient
						colors={['#b24e9d', '#7e3ba1']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={{
							borderRadius: 8,
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
						}}
					>
						<BuyButtonText>Buy Now</BuyButtonText>
						{loading ? (
							<ActivityIndicator
								color='#fff'
								style={{ marginLeft: 10 }}
							/>
						) : null}
					</LinearGradient>
				</BuyButton>
			) : null}
		</Wrapper>
	);
};

export default Details;
