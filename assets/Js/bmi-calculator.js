
//BMI = KG / (H/100 * H/100)

document.getElementById("submit").addEventListener("click", bmiCalculator);
 function bmiCalculator(){
 	var cm = parseInt(document.getElementById("cm").value);
 	var kg = parseFloat(document.getElementById("kg").value);

 	var bmi;
 	var newCm= parseFloat(cm/100);

 	bmi = kg / (newCm * newCm);
 	bmi = bmi.toFixed(1);
 	console.log(bmi);

 	document.getElementById("result").innerHTML = bmi;

 }