buttons = document.getElementsByClassName('keys');
 screen=document.getElementById('inp');
 svalue='';
for (const n of buttons) {
    n.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        console.log(buttonText);

        if (buttonText == 'X') {
            buttonText = '*';
            svalue+=buttonText;
            screen.value=svalue;
        }
        else if (buttonText == 'C') {
            svalue="";
            screen.value=svalue;
        }
        else if(buttonText=='='){
            screen.value=eval(svalue);
        }
        else{
            svalue+=buttonText;
            screen.value=svalue; 
        }
    })
}