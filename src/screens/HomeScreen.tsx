import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import styled from "styled-components/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Screen } from "@/layouts";
import { listNotasFiscais, removeNotaFiscal } from "@/services";
import { Button, EmptyArea, ListItem, Loader, NewNFButton, ScreenMessage } from "@/components";
import { NotaFiscal } from "@/interfaces";
import { permissions } from "@/config/permissions";

/**
 *
 * https://medium.com/@varunkukade999/qr-code-scanner-in-react-native-527577aa74b1
 */

export const HomeScreen: React.FC = () => {
	const {
		data: notasFiscais,
		isFetching,
		error,
		refetch,
		isStale,
	} = useQuery({
		queryKey: ["notasFiscais"],
		queryFn: listNotasFiscais,
	});
	const queryClient = useQueryClient();

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		!hasPermission() && permissions.request();
	}, [])

	useEffect(() => {
		error && console.error(error);
		error && Alert.alert('Erro!', error.message)
	}, [error]);

	const hasPermission = async () => {
		return await permissions.verify();
	}

	const handleDelete = async (id: string) => {
		try {
			Alert.alert("Excluir", "Deseja excluir esta nota fiscal?", [
				{ text: "Cancelar", style: "cancel" },
				{
					text: "OK",
					onPress: async () => {
						setIsLoading(true);
						await removeNotaFiscal(id);
						queryClient.invalidateQueries({ queryKey: ['notasFiscais'] });
						Alert.alert("Sucesso!", "Nota fiscal excluída com sucesso!");
						setIsLoading(false);
					},
				},
			]);

		} catch (error: any) {
			Alert.alert('Erro!', error.message)
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Screen initialPage>
			<Content>
				{isFetching && <Loader size={"large"} />}

				{!isFetching && notasFiscais && notasFiscais.length > 0 &&
					<FlatList
						data={notasFiscais}
						renderItem={({item}) => <ListItem item={item} handleDelete={handleDelete} />}
						keyExtractor={(item: NotaFiscal) => `${item.id}`}
						refreshing={isFetching || isLoading}
						onRefresh={refetch}
						style={{ marginTop: 10, marginBottom: 10, flex: 1, width:'100%' }}
						contentContainerStyle={{flex: 1, alignItems: 'center'}}
					/>
				}

				{!(isFetching || isLoading) && (!notasFiscais || notasFiscais.length === 0) && <EmptyArea>
					<ScreenMessage message='Não há notas fiscais cadastradas.' Button={<Button type='outline' label='Atualizar' loading={isFetching} onPress={refetch} />} />
				</EmptyArea> }
				<NewNFButton />
			</Content>
		</Screen>
	);
};

const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	padding-bottom: 10px;
`;
