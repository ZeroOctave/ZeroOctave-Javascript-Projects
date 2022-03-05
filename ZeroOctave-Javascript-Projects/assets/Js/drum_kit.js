for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
      var sound = this.innerHTML;
      makeSound(sound);
      buttonAnimation(sound);
    });
  }
  
  document.addEventListener("keypress", function(event) {
    makeSound(event.key);
    buttonAnimation(event.key);
  });
  
  
  function makeSound(key) {
    switch (key) {
      case "w":
        var tom1 = new Audio("../assets/Audio/drum_kit/tom-1.mp3");
        tom1.play();
        break;
      case "a":
        var tom2 = new Audio("../assets/Audio/drum_kit/tom-2.mp3");
        tom2.play();
        break;
      case "s":
        var tom3 = new Audio("../assets/Audio/drum_kit/tom-3.mp3");
        tom3.play();
        break;
      case "d":
        var tom4 = new Audio("../assets/Audio/drum_kit/tom-4.mp3");
        tom4.play();
        break;
      case "j":
        var snare = new Audio("../assets/Audio/drum_kit/snare.mp3");
        snare.play();
        break;
      case "k":
        var crash = new Audio("../assets/Audio/drum_kit/crash.mp3");
        crash.play();
        break;
      case "l":
        var kick = new Audio("../assets/Audio/drum_kit/kick-bass.mp3");
        kick.play();
        break;
    }
  }
  
  function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
  
    activeButton.classList.add("pressed");
  
    setTimeout(function() {
      activeButton.classList.remove("pressed");
    }, 100);
  }
  
  
  
  
  
  
  
  
  // var audio = new Audio("../assets/Audio/drum_kit/tom-1.mp3");
  // audio.play();
  