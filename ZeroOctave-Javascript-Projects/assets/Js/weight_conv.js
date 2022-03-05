let weight, firOpt, secOpt;

//Gets the weight input and places the value of it in the blue box
document.getElementById('weightInput').addEventListener('input', getWeightInput);

function getWeightInput(e) {
    document.getElementById('output').style.visibility = 'visible';
    document.getElementById('resetButton').style.visibility = 'visible';
    weight = e.target.value;
    document.getElementById('weightOutput').innerHTML = weight; //placing the value to the DOM
    weightConverter();
}

document.getElementById('firOpt').addEventListener('change', getfirOpt);

function getfirOpt(e) {
    firOpt = e.target.value; //Gets placeholder value
    document.getElementById('weightInput').placeholder = 'Enter ' + firOpt + '...';
    document.getElementById('weightName').innerHTML = firOpt + ":";
    weightConverter();
}

document.getElementById('secOpt').addEventListener('change', getsecOpt);

function getsecOpt(e) {
    secOpt = e.target.value;
    document.getElementById('convertedWeightName').innerHTML = secOpt + ":";
    weightConverter();
}

function weightConverter() {
    const finalOutput = document.querySelector('#finalOutput');

    if (firOpt == "Pounds" && secOpt == "Grams") {
        finalOutput.innerHTML = weight * 453.59237;
    } else if (firOpt == "Pounds" && secOpt == "Kilograms") {
        finalOutput.innerHTML = weight * 0.453592;
    } else if (firOpt == "Pounds" && secOpt == "Milligrams") {
        finalOutput.innerHTML = weight * 453592.0000001679;
    } else if (firOpt == "Pounds" && secOpt == "Micrograms") {
        finalOutput.innerHTML = weight * 453591999.86863;
    } else if (firOpt == "Pounds" && secOpt == "US Tons") {
        finalOutput.innerHTML = weight * 0.0004999995920000043512;
    } else if (firOpt == "Pounds" && secOpt == "Ounces") {
        finalOutput.innerHTML = weight * 15.999986944000138323;
    }
    //Validates for grams
    else if (firOpt == "Grams" && secOpt == "Pounds") {
        finalOutput.innerHTML = weight * 0.00220462;
    } else if (firOpt == "Grams" && secOpt == "Kilograms") {
        finalOutput.innerHTML = weight * 0.001;
    } else if (firOpt == "Grams" && secOpt == "Milligrams") {
        finalOutput.innerHTML = weight * 1000;
    } else if (firOpt == "Grams" && secOpt == "Micrograms") {
        finalOutput.innerHTML = weight * 1e+6;
    } else if (firOpt == "Grams" && secOpt == "US Tons") {
        finalOutput.innerHTML = weight * 1.1023e-6;
    } else if (firOpt == "Grams" && secOpt == "Ounces") {
        finalOutput.innerHTML = weight * 0.035274;
    }
    //Validates for Kilograms
    else if (firOpt == "Kilograms" && secOpt == "Grams") {
        finalOutput.innerHTML = weight * 1000;
    } else if (firOpt == "Kilograms" && secOpt == "Pounds") {
        finalOutput.innerHTML = weight * 2.20462;
    } else if (firOpt == "Kilograms" && secOpt == "Milligrams") {
        finalOutput.innerHTML = weight * 1e+6;
    } else if (firOpt == "Kilograms" && secOpt == "Micrograms") {
        finalOutput.innerHTML = weight * 1e+9;
    } else if (firOpt == "Kilograms" && secOpt == "US Tons") {
        finalOutput.innerHTML = weight * 0.00110231;
    } else if (firOpt == "Kilograms" && secOpt == "Ounces") {
        finalOutput.innerHTML = weight * 35.274;
    }
    //Validates for Milligram
    else if (firOpt == "Milligrams" && secOpt == "Pounds") {
        finalOutput.innerHTML = weight * 2.2046e-6;
    } else if (firOpt == "Milligrams" && secOpt == "Kilograms") {
        finalOutput.innerHTML = weight * 1e-6;
    } else if (firOpt == "Milligrams" && secOpt == "Grams") {
        finalOutput.innerHTML = weight * 0.001;
    } else if (firOpt == "Milligrams" && secOpt == "Micrograms") {
        finalOutput.innerHTML = weight * 1000;
    } else if (firOpt == "Milligrams" && secOpt == "US Tons") {
        finalOutput.innerHTML = weight * 1.1023e-9;
    } else if (firOpt == "Milligrams" && secOpt == "Ounces") {
        finalOutput.innerHTML = weight * 3.5274e-5;
    }
    //Validates for Microgram
    else if (firOpt == "Micrograms" && secOpt == "Pounds") {
        finalOutput.innerHTML = weight * 2.2046e-9;
    } else if (firOpt == "Micrograms" && secOpt == "Kilograms") {
        finalOutput.innerHTML = weight * 1e-9;
    } else if (firOpt == "Micrograms" && secOpt == "Milligrams") {
        finalOutput.innerHTML = weight * 0.001;
    } else if (firOpt == "Micrograms" && secOpt == "Grams") {
        finalOutput.innerHTML = weight * 1e-6;
    } else if (firOpt == "Micrograms" && secOpt == "US Tons") {
        finalOutput.innerHTML = weight * 1.1023e-12;
    } else if (firOpt == "Micrograms" && secOpt == "Ounces") {
        finalOutput.innerHTML = weight * 3.5274e-8;
    }
    //Validates for Ounce
    else if (firOpt == "Ounces" && secOpt == "Pounds") {
        finalOutput.innerHTML = weight * 0.0625;
    } else if (firOpt == "Ounces" && secOpt == "Kilograms") {
        finalOutput.innerHTML = weight * 0.0283495;
    } else if (firOpt == "Ounces" && secOpt == "Milligrams") {
        finalOutput.innerHTML = weight * 28349.5;
    } else if (firOpt == "Ounces" && secOpt == "Micrograms") {
        finalOutput.innerHTML = weight * 2.835e+7;
    } else if (firOpt == "Ounces" && secOpt == "US Tons") {
        finalOutput.innerHTML = weight * 3.125e-5;
    } else if (firOpt == "Ounces" && secOpt == "Grams") {
        finalOutput.innerHTML = weight * 28.3495;
    }
    //Validates if first option is the same as second option
    else {
        finalOutput.innerHTML = weight;
    }
}

//Clears out all values and reset DOM
document.getElementById('resetButton').addEventListener('click', reset);

function reset() {
    document.getElementById('mainForm').reset();
    document.getElementById('output').style.visibility = 'hidden';
    document.getElementById('resetButton').style.visibility = 'hidden';
}