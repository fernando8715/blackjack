/**
 * C clubs      (treboles)
 * D diamonds   (diamantes)
 * S swords      (espadas)
 * H heart      (corazones)
 */
const miModulo = (() =>{
    'use strict'


    let deck = [];
    const tipos = ['C', 'D', 'S', 'H'], 
      especiales = ['J', 'Q', 'K', 'A'];

    let puntosJugadores = [];


    // referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
      


    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];

        for(let i=0; i<numJugadores; i++){
            puntosJugadores.push(0);
            puntosHTML[i].innerText = '0';
            divCartasJugadores[i].innerHTML = '';
        }
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    const crearDeck = () => {

        deck = [];

        for(let i=2; i<=10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for(let esp of especiales){
            for(let tipo of tipos){
                deck.push(esp + tipo);
            }
        }

        // metodo de la libreria underscore para barajar
        return _.shuffle(deck);
    }



    const pedirCarta = () => {
        if(deck.length === 0){
            throw 'No hay cartas en el deck'
        }
        
        return deck.pop();
    }



    const valorCarta = (carta) => {
    
        const valor = carta.substring(0, carta.length-1);
        
        return (isNaN(valor)) 
                    ? (valor === 'A') ? 11 : 10
                    : valor * 1; // al multiplicar por uno pasa de String a number
        
    };



    // turno: 0 primer jugador y ultimo turno es la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }



    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')  // clase carta del CSS
        divCartasJugadores[turno].append(imgCarta);
    }


    const determinarGanador = () => {

        // desestructuracion de arreglos
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            
            if(puntosMinimos > 21){
                alert('Computadora gana');
            }else if(puntosMinimos === puntosComputadora){
                alert('empate, nadie gana');
            }else if((puntosMinimos < 21) && (puntosComputadora <= 21)){
                alert('computadora gana');
            }else{
                alert('Ganaste');
            }
        }, 25);
    }




    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);

            crearCarta(carta, puntosJugadores.length-1);
            
            if(puntosMinimos > 21){
                break;
            }
        
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    };





    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if(puntosJugadores[0] > 21){
            console.warn('perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);

        }else if(puntosJugadores[0] === 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            console.log('21 Genial');
            turnoComputadora(puntosJugadores[0]);
        }
    });



    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });



    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego}

})();