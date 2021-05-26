'use strict';

let scores, currentScores, activePlayer, playing;
const totWins = [0, 0];

//selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const curScore0El = document.getElementById('current--0');
const curScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  curScore0El.textContent = 0;
  curScore1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  diceEl.classList.add('hidden');
};
init();

const updatePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//set starting conditions for score
score0El.textContent = 0;
score1El.textContent = 0;

//remove dice
diceEl.classList.add('hidden');

//roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check if 1 nd if true switch player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      updatePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score
    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // 2. check if score is 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      console.log(
        'Active Player: ',
        activePlayer,
        'Win Counter: ',
        totWins[activePlayer]++
      );
      document.getElementById(`counter--${activePlayer}`).textContent =
        totWins[activePlayer];
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      updatePlayer();
    }
  }
});

//reset entire game
//reset state and ui
btnNew.addEventListener('click', init);
