// LOAD IMAGES //

// LOAD BG IMAGE
const Bg = new Image();
Bg.src = "../assets/images/brick/bg2.jpg";

const ballimage = new Image();
ballimage.src = "../assets/images/brick/ball-removebg-preview-removebg-preview.png";
const paddleimage = new Image();
paddleimage.src = "../assets/images/brick/paddle-removebg-preview.png";

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "../assets/images/brick/level.png";

const LIFE_IMG = new Image();
LIFE_IMG.src = "../assets/images/brick/life.png";

const SCORE_IMG = new Image();
SCORE_IMG.src = "../assets/images/brick/score.png";


// END LOAD IMAGES //

// ************************ //

// LOAD SOUNDS //

const WALL_HIT = new Audio();
WALL_HIT.src = "../assets/Audio/brick/wall.mp3";

const LIFE_LOST = new Audio();
LIFE_LOST.src = "../assets/Audio/brick/life_lost.mp3";

const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "../assets/Audio/brick/paddle_hit.mp3";

const WIN = new Audio();
WIN.src = "../assets/Audio/brick/win.mp3";

const BRICK_HIT = new Audio();
BRICK_HIT.src = "../assets/Audio/brick/brick_hit.mp3";


// END LOAD SOUNDS //