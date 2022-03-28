function calculate() {
    var amount = parseFloat(document.getElementById("amount").value);
    var year = parseFloat(document.getElementById("year").value);
    var rate = parseFloat(document.getElementById("interest").value);
    var months = year*12;
    var invested = amount*months;
    var maturity = 0;
    var freq = 4;
    for(var i=1; i<=months;i++){
        maturity += amount*Math.pow((1+((rate/100)/freq)), freq*((months-i+1)/12));
    }
    var estimated = maturity-invested;

    document.getElementById("invested").value = invested;
    document.getElementById("estimate").value = Math.floor(estimated);
    document.getElementById("total").value = Math.floor(maturity);
}