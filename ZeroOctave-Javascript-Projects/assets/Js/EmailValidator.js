let nameinform = document.getElementById('name');
let number = document.getElementById('number');
let password = document.getElementById('password');
let button = document.getElementById('submit');

function submit()
{
    if(nameinform.value.includes("@") && nameinform.value.includes("."))
    {
        if(nameinform.value.indexOf("@")>0 && nameinform.value.indexOf(".")>nameinform.value.indexOf("@") && nameinform.value.indexOf(".")!=nameinform.value.length)
        {
            alert("Successful Registration");
        }
        else
        {
            alert("Please Provide Correct Email Address");
        }
    }
    else
    {
        alert("Please Provide Correct Email Address");
    }

}
button.addEventListener('click',submit);


