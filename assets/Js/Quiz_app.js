const questionlist = [
    {
        question: "National Capital Of India",
        a: "Delhi",
        b: "Bihar",
        c: "Uttar",
        d: "Pradesh",
        ans: "ansnomatch"
    },        
    {
        question: "How many colors are there in a rainbow?",
        a: "8",
        b: "7",
        c: "6",
        d: "9",
        ans: "ans1"
    },
    {
        question: "Ship of the Desert",
        a: "Camel",
        b: "Tiger",
        c: "Zebra",
        d: "Mouse",
        ans: "ans2"
    },
    {
        question: " How many sides are there in a triangle",
        a: "Three",
        b: "Four",
        c: "Five",
        d: "Seven",
        ans: "ans1"
    },
    {
        question: " How many sides are there in a triangle",
        a: "Three",
        b: "Four",
        c: "Five",
        d: "Seven",
        ans: "ans1"
    }
];

let questiontitle = document.getElementById('question');
let optionone = document.getElementById('optionone');
let optiontwo = document.getElementById('optiontwo');
let optionthree = document.getElementById('optionthree');
let optionfour = document.getElementById('optionfour');
let button = document.getElementById('submit');
let show = document.getElementById('showlist');
let playagain = document.getElementById('playagain');
let option1 = document.getElementById('ans1');
let option2 = document.getElementById('ans2');
let option3 = document.getElementById('ans3');
let option4 = document.getElementById('ans4');
let server = document.getElementById('server');
let query = document.querySelectorAll('.response');
show.style.visibility = "hidden";
playagain.style.visibility = "hidden";

var count = 0;
var net = 0;
function changelist () { 
    questiontitle.innerHTML = questionlist[count].question;
optionone.innerHTML = questionlist[count].a;
optiontwo.innerHTML = questionlist[count].b;
optionthree.innerHTML = questionlist[count].c;
optionfour.innerHTML = questionlist[count].d;
get();
count++;

if(count >= questionlist.length){
    playagain.style.visibility = "visible";
    button.style.visibility = "hidden";
    questiontitle.style.visibility = "hidden";
    optionone.style.visibility = "hidden";
    optiontwo.style.visibility = "hidden";
    optionthree.style.visibility = "hidden";
    optionfour.style.visibility = "hidden";
    option1.style.visibility = "hidden";
    option2.style.visibility = "hidden";
    option3.style.visibility = "hidden";
    option4.style.visibility = "hidden";
    show.style.visibility = "visible";
    server.innerHTML = `Congratulations!! You have successfully submitted the test and your score is ${net}`;
  
}

};

function playagainnow () {
    count = 0;
    net = 0;
    changelist();
    button.style.visibility = "visible";
    playagain.style.visibility = "hidden";
    show.style.visibility = "hidden";
    button.addEventListener('click' , changelist);
    questiontitle.style.visibility = "visible";
    optionone.style.visibility = "visible";
    optiontwo.style.visibility = "visible";
    optionthree.style.visibility = "visible";
    optionfour.style.visibility = "visible";
    option1.style.visibility = "visible";
    option2.style.visibility = "visible";
    option3.style.visibility = "visible";
    option4.style.visibility = "visible";
   
}
function get () {
    query.forEach((element) => {
        if(element.checked){
if(element.id == questionlist[count].ans){
                net++;
                console.log(net);
            }

        };

    }); 
}
playagain.addEventListener('click' , playagainnow);



button.addEventListener('click' , changelist);