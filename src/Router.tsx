import React from "react";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { StatusBar } from "react-native";
import { FormScreen, HomeScreen } from "./screens";
import { NotaFiscal } from "@/interfaces";

export type RootStackParamsList = {
	Home: undefined;
	Form: NotaFiscal | undefined;
};

export type RootStackScreenProps = NativeStackNavigationProp<RootStackParamsList>;

const RootStack = createNativeStackNavigator<RootStackParamsList>();

export const Router: React.FC = () => {
	const theme = useTheme();

	return (
		<NavigationContainer>
			<StatusBar barStyle={theme.statusBar} hidden={false} translucent={true} backgroundColor={theme.common.background} />
			<RootStack.Navigator>
				<RootStack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
				<RootStack.Screen name='Form' component={FormScreen} options={{ headerShown: false }} />
			</RootStack.Navigator>
		</NavigationContainer>
	);
};
