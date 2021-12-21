var size = prompt("Enter the size of array");
var names = [];
var spins=0;
for(var i=0 ; i<size ; i++){
    names[i] = prompt("Enter name-");
}

function spin(){
    console.log("Button was clicked");
    spins++;
    var winner = Math.floor(Math.random() * size);
    var rotation = (spins * 720) + (winner * (360 / names.length));
    $('img').css('transform', 'rotate('+rotation+'deg)');
    setTimeout(function(){
        $('output').html(names[winner]);
    } , 3000)
    
}