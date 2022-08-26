import { agregarBonus, agregarCosas } from '../../canvasElements/cosas';
import { draw } from '../../draw/draw';
import { drawBackground } from '../../draw/drawBackground';
import { controlAudio } from '../audio/control_audio';
import { setDifficult } from './gameplay/set_difficult';
import { switchAnimations } from './swich_animations';

//Función que inicia el juego
export const start = () => {
	//reseteamos variables
	reset();

	//iniciamos datos temporales
	time = Date.now();
	setDifficult();
	niveles = setInterval(setDifficult, 61000);

	//iniciamos animaciones
	switchAnimations();

	//agregamos elementos al liezo y lo arrancamos
	drawBackground();
	agregarCosas();
	agBonus = setTimeout(agregarBonus, 65000);
	requestAnimationFrame(draw);

	//agregamos música
	controlAudio(musicaPlay);
};

//función que resetea variables globales
const reset = () => {
	elementos = [];
	stage = {};
	fail = 0;
	marcador = 0;
};
