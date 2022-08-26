//Creamos elementos de sonido
const sonidoRebote = document.createElement('audio');
const sonidoAtrapar = document.createElement('audio');
const sonidoFinal = document.createElement('audio');
const sonidoSoltar = document.createElement('audio');
const musicaDemo = document.createElement('audio');
const musicaPlay = document.createElement('audio');
const volumenSonido = document.getElementById('sonido');
const volumenMusica = document.getElementById('musica');

sonidoRebote.src = 'sonidos/rebote.ogg';
sonidoAtrapar.src = 'sonidos/atrapar.ogg';
sonidoFinal.src = 'sonidos/final.ogg';
sonidoSoltar.src = 'sonidos/soltarCosa.ogg';
musicaDemo.src = 'sonidos/demo.ogg';
musicaPlay.src = 'sonidos/play.ogg';
musicaPlay.loop = true;
