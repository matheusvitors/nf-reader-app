import { PATH } from "@/config/constants";
import { httpErrorHandler } from "@/config/http-error-handler";
import { KEY } from "@/config/storage-keys";
import { NotaFiscal } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const createNotaFiscal = async (notaFiscal: NotaFiscal): Promise<void> => {
	try {
		const url = await AsyncStorage.getItem(KEY.URL)
		console.log(`${url}/${PATH}`);

		await axios.post(`${url}/${PATH}`, notaFiscal);
	} catch (error) {
		console.error(error);
		throw httpErrorHandler(error);
	}
}
