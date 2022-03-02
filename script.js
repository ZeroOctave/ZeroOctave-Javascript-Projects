let flag1 = true;
let flag2 = false;
let flag3 = false;
let flag4 = false;
let flag5 = true;
let flag6 = true;
let firstOperandBuffer = [];
let operatorBuffer;
let secondOperandBuffer = [];
const divs_operand = document.querySelectorAll("button");
const display = document.querySelector('.display');
    divs_operand.forEach((div_operand) =>{
        div_operand.addEventListener('click',() =>{
            container = (div_operand.className).split(' ')[1] ;
            if (div_operand.className == "ac")
            {
                display.textContent = 0;
                flag1 = true;
                flag2 = false;
                flag3 = false;
                flag4 = false;
                firstOperandBuffer=[];
                secondOperandBuffer=[];
            }
            if (container == 'operand' && flag1 == true && firstOperandBuffer.length < 10)
            {
                if(div_operand.dataset.value == "back")
                {
                    firstOperandBuffer.pop();
                    if (firstOperandBuffer.length == 0)
                    {
                        firstOperandBuffer=[0];
                    }
                }
                if(div_operand.dataset.value == "-")
                {
                    if(!firstOperandBuffer.includes("-"))
                    {firstOperandBuffer.unshift('-');}
                    else
                    {firstOperandBuffer.shift();}
                }
                if(div_operand.dataset.value == "." && !firstOperandBuffer.includes(".") && flag5 == true)
                {
                    firstOperandBuffer.push(div_operand.dataset.value);
                }
                if(div_operand.dataset.value == "%")
                {
                    firstOperandBuffer=[firstOperandBuffer.join('') * 0.01];
                    flag5 = false;
                }
                if (div_operand.dataset.value != "." && div_operand.dataset.value != "-" && div_operand.dataset.value != "back" && div_operand.dataset.value != "%")
                { 
                    firstOperandBuffer.push(div_operand.dataset.value);
                }
                display.textContent = firstOperandBuffer.join('').substring(0,11);
                flag2 =true;
            }
            if(container == 'operator' && flag2 == true)
            {
                operatorBuffer = div_operand.dataset.value;
                flag3=true;
                flag1=false;
                flag4 = false;
            }
            if(container == 'operand' && flag3 == true  && secondOperandBuffer.length < 10)
            {
                if(div_operand.dataset.value == "back")
                {
                    secondOperandBuffer.pop();
                    if (secondOperandBuffer.length == 0)
                    {
                        secondOperandBuffer=[0];
                    }
                }
                if(div_operand.dataset.value == "-")
                {
                    if(!secondOperandBuffer.includes("-"))
                    {secondOperandBuffer.unshift('-');}
                    else
                    {secondOperandBuffer.shift();}
                }
                if(div_operand.dataset.value == "." && !secondOperandBuffer.includes(".")  && flag6 == true)
                {
                    secondOperandBuffer.push(div_operand.dataset.value);
                }
                if(div_operand.dataset.value == "%")
                {
                    secondOperandBuffer=[secondOperandBuffer.join('') * 0.01];
                    flag6 = false;
                }
                if (div_operand.dataset.value != "." && div_operand.dataset.value != "-" && div_operand.dataset.value != "back" && div_operand.dataset.value != "%")
                { 
                    secondOperandBuffer.push(div_operand.dataset.value);
                }
                display.textContent = secondOperandBuffer.join('').substring(0,11);
                flag1 =false;
                flag2 = false;
                flag4 = true;
            }
            if(container == 'operator' && flag4 == true)
            {
                x = parseFloat(firstOperandBuffer.join(''));
                y = parseFloat(secondOperandBuffer.join(''));
                var math_it_up = {
                    '+': function (x, y) { return x + y },
                    '-': function (x, y) { return x - y },
                    'x': function (x, y) { return x * y },
                    '/': function (x, y) { return x / y }
                };
                result = Math.round((math_it_up[operatorBuffer](x, y)*1000000000))/1000000000;
                display.textContent = result.toString().substring(0,11);
                firstOperandBuffer = [result];
                secondOperandBuffer=[];
                if (div_operand.dataset.value != "=")
                {
                    flag1 = false;
                    flag2 = false;
                    flag3 = true;
                    flag4 = false;
                    operatorBuffer = div_operand.dataset.value;
                }
                if(div_operand.dataset.value == "=")
                {
                    flag1  = false;
                    flag2 = true;
                    flag3 = false;
                    flag4 = false;
                }
            flag5 = true;
            flag6 = true;
            }
        })
    })
