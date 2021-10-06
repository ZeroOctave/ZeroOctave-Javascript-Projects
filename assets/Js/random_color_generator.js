const btnDesktop = document.querySelector(".desktop");
const btnMobile = document.querySelector(".mobile");
const body = document.body;
const box = document.querySelector(".box");
const btns = [btnMobile, btnDesktop];
const colorTxt = document.querySelector(".color-text");

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const num1 = getRandomInt(0, 256);
    const num2 = getRandomInt(0, 256);
    const num3 = getRandomInt(0, 256);
    console.log(num1, num2, num3);
    colorTxt.textContent = `rgb(${num1},${num2},${num3})`;
    body.style.backgroundColor = `rgb(${num1},${num2},${num3})`;
    box.style.backgroundColor = `rgb(${num1},${num2},${num3})`;
  })
);
