let bringmodalbutton = document.getElementById("bringmodal");
let Modal = document.getElementById("Modal");
let closemodal = document.getElementById("closemodal");

bringmodalbutton.addEventListener("click", bringmodal);

Modal.style.visibility = "hidden";

function bringmodal() {
  console.log("running");
  if (Modal.style.visibility == "hidden") {
    console.log("hello");
    Modal.style.visibility = "visible";
  } else {
    console.log("youtube");
    Modal.style.visibility = "hidden";
  }
}

closemodal.addEventListener("click", closemodalwindow);

function closemodalwindow() {
  Modal.style.visibility = "hidden";
}
