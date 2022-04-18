var buttons = document.querySelectorAll(".btn");
var button = document.querySelectorAll(".btn");
var score = document.querySelectorAll(".score")[1];
var scoreText = document.querySelectorAll(".score")[0];
var imageSource = [
  {
    id: 0,
    source: "../assets/Images/memoryGame/burger.png",
    usedCount: 0,
  },
  {
    id: 1,
    source: "../assets/Images/memoryGame/donut.png",
    usedCount: 0,
  },
  {
    id: 2,
    source: "../assets/Images/memoryGame/fried-chicken.png",
    usedCount: 0,
  },
  {
    id: 3,
    source: "../assets/Images/memoryGame/ice-cream.png",
    usedCount: 0,
  },
  {
    id: 4,
    source: "../assets/Images/memoryGame/milkshake.png",
    usedCount: 0,
  },
  {
    id: 5,
    source: "../../assets/Images/memoryGame/muffin.png",
    usedCount: 0,
  },
  {
    id: 6,
    source: "../assets/Images/memoryGame/noodles.png",
    usedCount: 0,
  },
  {
    id: 7,
    source: "../assets/Images/memoryGame/pizza.png",
    usedCount: 0,
  },
];

var img = document.querySelectorAll("img");
var playAgain = document.querySelector(".restart");

window.addEventListener("DOMContentLoaded", function () {
  for (var i = 0; i < img.length; i++) {
    img[i].style.zIndex = "-1";
    img[i].src = generateImageSource();
  }
});

function generateImageSource() {
  var randomNumber = Math.floor(Math.random() * 10000) % 8;

  while (imageSource[randomNumber].usedCount == 2) {
    randomNumber = Math.floor(Math.random() * 10000) % 8;
  }

  imageSource[randomNumber].usedCount++;

  return imageSource[randomNumber].source;
}

var prevBtn = "";
var curBtn = "";

var totalMoves = 0;
var successfulMoves = 0;

for (var i = 0; i < button.length; i++) {
  button[i].addEventListener("click", function () {
    totalMoves++;
    var img = this.querySelector("img");
    if (img.style.zIndex === "-1") {
      img.style.zIndex = "2";
      this.disabled = true;
      this.classList.remove("btn-hover");

      if (prevBtn === "") {
        prevBtn = this;
      } else {
        curBtn = this;

        var curImage = curBtn.querySelector("img").src;
        var prevImage = prevBtn.querySelector("img").src;

        if (curImage == prevImage) {
          prevBtn.disabled = true;
          prevBtn.classList.remove("btn-hover");
          curBtn.disabled = true;
          curBtn.classList.remove("btn-hover");

          var temp = [];
          for (var i = 0; i < button.length; i++) {
            if (button[i] !== curBtn && button[i] !== prevBtn) {
              temp.push(button[i]);
            }
          }

          button = temp;

          prevBtn = "";
          curBtn = "";
          successfulMoves += 2;

          var scores = Math.ceil((successfulMoves / totalMoves) * 100);
          score.textContent = scores;

          if (successfulMoves == 16) {
            var audio = new Audio("../assets/Audio/memoryGame/game-over.wav");
            audio.play();
            scores = Math.ceil((successfulMoves / totalMoves) * 100);
            scoreText.textContent = "Final Score :";
          } else {
            var audio = new Audio("../assets/Audio/memoryGame/correct.wav");
            audio.play();
          }
        } else {
          var audio = new Audio("../assets/Audio/memoryGame/wrong.wav");
          audio.play();
          for (var i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button[i].classList.remove("btn-hover");
          }
          setTimeout(function () {
            curBtn.querySelector("img").style.zIndex = -1;
            prevBtn.querySelector("img").style.zIndex = -1;
            curBtn.disabled = false;
            curBtn.classList.add("btn-hover");
            prevBtn.disabled = false;
            prevBtn.classList.add("btn-hover");
            prevBtn = "";
            curBtn = "";
          }, 1000);
          setTimeout(function () {
            for (var i = 0; i < button.length; i++) {
              button[i].disabled = false;
              button[i].classList.add("btn-hover");
            }
          }, 1100);
        }
      }
    }
  });
}

playAgain.addEventListener("click", function () {
  totalMoves = 0;
  successfulMoves = 0;
  prevBtn = "";
  curBtn = "";
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].classList.add("btn-hover");
    buttons[i].querySelector("img").style.zIndex = -1;
  }
  button = buttons;
  for (var i = 0; i < imageSource.length; i++) {
    imageSource[i].usedCount = 0;
  }
  for (var i = 0; i < img.length; i++) {
    img[i].style.zIndex = "-1";
    img[i].src = generateImageSource();
  }
  score.textContent = "0";
  scoreText.textContent = "Live Score";
});
