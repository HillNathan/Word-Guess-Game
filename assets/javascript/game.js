// 
// Declaring Global Variables
//
var currentGuess;
var badGuessText = document.getElementById("bad-guesses");
var guessDisplayText = document.getElementById("the-word");
var userWins = document.getElementById("user-wins");
var badGuesses = "";
var wins = 0;
var guessesLeft = 10;
var wordArray = ["LETTUCE", "CARROT", "BANANA", "PEPPER"];
var currentWord;
var goodGuess;
var guessArray = [" "];
var currentWordArray = [""];
var guessDisplayArray = [""];


// sets up a new game
initializeGame();

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

function displayUserGuessArray() {
    //This functions is set up update the user guess display area of the game after any changes to the array
    var userText = ""
    for (i = 0; i < guessDisplayArray.length; i++){
        userText = userText + guessDisplayArray[i] + " ";
    }
    guessDisplayText.textContent = userText;
}

function initializeGame() {
    // This function sets up a new game, whether on the initial load or after a win.
    guessArray = [""];
    currentWordArray = [""];
    currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    console.log(currentWord);
    console.log(currentWord.length);
    for (var i=0; i<currentWord.length; i++){
        currentWordArray[i] = currentWord.charAt(i);
    }
    for (var i=0; i<currentWordArray.length; i++){
        guessDisplayArray[i] = "_";
    }
    displayUserGuessArray();

}