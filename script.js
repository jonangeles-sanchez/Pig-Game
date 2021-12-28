'use strict';

//Selecting elements
const player0El = document.querySelector('.player--1');
const player1El = document.querySelector('.player--0');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //Somewhat faster than querySelector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winner = document.querySelector('.player--winner');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll 1-6
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice); //For Testing

  // 2. Display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1: if true, switch to next player.
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; //if active player is 0, then switch to 1, else if player is already 1, then switch to 0.
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});

//Hold button functionality
btnHold.addEventListener('click', function () {
  if (activePlayer == 0) {
    scores[0] += currentScore;
    score0El.textContent = scores[0];
  } else {
    scores[1] += currentScore;
    score1El.textContent = scores[1];
  }
  if (score0El.textContent >= 100) {
    player1El.classList.toggle('player--active');
    player1El.classList.toggle('player--winner');
    btnRoll.removeEventListener('click');
  } else if (score1El.textContent >= 100) {
    player0El.classList.toggle('player--active');
    player0El.classList.toggle('player--winner');
    btnRoll.removeEventListener('click');
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; //if active player is 0, then switch to 1, else if player is already 1, then switch to 0.
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});

//Hold button functionality.
