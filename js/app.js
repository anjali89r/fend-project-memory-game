//var move
//var match
const deck = document.querySelector('.deck');

/*
 * Create a list that holds all of your cards
 */
let cardListHtmlCollection = document.getElementsByClassName('card');
// console.log(cardListHtmlCollection)

//let cardsArray = [...cardListHtmlCollection];
let cardsArray = Array.from( cardListHtmlCollection )
 console.log(cardsArray);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let shuffledArrayOfCards = shuffle(cardsArray)
console.log('shuffledArr' + shuffledArrayOfCards);
for (let card of shuffledArrayOfCards){
    deck.appendChild(card);
}
console.log('appended deck' + (Array.from(document.getElementsByClassName('card')).length))
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
const arrOfOpenCards = [];

deck.addEventListener('click', function(event){
    if (event.target.nodeName === 'LI'){
        showCard(event);
        addToArrOfOpenCards(event);
    }
})

function showCard(evt){
    //console.log("event: ", evt.target.getAttribute('value'))
    //console.log("event class names: ", evt.target.classList)
    evt.target.classList.add('show', 'open');
    //console.log("event after adding class " , evt.target.classList)
}
function addToArrOfOpenCards(evt){
    let move = 0
    let match = 0;
    console.log("value of el: ", evt.target.value);
    arrOfOpenCards.push(evt.target);

    if (arrOfOpenCards.length > 1){
        console.log('INSIDE LEN > 1')
        //console.log( "arrOfOpenCardsAfter, ", arrOfOpenCards[0].getAttribute('value'))
        //console.log( "evt.target, ", arrOfOpenCards[1].getAttribute('value'))
        //console.log(arrOfOpenCards[0].getAttribute('value') === arrOfOpenCards[1].getAttribute('value'))

        if (arrOfOpenCards[0].getAttribute('value') === arrOfOpenCards[1].getAttribute('value')){
            arrOfOpenCards[0].classList.add('match');
            evt.target.classList.add('match');
            arrOfOpenCards[0].classList.remove('show', 'open');
            evt.target.classList.remove('show', 'open');
            arrOfOpenCards.splice(0);

        }
        else {
            setTimeout(function(){
                arrOfOpenCards[0].classList.remove('show', 'open');
                arrOfOpenCards[1].classList.remove('show', 'open');
                arrOfOpenCards.splice(0);

            }, 1000)

        }
    }

    move += 1;
    //display it on the page
}
