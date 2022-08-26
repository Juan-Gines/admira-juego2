import { agregarPuntos } from '../../../canvasElements/puntos';
import { controlAudio } from '../../audio/control_audio';
import { infoJugada } from '../score/info_jugada';
import { sumarPuntos } from '../score/sumar_puntos';

//Función relativa el evento keydown que controla las teclas que se tocan
export const keyPresionada = (e) => {
	e.preventDefault();
	let keyCode = e.key.length == 1 ? e.key.toLowerCase().charCodeAt(0) : 10;
	if (keyCode < 123 && keyCode > 96) {
		capturar(e.key.toLowerCase());
	}
};

//Función que captura los elementos o suma fallos

const capturar = (key) => {
	let cosas = 0;
	let puntos = [];
	let total = 0;
	let calidad = 3;
	if (elementos.find((element) => element.letra == key)) {
		if (key !== 'b') {
			for (let i = 0; i < elementos.length; i++) {
				if (key == elementos[i].letra) {
					let captura = elementos.splice(i, 1);
					i--;
					let punto = sumarPuntos(captura[0]); //sumamos puntos al marcador
					cosas++;
					puntos.push(punto);
				}
			}
		} else {
			for (let i = 0; i < elementos.length; i++) {
				let captura = elementos.splice(i, 1);
				i--;
				let punto = sumarPuntos(captura[0]);
				cosas++;
				puntos.push(punto);
			}
		}

		//agregamos puntuaciones al array del lienzo
		if (puntos.length === 1) {
			agregarPuntos(puntos[0]);
			total = puntos[0].p;
			calidad = puntos[0].c;
		} else {
			puntos.forEach((puntuaciones) => {
				agregarPuntos(puntuaciones);
				total += puntuaciones.p;
			});
		}

		//mandamos el total de la jugada
		infoJugada(total, cosas, calidad);

		//sonido de atrapar cosas
		controlAudio(sonidoAtrapar);
	} else {
		fail++;
		infoJugada(0, fail);
	}
};
