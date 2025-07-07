'use strict';
//my try

const originalMidBox = document.querySelector('.number').textContent;
const originalResponsiveText = document.querySelector('.message').textContent;
// let originalBackground = document.querySelector('body').style.backgroundColor;
// let originalWidth = document.querySelector('.number').style.width;
let originalBackground = getComputedStyle(document.body).backgroundColor;
let originalWidth = getComputedStyle(document.querySelector('.number')).width;

//to handle when we refresh pages and the browser keeps the input
let inputValueEl = document.querySelector('.guess');
inputValueEl.value = '';

//rand 1 => 20 inclusive
let randomNum = getRandNumber();

let currentScoreEl = document.querySelector('.score');
let currentScoreValue = 10;
currentScoreEl.textContent = String(currentScoreValue);

let highScoreEl = document.querySelector('.highscore');

let responsiveTextEl = document.querySelector('.message');

//the help pop up
const helpIcon = document.querySelector('.info-icon');
const overlay = document.querySelector('.overlay');
const help = document.querySelector('.help');
const btnCloseHelp = document.querySelector('.close-help');

let flag = 1;
let lastInput = [];

//handles when user repeats input
const checkSameInput = function () {
  for (let i = 0; i < lastInput.length; ++i) {
    if (lastInput[i] === inputValueEl.value) {
      responsiveTextEl.textContent = "don't repeat answers";
      return true;
    } else return false;
  }
};
function getRandNumber() {
  return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}
//check button
document.querySelector('.check').addEventListener('click', function () {
  //checks for same answer
  if (checkSameInput()) {
    return;
  }
  //check for invalid value
  if (!(Number(inputValueEl.value) >= 1 && Number(inputValueEl.value) <= 20)) {
    // if user didnt choose value
    if (inputValueEl.value === '') responsiveTextEl.textContent = 'empty!';
    //invalid value
    else responsiveTextEl.textContent = 'please choose a valid value!';
  }
  //correct answer
  else if (Number(inputValueEl.value) === randomNum) {
    responsiveTextEl.textContent = 'corect!!!!!';
    document.querySelector('.number').textContent = inputValueEl.value; //put the value in the middle box
    if (Number(currentScoreEl.textContent) > Number(highScoreEl.textContent)) {
      highScoreEl.textContent = currentScoreEl.textContent;
    } //update the highscore
    //set the flag to zero => force again
    flag = 0;
    //disable the buttons
    inputValueEl.disabled = true;
    document.querySelector('.check').disabled = true;
    // manipulate css: backgroung
    //when we specify style we make it string
    document.querySelector('body').style.backgroundColor = '#60b347';
    //manipulate css: guess box
    document.querySelector('.number').style.width = '33%';
  }
  //incorrect answer
  else {
    --currentScoreValue; //decrement if wrong ans
    currentScoreEl.textContent = currentScoreValue;

    if (currentScoreValue === 0) {
      //we lost
      responsiveTextEl.textContent = 'ooh you lost! press play again!';
      inputValueEl.value = '';
      inputValueEl.disabled = true;
      document.querySelector('.check').disabled = true;
    } else if (randomNum > Number(inputValueEl.value)) {
      responsiveTextEl.textContent = "ooops! that's low.";
    } else {
      responsiveTextEl.textContent = "ooops! that's high.";
    }
    lastInput.push(inputValueEl.value);
  }
});

//again button
document.querySelector('.again').addEventListener('click', function () {
  flag = 1; //reset the flag
  document.querySelector('.number').textContent = originalMidBox;
  responsiveTextEl.textContent = originalResponsiveText;
  currentScoreValue = 10;
  currentScoreEl.textContent = currentScoreValue;
  document.querySelector('.guess').value = '';
  //new random number
  randomNum = getRandNumber();
//for testing the game functionality
  console.log(randomNum); //new rand
  //re-enable buttons
  inputValueEl.disabled = false;
  document.querySelector('.check').disabled = false;
  //reset css
  document.querySelector('body').style.backgroundColor = originalBackground;
  document.querySelector('.number').style.width = originalWidth;
});
//for testing the game functionality
console.log(randomNum);

//the help button
const closefunc = function () {
  overlay.classList.add('hidden');
  help.classList.add('hidden');
};
helpIcon.addEventListener('click', function () {
  overlay.classList.remove('hidden');
  help.classList.remove('hidden');
});
btnCloseHelp.addEventListener('click', closefunc);
overlay.addEventListener('click', closefunc);
document,
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !help.classList.contains('hidden')) {
      closefunc();
    }
  });
