document.querySelector("#ctof").addEventListener("click", celsiusToFahrenheit);
document.querySelector("#ftoc").addEventListener("click", fahrenheitToCelsius);

function celsiusToFahrenheit() {
   var celsius = parseFloat(document.querySelector("#celsius").value);
   var fahrenheit = celsius * (9 / 5) + 32.0;
   document.querySelector("#celr").innerHTML = fahrenheit;
}

function fahrenheitToCelsius() {
   var fahrenheit = parseFloat(document.querySelector("#fahrenheit").value);
   var celsius = (fahrenheit - 32) * 5 / 9.0;
   document.querySelector("#felr").innerHTML = celsius;
}