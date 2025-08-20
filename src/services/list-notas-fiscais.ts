import { PATH } from "@/config/constants"
import { http } from "@/config/http"
import { NotaFiscal } from "@/interfaces";
import { Response } from '@/interfaces/response'

export const listNotasFiscais = async () => {
	try {
		const response = await http.get<Response<NotaFiscal[]>>(PATH);
		return response.data.response.content;
	} catch (error) {
		throw error;
	}
}
