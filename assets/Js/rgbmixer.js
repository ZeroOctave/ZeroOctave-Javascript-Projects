function mix(){
    let r = parseInt(document.getElementById("red").value);
    let g = parseInt(document.getElementById("green").value);
    let b = parseInt(document.getElementById("blue").value);
    document.body.style.backgroundImage = `linear-gradient(to bottom right,black, rgb(${r},${g},${b}), white)`;
    document.getElementById("color-output").style.backgroundColor = `rgb(${r},${g},${b})`
}
function mousein(){
    document.getElementById("mix").style.backgroundColor = "orange";
    document.getElementById("mix").style.boxShadow = "2px 2px 2px 1px rgba(0, 0, 0, 0.2)";
    console.log("LOL")
}
function mouseout(){
    document.getElementById("mix").style.backgroundColor = "white";
    document.getElementById("mix").style.boxShadow = "none";
}
document.getElementById("mix").addEventListener("click", mix);
document.getElementById("mix").addEventListener("mouseover", mousein);
document.getElementById("mix").addEventListener("mouseout", mouseout);

document.getElementById("red").oninput = function() {
    document.getElementById("red-val").innerHTML = this.value;
}
document.getElementById("green").oninput = function() {
    document.getElementById("green-val").innerHTML = this.value;
}
document.getElementById("blue").oninput = function() {
    document.getElementById("blue-val").innerHTML = this.value;
}