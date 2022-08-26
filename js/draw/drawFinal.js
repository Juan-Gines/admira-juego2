//función que pinta el pantallazo final
export const drawFinal = () => {
	ctx.font = '48px "Press Start 2P"';
	ctx.fillStyle = '#fc6364';
	ctx.fillText('GAME OVER', canvas.width / 2 - 200, 180);

	ctx.font = '36px "Press Start 2P"';
	ctx.fillStyle = 'black';
	ctx.fillText('Tu puntuación: ' + marcador, canvas.width / 2 - 350, 300);
};
