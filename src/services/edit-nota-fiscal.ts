import { PATH } from "@/config/constants";
import { httpErrorHandler } from "@/config/http-error-handler";
import { KEY } from "@/config/storage-keys";
import { NotaFiscal } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const editNotaFiscal = async (notaFiscal: NotaFiscal): Promise<void> => {
	try {
		const url = await AsyncStorage.getItem(KEY.URL)

		await axios.put(`${url}/${PATH}/${notaFiscal.id}`, notaFiscal);
	} catch (error) {
		console.error(error);
		throw httpErrorHandler(error);
	}
}
