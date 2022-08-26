//damos visivilidad y animacion al panel resultados y al panel modalidad
export const switchAnimations = () => {
	buttonStart.classList.toggle('enable');
	buttonStart.classList.toggle('disable');
	buttonStart.toggleAttribute('disabled');
	modalidadGroup.classList.toggle('enable');
	modalidadGroup.classList.toggle('disable');
	infoTexto.classList.toggle('disable');
	infoTexto.classList.toggle('enable');
	elemModalidad.forEach((element) => {
		element.toggleAttribute('disabled');
	});
	setTimeout(() => {
		buttonStart.classList.toggle('display-none');
		infoTexto.classList.toggle('display-none');
	}, 1200);
};
