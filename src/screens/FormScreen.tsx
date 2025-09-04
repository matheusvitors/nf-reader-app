import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import styled, { useTheme } from "styled-components/native";
import { Screen } from "@/layouts";
import { RootStackParamsList, RootStackScreenProps } from "@/Router";
import { Button, QRCodeButton, QrCodeScanner, Text, TextInput } from "@/components";
import { Alert } from "react-native";
import { createNotaFiscal, editNotaFiscal } from "@/services";
import { NotaFiscal } from "@/interfaces";
import { parseData } from "@/utils/parseData";
import DateTimePicker, { DateType, useDefaultStyles } from "react-native-ui-datepicker";
import { format } from "date-fns";

export const FormScreen: React.FC = () => {
	const navigation = useNavigation<RootStackScreenProps>();
	const { params } = useRoute<RouteProp<RootStackParamsList, "Form">>();
	const theme = useTheme();
	const defaultStyles = useDefaultStyles(theme.name);

	const [description, setDescription] = useState(params?.description || "");
	const [link, setLink] = useState(params?.link || "");
	const [data, setData] = useState<Date>(params?.data ? new Date(params.data) : new Date());
	const [isLoading, setIsLoading] = useState(false);
	const [showCamera, setShowCamera] = useState(false);

	useEffect(() => {
		link.length > 0 && setShowCamera(false);
	}, [])

	useEffect(() => {
		showCamera && setLink('');
	}, [showCamera])

	const handleSave = async () => {
		try {
			if(data) {
				setIsLoading(true);
				const input: NotaFiscal = {
					id: params?.id || undefined,
					description,
					link,
					data: format(data, 'yyyy-MM-dd'),
					check: params?.check || false,
				};
				params ? await editNotaFiscal(input) : await createNotaFiscal(input);
				navigation.navigate("Home");
			}
		} catch (error: any) {
			console.error(error);
			Alert.alert("Erro!", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const onReadCode = (value: string) => {
		setLink(value)
	}

	return (
		<Screen title='Formulário'>
			<Content>
				<TextInput label='Descrição' value={description} onChangeText={(text) => setDescription(text)} />

				<DateTimePicker
					mode='single'
					locale="pt-BR"
					date={data} onChange={({ date }) => setData(date as Date)}
					styles={defaultStyles}
					style={{marginTop: 10, marginBottom: 20}}
				/>
				<LinkField>
					<LinkInfo>
						<Item>Link</Item>
						<Item>{link}</Item>
					</LinkInfo>
					<ActionLink>
						<QRCodeButton onPress={() => setShowCamera(!showCamera)} />
					</ActionLink>
				</LinkField>
			</Content>
			<Footer>
				<Button label='salvar' onPress={handleSave} loading={isLoading} />
			</Footer>
			{showCamera &&
				<QrCodeScanner setIsCameraShown={setShowCamera} onReadCode={onReadCode} />
			}
		</Screen>
	);
};

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
	/* margin-top: -15px; */
`;

const LinkInfo = styled.View`
	align-items: flex-start;
	width: 80%;
`;

const ActionLink = styled.View`
	align-items: flex-end;
	width: 20%;
`;

const Item = styled.Text`
	color: ${(props) => props.theme.textInput.text};
	font-size: 16px;
`;

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
	bottom: 48px;
`;
