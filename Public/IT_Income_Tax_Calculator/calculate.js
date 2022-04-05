document.getElementById("submit").addEventListener("click", ITCalculator);
function ITCalculator() {
    var income =parseFloat(document.getElementById("income").value);
var tax=0;
if(income<=250000){tax=0;}
else if(income>=250001 && income<=500000){tax=0.05*income;}
else if(income>=500001 && income<=750000){
    tax=12500+((income-500000)*0.10);
}
else if(income>=750001 && income<=1000000){
    tax=37500+((income-750000)*0.15);
}
else if(income>=1000001 && income<=1250000)
{
    tax=75000+((income-1000000)*0.20);
}
else if(income>=1250001 && income<=1500000){
    tax=125000+((income-1250000)*0.25);
}
else if(income>=1500000){
    tax=187500+((income-1500000)*0.30);
}
var take_home_salary=+income-tax;
console.log("Take Home Salary = Rs.")
console.log(take_home_salary);
document.getElementById("result").innerHTML = take_home_salary;
document.getElementById("tax").innerHTML = tax;

return tax;
}