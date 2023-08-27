/* PRELOADER FUNCTION */
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector("#preLoading");
  preloader.classList.remove("hidden");
  preloader.classList.add("preloader");

  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 2000);
});

const preLoadingHide = () => {
  p.style.display = "none";
};

/* BACT TO TOP */
const btnScrollToTop = document.querySelector("#back-to-top");
btnScrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

const toogleBtn = document.querySelector(".toogle_btn");
const toogleBtnIcon = document.querySelector(".toogle_btn i");
const menu = document.querySelector(".dropdown_menu");
const menuLists = document.querySelectorAll(".menu_lists li");

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
  console.log("click", "click");
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

const animationUp = document.querySelectorAll(".animations_up");
const animationDown = document.querySelectorAll(".animations_down");
const animationLeft = document.querySelectorAll(".animations_left");
const animationRight = document.querySelectorAll(".animations_right");

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-animation");
      } else {
        entry.target.classList.remove("scroll-animation");
      }
    });
  },
  { threshold: 0.1 }
);

for (let i = 0; i < animationUp.length; i++) {
  const elements = animationUp[i];

  scrollObserver.observe(elements);
}
/*  */
for (let i = 0; i < animationDown.length; i++) {
  const elements = animationDown[i];

  scrollObserver.observe(elements);
}
/*  */
for (let i = 0; i < animationLeft.length; i++) {
  const elements = animationLeft[i];

  scrollObserver.observe(elements);
}
/*  */
for (let i = 0; i < animationRight.length; i++) {
  const elements = animationRight[i];

  scrollObserver.observe(elements);
}
