document.getElementById("ctof").addEventListener("click", celsiusToFahrenheit);
document.getElementById("ftoc").addEventListener("click", fahrenheitToCelsius);

 function celsiusToFahrenheit(){
 	var celsius = parseFloat(document.getElementById("celsius").value);
    var fahrenheit = celsius*(9/5)+32.0
 	document.getElementById("celr").innerHTML = fahrenheit;
 }

 function fahrenheitToCelsius(){
    var fahrenheit = parseFloat(document.getElementById("fahrenheit").value);
    var celsius = (fahrenheit-32)*5/9.0
    document.getElementById("felr").innerHTML = celsius;
}