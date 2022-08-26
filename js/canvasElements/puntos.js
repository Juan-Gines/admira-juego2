//Función que construye los datos de las puntuaciones a pintar
const getPuntos = ({ x, y, p }) => ({
	x,
	y,
	p,
	o: 1,
	t: 30,
	draw() {
		ctx.font = '16px "Press Start 2P"';
		ctx.fillStyle = 'rgba(0,0,0,' + this.o + ')';
		ctx.fillText(this.p, this.x, this.y + 25);
	},
});

//Función que agrega elementos al array para pintarlos
export const agregarPuntos = ({ x, y, p }) => {
	let punto = getPuntos({ x, y, p });
	puntos.push(punto);
};
