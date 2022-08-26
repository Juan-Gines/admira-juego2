import { agregarCombo } from '../../../canvasElements/combos';

//actualizamos marcadores
export const infoJugada = (total, cosas, calidad = 3) => {
	//actualizamos marcadores
	if (total) {
		let mensaje = ['Excelente', 'Bien', 'Regular', 'Cuidado'];
		marcador += total;
		puntuaje.innerHTML = marcador;
		marcador > parseInt(recordTexto.innerHTML) ? (recordTexto.innerHTML = marcador) : '';
		if (cosas === 1) {
			infoTexto.innerHTML = '¡' + mensaje[calidad] + ' ' + total + '!';
		} else {
			infoTexto.innerHTML = '¡Combo X' + cosas + ' ' + total + '!';
			agregarCombo({ p: total, n: cosas });
		}
	} else {
		infoTexto.innerHTML = '¡Fallaste X' + cosas + '!';
	}
};
