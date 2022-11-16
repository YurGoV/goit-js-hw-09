import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('input#datetime-picker');
const refStartButton = document.querySelector('button[data-start]')
const refStopButton = document.querySelector('button[data-stop]')


const refDispleyTime = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds:document.querySelector('span[data-seconds]'),
};

// todo: DONE замінити на buttonsActivity
// disactiveButton();
buttonsActivity(false);


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        checkDateAndButton(selectedDates)
    },
  };


const inputDate = flatpickr(dateInput, options);

class Countdown {
    constructor({onCount, finishTime, onStart, countRestore = false}) {
        this.intervalId = null;
        this.onCount = onCount;
        this.finishTime = finishTime;
        this.onStart = onStart;
        this.countRestore = countRestore;// todo: DONE for localstorage
    }

    start() {
        const intervalId = setInterval(() => {
          let dateToDisplay = NaN;
          if (this.countRestore) {
            dateToDisplay = this.convertMs(this.finishTime - new Date());
            localStorage.setItem('counter-data', this.finishTime);
          } else {
            dateToDisplay = this.convertMs(this.finishTime.selectedDates[0] - new Date());
            localStorage.setItem('counter-data', this.finishTime.selectedDates[0]);
          }
            if (Object.values(dateToDisplay).every(value => value <= 0)) {//якщо усі значення д/г/ч/хв будуть нулями або менше // if (inputDate.selectedDates[0] - new Date() <= 999) {
                // clearInterval(intervalId);//todo: DONE винести назовні / зроблено через onStopButtonClick();
                // localStorage.removeItem('counter-data');
              onStopButtonClick();

                if (dateToDisplay.seconds < 0) {
                    onTimeIsOver();
                    return
                }
                this.onCount(dateToDisplay);
            return
            }
            this.onCount(dateToDisplay);

            buttonsActivity(false);

          return intervalId;

        }, 1000)

        this.intervalId = intervalId;
    }

    convertMs(ms) {
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
      };

}

const countdown = new Countdown({
    onCount: onCounterDisplay,
    finishTime: inputDate,
    onStart: buttonsActivity,
});

//todo: DONE Зробити запис дати в веб-сховище та автоматичне
// відновлення таймера при перезавантаженні
function previousCount() {
  const counterStorage = localStorage.getItem('counter-data');
  if (counterStorage !== null) {
    const counterStorageDate = new Date(localStorage.getItem('counter-data'));
    countdown.finishTime = counterStorageDate;
    countdown.countRestore = true;
    return countdown.start();
  }
  // return console.log("-> null data", counterStorage);
  return false;
}
previousCount();

function onStopButtonClick() {
  clearInterval(countdown.intervalId);
  buttonsActivity(true);
  onCounterDisplay ({ days: 0, hours: 0, minutes: 0, seconds:0 });
  localStorage.removeItem('counter-data');
}

refStartButton.addEventListener('click', countdown.start.bind(countdown));
refStopButton.addEventListener('click', onStopButtonClick);

function checkDateAndButton (selectedDates) {
    //
    if (selectedDates[0] - new Date() <= 0) {
        if (refStartButton.disabled === false) {
            // refStartButton.disabled = true;// todo: DONE замінити на buttonsActivity
          buttonsActivity(false);
        }

        Notify.failure('Please choose a date in the future',
            {
                clickToClose: true,
                position: 'center-top',
            },);
      }

      if (selectedDates[0] - new Date() > 0 && refStartButton.disabled === true) {
        // refStartButton.disabled = false;
        buttonsActivity(true);
    }
}

// todo: DONE переробити запис табло у ДОМ без постійного читання даних дом у currentTimeValue
let previousTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};
function onCounterDisplay (dateToDisplay) {
    Object.keys(dateToDisplay).map((key) => {//пишемо в ДОМ тільки те, що змінюється
        const currentTimeValue = addLeadingZero(dateToDisplay[key].toString());
        if (dateToDisplay[key] !== previousTime[key]) {
        // console.log(`записуємо у ДОМ: ${key}: ${currentTimeValue}`);
        refDispleyTime[key].textContent = currentTimeValue;
        }
        previousTime[key] = dateToDisplay[key];
    });
}

function buttonsActivity (activity) {
  if (activity) {
    refStartButton.disabled = false;
    refStopButton.disabled = true;
    return;
  }
  refStartButton.disabled = true;
  refStopButton.disabled = false;
}

function onTimeIsOver() {
    Notify.failure('You press start after time is over (',
    {
        clickToClose: true,
        position: 'center-top',
    },);
    // refStartButton.disabled = true;
    buttonsActivity(false);
}

  function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
  }