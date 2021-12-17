const title = document.querySelector(".title");
const prev = document.querySelector(".prev");
const playPause = document.querySelector(".playPause");
const next = document.querySelector(".next");
const songList = [
  {
    path: "song1.mp3",
    songName: "Cute",
  },
  {
    path: "song2.mp3",
    songName: "Happy Rock",
  },
  {
    path: "song3.mp3",
    songName: "Jazzy Frenchy",
  },
  {
    path: "song4.mp3",
    songName: "Enjoyy",
  },
];
let i = 0;

let audio = new Audio(`./${songList[i].path}`);
let song_playing = false;

//play song
function playSong() {
  title.textContent = `${songList[i].songName}`;
  song_playing = true;
  audio.play();
  playPause.classList.add("active");
  // to change icon on play and pause
  playPause.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
}
//pause song
function pauseSong() {
  song_playing = false;
  audio.pause();
  playPause.classList.remove("active");
  //to change icon on play and pause
  playPause.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
}
// //to play or pause on click
playPause.addEventListener("click", () =>
  song_playing ? pauseSong() : playSong()
);

// //previous song
function prevSong() {
  i--;
  if (i < 0) {
    i = songList.length - 1;
  }
  audio.src = `./${songList[i].path}`;
  playSong();
}
prev.addEventListener("click", prevSong);

// //next song
function nextSong() {
  i++;
  if (i > songList.length - 1) {
    i = 0;
  }
  audio.src = `./${songList[i].path}`;
  playSong();
}
next.addEventListener("click", nextSong);