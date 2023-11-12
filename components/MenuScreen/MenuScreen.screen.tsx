import { View, Text } from 'react-native';
import React from 'react';
import { Container } from './MenuScreen.style';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

const MenuScreen = ({
	navigation,
}: {
	navigation: DrawerNavigationHelpers;
}) => {
	return (
		<Container>
			<Text>MenuScreen.screen</Text>
		</Container>
	);
};

export default MenuScreen;
