console.log("Hello World");
var wall = document.getElementById("wall");
var hole = document.getElementById("hole");
var jumping = 0 ;
var counter = 0;

hole.addEventListener('animationiteration', () =>   {
        var random = -((Math.random()*300)+300);
        hole.style.top = random + "px";
        counter++;
        document.getElementById("scoree").innerHTML = "Score : " + (counter-1);
        
    
});
setInterval(function(){
    var charactertop = parseInt(window.getComputedStyle(gigachad).getPropertyValue("top"));
    if(jumping==0){
    gigachad.style.top = (charactertop+3) + "px";
    }
    
    
    if(charactertop>850)
    {alert("Game Over! Score:  " + (counter-1));
    counter=0;
    gigachad.style.top = 200 + "px";
    }
    
    var blockLeft = parseInt(window.getComputedStyle(wall).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(750-charactertop)
    
    if(charactertop>850||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>(holeTop+160)))))
    {alert("Game Over! Score:  " + (counter-1));
    
    counter=0;
    gigachad.style.top = 200 + "px";
    }


}, 10);
function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var charactertop = parseInt(window.getComputedStyle(gigachad).getPropertyValue("top"));
        if(charactertop>56){gigachad.style.top = (charactertop-5) + "px";}
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }

        jumpCount++;
        

    },10); 
}
