import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 100%;
	align-items: center;
`;

export const Image = styled.Image`
	width: 100%;
	height: 300px;
	margin-top: 20px;
`;

export const NameAndPriceWrapper = styled.View`
	margin-top: 20px;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 15px;
`;

export const Name = styled.Text`
	color: #fff;
	font-size: 28px;
	font-family: Poppins_600SemiBold;
`;

export const Price = styled.Text`
	color: #fff;
	font-family: Poppins_400Regular;
	font-size: 22px;
`;

export const Desription = styled.Text`
	color: rgba(255, 255, 255, 0.64);
	font-family: Poppins_400Regular;
	font-size: 12px;
	margin-top: 10px;
	padding-left: 15px;
	align-self: flex-start;
`;

export const Creator = styled.Text`
	color: rgba(255, 255, 255, 0.64);
	font-family: Poppins_400Regular;
	font-size: 18px;
	margin-top: 10px;
	padding-left: 15px;
	align-self: flex-start;
`;

export const BuyButton = styled.TouchableOpacity.attrs({
	testID: 'BuyButton',
})`
	margin-top: 20px;
	border-radius: 8px;
	shadow-color: #000;
	shadow-offset: 0 4px;
	shadow-opacity: 0.5;
	shadow-radius: 20px;
	elevation: 8;
	width: 88%;
	height: 60px;
`;

export const BuyButtonText = styled.Text`
	color: #fff;
	font-family: Poppins_400Regular;
	font-size: 18px;
	text-align: center;
	margin: 10px;
`;
