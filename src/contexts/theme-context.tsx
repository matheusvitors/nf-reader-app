import { ReactNode, createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY } from "@/config/storage-keys";
import { useSystemTheme } from "@/hooks";
import { light, dark } from "@/styles/themes";

interface ThemeContextProps {
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_VALUES = {
	theme: 'light',
	setTheme: () => {}
}

export const SystemThemeContext = createContext<ThemeContextProps>(DEFAULT_VALUES);

export const SystemThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {

	const [theme, setTheme] = useState('light');
	const { getTheme } = useSystemTheme();

	useEffect(() => {
		loadTheme();
	}, []);

	const loadTheme = async () => {
		const savedTheme = await getTheme();
		if(!savedTheme) {
			await AsyncStorage.setItem(KEY.THEME, 'light');
		}
		setTheme(savedTheme ? savedTheme : 'light');
	}

	return (
		<SystemThemeContext.Provider value={{ theme, setTheme}}>
			<ThemeProvider theme={theme === 'light' ? light : dark}>
				{children}
			</ThemeProvider>
		</SystemThemeContext.Provider>
	)
}
