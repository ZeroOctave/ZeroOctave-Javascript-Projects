document.getElementById("button").addEventListener("click", total);

function total() {
  let w = document.getElementById("chem").value;

  let x = document.getElementById("physics").value;
  let y = document.getElementById("maths").value;
  let z = document.getElementById("eng").value;
  let v = document.getElementById("bio").value;
  var totalgrade =
    parseFloat(w) + parseFloat(x) + parseFloat(y) + parseFloat(z) + parseFloat(v);
  var percentage = (totalgrade / 500) * 100;

  var grade = "";
  if (percentage <= 100 && percentage >= 90) {
    grade = "A";
  } else if (percentage < 90 && percentage >= 80) {
    grade = "B";
  } else if (percentage < 80 && percentage >= 70) {
    grade = "C";
  } else if (percentage < 70 && percentage >= 60) {
    grade = "D";
  } else {
    grade = "E";
  }
  var ol = "";
  if (percentage < 40) {
    ol = "FAIL";
  } else {
    ol = "PASS";
  }
  document.getElementById(
    "grill"
  ).innerHTML = `Your total grade is ${totalgrade}. Your percentage is ${percentage}%. Your grade is ${grade}. You are ${ol}.`;
}
