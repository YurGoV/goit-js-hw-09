import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refDelayInput = document.querySelector('form');

refDelayInput.addEventListener('submit', onSubmitButton)

function onSubmitButton(event) {
  event.preventDefault();

  const {
    elements: {delay, step, amount}
  } = event.target
  let currentDelay = Number(delay.value);

  for (let i = 1; i <= Number(amount.value); i +=1) {
    const promise = createPromise(i, currentDelay).then(onSuccess).catch(onError);
    currentDelay = currentDelay + Number(step.value);
  };
 
}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;
  // console.log(shouldResolve);
  
  return new Promise((resolve, reject) => {   
    setTimeout(() => {
      if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
   
  });
}



function onSuccess(result) {
  Notify.success(result,
  {
      clickToClose: true,
      position: 'center-top',
  },);
}

function onError(result) {
  Notify.failure(result,
  {
      clickToClose: true,
      position: 'center-top',
  },);
}

