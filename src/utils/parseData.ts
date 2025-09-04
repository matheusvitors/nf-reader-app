export const parseData = (date: string) => {
	const [dia, mes, ano] = date.split('/');

	return new Date(`${ano}-${mes}-${dia}`); // formato ISO válido
}
