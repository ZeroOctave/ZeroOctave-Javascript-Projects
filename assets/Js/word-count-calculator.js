function count_word( val ){
  var wom = val.match(/\S+/g);
  return {
      words : wom ? wom.length : 0
  };
}
function count_character(val){
  return val.length;
}

function count_alphabets(val){
  let alphabetsArr = val.match(/[A-Za-z]+/g);
  if (alphabetsArr) {
    return alphabetsArr.join("").length;
  }
  return 0;
}

var textContent = document.getElementById("textcontent");
var showWordCount   = document.getElementById("countWord");
var showcharactercount = document.getElementById("countcharacter");
var showalphabetcount = document.getElementById("countalphabets");
textContent.addEventListener("input", function(){
var v = count_word( this.value );
showWordCount.innerHTML = (
    "<br>Words: "+ v.words
);
var x = count_character(this.value);
showcharactercount.innerHTML = (
  "<br>Characters: "+x
);
var d = count_alphabets(this.value);
showalphabetcount.innerHTML = (
  "<br>Alphabets: "+d
);
}, false);