//Función que devuelve una letra random
export const getRandomChar = () => {
	min = Math.ceil(97);
	max = Math.floor(122);
	let codAscii = Math.floor(Math.random() * (max - min + 1) + min);
	if (codAscii === 98) {
		return getRandomChar();
	} else {
		return String.fromCharCode(codAscii);
	}
};
