/* Un alert espone 5 numeri casuali.
Dopo la chiusura(manuale, cioè facendo click su ok) dell 'alert, parte un timer di 30 secondi.
Dopo i 30 secondi l 'utente deve inserire un prompt alla volta i numeri che ha visto precedentemente. Dopo che sono stati inseriti i 5 numeri, il software dice quanti e
quali dei numeri da indovinare sono stati individuati. */
// 1. creo un array di num casuali
// 1.1 lo visualizzo in un alert
// 2. al click ok dell'alert parte un timer di 30 secondi
// 3. dopo trenta secondi appare un prompt (ciclato 5 volte) dove l'utente può inserire i numeri che ricorda
// 4. il programma controlla quali e quanti numeri sono stati indovinati


// 1. Array di numeri creati dal pc
var numeriPc = [],
	numeriGiusti = [],
	numeriUtente = [],
	numeroTentativi = $('.flip-card').length;



/* Finchè la lunghezza dell'array non arriva a numeroTentativi*/
/* inserisco un numero nell'array dopo aver controllato che nn sia già presente */
while (numeriPc.length < numeroTentativi) {
	var numeroRnd = numRandom(1, 100);
	if (!numeriPc.includes(numeroRnd)) {
		numeriPc.push(numeroRnd);
	}
}


// Inserisco in ogni cards un numero dell'array random
$('.flip-card-front').each(function (i) {
	$(this).text(numeriPc[i]);
})
$('.flip-card').each(function (i) {
	$(this).attr('value', numeriPc[i]);
})



// Setto il conto alla rovescia per guardare i numeri 10 sec
let clock1 = setInterval(countdown1, 1000);
var indice1 = 10;

function countdown1() {
	$('#time-left1').text(indice1--);
	if (indice1 < 0) {
		clearInterval(clock1);
		// Visualizzazione dei numeri
		visualizza();
	}
}

// Log dei numeri vincenti
console.log(numeriPc);


// Metodo setTimeout per temporizzare la comparsa del ciclo al termine dei 10 sec
// Ho 30 sec di tempo per NON dimenticare i numeri visti

setTimeout(function () {
	let clock2 = setInterval(countdown2, 1000);
	var indice2 = 20;

	function countdown2() {

		$('#time-left2').text(indice2--);
		if (indice2 < 0) {
			clearInterval(clock2);
			inserimento();
		}
	}
}, indice1 * 1000) /* questo temporizzatore serve per partire 10 sec dopo il primo intervallo */






/* Funzioni */


function visualizza() {
	$('.flip-card').addClass('prova');

	$('#second-h2').removeClass('title-none');
	$('#first-h2').addClass('title-none');
};


// 3. metodo setTimeout per temporizzare la comparsa del ciclo di 5 prompt
function inserimento() {

	// utilizzo un while invece che un for che mi permette di verificare che l'utente nn inserisca più volte lo stesso numero... il contatore è numeriUtente.length < 5 così da incrementarsi ogniqualvolta l'utente mette un numero non ancora messo (a prescinde dal fatto che sia o meno presente in quelli definiti random dal pc)
	while (numeriUtente.length < numeroTentativi) {
		var numeroUtente = parseInt(prompt('Inserisci un numero che hai visto e premi ok'));

		// 4.1 controllo che il num non sia già stato inserito
		if (!checkArr(numeriUtente, numeroUtente)) {
			numeriUtente.push(numeroUtente);
			// 4. Controllo se il num è stato indovinato...
			if (checkArr(numeriPc, numeroUtente)) {
				numeriGiusti.push(numeroUtente);
				var str = `[value="${numeroUtente}"]`;
				$(str).removeClass('prova');
			}
			numeroTentativi--;
			$('h1').text(`Memory Start - hai ${numeroTentativi} tentativi`);
		} else {
			alert(`Guarda che questo numero l'hai già inserito`);
		}
	}

	// condizione vittoria
	if (numeriGiusti.length == numeriPc.length) {
		$('.contained').addClass('title-none');
		$('.contained-win').removeClass('title-none');
	} else {
		$('h1').text(`Hai indovinato ${numeriGiusti.length} numeri`);
		$('#second-h2').addClass('title-none');
	}
	// Log a video dei numeri indovinati e di quanti sono
	console.log('Hai indovinato ' + numeriGiusti.length + ' numeri. Eccoli ' + numeriGiusti);
};


/* FUNZIONI */
// funzione random
function numRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// funzione check se un N è presente in un array (true = presente)
function checkArr(arr, num) {
	for (let i = 0; i < arr.length; i++) {
		if (num == arr[i]) {
			return true;
		}
	}
	return false;
}