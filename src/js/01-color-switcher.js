
const refButtonStart = document.querySelector('button[data-start]');
const refButtonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
console.log(refButtonStart);
console.log(refButtonStop);
console.log(body);

// changeColorStatus = NaN;
// switchButtonsActivity(false)

refButtonStop.disabled = true;
let intervalId = NaN;
// refButtonStart.disabled = false;
// const changeColorStatus = false;
// setButtonsActivity()

refButtonStart.addEventListener('click', onButtonStart);
refButtonStop.addEventListener('click', onButtonStop);

function onButtonStart(event) {
    chhangeBackgroundColor();
    intervalId = setInterval(chhangeBackgroundColor, 1000);
    switchButtonsActivity();
    // body.style.backgroundColor = getRandomHexColor();
    // refButtonStop.disabled = false;
    // refButtonStart.disabled = true;
};

function onButtonStop() {
    clearInterval(intervalId);
    // changeColorStatus = true;
    // chhangeBackgroundColor()
    // setInterval(chhangeBackgroundColor, 1000)
    // body.style.backgroundColor = getRandomHexColor();
    // refButtonStop.disabled = true;
    // refButtonStart.disabled = false;
    switchButtonsActivity();
};

function switchButtonsActivity() {
    // if (changeColorStatus) {
    //     // refButtonStop.setAttribute('disabled', true);
    //     console.log('sss');
    //     refButtonStop.disabled = false;
    //     refButtonStart.disabled = true;
    //     return;
    // }
    // refButtonStop.disabled = true;
    // refButtonStart.disabled = false;
    refButtonStop.disabled = !refButtonStop.disabled;
    refButtonStart.disabled = !refButtonStart.disabled;
    // console.log(!refButtonStart.disabled);
    // console.log(refButtonStop.disabled);
    console.log('buttons activity changed');
}

function chhangeBackgroundColor() {
    body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
