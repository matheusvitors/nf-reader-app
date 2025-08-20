import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'styled-components/native';

export const Loader: React.FC<ActivityIndicatorProps> = ({ color, size }) => {

	const theme = useTheme()

	return (
		<ActivityIndicator color={color || theme.colors.primary} size={size}/>
	);
}
