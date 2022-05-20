let input;
let inputValue = '';
let result;
let buttons;
let buttonInput;
let memory = 0;
let mainButtons;
let digit = '';
let ind;
let subResult;

input = document.getElementById('input');
result = document.getElementById('result');

function getIndexOfSubStr(str, subStr, preIndex, output) {
    let temp = str.match(subStr);
    if(temp) {
        output.push(temp.index + preIndex);
        preIndex += temp.index + subStr.length;
        str = str.substring(temp.index + subStr.length);
        getIndexOfSubStr(str, subStr, preIndex, output);
    }
    return output;
}

buttons = document.querySelectorAll('button');
for (item of buttons) {
    item.addEventListener('click', function(event) {
        buttonInput = event.target.innerHTML;
        input.innerHTML = '';
        document.getElementById('memory').innerHTML = '';
        console.log(buttonInput);
        if(result.innerHTML == "Error") {
            result.innerHTML = '';
        }
        
        switch(buttonInput) {

            case 'C':
                inputValue = '';
                input.innerHTML = '';
                result.innerHTML = '';
            break;

            case 'x':
                inputValue += '*';
                result.innerHTML += '*';
            break;
                
            case '=':
                if(inputValue != '') {
                    inputValue = eval(inputValue) + '';
                    if(result.innerHTML != inputValue) {
                        input.innerHTML = result.innerHTML + "=";
                        result.innerHTML = eval(result.innerHTML) + '';
                        inputValue = result.innerHTML;
                    }
                }
            break;

            case '\u232B':
                inputValue = inputValue.substring(0, inputValue.length - 1);
                result.innerHTML = result.innerHTML.substring(0, result.innerHTML.length - 1);
            break;

            case 'mc':
                memory = 0;
            break;

            case 'm+':
                memory += Number(eval(inputValue));
                document.getElementById('memory').innerHTML = 'm+';
            break;

            case 'm-':
                memory -= Number(eval(inputValue));
                document.getElementById('memory').innerHTML = 'm-';
            break;

            case 'mr':
                result.innerHTML = memory;
                document.getElementById('memory').innerHTML = 'mr';
            break;

            case '%':
                inputValue += '/(100)';
                result.innerHTML += '/(100)';
            break;

            case '1/x':
                input.innerHTML = '1/(' + result.innerHTML + ')=';
                result.innerHTML = eval(1/eval(result.innerHTML));
                inputValue = result.innerHTML;
            break;
            
            default :
            inputValue += buttonInput;
            result.innerHTML += buttonInput;
        }

        if(result.innerHTML == "NaN") {
            result.innerHTML = "Error";
        }
    });
}

mainScreen.addEventListener('click', function() {
    mainScreen.style.color = "blue";
    sideScreen.style.color = "black";
    mainScreen.style.backgroundColor = "#d9d9d9c4";
    sideScreen.style.backgroundColor = "#ffffff";
    mainButtons = document.getElementsByClassName('main-buttons');
    for (item of mainButtons) {
        item.style.display = "table-cell";
    }
});

sideScreen.addEventListener('click', function() {
    mainScreen.style.color = "black";
    sideScreen.style.color = "blue";
    mainScreen.style.backgroundColor = "#ffffff";
    sideScreen.style.backgroundColor = "#d9d9d9c4";
    mainButtons = document.getElementsByClassName('main-buttons');
    for (item of mainButtons) {
        item.style.display = "none";
    }
});