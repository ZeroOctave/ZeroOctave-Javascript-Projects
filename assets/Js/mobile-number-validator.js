function mobileCheck(str) {
    let bracketCheck = /[(]\d{3}[)]/;
    let checkBeginning = /^([(]\d{3}[)])/;
    let otherCharsCheck = /^[-]|[^\s-\d)(]/;
    let space = /[\s-]/g;
    let countryCodeCheck = /^1/;
    let simple = str.replace(space, '');
    if (otherCharsCheck.test(str)) {
        return false;
    } else {
        if (simple.length === 13
            && countryCodeCheck.test(simple)
            && bracketCheck.test(simple)) {
            return true;
        } else if (simple.length === 12
            && checkBeginning.test(simple)) {
            return true;
        } else if (simple.length === 11
            && countryCodeCheck.test(simple)) {
            return true;
        } else if (simple.length === 10) {
            return true;
        }
    } return false;
}
//*************//
// DOM
const input = document.getElementById('input');
const buttons = document.querySelectorAll('#num-btn');
const resultsDiv = document.getElementById('results');
const phoneBtn = document.getElementById('phone-button');

// add functionality to each number button
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let number;
        // get info from parent div if span or p tag clicked on
        if (e.target.tagName == 'SPAN' || e.target.tagName == 'P') {
            number = e.target.parentElement.attributes.number.value;
        } else {
            number = e.target.attributes.number.value;
        }
        input.value += number;
    });
});

function displayResults(input) {
    let answer = mobileCheck(input);
    if (answer) {
        resultsDiv.innerHTML = 'Valid phone number! 😃';}
    else {
        resultsDiv.innerHTML = 'Invalid phone number! 😕';}
}

// press enter to submit
input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        displayResults(e.target.value);
    }
});

// click phone icon to submit
phoneBtn.addEventListener('click', () => {
    displayResults(input.value);
});