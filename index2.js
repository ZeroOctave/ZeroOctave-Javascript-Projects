/* PRELOADER FUNCTION */
const mainBody = document.querySelector("body");
const p = document.querySelector("#preLoading");

const preLoading = () => {
  setTimeout(() => {
    preLoadingHide();
  }, 2000);
};

const preLoadingHide = () => {
  p.style.display = "none";
};

mainBody.onload(preLoading());

const toogleBtn = document.querySelector(".toogle_btn");
const toogleBtnIcon = document.querySelector(".toogle_btn i");
const menu = document.querySelector(".dropdown_menu");
const menuLists = document.querySelectorAll(".menu_lists li");
const navScroll = document.querySelector(".navbar");

/* NAV-FUNCTIONS */

/* ACTIVE LINKS */
const removeActive = () => {
  menuLists.forEach((link) => {
    link.classList.remove("active");
  });
};

menuLists.forEach((link) => {
  link.addEventListener("click", () => {
    removeActive();
    link.classList.add("active");
  });
});

toogleBtn.onclick = () => {
  menu.classList.toggle("open");

  const isOpen = menu.classList.contains("open");

  toogleBtnIcon.classList = isOpen ? "fa fa-times" : "fa fa-bars";
};

const isClose = () => {
  const isClose = menu.classList.remove("open");

  toogleBtnIcon.classList = isClose ? "fa fa-times" : "fa fa-bars";
};

document.onclick = (e) => {
  if (!toogleBtn.contains(e.target) && !menu.contains(e.target)) {
    isClose();
  }
};
document.onscroll = (e) => {
  if (!toogleBtn.contains(e.target) && !menu.contains(e.target)) {
    isClose();
  }
};
