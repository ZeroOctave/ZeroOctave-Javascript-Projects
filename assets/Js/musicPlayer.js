const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const musicInfo = document.querySelector(".music-info");
const form = document.querySelector("#Form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  var song = form.elements.query.value;

  const headers = {
    headers: {
      "x-rapidapi-key": "2902e79e2fmshfe1d6430d124b98p183fc1jsn0fe5315898c6",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  var res = await axios.get(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${song}`,
    headers
  );
  

  (function reset() {
    if (musicContainer.classList.contains("play")) {
      musicContainer.classList.remove("play");
      //musicInfo.classList.add("pause");
      playBtn.querySelector("i.fas").classList.remove("fa-pause");

      playBtn.querySelector("i.fas").classList.add("fa-play");
      audio.pause();
    }
    
  })();
  
  const songs = res.data.data;

  let songIndex = 0;

  loadSong(songs[songIndex]);

  function loadSong(song) {
    title.innerText = `${res.data.data[songIndex].title}`;
    audio.src = `${res.data.data[songIndex].preview}`;
    cover.src = `${res.data.data[songIndex].artist.picture_medium}`;
  }

  
  function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }
  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    
  }

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

  

  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  audio.addEventListener("timeupdate", updateProgress);
  progressContainer.addEventListener("click", setProgress);
  audio.addEventListener("ended", nextSong);

  
  form.elements.query.value = "";
});

function playSong() {
  musicContainer.classList.add("play");

  musicInfo.classList.remove("pause");

  playBtn.querySelector("i.fas").classList.remove("fa-play");

  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");

  musicInfo.classList.add("pause");

  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
    console.log("pause");
  } else {
    playSong();
    console.log("play");
  }
});
