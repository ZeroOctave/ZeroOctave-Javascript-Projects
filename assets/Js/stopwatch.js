var time_ele = document.getElementsByClassName("time")[0];
var start_btn = document.getElementById("start");
var stop_btn = document.getElementById("stop");
var reset_btn = document.getElementById("reset");

let seconds = 0;
let interval = null;


start_btn.addEventListener("click", start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);


function timer() {
    seconds++;


    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let sec = seconds % 60;

    if(sec < 10)
        sec = '0' + sec;
    
    if(mins < 10)
        mins = '0' + mins;
    
    if(hrs < 10)
        hrs = '0' + hrs;

    time_ele.innerHTML = `${hrs}:${mins}:${sec}`;
}

function start() {
    if(interval)
    {
        return;
    }

    interval = setInterval(timer, 1000);
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    seconds = 0;
    time_ele.innerHTML = "00:00:00";
}
