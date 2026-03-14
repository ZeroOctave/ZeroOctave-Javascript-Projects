let weight, firOpt, secOpt;

//Gets the weight input and places the value of it in the blue box
document.getElementById('weightInput').addEventListener('input', getWeightInput);

function getWeightInput(e) {
    document.getElementById('output').style.visibility = 'visible';
    document.getElementById('resetButton').style.visibility = 'visible';
    weight = e.target.value;
    document.getElementById('weightOutput').innerHTML = weight;    //placing the value to the DOM
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

/**
 * Refactored weightConverter using a Lookup Table
 */
function weightConverter() {
    const finalOutput = document.querySelector('#finalOutput');

    //Define conversion rates relative to a base unit (Grams)
    const conversionRates = {
        "Grams": 1,
        "Kilograms": 1000,
        "Milligrams": 0.001,
        "Micrograms": 0.000001,
        "Pounds": 453.59237,
        "Ounces": 28.34952,
        "US Tons": 907184.74
    };

    // Check if units exist in our table and weight is provided
    if (conversionRates[firOpt] && conversionRates[secOpt] && weight !== undefined) {

        //Convert input to Grams, then Grams to target unit
        const weightInGrams = weight * conversionRates[firOpt];
        const convertedValue = weightInGrams / conversionRates[secOpt];


        finalOutput.innerHTML = convertedValue;
    } else {
        // Fallback
        finalOutput.innerHTML = weight || "";
    }
}

//Clears out all values and reset DOM
document.getElementById('resetButton').addEventListener('click', reset);

function reset() {
    document.getElementById('mainForm').reset();

    // removed this 
    // document.getElementById('output').style.visibility = 'hidden';
    // document.getElementById('resetButton').style.visibility = 'hidden';
      

    //  this contribution is done .....
      document.getElementById('output').value="";
      finalOutput.innerHTML="";
      document.getElementById('weightOutput').innerHTML = "";
      weight="";
      
}