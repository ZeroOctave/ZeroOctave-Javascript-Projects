// Q1---------------------------------------------------------
// let b1 = document.getElementById("btn-1")
// let b2 = document.getElementById("btn-2")
// let b3 = document.getElementById("btn-3")

// b1.addEventListener('click',()=>{
//     alert("Button 1 is Clicked!")
// })
// b2.addEventListener('click',()=>{
//     alert("Button 2 is Clicked!")
// })
// b3.addEventListener('click',()=>{
//     alert("Button 3 is Clicked!")
// })
// --------------------------------------------------------------
let glow = ()=>{
    document.getElementById("bulb").classList.toggle("glow");
    document.getElementsByTagName("body")[0].classList.toggle("bg");
    if(document.getElementsByTagName("button")[0].textContent=="On"){
        document.getElementsByTagName("button")[0].textContent = "Off";
    } else {
        document.getElementsByTagName("button")[0].textContent = "On";
    }
}

// setInterval(glow,500);