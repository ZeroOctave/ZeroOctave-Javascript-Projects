// (A) CHANGE BMIMEASURING SYSTEM
function measureBMI() {
    // (A1) GET HTML ELEMENTS
    let unit = document.getElementById("bmi-metric").checked,
        weight = document.getElementById("bmi-weight"),
        weightu = document.getElementById("bmi-weight-unit"),
        height = document.getElementById("bmi-height"),
        heightu = document.getElementById("bmi-height-unit");

    // (A2) UPDATE HTML FORM FIELDS
    // TRUE = METRIC, FALSE = IMPERIAL
    if (unit) {
        weightu.innerHTML = "KG";
        weight.min = 1;
        weight.max = 635;
        heightu.innerHTML = "CM";
        height.min = 54;
        height.max = 272;
    } else {
        weightu.innerHTML = "LBS";
        weight.min = 2;
        weight.max = 1400;
        heightu.innerHTML = "IN";
        height.min = 21;
        height.max = 107;
    }
}

// (B) CALCULATE BMI
function calcBMI() {
    // (B1) GET HTML ELEMENTS
    let BMI = null,
        unit = document.getElementById("bmi-metric").checked,
        weight = parseInt(document.getElementById("bmi-weight").value),
        height = parseInt(document.getElementById("bmi-height").value),
        results = document.getElementById("bmi-results");

    // (B2) CALCULATE BMI
    // METRIC BMI= MASS (KG) / HEIGHT (M) SQUARE
    if (unit) {
        height = height / 100;
        BMI = weight / (height * height);
    }
    // IMPERIAL BMI= 703 X MASS (LBS) / HEIGHT (IN) SQUARE
    else {
        BMI = 703 * (weight / (height * height));
    }
    // ROUND OFF
    BMI = Math.round(BMI * 100) / 100; // Round off 2 decimal places

    // (B3) SHOW RESULTS
    if (BMI < 18.5) {
        results.innerHTML = BMI + " - Underweight";
    } else if (BMI < 25) {
        results.innerHTML = BMI + " - Normal weight";
    } else if (BMI < 30) {
        results.innerHTML = BMI + " - Pre-obesity";
    } else if (BMI < 35) {
        results.innerHTML = BMI + " - Obesity class I";
    } else if (BMI < 40) {
        results.innerHTML = BMI + " - Obesity class II";
    } else {
        results.innerHTML = BMI + " - Obesity class III";
    }
    return false;
}