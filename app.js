/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes.
    Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's
    turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
    After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// START GAME

var score, activePlayer, currentScore, gamePlaying;
init();

// ROLL DICE BUTTON

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        var dice = Math.floor((Math.random() * 6 + 1)); // It gets a random number

        var diceDOM = document.querySelector('.dice'); // Image for random number displayed
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //Update round score when dice rolled 1
        if (dice > 1) {
            currentScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        } else {
            nextPlayer();
        }
    }
});

//HOLD BUTTON

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Add current score to global score
        score[activePlayer] += currentScore;

        //2. Update global score UI
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];

        //3. Check if player won.

        if (score[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

// NEW GAME BUTTON

document.querySelector('.btn-new').addEventListener('click', newGame);


//FUNCTIONS

function init() {
     score = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     gamePlaying = true; // State variable

    document.querySelector('.dice').style   .display = 'none';

// Set player scores to 0

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
}

function nextPlayer() {
    currentScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = '0';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // Switch player
    document.querySelector('.player-0-panel').classList.toggle('active'); // Switch active player style
    document.querySelector('.player-1-panel').classList.toggle('active'); // to inactive and viceversa.
    document.querySelector('.dice').style.display = 'none'; // Set dice display to No Show.
}

function newGame() {
    // Remove winner class
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    //Remove Winner! from name
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
    //Set scores and UI to 0
    init();
    //Add active class back
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}


