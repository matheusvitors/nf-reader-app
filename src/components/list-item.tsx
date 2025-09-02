import { IconButton } from '@/components/icon-button';
import { NotaFiscal } from '@/interfaces';
import { RootStackScreenProps } from '@/Router';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

interface ListItemProps {
	item: NotaFiscal;
	handleDelete: (id: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({ item, handleDelete }) => {
	const theme = useTheme();
	const navigation = useNavigation<RootStackScreenProps>()

	return (
		<Container>
			<Informations>
				<Top>
					<Info>{new Date(item.data).toLocaleDateString('pt-BR')}</Info>
					<Info>{item.description}</Info>
				</Top>
				<Down>
					<Info>{item.link}</Info>
				</Down>
			</Informations>
			<Actions>
				<IconButton icon='edit' size={20} backgroundColor='transparent' textColor={theme.semantic.attention} onPress={() => navigation.navigate('Form', item)} />
				<IconButton icon='trash' size={20} backgroundColor='transparent' textColor={theme.semantic.warning} onPress={() => handleDelete(item.id!)} />
			</Actions>
		</Container>
	);
}

const Container = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	width: 98%;
	height: 70px;
	margin-bottom: 5px;

	background-color: ${props => props.theme.card.background};

	/* border-bottom-width: 1px;
	border-bottom-color: ${props => props.theme.common.text};
	border-bottom-style: solid ; */

	/* background-color: burlywood; */
`

const Informations = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 80%;
	height: 100%;

	/* background-color: cadetblue; */
`

const Top = styled.View`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;

	gap: 20px;

	width: 100%;
	height: 50%;
	padding-left: 20px ;
`

const Down = styled.View`
	display: flex;
	align-items: flex-start;
	justify-content: center;

	width: 100%;
	height: 50%;
	padding-left: 20px ;
`

const Info = styled.Text`
	color: ${props => props.theme.card.text};
`

const Actions = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	width: 20%;
	height: 100%;

	/* background-color: coral; */
`
