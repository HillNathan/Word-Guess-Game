// 
// Declaring Global Variables
//
var currentGuess
var badGuessText = document.getElementById("bad-guesses");
var badGuesses = "";
var wins = 0;
var userWins = document.getElementById("user-wins");
var guessesLeft = 10;
var wordArray = ["LETTUCE", "CARROT", "BANANA", "PEPPER"]
var currentWord
var guessArray = [" "];
var goodGuess

currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];

// alert(currentWord)

document.onkeyup = function(event) {
    // convert all guesses to uppercase to facilitate matching
    currentGuess = event.key.toUpperCase();

    // used a handy bit of code to make sure all guesses are letters only
    if ((isLetter(currentGuess)) && (currentGuess.length === 1)){
        if (guessArray.length == 1) {
            //if array is reset then just add the first guess
            guessArray.push(currentGuess);
            addToBadGuessString();
        }else {
            goodGuess = checkGuess();
            // if array is not empty, check to see if the current guess has already been guessed
            if (goodGuess == false){
                guessArray.push(currentGuess);
                addToBadGuessString();
            }
        }
        console.log(guessArray)
    }

}

function addToBadGuessString() {
    if (badGuesses == "") {
        badGuesses = currentGuess;
    }
    else {
        badGuesses = badGuesses + ", " + currentGuess;
    }   
    badGuessText.textContent = badGuesses;
}

function isLetter(c) {
    // returns true if c is a string, false if not a string
    // use in conjunction with a length check in the if clause to make sure we 
    // are processing letters only in the game. 
    return c.toLowerCase() != c.toUpperCase();
  }

function checkGuess() {
    // returns true if the letter has already been guessed, 
    // false if the letter has not been guessed yet

    //local var to hold the return value
    var isGuessed = false;
    for (var i=0; i < guessArray.length; i++) {
        if (guessArray[i] === currentGuess){
            isGuessed = true;
            break;
        }
    }
    return isGuessed;
}
