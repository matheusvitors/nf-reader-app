import React, { useEffect, useState } from "react";
import Feather from "@react-native-vector-icons/feather";
import styled, { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useSystemTheme } from "@/hooks";
import { RootStackScreenProps } from "@/Router";
import { permissions } from "@/config/permissions";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "@/components/text-input";
import { Button } from "@/components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY } from "@/config/storage-keys";
import axios from "axios";

interface HeaderProps {
	title?: string;
	intialPage: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title = "NF Reader", intialPage = false }) => {
	const theme = useTheme();
	const { theme: systemTheme, changeTheme } = useSystemTheme();
	const navigation = useNavigation<RootStackScreenProps>();

	const [hasPermission, setHasPermission] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		(async () => {
			setHasPermission(await permissions.verify());
		})();
	}, []);

	const changePort = async (port: string) => {
		const url = `http://192.168.0.${port}:7010`;
		await AsyncStorage.setItem(KEY.URL, url);
		console.log(url);
		axios.defaults.baseURL = url;
	}

	return (
		<Container>
			<Left>
				{!hasPermission && intialPage && (
					<Feather
						name='camera-off'
						size={26}
						color={theme.semantic.warning}
						onPress={async () => {
							await permissions.request();
							setHasPermission(await permissions.verify());
						}}
					/>
				)}
				{!intialPage && <Feather name='arrow-left' size={26} color={theme.common.text} onPress={() => navigation.goBack()} />}
			</Left>
			<Center>
				<Title>{title}</Title>
			</Center>
			<Right>
				<Feather name='link' size={24} color={theme.common.text} onPress={() => setModalVisible(!modalVisible)} style={{ marginRight: 10 }} />
				<Feather name={systemTheme === "light" ? "sun" : "moon"} size={26} color={theme.icon} onPress={() => changeTheme(systemTheme === "light" ? "dark" : "light")} />
			</Right>

			<Modal
				animationType='fade'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
				presentationStyle="overFullScreen"
			>
				<ModalContainer>
					<ModalContent>
						<TextInput label="Porta" onChangeText={changePort} width="90%" keyboardType="numeric"  />
						<Button label="Salvar" width="90%" onPress={() => setModalVisible(!modalVisible)}/>
					</ModalContent>
				</ModalContainer>
			</Modal>
		</Container>
	);
};

const Container = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	width: 100%;
	height: 50px;

	/* border-bottom-width: 1px; */
`;

const Left = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 15%;
	height: 50px;

	/* background-color: red; */
`;

const Center = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 70%;
	height: 50px;

	margin-right: -15px;

	/* background-color: green; */
`;

const Right = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	width: 15%;
	height: 50px;

	margin-right: 15px;

	/* background-color: blue; */
`;

const Title = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: ${(props) => props.theme.common.text};
`;

/*** MODAL  */
const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.View`
    width: 90%;
    height: 50%;

    align-items: center;
    justify-content: center;

    background-color: ${props => props.theme.card.background};
    border-radius: 10px;
    elevation: 10;
`;

