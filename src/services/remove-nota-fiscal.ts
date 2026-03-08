import { PATH } from "@/config/constants"
import { httpErrorHandler } from "@/config/http-error-handler";
import { KEY } from "@/config/storage-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const removeNotaFiscal = async (id: string) => {

	try {
		const url = await AsyncStorage.getItem(KEY.URL)
		await axios.delete(`${url}/${PATH}/${id}`);
	} catch (error) {
		throw httpErrorHandler(error);
	}
}
