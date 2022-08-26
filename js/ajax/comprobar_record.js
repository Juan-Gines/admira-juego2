//Función que comprueba si tenemos nuevo record y lo imprime en el panel de resultados. Si tenemos nuevo record llamará a grabarRecord()
export const comprobarRecord = () => {
	fetch('controllers/Controller.php')
		.then((res) => res.json())
		.then((data) => {
			const record = parseInt(data.puntuacion);
			if (!isNaN(record)) {
				if (marcador) {
					if (marcador > record) {
						grabarRecord(); //guarda el record en bbdd
					} else {
						recordTexto.innerHTML = data.puntuacion;
					}
				} else {
					recordTexto.innerHTML = data.puntuacion;
				}
			} else {
				console.log('no hay registros');
				if (marcador) {
					grabarRecord(); //guarda el record en bbdd
				}
			}
		})
		.catch((err) => {
			console.error('ERROR: ', err.message);
		});
};

//Función que guarda el record en la base de datos
const grabarRecord = () => {
	let datos = new FormData();
	datos.append('marcador', marcador);
	fetch('controllers/Controller.php', {
		method: 'POST',
		body: datos,
	})
		.then((res) => res.json())
		.then((data) => {
			recordTexto.innerHTML = data.puntuacion;
		})
		.catch((err) => {
			console.error('ERROR: ', err.message);
		});
};
