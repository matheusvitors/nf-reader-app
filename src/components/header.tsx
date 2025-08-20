import Feather from '@react-native-vector-icons/feather';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { useSystemTheme } from '@/hooks';

interface HeaderProps {
	title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'NF Reader'}) => {
	const theme = useTheme();
	const { theme: systemTheme, changeTheme } = useSystemTheme()

	return (
		<Container>
			<Left></Left>
			<Center>
				<Title>{title}</Title>
			</Center>
			<Right>
				<Feather name={systemTheme === 'light' ? 'sun' : 'moon'} size={26} color={theme.icon} onPress={() => changeTheme(systemTheme === 'light' ? 'dark' : 'light')}/>
			</Right>
		</Container>
	);
}

const Container = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	width: 100%;
	height: 50px;

	/* border-bottom-width: 1px; */
`

const Left = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 15%;
	height: 50px;

	/* background-color: red; */
`

const Center = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 70%;
	height: 50px;

	/* background-color: green; */

`

const Right = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 15%;
	height: 50px;

	/* background-color: blue; */

`


const Title = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: ${props => props.theme.common.text};
`
