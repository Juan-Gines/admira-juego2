//instanciamos el canvas y los elementos html
const canvas = document.getElementById('canvas');
canvas.width = '1200';
canvas.height = '500';
const ctx = canvas.getContext('2d');

//identificamos elementos html
const buttonStart = document.getElementById('buttonStart');
const puntuaje = document.getElementById('puntos');
const startPanel = document.getElementById('start');
const recordTexto = document.getElementById('record');

//variables guardado de datos
let elementos = [];
let time = Date.now();
let fail = 0;
let stage = {};
let marcador = 0;
let puntos = [];

//variables id de interval timeout
let niveles, agregar, agBonus;

//------------------ Funciones que pintan en el lienzo -------------------------

//Función que pinta y controla los elementos moviles
const draw = () => {
	let stop = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();

	//dibuja puntuajes en lienzo
	puntos.forEach((punto, index) => {
		if (punto.o > 0) {
			punto.draw();
			if (punto.t > 0) {
				punto.t -= 1;
			} else {
				punto.o -= 0.01;
			}
		} else {
			puntos.splice(index, 1);
		}
	});

	//dibuja elementos en tapiz
	elementos.forEach((elemento, index) => {
		elemento.draw();
		elemento.x += elemento.vx;
		elemento.y += elemento.vy;

		if (elemento.y + elemento.vy > canvas.height - 100 || elemento.y + elemento.vy < 10) {
			elemento.vy = -elemento.vy;
		}
		if (elemento.x + elemento.vx > canvas.width - 80 && elemento.letra !== 'b') {
			stop = true;
		} else if (elemento.x + elemento.vx > canvas.width - 80 && elemento.letra === 'b') {
			elementos.splice(index, 1);
		}
	});
	if (!stop) {
		requestAnimationFrame(draw);
	} else {
		gameOver();
	}
};

//Función que pinta el background del lienzo

const drawBackground = () => {
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

//----------------------- Funciones de lógica del juego y gestión de datos -----------------

//Función que construye los datos de los elementos del juego
const getCosas = ({ x = 5, y = 100, vx = 10, vy = 0, letra = 'b' }) => ({
	x,
	y,
	vx,
	vy,
	letra,
	draw() {
		ctx.drawImage(document.images[this.letra], this.x, this.y);
	},
});

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
const agregarElementos = () => {
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

//Función que agrega elementos al array para pintarlos
const agregarPuntos = ({ x, y, p }) => {
	let punto = getPuntos({
		x,
		y,
		p,
	});
	puntos.push(punto);
};

//Función que agrega el elemento b bonus al array para pintarlo
const agregarBonus = () => {
	let bono = getCosas({});
	elementos.push(bono);
	agBonus = setTimeout(agregarBonus, getRandomNumber(60000, 90000));
};

//Función que setea la dificultad y devuelve los datos referentes a ella
const setDifficult = () => {
	const timestamp = Date.now();
	const stages = [
		{ level: 1, vx: 1, max: 2, minA: 1500, maxA: 2000, puntos: 1000 },
		{ level: 2, vx: 2, max: 3, minA: 1200, maxA: 1600, puntos: 2000 },
		{ level: 3, vx: 3, max: 4, minA: 1000, maxA: 1500, puntos: 4000 },
		{ level: 4, vx: 5, max: 6, minA: 800, maxA: 1200, puntos: 6000 },
		{ level: 5, vx: 6, max: 8, minA: 600, maxA: 1000, puntos: 8000 },
		{ level: 6, vx: 8, max: 10, minA: 500, maxA: 800, puntos: 10000 },
	];

	//cambiamos de dificultad cada cierto tiempo
	if (timestamp - time < 60000) {
		stage = stages[0];
	} else if (timestamp - time < 120000) {
		stage = stages[1];
	} else if (timestamp - time < 180000) {
		stage = stages[2];
	} else if (timestamp - time < 240000) {
		stage = stages[3];
	} else if (timestamp - time < 300000) {
		stage = stages[4];
	} else if (timestamp - time >= 300000) {
		stage = stages[5];
	}
};

//Función que captura los elementos o suma fallos
const capturar = (key) => {
	if (elementos.find((element) => element.letra == key)) {
		if (key !== 'b') {
			for (let i = 0; i < elementos.length; i++) {
				if (key == elementos[i].letra) {
					let captura = elementos.splice(i, 1);
					i--;
					let punto = sumarPuntos(captura[0]); //sumamos puntos al marcador
					agregarPuntos(punto); //agregamos puntuaciones al array del lienzo
				}
			}
		} else {
			for (let i = 0; i < elementos.length; i++) {
				let captura = elementos.splice(i, 1);
				i--;
				let punto = sumarPuntos(captura[0]);
				agregarPuntos(punto);
			}
		}
	} else {
		fail++;
	}
};

//Función que suma puntos al marcador y devuelve los datos para dibujar las puntuaciones
const sumarPuntos = (captura) => {
	let disX = (captura.x * 100) / canvas.width;
	const divisores = [1, 0.9, 0.8, 0.7, 0.6, 0.5];
	let puntos = stage.puntos;

	switch (true) {
		case disX >= 75:
			puntos = puntos * divisores[3];
			break;
		case disX < 75 && disX >= 50:
			puntos = puntos * divisores[2];
			break;
		case disX < 50 && disX >= 25:
			puntos = puntos * divisores[1];
			break;
		case disX < 25:
			puntos = puntos * divisores[0];
			break;
	}
	switch (fail) {
		case 0:
			puntos = puntos * divisores[0];
			break;
		case 1:
			puntos = puntos * divisores[1];
			break;
		case 2:
			puntos = puntos * divisores[2];
			break;
		case 3:
			puntos = puntos * divisores[3];
			break;
		case 4:
			puntos = puntos * divisores[4];
			break;
		default:
			puntos = puntos * divisores[5];
			break;
	}
	fail = 0;
	captura.letra === 'b' ? (puntos = 20000) : '';
	marcador += puntos;
	puntuaje.innerHTML = marcador;
	return { p: puntos, x: captura.x, y: captura.y };
};

//Función que termina el juego, cancela eventos, intervalos, timeouts y animaciones
const gameOver = () => {
	//Cancelamos animaciones temporales y removemos eventos
	cancelAnimationFrame(requestAnimationFrame(draw));
	clearInterval(niveles);
	clearTimeout(agregar);
	clearTimeout(agBonus);
	removeEventListener('keydown', keyPresionada);

	//damos animaciones al panel de resultados
	buttonStart.removeAttribute('disabled');
	buttonStart.classList.add('enable');
	buttonStart.classList.remove('disable');
	startPanel.classList.remove('display-none');

	//dibujamos el game over en el lienzo
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
	ctx.font = '48px "Press Start 2P"';
	ctx.fillStyle = '#fc6364';
	ctx.fillText('GAME OVER', canvas.width / 2 - 200, 180);

	ctx.font = '36px "Press Start 2P"';
	ctx.fillStyle = 'black';
	ctx.fillText('Tu puntuación: ' + marcador, canvas.width / 2 - 350, 300);

	//comprobamos si hemos conseguido un nuevo récord
	comprobarRecord();
};

//----------------- Funciones ajax para la base de datos ---------------

//Función que comprueba si tenemos nuevo record o si viene vacio imprime el record en el panel de resultados. Si tenemos nuevo record llamará a grabarRecord()
const comprobarRecord = () => {
	fetch('controllers/Controller.php')
		.then((res) => res.json())
		.then((data) => {
			const record = parseInt(data.puntuacion);
			if (!isNaN(record)) {
				if (marcador) {
					if (marcador > record) {
						grabarRecord(); //guarda el record en bbdd
					} else {
						recordTexto.innerHTML = data.puntuacion;
						return console.log('no lo lograste');
					}
				} else {
					recordTexto.innerHTML = data.puntuacion;
				}
			} else {
				console.log('no hay registros');
				if (marcador) {
					grabarRecord(); //guarda el record en bbdd
				}
			}
		})
		.catch((err) => {
			console.error('ERROR: ', err.message);
		});
};

//Función que guarda el record en la base de datos
const grabarRecord = () => {
	let datos = new FormData();
	datos.append('marcador', marcador);
	fetch('controllers/Controller.php', {
		method: 'POST',
		body: datos,
	})
		.then((res) => res.json())
		.then((data) => {
			recordTexto.innerHTML = data.puntuacion;
		})
		.catch((err) => {
			console.error('ERROR: ', err.message);
		});
};

//----------------- Funciones auxiliares-------------------------

//Función que devuelve una letra random
const getRandomChar = () => {
	min = Math.ceil(97);
	max = Math.floor(122);
	let codAscii = Math.floor(Math.random() * (max - min + 1) + min);
	if (codAscii === 98) {
		return getRandomChar();
	} else {
		return String.fromCharCode(codAscii);
	}
};

//Función que devuelve un número random
const getRandomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
};

//-------------------- Funciones que resetean variables y estados -----------------------

//Función que inicia el juego
const start = () => {
	//reseteamos variables
	reset();

	//damos visivilidad y animacion al panel resultados
	puntuaje.innerHTML = '0';
	buttonStart.classList.add('disable');
	buttonStart.setAttribute('disabled', true);
	setTimeout(() => {
		startPanel.classList.add('display-none');
	}, 1200);

	//iniciamos datos temporales
	time = Date.now();
	setDifficult();
	niveles = setInterval(setDifficult, 61000);

	//agregamos elementos al liezo y lo arrancamos
	drawBackground();
	agregarElementos();
	agBonus = setTimeout(agregarBonus, 65000);
	requestAnimationFrame(draw);
};

//función que resetea variables globales
const reset = () => {
	elementos = [];
	stage = {};
	fail = 0;
	marcador = 0;
};

//------------------- Funciones relativas a los eventos --------------------------

//Función relativa el evento keydown que controla las teclas que se tocan
const keyPresionada = (e) => {
	e.preventDefault();
	let keyCode = e.key.length == 1 ? e.key.toLowerCase().charCodeAt(0) : 10;
	if (keyCode < 123 && keyCode > 96) {
		capturar(e.key.toLowerCase());
	}
};

//-------------------------------------------------- Eventos --------------------------------------------

//Evento que pinta el lienzo al cargar la página
window.onload = () => {
	drawBackground();
	comprobarRecord();
};

//Controlamos la resolución de pantalla y redimensionamos el lienzo
window.onresize = start2;
function start2() {
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

//Evento que inicia el juego
buttonStart.addEventListener('click', (e) => {
	e.preventDefault();
	start();
	addEventListener('keydown', keyPresionada); //evento que contro las keys que tecleamos
});
