function mix(){
    var r = parseInt(document.getElementById("red").value);
    var g = parseInt(document.getElementById("green").value);
    var b = parseInt(document.getElementById("blue").value);
    if(r<0 || g<0 || b<0 || r>255 || g>255 || b>255){
        alert("Please enter values between 0 and 255")
    }
    else{
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}
    document.getElementById("mix").addEventListener("click", mix);