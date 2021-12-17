let confirmpassword = document.getElementById('name');
let password = document.getElementById('password');
let button = document.getElementById('submit');

function submit()
{
    if(confirmpassword.value != password.value)
    {
        alert(" please enter same password in both the fields ");
    }
}
button.addEventListener('click',submit);


