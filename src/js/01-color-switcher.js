function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
}

console.log(refs.start);
console.log(refs.stop);

refs.start.addEventListener('click', onStartColor);
refs.stop.addEventListener('click', onStopColor);

let intervalId = null; 

function onStartColor(e) {
    e.target.disabled = true;
    
    intervalId = setInterval(() => {
            
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    refs.stop.disabled = false;
}

function onStopColor(e) {
    clearInterval(intervalId);
    refs.start.disabled = false;
    e.target.disabled = true;
}



// function onLicenseChange(event) {
    
// // event.currentTarget - ссылка на текущий элемент
//     console.log(event.currentTarget.checked);
// //  disabled - у кнопки есть свойство
//     console.log(refs.btn.disabled);

// // когда чекбокс не выбран
//     refs.btn.disabled = !event.currentTarget.checked;
// }