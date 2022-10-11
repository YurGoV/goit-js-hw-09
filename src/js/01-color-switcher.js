
const refButtonStart = document.querySelector('button[data-start]');
const refButtonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

refButtonStop.disabled = true;
let intervalId = NaN;

refButtonStart.addEventListener('click', onButtonStart);
refButtonStop.addEventListener('click', onButtonStop);

function onButtonStart(event) {
    changeBackgroundColor();
    intervalId = setInterval(changeBackgroundColor, 1000);
    switchButtonsActivity();
};

function onButtonStop() {    
    clearInterval(intervalId);
    switchButtonsActivity();
};

function switchButtonsActivity() {

    refButtonStop.disabled = !refButtonStop.disabled;
    refButtonStart.disabled = !refButtonStart.disabled;
    // console.log('buttons activity changed');
}

function changeBackgroundColor() {
    body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
