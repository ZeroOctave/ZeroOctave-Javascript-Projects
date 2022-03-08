
// getting different elements
let canvas_wrapper = document.getElementById('canvas');
let start_button = document.getElementById('start');
let pause_button = document.getElementById('pause');
let stop_button = document.getElementById('stop');
let heading = document.getElementById('heading');
let final = document.getElementById('finalScore');
let highestScore = document.getElementById('highestScore');
let message = document.getElementById('text');
let paused = document.getElementById('paused');
let head_inst = document.getElementById('head_inst');
let instruction = document.getElementById('instructions');
let level = document.getElementById('level');
let Reset = document.getElementById('reset');

// declarations and initialisations
let difficulty = 0;
let pauseState = 0;
let coinsEarned = 0;
let temp_speed, temp_vel_x, temp_vel_y;
let gameState;
let coins;
let coinsGot;
let state = 0;
let finalScore;

// functions to set difficulty level 
function easy(){
  difficulty = 1.001;
  var audio = new Audio();
  audio.src = "../assets/Audio/car-race/Click.mp3";
  audio.volume = 0.2;
  audio.play();
}
function medium(){
  difficulty = 1.01;
  var audio = new Audio();
  audio.src = "../assets/Audio/car-race/Click.mp3";
  audio.volume = 0.2;
  audio.play();
}
function hard(){
  difficulty = 1.03;
  var audio = new Audio();
  audio.src = "../assets/Audio/car-race/Click.mp3";
  audio.volume = 0.2;
  audio.play();
}

// function to reset the game
function reset(){
  var ans= confirm("Are you sure you want to reset? All your previous progress will be lost!");
  if(ans){
    localStorage.setItem("Coins", 0);
    localStorage.setItem("Highest_Score", 0);
    alert("Your game has been reset successfully");
    highestScore.textContent = ``;
  }
}

// starts the game or continues it as needed
function starter(){
  if(difficulty == 0){
    alert('Please choose a difficulty level first!');
    return;
  }
  level.style.visibility = "hidden";
  var audio = new Audio();
  audio.src = "../assets/Audio/car-race/Click.mp3";
  audio.volume = 0.2;
  audio.play();
  if(state == 0){
    Reset.style.visibility = "hidden";
    start_button.style.visibility = 'hidden';
    head_inst.style.visibility = 'hidden';
    instruction.style.visibility = 'hidden';
    pause_button.style.visibility = 'visible';
    stop_button.style.visibility = 'visible';
    final.style.visibility = 'hidden';
    heading.style.visibility="hidden";
    paused.textContent = ``;
    highestScore.textContent = ``;
    message.textContent = ``;
    document.getElementById("coin").innerHTML = "coin: " + 0;
    document.getElementById("totalCoin").innerHTML = "Total coins: " + localStorage.getItem("Coins");
    state = 1;
    gameState = {
      rectPosX: 10,
      rectPosY: canvas.height / 2 - 10,
      rectVelocity: { x: 0, y: 0 },
      playerSpeed: 0.5,
      enemyTimeout: 60,
      enemyTimeoutInit: 60,
      enemySpeed: 1,
      enemies: [],
      friends: [],
      friendAdded:false,
      score: 0
    };
    canvas_wrapper.style.visibility = 'visible';
    pauseState = 0;
  }else{
    start_button.style.visibility = 'hidden';
    pause_button.style.visibility = 'visible';
    stop_button.style.visibility = 'visible';
    final.style.visibility = 'hidden';
    heading.style.visibility='hidden';
    paused.textContent = ``;
    state = 1;
    gameState.rectVelocity.x = temp_vel_x;
    gameState.rectVelocity.y = temp_vel_y;
    for(let i = 0; i < gameState.enemies.length; ++i){
      gameState.enemies[i].velocity = temp_speed;
    }
    pauseState = 0;
  }
}

// helps to quit the game
function end(){
  Reset.style.visibility = 'visible';
  level.style.visibility = 'visible';
  var audio = new Audio();
  audio.src = "../assets/Audio/car-race/Click.mp3";
  audio.volume = 0.2;
  audio.play();
  if(state == 1 || state == 100){
    start_button.style.visibility = 'visible';
    pause_button.style.visibility = 'hidden';
    stop_button.style.visibility = 'hidden';
    canvas_wrapper.style.visibility = 'hidden';
    paused.textContent = ``;
    finalScore = gameState.score;
    state = 0;
    final.style.visibility = 'visible';
    final.textContent=`Your final score is ${finalScore}`;
    if(localStorage.getItem("Highest_Score") == "undefined"){
      localStorage.setItem("Highest_Score", finalScore);
    }else{
      if(localStorage.getItem("Highest_Score")<finalScore){
        message.textContent = `Congratulations, you have a new highest score!!!`;
        localStorage.setItem("Highest_Score", finalScore);
      }
    }
    if(localStorage.getItem("Highest_Score") != 0){
      highestScore.textContent = `Your highest score is ${localStorage.getItem("Highest_Score")}`;
    }
    start_button.textContent = 'Play Again';
    coinsEarned = 0;
  }
}

// pauses the game
function pause(){
  var audio = new Audio();
  audio.src = "../assets/Audio/car-race/Click.mp3";
  audio.volume = 0.2;
  audio.play();
  if(state==1){
    start_button.style.visibility = 'visible';
    pause_button.style.visibility = 'hidden';
    stop_button.style.visibility = 'visible';
    start_button.textContent = 'Continue';
    state=100;
    temp_vel_x = gameState.rectVelocity.x;
    gameState.rectVelocity.x = 0;
    temp_vel_y = gameState.rectVelocity.y;
    gameState.rectVelocity.y = 0;
    temp_speed = gameState.enemies[0].velocity;
    for(let i=0; i<gameState.enemies.length; ++i){
      gameState.enemies[i].velocity = 0;
    }
    paused.textContent = `PAUSED`;
    pauseState = 1;
  }
}

// works on spending coins
function spent(){
  if(!pauseState){
    if(localStorage.getItem('Coins')<5){
      alert("Not enough coins to spend!!");
    }else{
      var audio = new Audio();
      audio.src = "../assets/Audio/car-race/Click.mp3";
      audio.volume = 0.2;
      audio.play();
      gameState.enemySpeed*=0.8;
      gameState.rectVelocity.x *= 0.95;
      gameState.rectVelocity.y *= 0.95;
      for (let i = 0; i < gameState.enemies.length; ++i) {
        gameState.enemies[i].velocity*=0.8;
      }
      gameState.enemyTimeoutInit = gameState.enemyTimeoutInit * 1.25;
      coins = localStorage.getItem('Coins');
      if(coins == "NaN" || coins == "undefined"){
        coins = 0;
      }
      coinsGot = parseInt(coins) - 5;
      localStorage.setItem('Coins', coinsGot);
      document.getElementById("totalCoin").innerHTML = "Total coins: " + coinsGot;
    }
  }
}

// game operation starts
let canvas = document.getElementById("canvas-top");
let ctx = canvas.getContext("2d");
function random(n) {
  return Math.floor(Math.random() * n);
}
gameState = {
  rectPosX: 10,
  rectPosY: canvas.height / 2 - 10,
  rectVelocity: { x: 0, y: 0 },
  playerSpeed: 0.5,
  enemyTimeout: 60,
  enemyTimeoutInit: 60,
  enemySpeed: 1,
  enemies: [],
  friends: [],
  friendAdded:false,
  score: 0
};
class RectCollider {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  isColliding(rectCollider) {
    if (
      this.x < rectCollider.x + rectCollider.width &&
      this.x + this.width > rectCollider.x &&
      this.y < rectCollider.y + rectCollider.height &&
      this.height + this.y > rectCollider.y
    ) {
      return true;
    }
    return false;
  }
}
function checkCollision(gameState) {
  let playerCollider = new RectCollider(
    gameState.rectPosX,
    gameState.rectPosY,
    10,
    10
  );
  for (let i = 0; i < gameState.enemies.length; ++i) {
    let enemyCollider = new RectCollider(
      gameState.enemies[i].x,
      gameState.enemies[i].y,
      10,
      10
    );
    if (playerCollider.isColliding(enemyCollider)) {
      return true;
    }
  }
  for (let i = 0; i < gameState.friends.length; ++i) {
    let friendCollider = new RectCollider(
      gameState.friends[i].x,
      gameState.friends[i].y,
      5,
      5
    );
    if (playerCollider.isColliding(friendCollider) && state == 1) {
      coinsEarned++;
      gameState.friends.splice(i, 1);
      coins = localStorage.getItem('Coins');
      if(coins == "NaN" || coins == "undefined"){
        coins = 0;
      }
      coinsGot = parseInt(coins);
      coinsGot++;
      localStorage.setItem("Coins",coinsGot);
      document.getElementById("coin").innerHTML = "coin: " + coinsEarned;
      document.getElementById("totalCoin").innerHTML = "Total coins: " + coinsGot;
      var audio = new Audio();
      audio.src = "../assets/Audio/car-race/eat.wav";
      audio.play();
    }
  }
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(!pauseState){
    gameState.enemyTimeout -= 1;
    if (gameState.enemyTimeout == 0) {
      gameState.enemyTimeout = Math.floor(gameState.enemyTimeoutInit);
      gameState.enemies.push({
        x: canvas.width,
        y: random(canvas.height-10),
        velocity: gameState.enemySpeed
      });
      gameState.enemySpeed *= difficulty;
      gameState.rectVelocity.x *= difficulty;
      gameState.rectVelocity.y *= difficulty;
      gameState.enemyTimeoutInit = gameState.enemyTimeoutInit * 1/difficulty;
  }
    //console.log('timeout:'+gameState.enemyTimeoutInit);
    //console.log('speed:'+gameState.enemySpeed);
  }
  ctx.fillStyle = "#FF0000";
  gameState.rectPosX += gameState.rectVelocity.x;
  gameState.rectPosY += gameState.rectVelocity.y;
  if (gameState.rectPosX >= canvas.width - 10) {
    gameState.rectVelocity.x *= -1;
  }
  if (gameState.rectPosX <= 0) {
    gameState.rectVelocity.x *= -1;
  }
  if (gameState.rectPosY <= 0) {
    gameState.rectVelocity.y *= -1;
  }
  if (gameState.rectPosY >= canvas.height - 10) {
    gameState.rectVelocity.y *= -1;
  }
  ctx.fillRect(gameState.rectPosX, gameState.rectPosY, 10, 10);
  ctx.fillStyle = "#0000FF";
  for (let i = 0; i < gameState.enemies.length; ++i) {
    gameState.enemies[i].x -= gameState.enemies[i].velocity;
    ctx.fillRect(gameState.enemies[i].x, gameState.enemies[i].y, 10, 10);
  }
  for (let i = 0; i < gameState.enemies.length; ++i) {
    if (gameState.enemies[i].x < -10) {
      gameState.enemies.splice(i, 1);
      gameState.score++;
    }
  }
  document.getElementById("score").innerHTML = "score: " + gameState.score;
  if(gameState.score%10 == 0 && gameState.friendAdded == false){
    gameState.friends.push({
      x: random(canvas.width-20),
      y: random(canvas.height-20),
    });
    gameState.friendAdded = true;
  }
  if(gameState.score%10 == 1 && gameState.friendAdded == true){
    gameState.friendAdded = false;
  }
  for (let i = 0; i < gameState.friends.length; ++i) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(gameState.friends[i].x, gameState.friends[i].y, 5, 5);
  }
  if(checkCollision(gameState)==true && state == 1){
    var audio = new Audio();
    audio.src = "../assets/Audio/car-race/lose.wav";
    audio.play();
    end();
  }
}

// takes care of keys pressed and thier functionality in the game
setInterval(update, 20);
document.addEventListener("keydown", function(event) {
  if(!pauseState){
    if (event.keyCode == 39 || event.keyCode == 76) {
      //right arrow
      gameState.rectVelocity.x = gameState.playerSpeed;
    }
    if (event.keyCode == 37 || event.keyCode == 74) {
      //left arrow
      gameState.rectVelocity.x = -gameState.playerSpeed;
    }
    if (event.keyCode == 40 || event.keyCode == 75) {
      //up arrow
      gameState.rectVelocity.y = gameState.playerSpeed;
    }
    if (event.keyCode == 38 || event.keyCode == 73) {
      //down arrow
      gameState.rectVelocity.y = -gameState.playerSpeed;
    }
  }
  if(!pauseState){
    if(event.keyCode == 80){
      // P key
      pause();
    }
  }
  if(pauseState){
    if(event.keyCode == 67){
      // C key
      starter();
    }
  }
});