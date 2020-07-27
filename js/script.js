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
var numeriPc = [];
var numeriGiusti = [];
var numeriUtente = [];

/* Finchè la lunghezza dell'array non arriva a 5 */
/* inserisco un numero nell'array dopo aver controllato che nn è presente 
nell'array */
while (numeriPc.length < 5) {
	var numeroRnd = numRandom(1, 100);
	if (!checkArr(numeriPc, numeroRnd)) {
		numeriPc.push(numeroRnd);
	}
}

/*  */

$('.flip-card-front').each(function (i) {
	$(this).text(numeriPc[i]);
})

$('.flip-card').each(function (i) {
	$(this).attr('value', numeriPc[i]);
})

setTimeout(function () {
	$('.flip-card').addClass('prova');
	$('h2').text('Ora tieni a mente i numeri per 30 secondi');
	$('h1').text('Memory Start');
}, 10000);


/*  */

// 2. Visualizzo nell'alert l'array di num creati dal pc
// alert(numeriPc + 'Memorizza questi numeri, hai 30 secondi di tempo');
console.log(numeriPc);


// 3. metodo setTimeout per temporizzare la comparsa del ciclo di 5 prompt
setTimeout(function () {

	// utilizzo un while invece che un for che mi permette di verificare che l'utente nn inserisca più volte lo stesso numero... il contatore è numeriUtente.length < 5 così da incrementarsi ogniqualvolta l'utente mette un numero non ancora messo (a prescinde dal fatto che sia o meno presente in quelli definiti random dal pc)
	while (numeriUtente.length < 5) {
		var numeroUtente = parseInt(prompt('Inserisci un numero che hai visto e premi ok'));
		// 4.1 controllo che il num non sia già stato inserito
		if (!checkArr(numeriUtente, numeroUtente)) {
			numeriUtente.push(numeroUtente);
			// 4. Controllo se il num è stato indovinato...
			if (checkArr(numeriPc, numeroUtente)) {
				numeriGiusti.push(numeroUtente);
				console.log('trovato');
				var str = `[value="${numeroUtente}"]`;
				console.log(str);
				$(str).removeClass('prova');
			}
		} else {
			alert(`Guarda che questo numero l'hai già inserito`);
		}
	}
	// Log a video dei numeri indovinati e di quanti sono
	console.log('Hai indovinato ' + numeriGiusti.length + ' numeri. Eccoli ' + numeriGiusti);
}, 30000);


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