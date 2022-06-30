"use strict";
// document.body.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });
const contenedor = document.getElementById("canvas");
const ctx = contenedor.getContext("2d");
const caja = document.querySelectorAll("div");
const boton = document.querySelector("#boton");
const reset = document.querySelector("#reset");
const hard = document.getElementById("dificultad");

//tamaño de la víbora
let tam =10;
//Sentido de movimiento inicial
let direccion = 39;
//Velocidad
const speed=400;
let velocidad = speed;
//Tamaño inicial de la viborita
let vibora = [[300, 100], [300 - tam, 100], [300 - tam * 2, 100]];
//Dibujo la viborita en su posición inicila
ctx.fillStyle = "green";
vibora.forEach((i) => {
    ctx.fillRect(i[0], i[1], tam, tam);
});
let puntaje = 0;
caja[0].innerHTML = puntaje;
let random = cuadraditoAleatorio();
let animacion;

hard.addEventListener("change", () => {
    let aux = hard.value;
    if (aux == 0){
        tam = 10;
        reiniciar();
    } else if (aux == 1) {
        tam = 20;
        reiniciar();
    } else if (aux == 2) {
        tam = 25;
        reiniciar();
    }
    else if (aux == 3) {
        tam = 50;
        reiniciar();
    } else {
        tam = 100;
        reiniciar();
    }
});

function reiniciar() {
    vibora = [];
    ctx.clearRect(0, 0, 1000, 500);
    vibora = [[300, 100], [300 - tam, 100], [300 - tam * 2, 100]];
    direccion = 39;
    puntaje = "0";
    velocidad = speed;
    caja[0].innerHTML = puntaje;
    random = cuadraditoAleatorio();
    clearInterval(animacion);
    animacion = setInterval(dibujar, velocidad);
    boton.innerHTML = "Pausa";
    boton.setAttribute("onClick", "pause()");
}
function play() {
    animacion = setInterval(dibujar, velocidad);
    boton.setAttribute("onClick", "pause()");
    boton.innerHTML = "Pausa";
}
function pause() {
    clearInterval(animacion);
    boton.setAttribute("onClick", "play()");
    boton.innerHTML = "Play";
}
let perdiste = () => {
    alert("Perdiste");
    boton.innerHTML = "Comenzar otro juego";
    boton.setAttribute("onClick", "reiniciar()");
    velocidad =speed;
}
function dificultad() {
    velocidad -= 15;
    if (velocidad < 50) {
        velocidad = 50;
    }
    clearInterval(animacion);
    play();
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
            dificultad();
        }
        //Sino se pierde se ejecuta normalmente.
        if (bandera) {
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            let fin = vibora.pop();
            ctx.clearRect(fin[0], fin[1], tam, tam);
        } else {
            perdiste();
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
            dificultad();
        }
        //Sino se pierde se ejecuta normalmente.
        if (bandera) {
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            let fin = vibora.pop();
            ctx.clearRect(fin[0], fin[1], tam, tam);
        } else {
            perdiste();
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
            dificultad();
        }
        //Sino se pierde se ejecuta normalmente.
        if (bandera) {
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            let fin = vibora.pop();
            ctx.clearRect(fin[0], fin[1], tam, tam);
        } else {
            perdiste();
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
            dificultad();
        }
        //Sino se pierde se ejecuta normalmente.
        if (bandera) {
            ctx.fillRect(vibora[0][0], vibora[0][1], tam, tam);
            let fin = vibora.pop();
            ctx.clearRect(fin[0], fin[1], tam, tam);
        } else {
            perdiste();
        }
    }
}
function numsRandom() {
    let aux = [];
    aux[2] = false;
    aux[0] = Math.round(Math.random() * 1000 / tam) * tam;
    aux[1] = Math.round(Math.random() * 500 / tam) * tam;

    vibora.forEach((elemento) => {
        if ((elemento[0] == aux[0] && elemento[1] == aux[1]) ||
            (aux[0] >= 1000 || aux[1] >= 500)) {
            aux[2] = true;
            console.log("Vivora");
        }
    });
    return aux;
}
function cuadraditoAleatorio() {
    let aux = numsRandom();
    while (aux[2]) {
        aux = numsRandom();
    }
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