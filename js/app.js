// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

/*
 * Create a list that holds all of your cards
 */
var cards = ['diamond', 'diamond', 'plane', 'plane', 'cube', 'cube', 'bolt', 'bolt', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb', 'anchor', 'anchor'];
var rate3 = 50;
var rate2 = 35;
var rate1 = 20;

var match = 0;
var moves = 0;

var timerElement = document.querySelector('.timer');
var timeUsage = 0;
var currentTime = 0;

var lis = document.querySelectorAll('.stars li');

var opened = [];
var $deck = $('.deck');
var $movesElment = $('.moves');
var $restartGame = $('.restart');
/*
 * init game
 */
function initGame(){
	match = 0;
	moves = 0;
	$movesElment.html(0);
	shuffle(cards);
	//init star
  
	for (var i = 0; i < lis.length; i++) {
	    lis[i].innerHTML = '<i class="fa fa-star">';
	}
  
	//for(var i = 0; li = lis[i]; i++) {
  //  	li.innerHTML = '<i class="fa fa-star">';
	//}

	//init card
	$deck.empty();
	for (var j = 0; j < cards.length; j++) {
		$deck.append($('<li class="card"><i class="fa fa-' + cards[j] + '"></i></li>'));
	}
	//listen card
	addListenerToCard();
	//
	resetTimer(currentTime);
	timerElement.textContent = 0;
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
		for(var i=0, li=lis[i]; i < lis.length; i++) {
    		li.innerHTML = '<i class="fa fa-star">';
		}
		rating = 3;
	}else if(moves > rate1 && moves < rate2){
    	lis[2].innerHTML = '<i class="fa fa-star-o">';
    	rating = 2;
	}else if (moves > rate2 && moves < rate3) {
		for(var j=1, lj=lis[j]; j< lis.length; j++) {
    		lj.innerHTML = '<i class="fa fa-star-o">';
		}
		rating = 1;
	}else if (moves > rate3){
		for(var k = 0, lk=lis[k]; k < lis.length; k++) {
    		lk.innerHTML = '<i class="fa fa-star-o">';
		}
	}
	return rating;
}


/*
 *Restart Game
 */
 /* 
  *
  */
function resetGame(){
    if (confirm("Do you want to restart?")) {
        initGame();
    } else {
        return;
    }
}

/*
 * add listener to card
 */
function addListenerToCard(){
	// for(var i=0; card = cardsElment[i]; i++) {
	$deck.find('.card').bind('click', function () {

		// moveElement.textContent = moves;
		var $this = $(this);
		if($this.hasClass('show') || $this.hasClass('match')){
			return;
		}
		var content = $this.context.innerHTML;
		$this.addClass('open show');
		
		opened.push(content);
		if(opened.length > 1){
			if (content === opened[0]) {
				$deck.find('.open').addClass('match animated infinite rubberBand');
				setTimeout(function () {
					$deck.find('.match').removeClass('open show animated infinite rubberBand');
				}, 300);
				match++;
			} else {
				$deck.find('.open').addClass('notmatch animated infinite wobble');
				setTimeout(function () {
					$deck.find('.open').removeClass('animated infinite wobble');
				}, 700);
				setTimeout(function () {
					$deck.find('.open').removeClass('open show notmatch animated infinite wobble');
				}, 300);
			}
			moves++;
			setRate(moves);
			$movesElment.html(moves);
			opened = [];
		}

		if (8 === match) {
			setTimeout(function () {
				gaveOver(moves);
			}, 500);
		}

	});

}
/*
 * game over
 */
 function gaveOver(moves){

 	if (confirm('Congratulations! You Won!\n With ' + moves + ' Moves and ' + setRate(moves) + ' Stars in ' + timeUsage + ' Seconds.\n Woooooo! OK to restart.')) {
        initGame();
    } else {
        return;
    }
 }


 /*
  * start timer
  */
function initTimer(){
	timeUsage = 0;
	currentTime = setInterval(function () {
	    timeUsage += 1;
	    timerElement.textContent = timeUsage;
	}, 1000);
}

/*
 * timer reset
 */
function resetTimer(timeUsage){
	if (timeUsage) {
		clearInterval(timeUsage);
	}	
}

initGame();
