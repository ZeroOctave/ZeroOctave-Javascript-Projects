console.log("Welcome to Spotify");
//initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Tere Jeva Hor Dasda", filePath: "songs/song1.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Kaise Bataaon", filePath: "songs/song2.mp3", coverPath: "covers/cover2.jpg" },
    { songName: "Kinna Chir-PropheC", filePath: "songs/song3.mp3", coverPath: "covers/cover3.jpg" },
    { songName: "Aankhon Ke Darmiya", filePath: "songs/song4.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "Mast Magan", filePath: "songs/song5.mp3", coverPath: "covers/cover5.jpg" },
]

songItem.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;


})


//audioElement.play();

//Handle play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }

})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-play');
    })
}   
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.addEventListener('click', (e) => {
            makeAllPlays();
            index=parseInt(e,target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-play');
            audioElement.src = 'songs/$(index).mp3';
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        })
    })
