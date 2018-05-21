let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let second = 0;
let minute = 0;
let hour = 0;
var myTimer;
let move = 0;
let match = 0;
let starCount = 0;
let starEarned;
const deck = document.querySelector('.deck');
const moveEl = document.querySelector('.moves');
const mainDiv = document.querySelector('.main');
const modalDiv = document.querySelector('.modal');
const playBtn = document.querySelector('.play-btn');
const resetBtn = document.querySelector('.restart');
const starsHtmlCollection = document.getElementsByClassName('sub-star');
const starsArr = Array.from( starsHtmlCollection );
/*
 * Create a list that holds all of your cards
 */
let cardListHtmlCollection = document.getElementsByClassName('card');

//let cardsArray = [...cardListHtmlCollection];
let cardsArray = Array.from( cardListHtmlCollection );
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let shuffledArrayOfCards = shuffle(cardsArray)
//console.log('shuffledArr' + shuffledArrayOfCards);
for (let card of shuffledArrayOfCards){
    deck.appendChild(card);
}
//console.log('appended deck' + (Array.from(document.getElementsByClassName('card')).length))
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
function startTimer(){
    myTimer = setInterval(function(){
        minutesLabel.innerHTML = minute + 'mins ';
        secondsLabel.innerHTML = second + 'secs';
        second++;
        if (second === 60){
            minute++;
            second = 0;
        }
        if (minute === 60){
            hour++;
            minute = 0;
        }
    }, 1000);
    //console.log("my timer is ",myTimer)
}

function showCard(evt){
    evt.target.classList.add('show', 'open');
    evt.target.style.pointerEvents = 'none';
}
function addToArrOfOpenCards(evt){
    arrOfOpenCards.push(evt.target);
    if (arrOfOpenCards.length > 1){
        if (arrOfOpenCards[0].getAttribute('value') === arrOfOpenCards[1].getAttribute('value')){
            matchedCards(evt)
        }
        else {

            unMatchedCards(evt);
        }
        incMove();
    }
}
function matchedCards(event){
    arrOfOpenCards[0].classList.add('match');
            event.target.classList.add('match');
            arrOfOpenCards[0].classList.remove('show', 'open');
            event.target.classList.remove('show', 'open');
            arrOfOpenCards.splice(0);
            match++;
            //move++
            if (match === 8){
                setTimeout(function(){
                    allMatched();
                }, 500)

            }
}
function unMatchedCards(evt){
    setTimeout(function(){
        evt.target.style.pointerEvents = 'auto';
        arrOfOpenCards[0].style.pointerEvents = 'auto';
        arrOfOpenCards[0].classList.add('unmatch');
        arrOfOpenCards[1].classList.add('unmatch');
        arrOfOpenCards[0].classList.remove('show', 'open');
        arrOfOpenCards[1].classList.remove('show', 'open');

    }, 500)
    setTimeout(function(){
        arrOfOpenCards[0].classList.remove('unmatch');
        arrOfOpenCards[1].classList.remove('unmatch');
        arrOfOpenCards.splice(0);
    }, 1100)
}
function incMove(){
    move++;
    if (move === 1){
        startTimer();
    }
    moveEl.textContent = move;
    if (move > 8 && move < 12){
            starsArr[2].classList.add('star-display')
    }
    else if (move > 11 && move < 19) {
        for (let i = 2; i > 0; i--){
            starsArr[i].classList.add('star-display')
        }
    }
}
//after all  cards have been matched display the modal
function allMatched(){
    setTimeout(function(){
        mainDiv.classList.remove('display-content');
        mainDiv.classList.add('undisplay');
        modalDiv.classList.remove('undisplay');
        modalDiv.classList.add('display-content');
        document.querySelector('.add-moves').textContent = move;
        starsArr.forEach(function(star){
            if (star.classList.contains('star-display')){
                starCount++;
            }
            starEarned = 3 - starCount;
        })
        document.querySelector('.add-star').textContent = starEarned;
        document.querySelector('.mts').textContent = minute;
        document.querySelector('.secs').textContent = second;
    }, 1000)
}

playBtn.addEventListener('click', function(){
    mainDiv.classList.remove('undisplay');
    mainDiv.classList.add('display-content');
    modalDiv.classList.remove('display-content');
    modalDiv.classList.add('undisplay');
    resetGame();
})
resetBtn.addEventListener('click', function(){
    let shuffledArrayOfCardsReset = shuffle(cardsArray)
    for (let card of shuffledArrayOfCardsReset){
        if (card.classList.contains('show', 'open')){
            card.classList.remove('show', 'open');
        }

        deck.appendChild(card);
    }
    resetGame();
})
function resetGame(){
    //have to empty the selected cards array on reset, else it will check the selected card
    //with previous selected card stored in this array
    if (arrOfOpenCards.length){
        arrOfOpenCards.splice(0);
    }
    minutesLabel.innerHTML = 0 + 'mins ';
    secondsLabel.innerHTML = 0 + 'secs';
    minute = 0;
    second = 0;
    clearInterval(myTimer);
    move = 0;
    match = 0;
    moveEl.textContent = move;
    cardsArray.forEach(function(card){
        if (card.classList.contains('match')){
            card.classList.remove('match');
        }

        if (card.style.pointerEvents === 'none'){
            card.style.pointerEvents = 'auto';
        }
    })
    starsArr.forEach(function(star){
        star.classList.remove('star-display');
    })
}
