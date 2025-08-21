import { Header } from '@/components';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { css, useTheme } from 'styled-components/native';

interface ScreenProps {
	title?: string;
	children: ReactNode;
	initialPage?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({children, title, initialPage = false}) => {
	const insets = useSafeAreaInsets();
	const theme = useTheme();

	return (
		<View style={{
			flex: 1,
			justifyContent: 'flex-start',
			alignItems: 'center',
			paddingTop: insets.top,
			marginBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right,
			backgroundColor: theme.common.background
		}}>
			<Header title={title} intialPage={initialPage} />
			{children}
		</View >
	);
}
