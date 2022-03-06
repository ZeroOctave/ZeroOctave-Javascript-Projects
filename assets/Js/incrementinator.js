let count =0; 
let countEr = document.getElementById("counter");
function increment(){
  count += 1;
  countEr.textContent = count;
}

function reset(){
  count = 0;
  countEr.textContent = count;
}