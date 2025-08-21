import React from 'react';
import Feather from '@react-native-vector-icons/feather';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useSystemTheme } from '@/hooks';
import { RootStackScreenProps } from '@/Router';

interface HeaderProps {
	title?: string;
	intialPage: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title = 'NF Reader', intialPage = false}) => {
	const theme = useTheme();
	const { theme: systemTheme, changeTheme } = useSystemTheme();
	const navigation = useNavigation<RootStackScreenProps>()

	return (
		<Container>
			<Left>
				{!intialPage && <Feather name='arrow-left' size={26} color={theme.common.text} onPress={() => navigation.goBack()}/>}
			</Left>
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
