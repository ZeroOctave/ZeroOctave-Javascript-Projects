const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// make canvas full screen
canvas.width = innerWidth;
canvas.height = innerHeight;

// initialise some html elements
const godModeCheckbox = document.getElementById('god-mode-checkbox');
const wonModal = new bootstrap.Modal(document.getElementById('won-modal'));
const lostModal = new bootstrap.Modal(document.getElementById('lost-modal'));
const welcomeModal = new bootstrap.Modal(document.getElementById('welcome-modal'));
welcomeModal.show();

let gameOver, gameWon = false;
let godMode, flappy, obstacles, obstacleAcceleration;
const numOfObstacles = 100;

class Bird {
  constructor(x, y) {
      this.pos = { x: x, y: y };
      this.v = { x: 0, y: 1 };
      this.a = { x: 0, y: .05 };
      this.radius = 10;
  }

  draw() {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = `hsl(200, 100%, 50%)`;
      ctx.fill();
  }
  update() {
      // check collision with screen
      if (this.pos.y + this.v.y + this.radius >= innerHeight ||
          this.pos.y + this.v.y - this.radius <= 0) {
          lost();
      } else {
          // inncrement velocity by acceleration
          this.v.x += this.a.x;
          this.v.y += this.a.y;
      }

      // increment position by velocity
      this.pos.x += this.v.x;
      this.pos.y += this.v.y;
      this.draw();
  }
}

class Obstacle {
  constructor (x, v, a) {
      this.x = x;
      this.v = v;
      this.a = a;     // increase acceleration for higher difficulty
      this.height = innerHeight / 2 + Math.random() * 200 - 100;
      this.width = 100;
      this.gap = Math.random() * 200 + 100;
      this.color = '#ff3b3b';
  }
  draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, 0, this.width, this.height);
      ctx.fillRect(this.x, this.height + this.gap, this.width, innerHeight - this.height + this.gap);
  }
  update() {
      this.x -= this.v;
      this.v += this.a;
      this.draw();
  }
}

// start is called when "I'm ready" is clicked on welcome-modal
const start = () => {
  godMode = godModeCheckbox.checked;
  obstacleAcceleration = (document.getElementById('difficulty-noob').checked) ? 0.001
  : (document.getElementById('difficulty-advanced').checked) ? 0.005
  : (document.getElementById('difficulty-insane').checked) ? 0.01
  : 1;
  
  // creating the bird
  flappy = new Bird(100, innerHeight / 2);
  
  // creating the obstacles
  obstacles = [];
  for (let i = 0; i < numOfObstacles; i++) {
    let offset = Math.random() * 200 - 100;
    obstacles.push(new Obstacle(i * 300 + offset + innerWidth, 2, obstacleAcceleration));
  }
  animate();
}

const won = () => {
  gameWon = true;
  wonModal.show();
}
const lost = () => {
  gameOver = true;
  lostModal.show();
}
const refresh = () => {
  location.reload();
}
const restart = () => {
  gameOver = false;
  start();
}

const checkCollisionWithObstacles = () => {
  // check if all obstacles are already cleared
  const last = obstacles[numOfObstacles - 1];
  if (last.x + last.width < 0) {
    won();
    return;
  }

  let currentObstacle;    // the obstacle just next to our flappy bird
  for (const obstacle of obstacles) {
    if (obstacle.x + obstacle.width > flappy.pos.x) {
      currentObstacle = obstacle;

      if (godMode) {
        obstacle.color = '#fff';
        flappy.pos.y = currentObstacle.height + currentObstacle.gap / 2;
        flappy.v.y = 0;
        flappy.a.y = 0;
      }
      break;
    }
  }

  if (currentObstacle) {
    // collision detection between bird and currentObstacle
    if (flappy.pos.x > currentObstacle.x) {
      if (flappy.pos.y < currentObstacle.height ||
        flappy.pos.y > currentObstacle.height + currentObstacle.gap) {
        lost();
      }
    }
  }
}

// move the bird up with ArrowUp or Space key
window.addEventListener('keydown', (event) => {
  if (event.key === "ArrowUp" || event.key === " ") {
    flappy.v.y -= 3;
  }
})

const animate = () => {
  if (!gameOver && !gameWon) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    checkCollisionWithObstacles();
    flappy.update();
    for (const obstacle of obstacles) {
      obstacle.update();
    }
  }
}