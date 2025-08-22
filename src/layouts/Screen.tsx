import { Header } from '@/components';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
		<SafeAreaView style={{
			flex: 1,
			justifyContent: 'flex-start',
			alignItems: 'center',
			// marginBottom: insets.bottom,
			// paddingTop: insets.top,
			// paddingBottom: insets.bottom,
			// paddingLeft: insets.left,
			// paddingRight: insets.right,
			backgroundColor: theme.common.background
		}}>
			<Header title={title} intialPage={initialPage} />
			{children}
			<Footer />
		</SafeAreaView >
	);
}


const Footer = styled.View`

	height: 70px;
	width: 100%;

	position: absolute;
	bottom: 48px;
`
