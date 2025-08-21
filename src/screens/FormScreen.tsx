import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Screen } from '@/layouts';
import { RootStackParamsList, RootStackScreenProps } from '@/Router';
import { Button, QRCodeButton, Text, TextInput } from '@/components';

export const FormScreen: React.FC = () => {

	const navigation = useNavigation<RootStackScreenProps>()
	const { params } = useRoute<RouteProp<RootStackParamsList, "Form">>();

	const [description, setDescription] = useState(params?.description || '');
	const [link, setLink] = useState(params?.link || '');
	const [data, setData] = useState(params?.data ? new Date(params.data).toLocaleDateString('pt-BR') : '');

	return (
		<Screen title='Formulário'>
			<Content>
				<TextInput label='Descrição' value={description} onChangeText={() => { }} />
				<TextInput label='Data' value={data} onChangeText={() => { }} />
				<LinkField>
				<LinkInfo>
					<Item>Link</Item>
					<Item>{link}</Item>
				</LinkInfo>
				<ActionLink>
					<QRCodeButton onPress={() => {}} />
				</ActionLink>
				</LinkField>
			</Content>
			<Footer>
				<Button label='salvar' onPress={() => {}} />
			</Footer>
		</Screen>
	);
}

const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: flex-start;

	width: 100%;
	height: 100%;

	padding-bottom: 10px;
	padding-top: 20px;
`;

const LinkField = styled.View`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: row;

	width: 95%;
	height: 70px;
	margin-top: -15px;
`

const LinkInfo = styled.View`
	align-items: flex-start;
	width: 80%;
`

const ActionLink = styled.View`
	align-items: flex-end;
	width: 20%;
`

const Item = styled.Text`
	color: ${props => props.theme.textInput.text};
	font-size: 16px;
`

const Footer = styled.View`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;

	height: 70px;
	width: 100%;

	padding-left: 10px;
	padding-right: 10px;

	position: absolute;
	bottom: 0;
`
