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

function longest(val){
       
  let sentence=val.split(" ");
    let longestWord=sentence.reduce(function(a,b){
      if(a.length>b.length) return a;
      return b;
    },"");
    return longestWord;
}
// var temp=document.getElementById("textcontent");
temp=document.getElementById("textcontent");
var textContent = document.getElementById("textcontent");
var showWordCount   = document.getElementById("countWord");
var showcharactercount = document.getElementById("countcharacter");
var showalphabetcount = document.getElementById("countalphabets");
var longestWord=document.getElementById("longestWord");
var longestWordlength=document.getElementById("longestWordlength");
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
var l=longest(this.value);
longestWord.innerHTML=("<br>Longest Word: "+l);
longestWordlength.innerHTML=("<br>Length of "+l+" is: "+l.length);
}, false);