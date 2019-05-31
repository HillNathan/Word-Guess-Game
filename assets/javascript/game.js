// 
// Declaring Global Variables
//
// document variables for updating the webpage
var badGuessText = document.getElementById("bad-guesses");
var guessDisplayText = document.getElementById("the-word");
var userWins = document.getElementById("user-wins");
var userGuesses = document.getElementById("guesses-left");
var userResults = document.getElementById("result");

// setting the array of words that will be randomly selected to guess from
var wordArray = ["LETTUCE", "CARROT", "BANANA", "PEPPER", "APPLE", "ORANGE", "APRICOT", "POTATO", "PUMPKIN", "MANGO", "PAPAYA", "RADISH", "CHERRY", "CELERY",
                "LEMON", "LIME", "TOMATO", "CUCUMBER", "BROCCOLI", "PEACH"];

//setting variables for things like wins, guesses left, and other in-game variables
var currentGuess;
var badGuesses = "";
var wins = 0;
var guessesLeft = 10;
var currentWord;
var goodGuess;

// setting up some arrays to be used for guess tracking, display, and comparison for wins
var guessArray = [];
var currentWordArray = [];
var guessDisplayArray = [];


// sets up a new game, bringing everything back to initial setup status
initializeGame();

document.onkeyup = function(event) {
    //primary game function, triggers off of key-up event
    // convert all guesses to uppercase to facilitate matching
    currentGuess = event.key.toUpperCase();

    // used a handy bit of code to make sure all guesses are letters only
    if ((isLetter(currentGuess)) && (currentGuess.length === 1)){
        // if array is reset then just add the first guess
        if (guessArray.length == 1) {
            guessArray.push(currentGuess);
            //check the guess to see if it is in our word
            checkOurGuess();
            //update the user display with new info
            displayUserGuessArray();
            // since this is only the first letter, we do not check to see if we won or not. There is no
            // combination of factors that would allow for a one-guess win.
        }
        else {
            // if array is not empty, then check to make sure we haven't guessed the letter already
            goodGuess = checkGuess();
            if (goodGuess == false){
                guessArray.push(currentGuess);
                // if we haven't guessed the letter already check to see if we guessed right
                checkOurGuess();
            }
            displayUserGuessArray();
            // call a function that returns "true" if we won the game
            if(checkWin()){
                // if we won, update our win counter, display it for the user, and start a new game
                wins++
                userWins.textContent = wins;
                userResults.textContent = "Good Job! You guessed " + currentWord + "!!";
                initializeGame();
            }
        }
        // need to check to see if the user is out of guesses and restart a new game if they are. 
        if (guessesLeft == 0){
            userResults.textContent = "Sorry, the answer was " + currentWord + ". Please try again.";
            initializeGame();
        }
    }   
}

function addToBadGuessString() {
    // This function updates our wrong guesses by adding the data from the current guess to a string and
    // displaying that string for the user to see. It also updates the guesses left, since that only 
    // triggers when the user has made a bad guess. 
    if (badGuesses == "") {
        badGuesses = currentGuess;
    }
    else {
        badGuesses = badGuesses + ", " + currentGuess;
    }   
    // update the screen so the user can see the info
    badGuessText.textContent = badGuesses;
    userGuesses.textContent = guessesLeft;
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
            //breaks immediately on finding true so that it doesn't get set to false by a later entry and cause a false report
        }
    }
    return isGuessed;
}

function checkOurGuess () {
    // this function checks to see if our guess is in the currentword array

    //local variable to determine if the letter was guessed correctly
    var guess = false;

    //check our current guess against each element in the word array
    for (i=0; i < currentWordArray.length; i++){
        // if we find the guessed letter in the array, set the local var to true 
        // and update the display array with the correct guess
        if (currentGuess === currentWordArray[i]) {
            guess = true
            guessDisplayArray[i] = currentGuess;
        }
    }
    // if the local var remains false, decrease our bad guesses left counter 
    // and update our "bad guess" string with the wrong letter and display it
    if (guess === false){
        guessesLeft--;
        addToBadGuessString()
    }
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

    //set all the variables back to their initial states
    guessArray = [""];
    currentWordArray = [""];
    guessDisplayArray = [""];
    badGuesses = "";
    guessesLeft = 10;
    

    // pick a new word from the words array
    currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    
    // use this bit of code to place the letters of the word one by one into an array for display and comparison purposes
    for (var i=0; i<currentWord.length; i++){
        currentWordArray[i] = currentWord.charAt(i);
    }

    //use this loop to reset the display array for the user 
    for (var i=0; i<currentWordArray.length; i++){
        guessDisplayArray[i] = "_";
    }

    // reset all of the stuff the user sees
    badGuessText.textContent = "";
    displayUserGuessArray();
    userGuesses.textContent = guessesLeft;
}

function checkWin() {
    var didwewin = true;
    console.log("checking to see if we won");
    // this function checks to see if the user has won the game by seeing if the word array and the guess array are identical
    for (i=0; i<currentWordArray.length;i++){
        if (currentWordArray[i] !== guessDisplayArray[i]) {
            didwewin = false;
            break;
            // breaks immediately to prevent false returns
        }
    }
return didwewin;
}