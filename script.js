// TO DO:
// make modal look better

const groups = document.querySelectorAll(".group");
const boxes = document.querySelectorAll(".box");
const buttons = document.querySelectorAll(".button");
const modal = document.querySelector(".modal");
const inner = document.querySelector(".inner");
const newGameButt = document.querySelector("button");

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// list of possible words
const wordList = [
  "crash",
  "glued",
  "glues",
  "plays",
  "trash",
  "pilot",
  "space",
  "races",
  "carry",
  "trait",
  "mouse",
  "house",
  "couch",
  "oiled",
  "broil",
  "foils",
  "mince",
  "array",
  "jumps",
  "splay",
  "trays",
  "ready",
  "raced",
  "maced",
  "waste",
  "paste",
  "blaze",
  "oiler",
  "swans",
  "goose",
  "geese",
  "moose",
  "fires",
  "fired",
  "plugs",
  "craps",
];
// pick a random word from the list
const todaysWord = wordList[Math.floor(Math.random() * wordList.length)];
// the word the player is typing
let playersGuess = "";
// keeps track of what group the player is on
let currGroup = groups[0];
// keeps track of current box
let currBox = 0;
// keeps track if game is over or not
let gameOver = false;

// displays the word in the current group
function displayWord() {
  // turns string into array
  const playersGuessArr = playersGuess.split("");
  // clear group
  clearGroup();
  // goes through each box and prints word
  for (i = 0; i < playersGuessArr.length; i++) {
    currGroup.children[i].innerText = playersGuessArr[i].toUpperCase();
  }
}

// clears group
function clearGroup() {
  for (i = 0; i < currGroup.children.length; i++) {
    currGroup.children[i].innerText = "";
  }
}

function checkLetters() {
  for (i = 0; i < currGroup.children.length; i++) {
    if (playersGuess[i] === todaysWord[i]) {
      colorButtons(i, "green");
    } else if (todaysWord.includes(playersGuess[i])) {
      colorButtons(i, "yellow");
    } else {
      colorButtons(i, "dark-gray");
    }
  }
}

function checkWord() {
  if (playersGuess === todaysWord) {
    gameOverScreen("win");
  } else if (currGroup.nextElementSibling != null) {
    playersGuess = ""; // restarts playersGuess
    currGroup = currGroup.nextElementSibling; // moves to next group
    currBox = 0; // sets currBox back to 0
  } else {
    gameOverScreen("loss");
  }
}

function colorButtons(index, color) {
  currGroup.children[index].classList.add(color);

  buttons.forEach(function (element) {
    if (element.innerText === playersGuess[index].toUpperCase()) {
      element.classList.add(color);
    }
  });
}

function gameOverScreen(result) {
  gameOver = true;
  modal.classList.add("open");
  if (result !== "win") {
    inner.classList.add('red');
  }
  inner.innerText = `${
    result === "win" ? "You Win!" : "L!"
  } The word was ${todaysWord.toUpperCase()}`;
}

// listens for all key presses
window.addEventListener("keydown", (e) => {
  // checks if game is over, and if it is gets out
  if (gameOver) {
    return;
  }
  // checks if key pressed was backspace and if currBox is 0
  if (e.key === "Backspace" && currBox != 0) {
    playersGuess = playersGuess.slice(0, -1);
    currBox -= 1;
  } else if (e.key === "Enter" && currBox === 5) {
    checkLetters(); // checks each letter and gives appropriate color
    checkWord(); // checks to see if word was guessed correclty
  } else if (currBox < 5 && alphabet.includes(e.key.toLowerCase())) {
    // adds letter to playersGuess
    playersGuess += e.key.toLowerCase();
    currBox += 1;
  }
  displayWord(); // displays guess
});

newGameButt.addEventListener("click", function () {
  window.location.reload();
});
