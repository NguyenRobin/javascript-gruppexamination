// "use strict";

const secretWordElement = document.querySelector(".hangman-text");
const popUpWindowElement = document.querySelector(".pop-up-window");
const buttonPlayAgain = document.querySelector("button");
const wrongLetterElement = document.querySelector(".wrong__letters-container");
const wrongLetterListElement = document.querySelector(".wrong__letters-list");
const popUpWindowTextElement = document.querySelector(".pop-up-heading");
const timerElement = document.querySelector(".timer-seconds");

//  För att toggla SVG:en
document.querySelector("figure").classList.add("scaffold");
// document.querySelector("figure").classList.add("head");
// document.querySelector("figure").classList.add("body");
// document.querySelector("figure").classList.add("arms");
// document.querySelector("figure").classList.add("legs");

// List of all words that can randomly be shown.
const wordList = ["pumpkin", "ghost", "witch", "skeleton", "dracula"];
const correctWord = []; // stores the correct letters user guesses
const incorrectLetters = []; // Stores the wrong guess

// Random word from our wordList array
let secretWord = wordList[Math.trunc(Math.random() * wordList.length)];
console.log(secretWord);

const parts = ["head", "body", "arms", "legs"];
let currentParts = parts.slice(); // makes a copy of the parts array

let countDownTimer;

/******************************************************************************/
/* PRINTS THE CORRECT LETTER */
/******************************************************************************/
function printSecretWord() {
  const eachLetterOfSecretWord = secretWord.split("");
  secretWordElement.innerHTML = "";
  for (let i = 0; i < eachLetterOfSecretWord.length; i++) {
    if (correctWord.includes(eachLetterOfSecretWord[i])) {
      secretWordElement.innerHTML += `<span class="hangman-letter">${eachLetterOfSecretWord[i]}</span>`;
    } else {
      secretWordElement.innerHTML += `<span class="hangman-letter">${""}</span>`;
    }
  }

  // if guess i correct, user wins
  if (secretWordElement.innerText === secretWord) {
    if (countDownTimer) clearInterval(countDownTimer);
    popUpWindowElement.classList.remove("hidden");
  }
}
printSecretWord();

/******************************************************************************/
/* UPDATES EACH WRONG LETTER */
/******************************************************************************/

function printWrongLettersElement() {
  //
  if (incorrectLetters.length > 0) {
    document
      .querySelector(".wrong__letters-container p")
      .classList.remove("hidden");
    wrongLetterElement.classList.remove("hidden");
  }

  // Prints out a each wrong letter to user
  wrongLetterListElement.innerHTML = "";
  for (let i = 0; i < incorrectLetters.length; i++) {
    wrongLetterListElement.innerHTML += `<li>${incorrectLetters[i]}, </li>`;
    // console.log(wrongLetterListElement);
  }

  // Display parts each time guess is wrong
  let partToShow = currentParts.shift();
  document.querySelector("figure").classList.add(partToShow);

  // Player losses if all the part been displayed.
  if (currentParts.length === 0) {
    if (countDownTimer) clearInterval(countDownTimer);
    popUpWindowElement.classList.remove("hidden");
    popUpWindowTextElement.textContent = "You lost! 🎃";
  }
}

/******************************************************************************/
/* REGISTER KEY PRESSED */
/******************************************************************************/
function guess() {
  document.addEventListener("keydown", function (event) {
    // console.log(event.key);
    if (secretWord.includes(event.key)) {
      if (!correctWord.includes(event.key)) {
        correctWord.push(event.key);
        printSecretWord();
      }
    } else if (!incorrectLetters.includes(event.key)) {
      incorrectLetters.push(event.key);
      printWrongLettersElement();
    }
  });
  countDownTimer = startTimer();
}
guess();

/******************************************************************************/
/* COUNTDOWN TIMER */
/******************************************************************************/

function startTimer() {
  // start count
  let time = 59;

  const tickTack = function () {
    const sec = String(time).padStart(2, 0);
    timerElement.textContent = `00:${sec}`;

    // Players losses
    if (time === 0) {
      clearInterval(countDownTimer);
      popUpWindowElement.classList.remove("hidden");
      popUpWindowTextElement.textContent = "You lost! 🎃";
    }
    // Decrease timer every sec
    time--;
  };

  // call setInterval function each sec
  const countDownTimer = setInterval(tickTack, 1000);
  return countDownTimer;
}

/******************************************************************************/
/* PLAY AGAIN BUTTON */
/******************************************************************************/
buttonPlayAgain.addEventListener("click", function () {
  correctWord.splice(0); // Sets the array back to be empty again.
  incorrectLetters.splice(0);
  secretWord = wordList[Math.trunc(Math.random() * wordList.length)];
  console.log(secretWord);
  popUpWindowElement.classList.add("hidden");
  wrongLetterElement.classList.add("hidden");
  popUpWindowTextElement.textContent = "You won! 👻";

  currentParts = parts.slice();
  document
    .querySelector("figure")
    .classList.remove("head", "body", "arms", "legs");
  printSecretWord();
  if (countDownTimer) clearInterval(countDownTimer);
  timerElement.textContent = "01:00";
  countDownTimer = startTimer();
});
