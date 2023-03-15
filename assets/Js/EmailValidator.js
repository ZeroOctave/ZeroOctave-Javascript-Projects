let nameinform = document.getElementById('email');
let button = document.getElementById('submit');

function submit()
{
    if(nameinform.value.includes("@") && nameinform.value.includes("."))
    {
        if(nameinform.value.indexOf("@")>0 && nameinform.value.indexOf(".")>nameinform.value.indexOf("@") && nameinform.value.indexOf(".")!=nameinform.value.length)
        {
            alert("Your Email Id is Valid");
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


