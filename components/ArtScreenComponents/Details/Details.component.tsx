import { useState } from 'react';
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
import { ActivityIndicator, Text } from 'react-native';

const Details = ({ id, details }: { id: string; details: DetailsProps }) => {
	const [loaded, error] = useFonts({
		Poppins_400Regular,
		Poppins_600SemiBold,
	});
	const [requestPending, setRequestPending] = useState(false);

	const buyArt = async () => {};

	console.log(details.currentOwner === store.getState().auth.username);

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
			<Creator>Created by {details.creator}</Creator>
			<Desription>{details.description}</Desription>
			{details.currentOwner !== store.getState().auth.username ? (
				<BuyButton onPress={buyArt}>
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
						{requestPending ? (
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
