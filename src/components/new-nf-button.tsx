import React from 'react';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import styled, { useTheme } from 'styled-components/native';
import { RootStackScreenProps } from '@/Router';

export const NewNFButton: React.FC = () => {
	const theme = useTheme();
	const navigation = useNavigation<RootStackScreenProps>()

	return (
		<Container onPress={() => navigation.navigate("Form")} backgroundColor={theme.button.background}>
			<Feather name='plus' size={30} color={theme.button.text} />
		</Container>
	);
}

const Container = styled.TouchableOpacity<{ backgroundColor?: string;}>`
	display: flex;
	align-items: center;
	justify-content: center;

	height: 50px;
	width: 50px;

	margin-left: 5px;
	margin-right: 5px;

	position: absolute;
	bottom: 15px;
	right: 10px;

	background-color: ${props => props.backgroundColor || props.theme.button.background};

	border-radius: 25px;
`
