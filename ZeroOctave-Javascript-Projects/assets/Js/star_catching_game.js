var canvas = document.getElementById("canvas");

var mousex = 250,
  mousey = 250;

var finished = false;

var score = 0,
  starslost = 0;

var ctx = canvas.getContext("2d");

var keydown = [];

for (var i = 0; i < 258; i++) {
  keydown[i] = false;
}

setInterval(function () {
  update();
  draw();
}, 1000 / 60);

setInterval(function () {
  if (Math.random() > 3) {
    addStar();
  }
}, 1000 / 30);

const image = document.getElementById("source");
var player = {
  x: 50,
  y: 250,
  width: 50,
  height: 100,
  yspeed: 0,
};

var gravity = 0.5;

function draw() {
  if (finished == false) {
    ctx.clearRect(0, 0, 500, 500);

    stars.forEach(function (star) {
      if (star.active) {
        star.draw();
      }
    });

    ctx.drawImage(
      image,
      player.x - player.width / 2,
      player.y - player.height / 1.4,
      player.width,
      player.height
    );

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 2, 20);
    ctx.fillText("Stars Lost: " + starslost, 2, 36);
    if (starslost > score) {
      ctx.font = "50px Arial";
      ctx.clearRect(0, 0, 500, 500);
      ctx.fillText("You Lost!", 100, 250);
    }
  } else {
    ctx.font = "50px Arial";
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillText("You won with " + finishedstars + " stars lost!", 100, 250);
  }
}

var finishedstars;

function update() {
  if (finished) {
    exit;
  }
  if (score >= 100) {
    finished = true;
    finishedstars = starslost;
  }

  gravity += 0.5;
  player.y += gravity;
  player.y -= player.yspeed;

  if (player.y > 500 - 25) {
    gravity = 0;
    player.yspeed = 0;
    player.y = 500 - 25;
  }

  stars.forEach(function (star) {
    if (star.active) {
      star.update();
    }
  });
}

var stars = [];
const starchar = document.getElementById("star");
function addStar() {
  var star = {
    active: true,
    x: Math.random() * 500,
    y: -16,
    width: 16,
    height: 32,
    gravity: 0.5,
    draw: function () {
      ctx.drawImage(starchar, this.x, this.y, this.width, this.height);
    },

    update: function () {
      this.gravity += 0.5;
      this.y += this.gravity;

      if (this.gravity > 3) {
        this.gravity = 3;
      }

      if (collides(this, player)) {
        score++;
        this.active = false;
      }

      if (this.y > 500) {
        this.active = false;
        starslost++;
      }
    },
  };

  stars.push(star);
}

function collides(a, b) {
  if (b == player) {
    b = {
      x: player.x - 16,
      y: player.y - 16,
      width: player.width,
      height: player.height,
    };
  }

  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

canvas.addEventListener("mousedown", function (e) {
  if (gravity == 0) {
    player.yspeed = 12;
  }
  addStar();
});

function moveup() {
  if (gravity == 0) {
    player.yspeed = 12;
  }
}
function moveleft() {
  player.x -= 100;
}

function play() {
  setInterval(() => {
    addStar();
  }, 2000);
}
function moveright() {
  player.x += 100;
}

canvas.addEventListener("mousemove", function (e) {
  mousex = e.pageX - this.offsetLeft;
  mousey = e.pageY - this.offsetTop;

  player.x = e.pageX - this.offsetLeft;
});
