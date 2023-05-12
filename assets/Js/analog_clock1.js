 const deg = 6;
                const hr = document.querySelector('#hr');
                const mn = document.querySelector('#mn');
                const sc = document.querySelector('#sc');

                setInterval(() => {
                    let day = new Date();
                    let hh = day.getHours() * 30;
                    let mm = day.getMinutes() * deg;
                    let ss = day.getSeconds() *deg;

                    hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
                    mn.style.transform = `rotateZ(${mm}deg)`;
                    sc.style.transform = `rotateZ(${ss}deg)`;
                });

const checkbox = document.getElementById("checkbox");
const body = document.querySelector("body");
const label = document.querySelector(".label");
const root = document.querySelector(":root");
const ball = document.querySelector(".ball");
checkbox.addEventListener("change", function () {
if (this.checked) {
    body.style.background = "black";
    label.style.backgroundColor = "#40DCA5";
    root.style.setProperty("--sec-color", "#fff");
    ball.style.backgroundColor = "#fff";
} else {
    body.style.background = "skyblue";
    label.style.backgroundColor = "white";
    root.style.setProperty("--sec-color", "red");
    ball.style.backgroundColor = "black";
}
});
                