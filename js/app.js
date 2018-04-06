/*
 * Create a list that holds all of your cards
 */
let cards = ['diamond', 'diamond', 'plane', 'plane', 'cube', 'cube', 'bolt', 'bolt', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb', 'anchor', 'anchor'];
let rate3 = 20;
let rate2 = 15;
let rate1 = 10;
let rateStar = document.getElementsByClassName("stars");

let cardNumbers = 16;

let matched = 0;
let moves = 0;
let moveElement = document.getElementsByClassName('moves');

let timerElement = document.querySelector('.timer');
let timeUsage = 0;
let currentTime = 0;

let ulStar = document.getElementsByClassName('stars');
var lis = document.querySelectorAll('.stars li');
let deck = document.querySelector('.deck');
let cardsElment = document.querySelectorAll('.deck li');

/*
 * init game
*/
function initGame(){
	moves = 0;
	moveElement.textContent = "0";
	shuffle(cards);
	//init star
	for(var i=0; li=lis[i]; i++) {
    	li.innerHTML = '<i class="fa fa-star">';
	}

	//init card
	for(var i=0; card = cardsElment[i]; i++) {
		// card.innerHTML = '<i class="fa fa-star">';
    	card.innerHTML = '<i class="fa fa-' + cards[i] +'"></i>';
	}
	//listen card
	addListenerToCard();
	//
	initTimer();
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * set rate
*/
function setRate(moves){
	var rating = 3;
	if(moves < rate1){
		for(var i=0; li=lis[i]; i++) {
    		li.innerHTML = '<i class="fa fa-star">';
		}
		rating = 3;
	}else if(moves > rate1 && moves < rate2){
		for(var i=2; li=lis[i]; i++) {
    		li.innerHTML = '<i class="fa fa-star-o">';
		}
		rating = 2;
	}else if (moves > rate2 && moves < rate3) {
		for(var i=1; li=lis[i]; i++) {
    		li.innerHTML = '<i class="fa fa-star-o">';
		}
		rating = 1;
	}else{
		for(var i=0; li=lis[i]; i++) {
    		li.innerHTML = '<i class="fa fa-star-o">';
		}
		rating = 0;
	}
	return rating;
}

/*
 * add listener to card
 */
function addListenerToCard(){
	for(var i=0; card = cardsElment[i]; i++) {
		// card.innerHTML = '<i class="fa fa-star">';
    	card.addEventListener('click', function(){
    		
    	});
	}
}


/*
 * game over
 */
 function gaveOver(){

 }

 /* 
  *
  */
  function resetGame(){

  }

 /*
  * start timer
  */
function initTimer(){
	currentTime = setInterval(function () {
	    timeUsage += 1;
	    timerElement.textContent = timeUsage;
	}, 1000);
}

/*
 * timer reset
 */
function resetTimer(timeUsage){
	if(timeUsage){
		timeUsage = 0;
		initTimer();
	}	
}

initGame();
