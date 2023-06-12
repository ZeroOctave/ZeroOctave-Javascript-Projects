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

function search(val,search){
  let sentence=val.split(" ");
  let count=0;
  if(search=='') 
    return 0;
  for(let i=0;i<sentence.length;i++){
    if(sentence[i]==search && sentence[sentence.length-1]!=" ") {
      count=count+1;
    }
  }
  return count;
 }

 
var textContent = document.getElementById("textcontent");
var showWordCount   = document.getElementById("countWord");
var showcharactercount = document.getElementById("countcharacter");
var showalphabetcount = document.getElementById("countalphabets");
var longestWord=document.getElementById("longestWord");
var longestWordlength=document.getElementById("longestWordlength");
var searchText=document.getElementById("searchText");//Word to be searched
var frequency=document.getElementById("frequency");
var copy=document.getElementById("copyButton");
var paste=document.getElementById("pasteButton");
let f=0;

longestWord.innerHTML=("<br>There is no text.");
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
if(l.length===0){
  longestWord.innerHTML=("<br>There is no text.");
}
else{
  longestWord.innerHTML=("<br>Longest Word: "+l.bold());
}
let text=this.value;
longestWordlength.innerHTML=("<br>Length of "+l+" is: "+l.length);
    searchButton.addEventListener("click",function(){
      let word=searchText.value;
      f=search(text,word);
      frequency.innerHTML=("<br>"+word.bold()+" occurs "+f+" times(s) in the text.");
    },false);
}, false);

