"use strict";
document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
const contenedor = document.getElementById("canvas");
const ctx = contenedor.getContext("2d");
const caja = document.querySelectorAll("div");
const boton = document.querySelector("#boton");
const reset = document.querySelector("#reset");
//tamaño de la víbora
let tam = 25;
//Sentido de movimiento inicial
let direccion = 39;
//Tamaño inicial de la viborita
let vibora = [[300, 100], [300 - tam, 100], [300 - tam * 2, 100]];
//Dibujo la viborita en su posición inicila
ctx.fillStyle = "green";
vibora.forEach((i) => {
    ctx.fillRect(i[0], i[1], tam, tam);
});

let puntaje = "0";

caja[0].innerHTML = puntaje;

let random = cuadraditoAleatorio();

let animacion;

function reiniciar() {
    vibora = [];
    ctx.clearRect(0, 0, 1000, 500);
    vibora = [[300, 100], [300 - tam, 100], [300 - tam * 2, 100]];
    direccion = 39;
    puntaje = "0";
    caja[0].innerHTML = puntaje;
    random = cuadraditoAleatorio();
    animacion = setInterval(dibujar, 150);
    boton.innerHTML = "Pausa";
    boton.setAttribute("onClick", "pause()");
}

function play() {
    animacion = setInterval(dibujar, 150);
    boton.setAttribute("onClick", "pause()");
    boton.innerHTML = "Pausa";
}
function pause() {
    clearInterval(animacion);
    boton.setAttribute("onClick", "play()");
    boton.innerHTML = "Play";
}

function dibujar() {
    //izquierda    
    if (direccion == 37) {
        //Bandear boleana para saber cuando se pierde
        let bandera = true;
        //Estas variable va a ser pusheada como cabecera del array con las nuevas coordenadas.
        let inicio = [0, 0];
        //Pusheo el vector en cero.
        vibora.unshift(inicio);
        //Le asigno las nuevas coordenadas de cabecera.
        vibora[0][0] = vibora[1][0] - tam;
        vibora[0][1] = vibora[1][1];
        //Analizo si se está chocando con sigo misma.
        for (let i = 1; i < vibora.length; i++) {
            if ((vibora[0][0] === vibora[i][0]) && (vibora[0][1] === vibora[i][1])) {
                clearInterval(animacion);
                bandera = false;
                break;
            }
        }
        //Analizo si se está chocando contra las paredes.
        if (vibora[0][0] < 0) {
            clearInterval(animacion);
            bandera = false;
        }
        //Analizo si está comiendo un nuevo cuadradito.
        if (vibora[0][0] == random[0] && vibora[0][1] == random[1]) {
            vibora.unshift(random);
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            puntaje++;
            caja[0].innerHTML = puntaje;
            random = cuadraditoAleatorio();
        }
        //Sino se pierde se ejecuta normalmente.
        if (bandera) {
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            let fin = vibora.pop();
            ctx.clearRect(fin[0], fin[1], tam, tam);
        } else {
            alert("Perdiste");
            boton.innerHTML = "Comenzar otro juego";
            boton.setAttribute("onClick", "reiniciar()");
            bandera = true;
        }
    }
    //arriba
    if (direccion == 38) {
        let bandera = true;
        let inicio = [0, 0];
        vibora.unshift(inicio);
        vibora[0][0] = vibora[1][0];
        vibora[0][1] = vibora[1][1] - tam;
        //Analizo si se está chocando con sigo misma.
        for (let i = 1; i < vibora.length; i++) {
            if ((vibora[0][0] === vibora[i][0]) && (vibora[0][1] === vibora[i][1])) {
                clearInterval(animacion);
                bandera = false;
                break;
            }
        }
        //Analizo si se está chocando contra las paredes.
        if (vibora[0][1] < 0) {
            clearInterval(animacion);
            bandera = false;
        }
        //Analizo si está comiendo un nuevo cuadradito.
        if (vibora[0][0] == random[0] && vibora[0][1] == random[1]) {
            vibora.unshift(random);
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            puntaje++;
            caja[0].innerHTML = puntaje;
            random = cuadraditoAleatorio();
        }
        //Sino se pierde se ejecuta normalmente.
        if (bandera) {
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            let fin = vibora.pop();
            ctx.clearRect(fin[0], fin[1], tam, tam);
        } else {
            alert("Perdiste");
            boton.innerHTML = "Comenzar otro juego";
            boton.setAttribute("onClick", "reiniciar()");
            bandera = true;
        }
    }
    //derecha
    if (direccion == 39) {
        let bandera = true;
        let inicio = [0, 0];
        vibora.unshift(inicio);
        vibora[0][0] = vibora[1][0] + tam;
        vibora[0][1] = vibora[1][1];
        //Analizo si se está chocando con sigo misma.
        for (let i = 1; i < vibora.length; i++) {
            if ((vibora[0][0] === vibora[i][0]) && (vibora[0][1] === vibora[i][1])) {
                clearInterval(animacion);
                bandera = false;
                break;
            }
        }
        //Analizo si se está chocando contra las paredes.
        if (vibora[0][0] >= 1000) {
            clearInterval(animacion);
            bandera = false;
        }
        //Analizo si está comiendo un nuevo cuadradito.
        if (vibora[0][0] == random[0] && vibora[0][1] == random[1]) {
            vibora.unshift(random);
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            puntaje++;
            caja[0].innerHTML = puntaje;
            random = cuadraditoAleatorio();
        }
        //Sino se pierde se ejecuta normalmente.
        if (bandera) {
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            let fin = vibora.pop();
            ctx.clearRect(fin[0], fin[1], tam, tam);
        } else {
            alert("Perdiste");
            boton.innerHTML = "Comenzar otro juego";
            boton.setAttribute("onClick", "reiniciar()");
            bandera = true;
        }
    }
    //abajo
    if (direccion == 40) {
        let bandera = true;
        let inicio = [0, 0];
        vibora.unshift(inicio);
        vibora[0][0] = vibora[1][0];
        vibora[0][1] = vibora[1][1] + tam;
        //Analizo si se está chocando con sigo misma.
        for (let i = 1; i < vibora.length; i++) {
            if ((vibora[0][0] === vibora[i][0]) && (vibora[0][1] === vibora[i][1])) {
                clearInterval(animacion);
                bandera = false;
                break;
            }
        }
        //Analizo si se está chocando contra las paredes.
        if (vibora[0][1] >= 500) {
            clearInterval(animacion);
            bandera = false;
        }
        //Analizo si está comiendo un nuevo cuadradito.
        if (vibora[0][0] == random[0] && vibora[0][1] == random[1]) {
            vibora.unshift(random);
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            puntaje++;
            caja[0].innerHTML = puntaje;
            random = cuadraditoAleatorio();
        }
        //Sino se pierde se ejecuta normalmente.
        if (bandera) {
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            let fin = vibora.pop();
            ctx.clearRect(fin[0], fin[1], tam, tam);
        } else {
            alert("Perdiste");
            boton.innerHTML = "Comenzar otro juego";
            boton.setAttribute("onClick", "reiniciar()");
            bandera = true;
        }
    }
}


function cuadraditoAleatorio() {
    let aux = [];
    aux[0] = Math.round(Math.random() * 1000 / tam) * tam;
    aux[1] = Math.round(Math.random() * 500 / tam) * tam;
    //Reviso el número generado aleatoriamente no se encuentra dentro del vector de posición de la viborita, en el caso de estarlo le pido que vuelva a generar un número.
    while (aux[0] >= 1000 || aux[1] >= 500) {
        aux[0] = Math.round(Math.random() * 1000 / tam) * tam;
        aux[1] = Math.round(Math.random() * 500 / tam) * tam;
    }
    vibora.forEach((elemento) => {
        while (elemento[0] == aux[0] && elemento[1] == aux[1]) {
            aux[0] = Math.round(Math.random() * 1000 / tam) * tam;
            aux[1] = Math.round(Math.random() * 500 / tam) * tam;
        }
    });
    ctx.fillStyle = "red";
    ctx.fillRect(aux[0], aux[1], tam, tam);
    ctx.fillStyle = "green";
    return aux;
}


document.onkeydown = pulsar;

function pulsar(e) {
    if (e.keyCode === 37) {
        //izquierda
        direccion = 37;
    } else if (e.keyCode === 38) {
        //arriba
        direccion = 38;
    } else if (e.keyCode === 39) {
        //derecha
        direccion = 39;
    } else if (e.keyCode === 40) {
        //abajo
        direccion = 40;
    }
}