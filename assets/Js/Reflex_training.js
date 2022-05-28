var startTime = new Date();
var endTime = new Date();
var timerID;

function getRandomcoordinate(max) {
  return Math.floor(Math.random() * max);
}

function setRandomPos() {
  var x = getRandomcoordinate(23);
  var y = getRandomcoordinate(93);
  document.getElementById("target").style.top = x + "vw";
  document.getElementById("target").style.right = y + "vw";
  document.getElementById("target").style.display = "inherit";
}
function viewNull() {
  document.getElementById("container").style.display = "none";
}

function viewShowSecond() {
  document.getElementById("page").style.display = "inherit";

  document.getElementById("playground").style.display = "inherit";
}

function viewShowFirst() {
  document.getElementById("container").style.display = "inherit";
  document.getElementById("playground").style.display = "none";
}

function testStart() {
  startTime = new Date();
  viewNull();
  viewShowSecond();
  timerID = setTimeout("setRandomPos()", 5000);
}
function remark(responseTime) {
  var responseString = "";
  if (responseTime < 0.6) {
    responseString = "Dang you defeated Levi!";
  }
  if (responseTime >= 0.6) {
    responseString = "Noice :)";
  }
  if (responseTime >= 0.8) {
    responseString = "Keep practicing!";
  }

  if (responseTime >= 1) {
    responseString = "Eh...Try harder";
  }

  if (responseTime >= 1.5) {
    responseString = "lol what was that are you okay?";
  }

  if (responseTime >= 2.5) {
    responseString = "You sleeping or what?";
  }

  return responseString;
}

function testStop() {
  clearTimeout(timerID);
  viewShowFirst();
  document.getElementById("target").style.display = "none";
  document.getElementById("result").style.display = "none";
}

function timeTaken() {
  endTime = new Date();
  var responseTime = (endTime.getTime() - startTime.getTime()) / 1000;
  console.log(responseTime - 5);
  var finalTime = responseTime.toFixed(3) - 5.0;
  clearTimeout(timerID);
  document.getElementById("result").style.display = "inherit";
  document.getElementById("result").textContent =
    "Your response time is " +
    finalTime.toFixed(3) +
    "," +
    " " +
    remark(finalTime.toFixed(3));
  document.getElementById("target").style.display = "none";
  document.getElementById("page").style.display = "none";
}
