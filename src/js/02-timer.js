import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('input#datetime-picker');
const refStartButton = document.querySelector('button[data-start]')

const refDispleyDays = document.querySelector('span[data-days]');
const refDispleyHours = document.querySelector('span[data-hours]');
const refDispleyMinutes = document.querySelector('span[data-minutes]');
const refDispleySeconds = document.querySelector('span[data-seconds]');

refStartButton.addEventListener('click', onStartButtonClick);

console.log(dateInput);
console.log(refStartButton);
console.log('daas');
console.log(refDispleyDays.textContent);
console.log(refDispleyHours.textContent);
console.log(refDispleyMinutes.textContent);
console.log(refDispleySeconds.textContent);

refStartButton.disabled = true;


// console.log('євваа');

const test = 1;
const res = test.toString().padStart(2, 0);
console.log(res);

// const choosenDate = NaN;

const options = {
    enableTime: true,
    enableSeconds: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0] - new Date());
      console.log(convertMs(selectedDates[0] - new Date()));
      const choosenDate = convertMs(selectedDates[0] - new Date());

      if (selectedDates[0] - new Date() <= 0) {
        if (refStartButton.disabled === false) {
            refStartButton.disabled = true;
            console.log('222');
        }
        // window.alert('Please choose a date in the future')
        Notify.failure('Please choose a date in the future');
      }
      
      if (selectedDates[0] - new Date() > 0 && refStartButton.disabled === true) {
        refStartButton.disabled = false;
        console.log('111');
        console.log(refStartButton.disabled);
      } 

      console.log(choosenDate.seconds);
      onDisplay(choosenDate);
    },
  };

const inputDate = flatpickr(dateInput, options);
console.log(inputDate);

function onStartButtonClick() {
    const intervalId = setInterval(() => {
        dateToDisplay = inputDate.selectedDates[0] - new Date();
        onDisplay(convertMs(dateToDisplay))
        console.log(inputDate.selectedDates[0] - new Date());
        console.log(convertMs(inputDate.selectedDates[0] - new Date()).seconds);
        if (convertMs(inputDate.selectedDates[0] - new Date()).seconds === 0) {
            console.log(intervalId);
            console.log(convertMs(inputDate.selectedDates[0] - new Date()));
            clearInterval(intervalId);
            console.log('clearInt');
        }
    }, 1000)
    // dateToDisplay = inputDate.selectedDates[0] - new Date();
    // onDisplay(convertMs(dateToDisplay))
    // onDisplay(convertMs())
    // console.log(convertMs(inputDate.selectedDates[0] - new Date()));

    // onDisplay(convertMs(inputDate.selectedDates[0] - new Date()))
    // console.log(convertMs(inputDate.selectedDates[0] - new Date()));

}

console.log(';13131');

function onDisplay (dateToDisplay) {
    console.log(dateToDisplay.days);
    refDispleyDays.textContent  = addLeadingZero(dateToDisplay.days);
    refDispleyHours.textContent  = addLeadingZero(dateToDisplay.hours);
    refDispleyMinutes.textContent  = addLeadingZero(dateToDisplay.minutes);
    refDispleySeconds.textContent  = addLeadingZero(dateToDisplay.seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
  }