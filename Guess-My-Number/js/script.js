'use strict';

const secretNumber = Math.trunc((Math.random() * 20) + 1);
let gameScore = 20;
let maxScore = 0;
const scoreLabel = document.querySelector('.score');
const highScoreLabel = document.querySelector('.highscore');
const answerNumber = document.querySelector('.number');
const inputNumber = document.querySelector('.guess');
const message = document.querySelector('.message');
let body = document.querySelector('body');


// Click on check button
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(inputNumber.value);

    //No input
    if (!guess) {
        message.textContent = "No number...";
        //Win game
    } else if (guess === secretNumber) {
        message.textContent = "Correct Number!";
        answerNumber.textContent = `${secretNumber}`;
        body.style.backgroundColor = '#60b347';
        answerNumber.style.width = '30rem';
        if (maxScore < gameScore) {
            maxScore = gameScore;
            highScoreLabel.textContent = `${maxScore}`;
        }
        //Guess too high
    } else if (guess > secretNumber) {
        message.textContent = "Too high...";
        gameScore--;
        scoreLabel.textContent = `${gameScore}`;
        //Guess too low
    } else if (guess < secretNumber) {
        message.textContent = "Too low...";
        gameScore--;
        scoreLabel.textContent = `${gameScore}`;
    }
})

//Game reset
document.querySelector('.again').addEventListener('click', function () {
    gameScore = 20;
    scoreLabel.textContent = '20';
    answerNumber.textContent = '?';
    message.textContent = 'Start guessing...'
    inputNumber.value = '';
    body.style.backgroundColor = '#222';
    answerNumber.style.width = '15rem';
})