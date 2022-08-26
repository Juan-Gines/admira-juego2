//Función que construye los datos de los combos a pintar
const getCombos = ({ p, n }) => ({
	x: canvas.width / 2 - 160,
	y: 50,
	p,
	n,
	o: 1,
	t: 30,
	draw() {
		ctx.font = '24px "Press Start 2P"';
		ctx.fillStyle = 'rgba(252, 99, 100,' + this.o + ')';
		ctx.fillText('COMBO X' + this.n + ' ' + this.p, this.x, this.y + 25);
	},
});

//Función que agrega combos array para pintarlo
export const agregarCombo = ({ p, n }) => {
	let combo = getCombos({ p, n });
	combos.push(combo);
};
