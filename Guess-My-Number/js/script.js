'use strict';

const secretNumber = Math.trunc((Math.random() * 20) + 1);
let gameScore = 20;
let maxScore = 0;
const scoreLabel = document.querySelector('.score');
const highScoreLabel = document.querySelector('.highscore');
const answerNumber = document.querySelector('.number');
const inputNumber = document.querySelector('.guess');
let body = document.querySelector('body');

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}

// Click on check button
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(inputNumber.value);

    //No input
    if (!guess) {
        displayMessage("No number...");
        //Win game
    } else if (guess === secretNumber) {
        displayMessage("Correct Number!")
        answerNumber.textContent = `${secretNumber}`;
        body.style.backgroundColor = '#60b347';
        answerNumber.style.width = '30rem';
        if (maxScore < gameScore) {
            maxScore = gameScore;
            highScoreLabel.textContent = `${maxScore}`;
        }
        //When guess is wrong
    } else if (guess !== secretNumber) {
        if (gameScore > 1) {
            displayMessage(guess > secretNumber ? "Too high..." : "Too low...");
            gameScore--;
            scoreLabel.textContent = `${gameScore}`;
        } else {
            displayMessage("You lost the game, try again!");
            scoreLabel.textContent = '0';
        }

    }
})

//Game reset
document.querySelector('.again').addEventListener('click', function () {
    gameScore = 20;
    scoreLabel.textContent = '20';
    answerNumber.textContent = '?';
    displayMessage("Start guessing...")
    inputNumber.value = '';
    body.style.backgroundColor = '#222';
    answerNumber.style.width = '15rem';
})