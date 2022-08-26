import { getRandomChar } from '../control/auxiliar/get_random_char';
import { getRandomNumber } from '../control/auxiliar/get_random_number';

//Función que construye las cosas del juego
const getCosas = ({ x = 5, y = 100, vx = 10, vy = 0, letra = 'b' }) => ({
	x,
	y,
	vx,
	vy,
	letra,
	desp: 0,
	draw() {
		const image = document.images[this.letra];
		if (modalidad === 'facil') {
			ctx.font = '14px "Press Start 2P"';
			ctx.fillStyle = '#fc6364';
			ctx.fillText(this.letra.toUpperCase(), this.x + image.width / 2 - 7, this.y);
			this.desp = 5;
		}
		ctx.drawImage(image, this.x, this.y + this.desp);
	},
});

//Función que agrega cosas al array para pintarlos
export const agregarCosas = () => {
	if (elementos.length < stage.max) {
		let cosa = getCosas({
			y: getRandomNumber(10, canvas.height - 100),
			vx: stage.vx,
			vy: getRandomNumber(0, 4),
			letra: getRandomChar(),
		});
		elementos.push(cosa);
	}
	agregar = setTimeout(agregarElementos, getRandomNumber(stage.minA, stage.maxA));
};

//Función que agrega la cosa b bonus al array para pintarlo
export const agregarBonus = () => {
	let bono = getCosas({});
	elementos.push(bono);
	agBonus = setTimeout(agregarBonus, getRandomNumber(50000, 80000));
};
