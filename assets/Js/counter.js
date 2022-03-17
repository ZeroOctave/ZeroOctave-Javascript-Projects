const value = document.getElementById('value');
const btn1 = document.querySelector('.decrease');
const btn2 = document.querySelector('.reset');
const btn3 = document.querySelector('.increase');
// <!-- This was added as a contribution -->
const btnmode=document.querySelector('.changemode');
// <!-- This was added as a contribution -->

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
    

        value.style.color = "hsl(210, 22%, 49%)";
    
});
// <!-- This was added as a contribution -->

btnmode.addEventListener('click',function(){
    let body =document.getElementById('body');
    body.classList.toggle("darkbody");
    let text = btnmode.innerHTML;
    if(text=="Switch Light Mode"){
        btnmode.innerHTML="Switch Dark Mode"
    }
    else{
        btnmode.innerHTML="Switch Light Mode"
    }
    btn1.classList.toggle("darkbutton")
    btn2.classList.toggle("darkbutton")
    btn3.classList.toggle("darkbutton")
    btnmode.classList.toggle("darkbutton")

})

// <!-- This was added as a contribution -->

