"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let current0El = document.querySelector("#current--0");
let current1El = document.querySelector("#current--1");


//TODO: Starting conditions program------------------

let currentScore = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden"); // doing hidden roll dice in center
let scores = [0, 0];
let activePlayer = 0; // 0 так как массив с идет с 0
let playing = true;  // boolean - game over or not


//TODO: Restarting all conditions GAME OVER!
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();


//TODO: refactoring function for 2 places executing
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0; // resset score down 0
    currentScore = 0; // resset score for second player.
    activePlayer = activePlayer === 0 ? 1 : 0; // if - acPl = 0 switch 1. else 0
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active"); // скрываем не активного игрока.
};

//TODO: Rolling dice functionality-------------------

btnRoll.addEventListener("click", function () {
    //1. Generating a random dice roll. from 1 to 6.
    if (playing) {

        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Show dispaly dice.
        diceEl.classList.remove("hidden"); // open roll in center
        diceEl.src = `dice-${dice}.png`;    //! подставляем картинку по числу

        //3. Check for rolled 1: if true
        if (dice !== 1) {
            // Add dice to current score.
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; // вывод на экран.
            // }
        } else {
            switchPlayer();
        }
    }
});


btnHold.addEventListener("click", function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {   //пример скоре = 10 у активПлеера 0. индекс
            // Finish the game
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        }
        // 3. Switch to next player.
        switchPlayer();
    }
});

btnNew.addEventListener("click", init);