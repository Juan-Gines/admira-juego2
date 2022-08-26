//Función que setea la dificultad
export const setDifficult = () => {
	const timestamp = Date.now();
	const stages = [
		{ level: 1, vx: 1, max: 2, minA: 1500, maxA: 2000, puntos: 1000 },
		{ level: 2, vx: 2, max: 3, minA: 1200, maxA: 1600, puntos: 2000 },
		{ level: 3, vx: 3, max: 4, minA: 1000, maxA: 1500, puntos: 4000 },
		{ level: 4, vx: 5, max: 6, minA: 800, maxA: 1200, puntos: 6000 },
		{ level: 5, vx: 5, max: 8, minA: 600, maxA: 1000, puntos: 8000 },
		{ level: 6, vx: 5, max: 10, minA: 500, maxA: 800, puntos: 10000 },
	];

	//cambiamos de dificultad cada cierto tiempo
	if (timestamp - time < 60000) {
		stage = stages[0];
	} else if (timestamp - time < 120000) {
		stage = stages[1];
	} else if (timestamp - time < 180000) {
		stage = stages[2];
	} else if (timestamp - time < 240000) {
		stage = stages[3];
	} else if (timestamp - time < 300000) {
		stage = stages[4];
	} else if (timestamp - time >= 300000) {
		stage = stages[5];
	}
};
