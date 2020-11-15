'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//Switch Player Function
function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
    //1.Generating random
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`;

    //3. Check for rolled 1
    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
        // switch to next player
        switchPlayer();
    }
});

//Hold Functionality
btnHold.addEventListener('click', function () {
    //1.add current score to active player
    scores[activePlayer] += currentScore;
    //2.Check if score >= 100
    if (scores[activePlayer] >= 10) {
        //EndGame
        document.getElementById(`score--${activePlayer}`).textContent = String(scores[activePlayer]);
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceEl.classList.add('hidden');
    } else {
        //3.Switch player
        document.getElementById(`score--${activePlayer}`).textContent = String(scores[activePlayer]);
        switchPlayer();
    }
});