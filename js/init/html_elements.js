//----------------- Identificamos elementos html ------------

//instanciamos el canvas y los elementos html
const canvas = document.getElementById('canvas');
canvas.width = '1200';
canvas.height = '450';
const ctx = canvas.getContext('2d');

//panel start
const buttonStart = document.getElementById('buttonStart');
const infoTexto = document.getElementById('info');

//panel resultados
const puntuaje = document.getElementById('puntos');
const recordTexto = document.getElementById('record');

//panel modalidad
const modalidadGroup = document.getElementById('modalidad-group');
const elemModalidad = document.getElementsByName('modalidad');
