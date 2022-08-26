//Función que que calcula los puntos al marcador y devuelve los datos para dibujar las puntuaciones
export const sumarPuntos = (captura) => {
	let disX = (captura.x * 100) / canvas.width;
	const divisores = [1, 0.9, 0.8, 0.7, 0.6, 0.5];
	let puntos = stage.puntos;
	let calidad = 0;

	switch (true) {
		case disX >= 75:
			puntos = puntos * divisores[3];
			calidad = 3;
			break;
		case disX < 75 && disX >= 50:
			puntos = puntos * divisores[2];
			calidad = 2;
			break;
		case disX < 50 && disX >= 25:
			puntos = puntos * divisores[1];
			calidad = 1;
			break;
		case disX < 25:
			puntos = puntos * divisores[0];
			calidad = 0;
			break;
	}
	switch (fail) {
		case 0:
			puntos = puntos * divisores[0];
			break;
		case 1:
			puntos = puntos * divisores[1];
			break;
		case 2:
			puntos = puntos * divisores[2];
			break;
		case 3:
			puntos = puntos * divisores[3];
			break;
		case 4:
			puntos = puntos * divisores[4];
			break;
		default:
			puntos = puntos * divisores[5];
			break;
	}
	fail = 0;
	captura.letra === 'b' ? (puntos = 20000) : '';
	return { p: puntos, x: captura.x, y: captura.y, c: calidad };
};
