import { Header } from '@/components';
import { permissions } from '@/config/permissions';
import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { css, useTheme } from 'styled-components/native';

interface ScreenProps {
	title?: string;
	children: ReactNode;
	initialPage?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({children, title, initialPage = false}) => {
	const theme = useTheme();

	const [hasPermission, setHasPermission] = useState(false);

	useEffect(() => {
		verifyPermission();
	}, [])

	const verifyPermission = async () => {
		try {
			setHasPermission(await permissions.verify())
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<SafeAreaView style={{
			flex: 1,
			justifyContent: 'flex-start',
			alignItems: 'center',
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
