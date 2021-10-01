var User1= "User1"
var User2="User2"
function editName() {
 User1=prompt("Change user 1 name")
 User2=prompt("Change user 2 name")
 document.querySelector(".user-1").innerHTML=User1
 document.querySelector(".user-2").innerHTML=User2

}

function rollDice() {
    const randomNumber1 = Math.floor(Math.random()*6 ) + 1
    document.querySelector(".image1").setAttribute("src","../assets/Images/dice"+randomNumber1 + ".png")
    const randomNumber2 = Math.floor(Math.random()*6 ) + 1
    document.querySelector(".image2").setAttribute("src","../assets/Images/dice"+randomNumber2 + ".png")

    if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").innerHTML=User1 + " won "
    }

    else if(randomNumber2 > randomNumber1){
        document.querySelector("h1").innerHTML=User2 + " won " 
    }
    else{
        document.querySelector("h1").innerHTML="Draw"
    }

}