
console.log("Working");


function enter() {
    document.getElementById("enter").classList.add("entered");
    document.getElementById("page").style.display = "inline-block";
    let a = 0;
    selectElement = document.getElementById('level');
    output = selectElement.value;
    // console.log(output);
    if (output == "easy") { a = 20; }
    else if (output == "medium") { a = 10; }
    else { a = 5; }
    // console.log(a);
    setTimeout(timeout, a * 1000);
}



// math
let x = Math.random();
let y = Math.random();

let b = Math.floor(40 * x) + Math.floor(5 * y);
// console.log(b);

let answer = Math.floor(1000 * Math.random());
console.log(answer);
let s = "column" + b;
// console.log(s)

document.getElementById(s).addEventListener('mouseenter', function () {
    this.innerText = answer;
});
document.getElementById(s).addEventListener('mouseleave', function () {
    this.innerText = "";
});
// math 



function timeout() {
    document.getElementById("page").style.display = "none";
    document.getElementById("answer").style.display = "inline-block";

}
function check() {
    const result = document.getElementById('result');
    let resultvalue = result.value;
    if (resultvalue == answer) {
        let won = new Audio('../assets/Audio/win.wav');
        won.play();
        document.getElementById("Finalresult").innerHTML = "YOU WON";
    }
    else {
        let lost = new Audio('../assets/Audio/lost.wav');
        lost.play();
        document.getElementById("Finalresult").innerHTML = "YOU LOOSE";

    }
    document.getElementById("resultdisplay").style.display = "none";
    document.getElementById('playagain').style.display = "inline-block";

}


