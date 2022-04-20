const txtInput = document.querySelector(".inputs input"),
checkBtn = document.querySelector(".inputs button"),
infoTxt = document.querySelector(".info-txt");
let filterInput;



function isString(value) {
	return typeof value === 'string' || value instanceof String;
}


function fact(num)
{
if (num == 0) {
return 1;
}
else {
return num * fact( num - 1 );
}
}


checkBtn.addEventListener("click", () => {
    let n = filterInput;
    console.log(typeof n);

    
    infoTxt.style.display = "block";
    // if(isString(n)===true){
    //     return infoTxt.innerHTML = `Enter a valid input`
    // }
    // else{
    infoTxt.innerHTML = `Factorial of <span>'${txtInput.value}'</span> is <span>'${fact(n)}'</span>`;

});

txtInput.addEventListener("keyup", () => {
    filterInput = txtInput.value.toLowerCase().replace(/[^A-Z0-9]/ig, "");
    if(filterInput) {
        return checkBtn.classList.add("active");
    }
    infoTxt.style.display = "none";
    checkBtn.classList.remove("active");
});
