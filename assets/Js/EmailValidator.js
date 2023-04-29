let nameinform = document.getElementById('email');
let button = document.getElementById('submit');
function ValidateEmail(inputText) {
  var data = inputText.value;
    var atSign = data.indexOf("@");
    var dotSign = data.indexOf(".");
  if (atSign<1 ) {
    alert("Invalid @ position");
    return false;
  }
  else if (dotSign<atSign+2 || dotSign+2>=data.length){
     alert("Invalid . position");
    return false;
  }
  else{
    alert("Your Email Id is correct");
    return true;
  }
}


