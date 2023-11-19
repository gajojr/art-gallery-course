import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import store from './redux/store';

import HomeScreen from './screens/HomeScreen/HomeScreen.screen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen.screen';
import SignInScreen from './screens/SignInScreen/SignInScreen.screen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.screen';
import MyArtScreen from './screens/MyArtScreen/MyArtScreen.screen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<ClerkProvider
			publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
		>
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
								headerBackVisible: false,
							}}
						/>
						<Stack.Screen
							name='SignIn'
							component={SignInScreen}
							options={{
								title: '',
								headerTransparent: true,
								headerBackVisible: false,
							}}
						/>
						<Stack.Screen
							name='Profile'
							component={ProfileScreen}
							options={{
								title: '',
								headerTransparent: true,
								headerBackVisible: false,
							}}
						/>
						<Stack.Screen
							name='MyArt'
							component={MyArtScreen}
							options={{
								title: '',
								headerTransparent: true,
								headerBackVisible: false,
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</ClerkProvider>
	);
}
