/**
 * C clubs      (treboles)
 * D diamonds   (diamantes)
 * S swords      (espadas)
 * H heart      (corazones)
 */

let deck = [];
let tipos = ['C', 'D', 'S', 'H'];
let especiales = ['J', 'Q', 'K', 'A'];

let puntosJugador = 0,
    puntosComputadora = 0;

// referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#cartasJugador');
const divCartasCompu = document.querySelector('#cartasComputadora');


const crearDeck = () => {

    deck = [];

    for(i=2; i<=10; i++){
        for(tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(esp of especiales){
        for(tipo of tipos){
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck); // metodo de la libreria underscore
    console.log(deck);
    return deck;
}

crearDeck();


const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck'
    }
    
    const carta = deck.pop()
    return carta;
}


const valorCarta = (carta) => {
   
    const valor = carta.substring(0, carta.length-1);
    
    return (isNaN(valor)) 
                ? (valor === 'A') ? 11 : 10
                : puntos = valor*1;
    
};


const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();

        puntosComputadora += valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasCompu.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }
        
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        
        if(puntosMinimos > 21){
            alert('Computadora gana');
        }else if(puntosMinimos === puntosComputadora){
            alert('empate, nadie gana');
        }else if((puntosMinimos < 21) && (puntosComputadora > puntosMinimos)){
            alert('computadora gana');
        }else{
            alert('Ganaste');
        }
    }, 25);
};


// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }else if(puntosJugador === 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        console.log('21 Genial');
        turnoComputadora(puntosJugador);
    }
});


btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = '0';
    puntosHTML[1].innerText = '0';

    divCartasJugador.innerHTML = '';
    divCartasCompu.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});
