import { PATH } from "@/config/constants"
import { http } from "@/config/http"
import { httpErrorHandler } from "@/config/http-error-handler";
import { KEY } from "@/config/storage-keys";
import { NotaFiscal } from "@/interfaces";
import { Response } from '@/interfaces/response'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const listNotasFiscais = async () => {
	try {
		const url = await AsyncStorage.getItem(KEY.URL)
		console.log(`${url}/${PATH}`);

		const response = await axios.get<Response<NotaFiscal[]>>(`${url}/${PATH}`);
		return response.data.response.content;
	} catch (error) {
		throw httpErrorHandler(error);
	}
}
