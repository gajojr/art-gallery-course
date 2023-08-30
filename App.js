import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';

import HomeScreen from './screens/HomeScreen/HomeScreen.screen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen.screen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={{
							title: '',
							headerTransparent: true,
						}}
					/>
					<Stack.Screen
						name='SignUp'
						component={SignUpScreen}
						options={{
							title: '',
							headerTransparent: true,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
