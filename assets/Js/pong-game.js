let gamestate = 'start';
let bat1 = document.querySelector('#bat1');
let bat2 = document.querySelector('#bat2');
let board = document.querySelector('.board')
let initial_ball = document.querySelector(".ball");
let ball = document.querySelector(".ball");
let score1 = document.querySelector(".player1Score");
let score2 = document.querySelector(".player2Score");
let message = document.querySelector(".message");
let bat1_coord = bat1.getBoundingClientRect();
let bat2_coord = bat2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let bat = document.querySelector('.bat').getBoundingClientRect();

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

let hit = new Audio('music/sounds_hit.mp3');
let wall = new Audio('music/sounds_wall.mp3');

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        gamestate = gamestate == 'start' ? 'play' : 'start';
        if (gamestate == 'play') {
            message.innerHTML = 'Game Started';
            message.style.left = 40 + '%';
            requestAnimationFrame(() => {
                dx = Math.floor(Math.random() * 4) + 3;
                dy = Math.floor(Math.random() * 4) + 3;
                dxd = Math.floor(Math.random() * 2);
                dyd = Math.floor(Math.random() * 2);
                moveball(dx, dy, dxd, dyd);
            });
        }
    }
    if (gamestate == 'play') {
        if (e.key == 'w') {
            bat1.style.top =
                Math.max(
                    board_coord.top,
                    bat1_coord.top - window.innerHeight * 0.06
                ) + 'px';
            bat1_coord = bat1.getBoundingClientRect();
        }
        if (e.key == 's') {
            bat1.style.top =
                Math.min(
                    board_coord.bottom - bat.height,
                    bat1_coord.top + window.innerHeight * 0.06
                ) + 'px';
            bat1_coord = bat1.getBoundingClientRect();
        }
        if (e.key == 'ArrowUp') {
            bat2.style.top =
                Math.max(
                    board_coord.top,
                    bat2_coord.top - window.innerHeight * 0.1
                ) + 'px';
            bat2_coord = bat2.getBoundingClientRect();
        }
        if (e.key == 'ArrowDown') {
            bat2.style.top =
                Math.min(
                    board_coord.bottom - bat.height,
                    bat2_coord.top + window.innerHeight * 0.1
                ) + 'px';
            bat2_coord = bat2.getBoundingClientRect();
        }
    }
});

function moveball(dx, dy, dxd, dyd) {
    if (ball_coord.top <= board_coord.top) {
        dyd = 1;
    }
    if (ball_coord.bottom >= board_coord.bottom) {
        dyd = 0;
    }
    if (
        ball_coord.left <= bat1_coord.right + 18 &&
        ball_coord.top >= bat1_coord.top &&
        ball_coord.bottom <= bat1_coord.bottom
    ) {
        hit.play();
        dxd = 1;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    }
    if (
        ball_coord.right >= bat2_coord.left - 18 &&
        ball_coord.top >= bat2_coord.top &&
        ball_coord.bottom <= bat2_coord.bottom
    ) {
        hit.play();
        dxd = 0;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    }
    if (
        ball_coord.left <= board_coord.left ||
        ball_coord.right >= board_coord.right
    ) {
        wall.play();
        if (ball_coord.left <= board_coord.left) {
            score2.innerHTML = +score2.innerHTML + 1;
        } else {
            score1.innerHTML = +score1.innerHTML + 1;
        }
        gamestate = 'start';

        ball_coord = initial_ball_coord;
        ball.style = initial_ball.style;
        message.innerHTML = 'Press Enter to Play Pong';
        message.style.left = 32 + '%';
        return;
    }
    ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
    ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
    ball_coord = ball.getBoundingClientRect();
    requestAnimationFrame(() => {
        moveball(dx, dy, dxd, dyd);
    });
}