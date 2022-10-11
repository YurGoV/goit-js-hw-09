import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refDelayInput = document.querySelector('form');

console.log(refDelayInput);

refDelayInput.addEventListener('submit', onSubmitButton)

function onSubmitButton(event) {
  event.preventDefault();
  // console.log(event.target.value);
  const {
    elements: {delay, step, amount}
  } = event.target
  // console.log(delay.value);
  let currentDelay = Number(delay.value);

  for (let i = 1; i <= Number(amount.value); i +=1) {
    const promise = createPromise(i, currentDelay).then(onSuccess).catch(onError);
    currentDelay = currentDelay + Number(step.value);

    console.log(currentDelay);
  };
 
}



function createPromise(position, delay) {
    event.preventDefault();


  console.log(delay);
  const shouldResolve = Math.random() > 0.3;
  console.log(shouldResolve);
  // const promise = new Promise((resolve, reject) => {
  return new Promise((resolve, reject) => {   
    // return new Promise((resolve, reject) => { 
    setTimeout(() => {
      if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
   
  });
  // return promise;

//promice fin

}



function onSuccess(result) {
  console.log('onSuccess');
  Notify.success(result,
  {
      clickToClose: true,
      position: 'center-top',
  },);
}

function onError(result) {
  console.log('onError');
  Notify.failure(result,
  {
      clickToClose: true,
      position: 'center-top',
  },);
}

