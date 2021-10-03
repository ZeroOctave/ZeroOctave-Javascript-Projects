function spsGame(yourChoice){ 
    console.log(yourChoice);
    var ourChoice, botChoice; 

    ourChoice=yourChoice.id;
    
    botChoice=number_to_choice(random_to_integer());
    console.log('compChoice:', botChoice);

    results=winner(ourChoice,botChoice);
    console.log(results);

    message=finalMessage(results);
    console.log(message);

    spsFrontend(ourChoice, botChoice, message);

    function random_to_integer(){
        var number = Math.floor(Math.random() * 3); //generates 0, 1 or 2 randomly
        return number;
    }

    function number_to_choice(number){
        var bot_choice = ['stone' , 'paper' , 'scissors'][number]; //returns value at index of the random number generated
        return bot_choice;
    }

    function winner(yourChoice, compChoice){
        var spsPossibilities={ // 'key which shall be picked by us' : dictionary - which will contain all the possible outcomes if we pick rock 
            'stone' : {'scissor': 1, 'stone': 0.5, 'paper': 0},
            'paper' : {'stone': 1, 'paper': 0.5, 'scissors': 0},
            'scissors' : {'paper': 1, 'scissors': 0.5, 'stone': 0}
        }; //almost like a json object --->> a data structure

        var ourScore = spsPossibilities[yourChoice][compChoice];
        var compScore = spsPossibilities[compChoice][yourChoice];

        return[ourScore, compScore];
    }

    function finalMessage([ourScore,compScore]){
        if(ourScore===0){
            return {'message': 'Sorry! You Lost!', 'color': 'red'};
        }
        else if(ourScore===0.5){
            return {'message': 'It is a draw!', 'color': 'orange'};
        }
        else{
            return {'message': 'Congrats! You won!', 'color': 'green'};
        }
    }

    function spsFrontend(ourChoiceImage, botChoiceImage, finalMessage){
        var imagesPossibilities = {
            'stone': document.getElementById('stone').src,
            'paper': document.getElementById('paper').src,
            'scissors': document.getElementById('scissors').src
        };

    //removing the images
    document.getElementById('stone').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    
    //the single quote at the end of the code in the next line will close the img src (tag)
    humanDiv.innerHTML = "<img src='" + imagesPossibilities[ourChoiceImage] + "'height=200 width=200 style='box-shadow: 0px 10px 50px rgba(20, 20, 20, 1);'>"
    messageDiv.innerHTML="<h2 style='color: " + finalMessage['color'] + "; font-size: 45px; padding:64px; '>" + finalMessage['message'] + "</h2>"//finalMessage's object's colour is being accessed here
    botDiv.innerHTML = "<img src='" + imagesPossibilities[botChoiceImage] + "'height=200 width=200 style='box-shadow: 0px 10px 50px rgba(20, 20, 20, 1);'>"
    document.getElementById('flex-box-sps-div').appendChild(humanDiv);
    document.getElementById('flex-box-sps-div').appendChild(messageDiv); //to be put in between so that it will show in between the 2 final images 
    document.getElementById('flex-box-sps-div').appendChild(botDiv);

    }
    
}
