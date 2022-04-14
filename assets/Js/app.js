const app = () => {
  const music = document.querySelector(".music");
  const play = document.querySelector(".player");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  const sounds = document.querySelectorAll(".sound button");
  const timeDisplay = document.querySelector(".timed");
  const timeSelect = document.querySelectorAll(".time button");
  const outlineLength = outline.getTotalLength();
  //Duration
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDasharray = outlineLength;
  //different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      music.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(music);
    });
  });

  //playing music
  play.addEventListener("click", function () {
    checkPlaying(music);
    console.log("cde");
  });

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //stopping and playing music
  const checkPlaying = (music) => {
    if (music.paused) {
      music.play();
      video.play();
    } else {
      music.pause();
      video.pause();
    }
  };

  music.ontimeupdate = function () {
    let currentTime = music.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      music.pause();
      music.currentTime = 0;
      play.src = "play.jpg";
      video.pause();
    }
  };
};
app();
