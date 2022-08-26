import { comprobarRecord } from '../ajax/comprobar_record';
import { keyPresionada } from '../control/game/gameplay/capturar';
import { start } from '../control/game/start';
import { drawBackground } from '../draw/drawBackground';

//-------------------------------------------------- Eventos --------------------------------------------

//Evento que inicia el juego
buttonStart.addEventListener('click', (e) => {
	e.preventDefault();
	start();
	addEventListener('keydown', keyPresionada); //evento que contro las keys que tecleamos
});

//Evento que pinta el lienzo al cargar la página
window.onload = () => {
	drawBackground();
	comprobarRecord();
};

//Controlamos la resolución de pantalla y redimensionamos el lienzo
window.onresize = redimensionar;
function redimensionar() {
	const widthClient = document.documentElement.clientWidth;
	if (widthClient <= 1000) {
		canvas.width = '800';
		drawBackground();
	} else if (widthClient <= 1200) {
		canvas.width = '1000';
		drawBackground();
	} else if (widthClient > 1200) {
		canvas.width = '1200';
		drawBackground();
	}
}

//evento que cambia la modalidad

elemModalidad.forEach((element) => {
	element.addEventListener('change', (e) => {
		modalidad = document.querySelector('input[name="modalidad"]:checked').value;
	});
});

//Evento que controla el volumen de los sonidos

volumenSonido.addEventListener('change', (e) => {
	const vol = e.target.value / 100;
	sonidoAtrapar.volume = vol;
	sonidoRebote.volume = vol;
	sonidoSoltar.volume = vol;
});

//Evento que controla el volumen de la música

volumenMusica.addEventListener('change', (e) => {
	const vol = e.target.value / 100;
	musicaPlay.volume = vol;
	sonidoFinal.volume = vol;
});
