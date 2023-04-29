// This piece of code allows you you to hide/show the ip data retrieved from ip-api.com
let hideShow = document.getElementById('hide-show');

const toggle = () => {
  let list = document.getElementById("my-list");
  if (list.style.display === "none") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
};

hideShow.onclick = toggle;
