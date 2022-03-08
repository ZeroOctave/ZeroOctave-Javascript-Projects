console.log("Welcome to Notes app ")

// var addfont = document.getElementById("1");
// console.log(addfont.value)
function changefont(font){
    document.getElementById("notes").style.fontFamily = font.value;
}

shownotes();
           
// let addfont = document.getElementById('addtxt');
// addfont.style.fontFamily = font;
// If user adds a note nad add it to the local storage
// Function to parse nad the data from the textarea
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById('addtxt');
    
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    console.log(notesobj);
    shownotes();


});

// Function to show Notes
function shownotes() {
    
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {

        html += `
        <div class="my-2-mx-2 card">
            <div class="card-body">
               <h5 class="card-title" style="font-family : 'New Roman' ;"><b>Font ${index + 1}</b></h5>
            <p class="card-text">${element}</p>
            </div>
        </div>
        `;

    });    
    let notesele = document.getElementById("notes");
    // document.querySelectorAll("#notes > style").innerHTML = "Quintessential";
    if(notesobj.length != 0){
        notesele.innerHTML=html;
        
    }
    else{                                                                          
        notesele.innerHTML = `Nothing to show Use "Add Note" to add notes`
    }

    
}

let deletefont = document.getElementById("delete");
deletefont.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})