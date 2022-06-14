const refs = {
  form: document.querySelector('.form'),
  step: document.querySelector('input[name=step]'),
  delay: document.querySelector('input[name=delay]'),
  amount: document.querySelector('input[name=amount]'),
}



let position = 0;

refs.form.addEventListener('submit', (e) => { 
  e.preventDefault();
  
  let step = Number(refs.step.value);
  let delay = Number(refs.delay.value);
  const amount = Number(refs.amount.value);

  console.log(amount);

  const intervalId = setInterval(() => {
    
    if (position === amount) {
        console.log('нужно остановить интервал');
      clearInterval(intervalId);
      position = 0;
      delay = 0;
      return;
      
    } 

    position += 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });

        
        delay += step;
    
  }, delay)
  
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (shouldResolve) {
          // Fulfill
            resolve({ position, delay });
          } else {
          // Reject
            reject({ position, delay });
          }
        }, delay)
      })
}