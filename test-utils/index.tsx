import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../redux/store';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<NavigationContainer>{children}</NavigationContainer>
		</Provider>
	);
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
