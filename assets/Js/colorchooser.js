function display() {
  var value = document.getElementById("color").value;
  if (value != "Select Color") {
    document.bgColor = value;
    document.cookie = "color=" + value;
  }
}
window.onload = function () {
  if (document.cookie.length != 0) {
    var array = document.cookie.split("=");
    document.getElementById("color").value = array[1];
    document.bgColor = array[1];
  }
};
