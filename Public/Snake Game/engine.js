let hiscore= localStorage.getItem("hiscore");
hiscrbar= document.getElementById('highscore');
if (hiscore==null) {
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval= JSON.parse(hiscore);
    hiscrbar.innerHTML= "Hi-score :"+ hiscoreval ;
}
hiscrbar.innerHTML= "Hi-score :"+ hiscoreval ;
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
var speed = 5;
var score = 0;
 scrbar= document.getElementById('scorebar');
console.log(scrbar.innerHTML);
var lastPaintTime = 0;
let snakeArr = [{ x: 5, y: 6 }];
let food = { x: 4, y: 8 };
// let levelval ;
// function formdata() {
    
//     let levelfrm = document.getElementById('levelform') ;
//     let levelele = levelfrm.elements.item(0) ;
//      levelval = levelele.value ;
//     console.log(levelval);
// }
let levelvalue= (11- 1)*100;
function main(ctime) {
    window.requestAnimationFrame(main);
    if (((ctime - lastPaintTime) / levelvalue) < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snakeArr) {
    //if it touches itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y) {
            return true;
        }
    }
    if (snakeArr[0].x >= 18 || snakeArr[0].y >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y <= 0) {
        return true;
    }
}
function gameEngine() {
    //if collapse
    if (isCollide(snakeArr)) {
        musicsound.pause();
        gameoversound.play();
        inputDir = { x: 0, y: 0 };
        if (score > hiscoreval ) {
            hiscoreval= score ; 
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval)) ;
            hiscrbar.innerHTML= "Hi-score :"+ hiscoreval ;
        }
        alert("Game Over . Press any key to play again ");
        score = 0;
        snakeArr = [{ x: 13, y: 15 }];
      //  musicsound.play();
    }
    // if eaten the fruit
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        foodsound.play();
        let a = 2;
        b = 16;
        score+=5;
        scrbar.innerHTML= "Score :";
        scrbar.innerHTML+= score;
        food = { x: Math.round(a + (b - a)* Math.random() ), y: Math.round(a + (b - a) * Math.random()) };

    }
    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = snakeArr[index];
        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // part1 : snake array 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {

            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Aroow up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("Aroow Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("Aroow upright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});