let scoop1 = document.querySelector(".scoop1");
let scoop2 = document.querySelector(".scoop2");
let scoop3 = document.querySelector(".scoop3");

let btnScoop1 = document.getElementById("btn-scoop1");
let btnScoop2 = document.getElementById("btn-scoop2");
let btnScoop3 = document.getElementById("btn-scoop3");
let btnTopping1 = document.getElementById("btn-topping1");
let btnTopping2 = document.getElementById("btn-topping2");

let colors = ["#f45c96", "#f8bd3d", "#badc58", "#5c0003", "#f58619", "#ebab70"];

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;
let counter5 = 0;

function setCounterValue(counter) {
  return counter < colors.length - 1 ? counter + 1 : 0;
}

btnScoop1.addEventListener("click", () => {
  scoop1.style.backgroundColor = colors[counter1];
  counter1 = setCounterValue(counter1);
});

btnScoop2.addEventListener("click", () => {
  scoop2.style.backgroundColor = colors[counter2];
  counter2 = setCounterValue(counter2);
});

btnScoop3.addEventListener("click", () => {
  scoop3.style.backgroundColor = colors[counter3];
  counter3 = setCounterValue(counter3);
});

btnTopping1.addEventListener("click", () => {
  scoop1.style.backgroundImage = `radial-gradient(circle at 20px 18px, ${colors[counter4]} 25px, transparent 25px)`;
  counter4 = setCounterValue(counter4);
});

btnTopping2.addEventListener("click", () => {
  scoop3.style.backgroundImage = `radial-gradient(circle at 12.5px 17px, ${colors[counter5]} 20px, transparent 21px)`;
  counter5 = setCounterValue(counter5);
});