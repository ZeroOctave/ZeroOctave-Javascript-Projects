const value = document.getElementById('value');
const btn1 = document.querySelector('.decrease');
const btn2 = document.querySelector('.reset');
const btn3 = document.querySelector('.increase');
let number = 0;
btn3.addEventListener('click', function() {
    value.textContent = number++;
    value.style.color = "green";
});
btn1.addEventListener('click', function() {
    // if (number == 0) {
    //     value.textContent = 0;
    // } else {
    // number--;
    // number -= 1;
    value.textContent = number--;
    value.style.color = "red";
    // }
});
btn2.addEventListener('click', function() {
    value.textContent = 0;
    number = 0;
    value.style.color = "#222";
});