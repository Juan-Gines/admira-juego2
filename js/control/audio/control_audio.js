//Función que controla el audio para reiniciarlo
export const controlAudio = (audio) => {
	if (!audio.ended) {
		audio.pause();
		audio.currentTime = 0;
	}
	audio.play();
};
