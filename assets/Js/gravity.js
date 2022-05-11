let canvas = document.getElementById("canvas");

let c = canvas.getContext("2d");

let b1,b2;
let stararray = [];
let color = ['#afc9ff','#c7d8ff','#fff4f3','#ffe5cf','#ffd9b2','#ffc78e','#ffa651'];
let begin = false;
let over = false;

let mouse = {
    x: 0,
    y: 0
}

if (window.matchMedia("(orientation: portrait)").matches) {
    alert("For best experience use this website in landscape mode!!");
}

var closebtn = document.getElementById("close");

closebtn.addEventListener("click", function() {
this.parentElement.style.display = 'none';
});

addEventListener('resize' , () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init(400, canvas.height/2, 800, canvas.height/2);
});

addEventListener('mousemove', () => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('mousedown', () => {
    over = true;
})

addEventListener('mouseup', () =>{
    over = false;
})

canvas.height = innerHeight;
canvas.width = innerWidth;

function init(x1, y1, x2, y2) {
    let vbx = parseFloat(document.getElementById('vbx').value);
    let vby = -parseFloat(document.getElementById('vby').value);
    let vgx = parseFloat(document.getElementById('vgx').value);
    let vgy = -parseFloat(document.getElementById('vgy').value);
    let mb = parseFloat(document.getElementById('mb').value);
    let mg = parseFloat(document.getElementById('mg').value);
    if(isNaN(parseFloat(vbx))) vbx = 0;
    if(isNaN(parseFloat(vby))) vby = 0;
    if(isNaN(parseFloat(vgx))) vgx = 0;
    if(isNaN(parseFloat(vgy))) vgy = 0;
    if(isNaN(parseFloat(mb))) mb = 0;
    if(isNaN(parseFloat(mg))) mg = 0;
    if(mb<=0 || mg<=0){
        alert('Mass cannot be negetive or zero or empty');
        begin = false;
        document.getElementById('input').style.visibility  = 'visible';
    }else{
        b1 = new Body(x1, y1, 20, 'blue', mb, vbx, vby);
        b2 = new Body(x2, y2, 20, 'green', mg, vgx , vgy);
    }
}

function init_star(){
    for(let i = 0; i < 1500; i++) {
        let x = Math.random() * (canvas.width + 1000) - (canvas.width + 1000)/2;
        let y = Math.random() * (canvas.height + 1000) - (canvas.height + 1000)/2;
        let radius = Math.random() * 2.5;
        let colour = color[Math.floor(Math.random() * color.length)];
        stararray.push(new Star(x, y, radius, colour));
    }
}

class Body {
    constructor(x, y, radius, color, m, vel_x, vel_y){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.m = m;
        this.vel_x = vel_x;
        this.vel_y = vel_y;
    }

    update = (b1, b2) => {
        this.x += this.vel_x;
        this.y += this.vel_y;
        this.vel_x += ((b1.m * b2.m)/(this.m * Math.sqrt(Math.pow(b2.y-b1.y, 2) + Math.pow(b2.x-b1.x, 2)) * Math.sqrt(Math.pow(b2.y-b1.y, 2) + Math.pow(b2.x-b1.x, 2))))*Math.cos(Math.atan2(b1.y + b2.y - 2*this.y, b2.x + b1.x - 2*this.x));
        this.vel_y += ((b1.m * b2.m)/(this.m * Math.sqrt(Math.pow(b2.y-b1.y, 2) + Math.pow(b2.x-b1.x, 2)) * Math.sqrt(Math.pow(b2.y-b1.y, 2) + Math.pow(b2.x-b1.x, 2))))*Math.sin(Math.atan2(b1.y + b2.y - 2*this.y, b2.x + b1.x - 2*this.x));
        this.draw();
    };

    draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };
}

class Star {
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    update = () => {
        this.draw();
    }

    draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.shadowColor = this.color;
        c.shadowBlur = 9;
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

let rotate = 0;

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);
    c.rotate(rotate);
    stararray.forEach((star) => {
        star.update();
    });
    c.restore();
    if(begin){
        b1.update(b1, b2);
        b2.update(b1, b2);
    }else{
        if(mouse.x>=b1.x - b1.radius && mouse.x<=b1.x + b1.radius && mouse.y>=b1.y - b1.radius && mouse.y<=b1.y + b1.radius){
            document.body.style.cursor = 'grab';
            if(over){
                b1.x = mouse.x;
                b1.y = mouse.y;
            }
        }else if(mouse.x>=b2.x - b2.radius && mouse.x<=b2.x + b2.radius && mouse.y>=b2.y - b2.radius && mouse.y<=b2.y + b2.radius){
            document.body.style.cursor = 'grab';
            if(over){
                b2.x = mouse.x;
                b2.y = mouse.y;
            }
        }else{
            document.body.style.cursor = 'default';
        }
        b1.draw();
        b2.draw();
    }
    rotate+=0.0005;
}

function start(){
    begin = true;
    document.getElementById('input').style.visibility  = 'hidden';
    init(b1.x, b1.y, b2.x, b2.y);
}

function stop(){
    begin = false;
    document.getElementById('input').style.visibility  = 'visible';
    init(400, canvas.height/2, 800, canvas.height/2);
}

init_star();
init(400, canvas.height/2, 800, canvas.height/2);
animate();