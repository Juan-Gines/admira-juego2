import { comprobarRecord } from '../../ajax/comprobar_record';
import { draw } from '../../draw/draw';
import { drawBackground } from '../../draw/drawBackground';
import { drawFinal } from '../../draw/drawFinal';
import { keyPresionada } from './gameplay/capturar';
import { switchAnimations } from './swich_animations';

export const gameOver = () => {
	//Cancelamos animaciones temporales y removemos eventos
	cancelAnimationFrame(requestAnimationFrame(draw));
	clearInterval(niveles);
	clearTimeout(agregar);
	clearTimeout(agBonus);
	removeEventListener('keydown', keyPresionada);

	switchAnimations();
	//dibujamos el game over en el lienzo
	drawBackground();
	drawFinal();

	//Cambiamos música
	musicaPlay.pause();
	musicaPlay.currentTime = 0;
	sonidoFinal.play();

	//comprobamos si hemos conseguido un nuevo récord
	comprobarRecord();
};
