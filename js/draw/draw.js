import { controlAudio } from '../control/audio/control_audio';
import { gameOver } from '../control/game/gameover';
import { drawBackground } from './drawBackground';

export const draw = () => {
	let stop = false;

	drawBackground();

	//dibuja puntuajes en lienzo
	puntos.forEach((punto, index) => {
		if (punto.o > 0) {
			punto.draw();
			if (punto.t > 0) {
				punto.t -= 1;
			} else {
				punto.o -= 0.01;
			}
		} else {
			puntos.splice(index, 1);
		}
	});

	//dibuja combos en el lienzo
	combos.forEach((combo, index) => {
		if (combo.o > 0) {
			combo.draw();
			if (combo.t > 0) {
				combo.t -= 1;
			} else {
				combo.o -= 0.01;
			}
		} else {
			combos.splice(index, 1);
		}
	});

	//dibuja elementos en tapiz
	elementos.forEach((elemento, index) => {
		elemento.draw();
		elemento.x += elemento.vx;
		elemento.y += elemento.vy;

		if (elemento.y + elemento.vy > canvas.height - 85 || elemento.y + elemento.vy < 5) {
			elemento.vy = -elemento.vy;
			controlAudio(sonidoRebote);
		}
		if (elemento.x + elemento.vx > canvas.width - 68 && elemento.letra !== 'b') {
			stop = true;
		} else if (elemento.x + elemento.vx > canvas.width - 65 && elemento.letra === 'b') {
			elementos.splice(index, 1);
		}

		if (elemento.x === 6) {
			controlAudio(sonidoSoltar);
		}
	});
	if (!stop) {
		requestAnimationFrame(draw);
	} else {
		gameOver();
	}
};
