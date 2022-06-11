// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// enableTime - Вмикає вибір часу
// time_24hr - Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.
/* defaultDate - Встановлює початкові вибрані дати.
  Якщо ви використовуєте mode: "multiple"або календар діапазону , Array надайте Date об’єкти або масив рядків дат, які слідують за вашим dateFormat.
  В іншому випадку ви можете надати один об’єкт Date або рядок дати. 
*/
// minuteIncrement - Налаштовує крок для введення хвилин (включаючи прокручування)
// onClose - Функції, які запускаються щоразу, коли календар закривається. Див.  API подій

const refs = {
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}


const startTime = Date.now();

refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    
    if (selectedDates[0] < startTime) {
      alert("Please choose a date in the future");
    }
    else {
      refs.start.disabled = false;

      refs.start.addEventListener('click', () => {
        refs.start.disabled = true;
        setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = selectedDates[0] - currentTime;
          const time = convertMs(deltaTime);

          updateClockface(time);
        }, 1000)
      });
     

    }
  },
};


function addLeadingZero(value){
  return String(value).padStart(2, '0');
}

function updateClockface({days, hours, minutes, seconds}) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


flatpickr("input#datetime-picker", options);





