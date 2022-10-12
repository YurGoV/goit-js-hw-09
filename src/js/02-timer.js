import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('input#datetime-picker');
const refStartButton = document.querySelector('button[data-start]')

const refDispleyTime = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds:document.querySelector('span[data-seconds]'),
};


refStartButton.disabled = true;

const options = {
    enableTime: true,
    // enableSeconds: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

      const choosenDate = convertMs(selectedDates[0] - new Date());

      CheckDateAndButton(selectedDates)
    },
  };


const inputDate = flatpickr(dateInput, options);

const countdown = {
    start() {
        // console.log(inputDate.selectedDates[0]);
        const intervalId = setInterval(() => {
            const dateToDisplay = convertMs(inputDate.selectedDates[0] - new Date());
            // console.log(dateToDisplay);
    
            // if (inputDate.selectedDates[0] - new Date() <= 999) {
            if (Object.values(dateToDisplay).every(value => value <= 0)) {//якщо усі значення д/г/ч/хв будуть нулями або менше
                clearInterval(intervalId);            
                // console.log('clearInt');
    
                if (dateToDisplay.seconds < 0) {
                    // refDispleySeconds.textContent  = '00';
                    onTimeIsOverNotify();
                    
                    refStartButton.disabled = true;
                    return
                }
                onCounterDisplay(dateToDisplay);
            return
            } 
    
            onCounterDisplay(dateToDisplay);
    
        }, 1000)
    }
}

refStartButton.addEventListener('click', countdown.start);

function CheckDateAndButton (selectedDates) {
    
    if (selectedDates[0] - new Date() <= 0) {
        if (refStartButton.disabled === false) {
            refStartButton.disabled = true;
        }
        // window.alert('Please choose a date in the future')
        Notify.failure('Please choose a date in the future',
            {
                clickToClose: true,
                position: 'center-top',
            },);
      }

      if (selectedDates[0] - new Date() > 0 && refStartButton.disabled === true) {
        refStartButton.disabled = false;
    }

};

function onCounterDisplay (dateToDisplay) {

    Object.keys(dateToDisplay).map((key) => {//пишемо в ДОМ тільки те, що змінюється
        const currentTimeValue = addLeadingZero(dateToDisplay[key].toString());
        const previousTimeValue = refDispleyTime[key].textContent;
        if (currentTimeValue !== previousTimeValue) {
        console.log(`записуємо у ДОМ: ${key}: ${currentTimeValue}`);
        // refDispleyTime[key].textContent = addLeadingZero(dateToDisplay[key].toString());
        refDispleyTime[key].textContent = currentTimeValue;
        }
    });
};

function onTimeIsOverNotify() {
    Notify.failure('You press start after time is over (',
    {
        clickToClose: true,
        position: 'center-top',
    },);
};

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
  };

  function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
  };