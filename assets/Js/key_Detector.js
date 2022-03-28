const container = document.querySelector(".container");
const head = document.querySelector(".head");

document.addEventListener("keydown",e => {
    container.classList.add("active");
    head.innerText = " 😄 Hope you liked it ! 😄 ";
    container.querySelector(".keyname").innerText = e.key;
    container.querySelector(".key span").innerText = e.key;
    container.querySelector(".code span").innerText = e.keyCode;
})