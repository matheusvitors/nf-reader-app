export const parseData = (date: string) => {
	const [dia, mes, ano] = date.split('/');
	console.log(new Date(`${ano}-${mes}-${dia}`));

	return new Date(`${ano}-${mes}-${dia}`); // formato ISO válido
}
