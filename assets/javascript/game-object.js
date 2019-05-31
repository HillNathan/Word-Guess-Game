// 
// Declaring Global Variables
//
// setting the array of words that will be randomly selected to guess from
var wordArray = ["LETTUCE", "CARROT", "BANANA", "PEPPER", "APPLE", "ORANGE", "APRICOT", "POTATO", "PUMPKIN", "MANGO", "PAPAYA", "RADISH", "CHERRY", "CELERY",
                "LEMON", "LIME", "TOMATO", "CUCUMBER", "BROCCOLI", "PEACH"];

var goodguess;

function isLetter(c) {
    // returns true if c is a string, false if not a string
    // use in conjunction with a length check in the if clause to make sure we 
    // are processing letters only in the game. 
    return c.toLowerCase() != c.toUpperCase();
    }                

var game = {
    // game object containing all of the game properties needed to run the game. 

        // keys for updating the webpage
        displayBadGuess : document.getElementById("bad-guesses"),       ///badGuessText
        displayGuessText : document.getElementById("the-word"),         ///guessDisplayText
        displayWins : document.getElementById("user-wins"),             ///userWins
        displayUserGuesses : document.getElementById("guesses-left"),   ///userGuesses
        displayUserResults : document.getElementById("result"),         ///userResults
        displayInstructions : document.getElementById("instructions"),
        displayReset: document.getElementById("reset"),

        //setting keys for things like wins, guesses left, and other in-game variables
        currentGuess: "",           ///currentGuess
        badGuesses : "",        ///badGuesses
        wins : 0,               ///wins
        guessesLeft : 10,       ///guessesLeft
        currentWord: "",            ///currentWord

        // setting up some arrays to be used for guess tracking, display, and comparison for wins
        guessArray : [],        
        currentWordArray : [], 
        guessDisplayArray : [], 

        addToBadGuess: function() {   /// addtobadguessstring
            // This function updates our wrong guesses by adding the data from the current guess to a string and
            // displaying that string for the user to see. It also updates the guesses left, since that only 
            // triggers when the user has made a bad guess. 
            if (this.badGuesses == "") {
                this.badGuesses = this.currentGuess;
            }
            else {
                this.badGuesses = this.badGuesses + ", " + this.currentGuess;
            }   
            // update the screen so the user can see the info
            this.displayBadGuess.innerHTML = this.badGuesses;
            this.displayUserGuesses.innerHTML = this.guessesLeft;
        },



        alreadyGuessed: function () {   ///checkGuess
            // returns true if the letter has already been guessed, 
            // false if the letter has not been guessed yet

            //local var to hold the return value
            var isGuessed = false;
            for (var i=0; i < this.guessArray.length; i++) {
                if (this.guessArray[i] === this.currentGuess){
                    isGuessed = true;
                    break;
                    //breaks immediately on finding true so that it doesn't get set to false by a later entry and cause a false report
                }
            }
            return isGuessed;
        },

        checkGuess: function () {    ///CheckOurGuess
            // this function checks to see if our guess is in the currentword array

            //local variable to determine if the letter was guessed correctly
            var guess = false;

            //check our current guess against each element in the word array
            for (i=0; i < this.currentWordArray.length; i++){
                // if we find the guessed letter in the array, set the local var to true 
                // and update the display array with the correct guess
                if (this.currentGuess === this.currentWordArray[i]) {
                    guess = true
                    this.guessDisplayArray[i] = this.currentGuess;
                }
            }
            // if the local var remains false, decrease our bad guesses left counter 
            // and update our "bad guess" string with the wrong letter and display it
            if (guess === false){
                this.guessesLeft--;
                this.addToBadGuess();
            }
        },

        updateDisplay: function () {        ///displayUserGuessArray
            //This functions is set up update the user guess display area of the game after any changes to the array
            var userText = ""
            for (i = 0; i < this.guessDisplayArray.length; i++){
                userText = userText + this.guessDisplayArray[i] + " ";
            }
            this.displayGuessText.innerHTML = userText;
        },

        initialize: function () {           ///initializeGame
            // This function sets up a new game, whether on the initial load or after a win.

            //set all the variables back to their initial states
            this.guessArray = [];
            this.currentWordArray = [];
            this.guessDisplayArray = [];
            this.badGuesses = "";
            this.guessesLeft = 10;
            
            // pick a new word from the words array
            this.currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
            
            // use this bit of code to place the letters of the word one by one into an array for display and comparison purposes
            for (var i=0; i<this.currentWord.length; i++){
                this.currentWordArray[i] = this.currentWord.charAt(i);
            }

            //use this loop to reset the display array for the user 
            for (var i=0; i<this.currentWordArray.length; i++){
                this.guessDisplayArray[i] = "_";
            }

            // reset all of the stuff the user sees
            this.displayBadGuess.innerHTML = "";
            this.updateDisplay();
            this.displayUserGuesses.innerHTML = this.guessesLeft;
            game.displayInstructions.style.display = "initial";
            game.displayUserResults.style.display = "none";
            game.displayReset.style.display = "none";
        },

        checkWin: function () {         ////checkWin
            var didwewin = true;
            // this function checks to see if the user has won the game by seeing if the word array and the guess array are identical
            for (i=0; i<this.currentWordArray.length;i++){
                if (this.currentWordArray[i] !== this.guessDisplayArray[i]) {
                    didwewin = false;
                    break;
                    // breaks immediately to prevent false returns
                }
            }
        return didwewin;
        },
}
//Below here is the actual game code, running the game and using the object to do so...
//
//

// sets up a new game, bringing everything back to initial setup status
game.initialize();

document.onkeyup = function(event) {
    //primary game function, triggers off of key-up event
    // convert all guesses to uppercase to facilitate matching
    game.currentGuess = event.key.toUpperCase();

    // used a handy bit of code to make sure all guesses are letters only
    if ((isLetter(game.currentGuess)) && (game.currentGuess.length === 1)){
        // if array is reset then just add the first guess
        if (game.guessArray.length == -1) {
            game.guessArray.push(game.currentGuess);
            //check the guess to see if it is in our word
            game.checkGuess();
            //update the user display with new info
            game.updateDisplay();
            // since this is only the first letter, we do not check to see if we won or not. There is no
            // combination of factors that would allow for a one-guess win.
        }
        else {
            // if array is not empty, then check to make sure we haven't guessed the letter already
            goodGuess = game.checkGuess();
            if (goodguess == false){
                game.guessArray.push(game.currentGuess);
                // if we haven't guessed the letter already check to see if we guessed right
                game.checkGuess();
            }
            game.updateDisplay();
            // call a function that returns "true" if we won the game
            if(game.checkWin()){
                // if we won, update our win counter, display it for the user, and start a new game
                game.wins++
                game.displayWins.innerHTML = game.wins;
                game.displayUserResults.innerHTML = "Good Job! You guessed <br>" + game.currentWord + "!!<br><br>";
                // game.initialize();
                //trying this out...
                game.displayInstructions.style.display = "none";
                game.displayUserResults.style.display = "block";
                game.displayReset.style.display = "block";

            }
        }
        // need to check to see if the user is out of guesses and restart a new game if they are. 
        if (game.guessesLeft == 0){
            game.displayuserResults.innerHTML = "Sorry, the answer was " + currentWord + ". Please try again.";
            game.initialize();
        }
    }   
}

