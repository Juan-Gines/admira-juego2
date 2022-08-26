//Función que pinta el background del lienzo
export const drawBackground = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const linearGradient = ctx.createLinearGradient(
		canvas.width / 2,
		0,
		canvas.width / 2,
		canvas.height
	);
	linearGradient.addColorStop(0, 'rgb(254, 254, 254)');
	//linearGradient.addColorStop(0.5, 'rgb(95, 0, 0)');
	linearGradient.addColorStop(1, 'rgb(253, 246, 231)');
	ctx.fillStyle = linearGradient;
	ctx.fillRect(5, 0, canvas.width - 10, canvas.height);
};
