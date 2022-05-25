let dotes = document.querySelector(".class");
let gly = document.querySelector(".option");
let body = document.getElementsByTagName("body");
let row4 = document.querySelector(".row4")
let row5 = document.querySelector(".row5")
let row1 = document.querySelector(".row1")
let row2 = document.querySelector(".row2")
let row3 = document.querySelector(".row3")
let ta1 = document.querySelector(".ta1");
let ta2 = document.querySelector(".ta2");
let search = document.querySelector(".search")
let con2 = document.querySelector(".con2")
let impstar = document.querySelector(".rc1");
let nimpstar = document.querySelector(".rc2");
let addNote = document.querySelector(".add-note");

let gridView = document.querySelector("#li41");
let listView = document.querySelector("#li4");


//theme changing


const enableDarkMode = () => {
    let darkmode = localStorage.getItem("darkmode");
    // console.log("dark mode enabled");
    localStorage.setItem("darkmode", 0);
    document.getElementsByTagName("body")[0].style.backgroundColor = "rgb(27, 26, 26)";
    document.querySelector(".jumbotron").classList.remove("jumboChange");
    let glyph = document.querySelectorAll(".glyphicon");
    Array.from(glyph).forEach(function(element) {
        element.classList.remove('glyhChange');
    });
    document.querySelector(".class").classList.remove("classChange");
    document.querySelector(".upper").classList.remove("upperChange");
    let all = document.querySelectorAll(".notes")
    Array.from(all).forEach(function(element) {
        element.classList.remove("notesChange");
    });
    document.getElementsByTagName("hr")[0].classList.remove("hrChange");
    let not = document.querySelectorAll(".box");
    Array.from(not).forEach(function(element) {
        element.classList.remove("boxChange")
    });
    let al = document.querySelectorAll(".glyphicon-star")
    Array.from(al).forEach(function(element) {
        element.classList.remove("impChange");
    });
    let bdel = document.querySelectorAll(".btn-delete");
    Array.from(bdel).forEach(function(element) {
        element.classList.remove("btn-deleteChange");
    });

}

const disableDarkMode = () => {
    let darkmode = localStorage.getItem("darkmode");
    // console.log("dark mode disabled");
    localStorage.setItem("darkmode", 1);
    document.getElementsByTagName("body")[0].style.backgroundColor = "rgb(238 238 238)";
    document.querySelector(".jumbotron").classList.add("jumboChange");
    let glyph = document.querySelectorAll(".glyphicon");
    Array.from(glyph).forEach(function(element) {
        element.classList.add('glyhChange');
    });
    document.querySelector(".class").classList.add("classChange");
    document.querySelector(".upper").classList.add("upperChange");
    let all = document.querySelectorAll(".notes")
    Array.from(all).forEach(function(element) {
        element.classList.add("notesChange");
    });
    document.getElementsByTagName("hr")[0].classList.add("hrChange");
    let not = document.querySelectorAll(".box");
    Array.from(not).forEach(function(element) {
        element.classList.add("boxChange")
    })
    let al = document.querySelectorAll(".glyphicon-star")
    Array.from(al).forEach(function(element) {
        element.classList.add("impChange");
    });
    let bdel = document.querySelectorAll(".btn-delete");
    Array.from(bdel).forEach(function(element) {
        element.classList.add("btn-deleteChange");
    });

}

showNotes();
moode();



function moode() {
    let darkmode = localStorage.getItem("darkmode");
    if (darkmode == 1) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

const changetheme = document.getElementById("li5");

changetheme.addEventListener("click", function(e) {
    darkmode = localStorage.getItem("darkmode");
    if (darkmode == 0) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
})

let count = 0,
    count2 = 0;

//arranging the options div

gly.addEventListener("click", function(e) {
    if (count % 2 == 0) {
        dotes.classList.remove("none");
    } else {
        dotes.classList.add("none");
    }
    count++;
})


//arranging the text area,buttons and all 

let add = document.querySelector(".create");
let cback = document.querySelector(".create-back")
let sback = document.querySelector(".search-back")
let right = document.querySelector(".right")
cback.addEventListener("click", function(e) {
    let cn = document.querySelectorAll(".cn");
    Array.from(cn).forEach(function(element) {
        element.classList.remove("none");
    })
    con2.classList.remove("none");
    row4.classList.add("none");
    row5.classList.add("none");
    row1.classList.remove("none");
    row2.classList.remove("none");
    row3.classList.remove("none");
    impstar.classList.add("none");
    nimpstar.classList.add("none");
    ta1.placeholder = "";
    ta2.placeholder = "";
    ta1.value = "";
    ta2.value = "";
})
sback.addEventListener("click", function(e) {
    let cn = document.querySelectorAll(".cn")
    Array.from(cn).forEach(function(element) {
        element.classList.remove("none");
    })
    con2.classList.remove("none");
    right.classList.remove("none");
    sback.classList.add("none");
    cback.classList.remove("none");
    row4.classList.add("none");
    row5.classList.add("none");
    row1.classList.remove("none");
    row2.classList.remove("none");
    row3.classList.remove("none");
    ta2.classList.remove("none");
    impstar.classList.add("none");
    nimpstar.classList.add("none");
    ta1.placeholder = "";
    ta1.value = "";
    ta2.value = "";
    ta2.placeholder = "";
})
add.addEventListener("click", function(e) {
    // console.log("Creating a note");
    let cn = document.querySelectorAll(".cn");
    Array.from(cn).forEach(function(element) {
        element.classList.add("none");
    })
    con2.classList.add("none");
    row4.classList.remove("none");
    row5.classList.remove("none");
    row1.classList.add("none");
    row2.classList.add("none");
    row3.classList.add("none");
    updateNote.classList.add("none");
    addNote.classList.remove("none");
    impstar.classList.add("none");
    nimpstar.classList.add("none");
    ta1.placeholder = "Enter Your Title...";
    ta2.placeholder = "Enter Your Content...";
    ta1.value = "";
    ta2.value = "";
})

//deleting a note 

function deleted(index) {
    a = confirm("are you sure u want to delete this note?")
    if (a) {
        // console.log("box number " + index + " will be deleted")
        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 8);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        showNotes();
    } else {
        location.reload();
    }
}

// adding a note

addNote.addEventListener("click", function(e) {
    let cn = document.querySelectorAll(".cn");
    Array.from(cn).forEach(function(element) {
        element.classList.remove("none");
    })
    con2.classList.remove("none");
    row4.classList.add("none");
    row5.classList.add("none");
    row1.classList.remove("none");
    row2.classList.remove("none");
    row3.classList.remove("none");
    ta1.placeholder = "";
    ta2.placeholder = "";
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    let addHead = document.querySelector(".ta1");
    let addBody = document.querySelector(".ta2");
    let date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + formatAMPM(new Date);
    let importance = 0;
    let view = 0;
    let importanceFirst = 0;
    let oldFirst = 0;
    let newFirst = 0;

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (addHead.value == "" || addBody.value == "" || addHead.value == " " || addBody.value == " ") {
        alert("Empty Note cannot be stored!");
        window.location.reload();
    } else {
        notesObj.push(addHead.value);
        notesObj.push(addBody.value);
        notesObj.push(date);
        notesObj.push(importance);
        notesObj.push(view);
        notesObj.push(importanceFirst);
        notesObj.push(oldFirst);
        notesObj.push(newFirst);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addHead.value = "";
        addBody.value = "";
        // console.log(notesObj);
        showNotes();
    }
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    if (notesObj[5] == 1) {
        notesObj.forEach(function(element, index) {
            if (index % 8 == 0 && notesObj[index + 3] == 1) {
                let str = notesObj[index + 1],
                    substr;
                let str2 = notesObj[index],
                    substr2;

                if (str.length > 80) {
                    substr = str.substring(0, 80) + "...";
                } else {
                    substr = str;
                }

                if (str2.length > 22) {
                    substr2 = str2.substring(0, 22) + "...";
                } else {
                    substr2 = str2;
                }
                html += ` <br>
                <div class="cn" id="${index}">
                    <div class="delete">
                        <button class="btn-delete" id="${index}" onclick=deleted(${index})><l><span class="glyphicon glyphicon-remove remove "></span></l></button>
                    </div>
                    <div class="box" onclick=inside(${index})>
                        <h1 id="nheadHu">${substr2.toLowerCase()}</h1>
                        <p class="content">
                        ${substr} 
                        </p>
                        <p class="date">
                        ${notesObj[index+2]} 
                        </p>
                        <l><span class="glyphicon glyphicon-star imp none" id=B${index}></span></l>
                    </div>
                </div>`
            }
        })
        notesObj.forEach(function(element, index) {
            if (index % 8 == 0 && notesObj[index + 3] == 0) {
                let str = notesObj[index + 1],
                    substr;
                let str2 = notesObj[index],
                    substr2;

                if (str.length > 80) {
                    substr = str.substring(0, 80) + "...";
                } else {
                    substr = str;
                }

                if (str2.length > 22) {
                    substr2 = str2.substring(0, 22) + "...";
                } else {
                    substr2 = str2;
                }
                html += ` <br>
                <div class="cn" id="${index}">
                    <div class="delete">
                        <button class="btn-delete" id="${index}" onclick=deleted(${index})><l><span class="glyphicon glyphicon-remove remove "></span></l></button>
                    </div>
                    <div class="box" onclick=inside(${index})>
                        <h1 id="nheadHu">${substr2.toLowerCase()}</h1>
                        <p class="content">
                        ${substr} 
                        </p>
                        <p class="date">
                        ${notesObj[index+2]} 
                        </p>
                        <l><span class="glyphicon glyphicon-star imp none" id=B${index}></span></l>
                    </div>
                </div>`
            }
        })
    } else if (notesObj[6] == 1) {
        for (let i = 0; i < notesObj.length - 8; i++) {
            if (i % 8 == 0) {
                let date1 = new Date(notesObj[i + 2]);
                let date2 = new Date(notesObj[i + 2 + 8]);
                let tempt, tempt2, tempt3, tempt4, tempt5, tempt6, tempt7, tempt8;
                if (date1 > date2) {
                    tempt = notesObj[i];
                    notesObj[i] = notesObj[i + 8];
                    notesObj[i + 8] = tempt;

                    tempt2 = notesObj[i + 1];
                    notesObj[i + 1] = notesObj[i + 8 + 1];
                    notesObj[i + 8 + 1] = tempt2;

                    tempt3 = notesObj[i + 2];
                    notesObj[i + 2] = notesObj[i + 8 + 2];
                    notesObj[i + 8 + 2] = tempt3;

                    tempt4 = notesObj[i + 3];
                    notesObj[i + 3] = notesObj[i + 8 + 3];
                    notesObj[i + 8 + 3] = tempt4;

                    tempt5 = notesObj[i + 4];
                    notesObj[i + 4] = notesObj[i + 8 + 4];
                    notesObj[i + 8 + 4] = tempt5;

                    tempt6 = notesObj[i + 5];
                    notesObj[i + 5] = notesObj[i + 8 + 5];
                    notesObj[i + 8 + 5] = tempt6;

                    tempt7 = notesObj[i + 6];
                    notesObj[i + 6] = notesObj[i + 8 + 6];
                    notesObj[i + 8 + 6] = tempt7;

                    tempt8 = notesObj[i + 7];
                    notesObj[i + 7] = notesObj[i + 8 + 7];
                    notesObj[i + 8 + 7] = tempt8;
                }
            }
        }
        localStorage.setItem('notes', JSON.stringify(notesObj));
        notesObj.forEach(function(element, index) {
            if (index % 8 == 0) {
                let str = notesObj[index + 1],
                    substr;
                let str2 = notesObj[index],
                    substr2;

                if (str.length > 80) {
                    substr = str.substring(0, 80) + "...";
                } else {
                    substr = str;
                }

                if (str2.length > 22) {
                    substr2 = str2.substring(0, 22) + "...";
                } else {
                    substr2 = str2;
                }
                html += ` <br>
                <div class="cn" id="${index}">
                    <div class="delete">
                        <button class="btn-delete" id="${index}" onclick=deleted(${index})><l><span class="glyphicon glyphicon-remove remove "></span></l></button>
                    </div>
                    <div class="box" onclick=inside(${index})>
                        <h1 id="nheadHu">${substr2.toLowerCase()}</h1>
                        <p class="content">
                        ${substr} 
                        </p>
                        <p class="date">
                        ${notesObj[index+2]} 
                        </p>
                        <l><span class="glyphicon glyphicon-star imp none" id=B${index}></span></l>
                    </div>
                </div>`
            }
        })
    } else if (notesObj[7] == 1) {
        for (let i = 0; i < notesObj.length - 8; i++) {
            if (i % 8 == 0) {
                let date1 = new Date(notesObj[i + 2]);
                let date2 = new Date(notesObj[i + 2 + 8]);
                let tempt, tempt2, tempt3, tempt4, tempt5, tempt6, tempt7, tempt8;
                if (date1 > date2) {
                    tempt = notesObj[i];
                    notesObj[i] = notesObj[i + 8];
                    notesObj[i + 8] = tempt;

                    tempt2 = notesObj[i + 1];
                    notesObj[i + 1] = notesObj[i + 8 + 1];
                    notesObj[i + 8 + 1] = tempt2;

                    tempt3 = notesObj[i + 2];
                    notesObj[i + 2] = notesObj[i + 8 + 2];
                    notesObj[i + 8 + 2] = tempt3;

                    tempt4 = notesObj[i + 3];
                    notesObj[i + 3] = notesObj[i + 8 + 3];
                    notesObj[i + 8 + 3] = tempt4;

                    tempt5 = notesObj[i + 4];
                    notesObj[i + 4] = notesObj[i + 8 + 4];
                    notesObj[i + 8 + 4] = tempt5;

                    tempt6 = notesObj[i + 5];
                    notesObj[i + 5] = notesObj[i + 8 + 5];
                    notesObj[i + 8 + 5] = tempt6;

                    tempt7 = notesObj[i + 6];
                    notesObj[i + 6] = notesObj[i + 8 + 6];
                    notesObj[i + 8 + 6] = tempt7;

                    tempt8 = notesObj[i + 7];
                    notesObj[i + 7] = notesObj[i + 8 + 7];
                    notesObj[i + 8 + 7] = tempt8;
                }
            }
        }
        localStorage.setItem('notes', JSON.stringify(notesObj));
        for (let index = notesObj.length - 1; index >= 0; index--) {
            if (index % 8 == 0) {
                let str = notesObj[index + 1],
                    substr;
                let str2 = notesObj[index],
                    substr2;

                if (str.length > 80) {
                    substr = str.substring(0, 80) + "...";
                } else {
                    substr = str;
                }

                if (str2.length > 22) {
                    substr2 = str2.substring(0, 22) + "...";
                } else {
                    substr2 = str2;
                }
                html += ` <br>
                <div class="cn" id="${index}">
                    <div class="delete">
                        <button class="btn-delete" id="${index}" onclick=deleted(${index})><l><span class="glyphicon glyphicon-remove remove "></span></l></button>
                    </div>
                    <div class="box" onclick=inside(${index})>
                        <h1 id="nheadHu">${substr2.toLowerCase()}</h1>
                        <p class="content">
                        ${substr} 
                        </p>
                        <p class="date">
                        ${notesObj[index+2]} 
                        </p>
                        <l><span class="glyphicon glyphicon-star imp none" id=B${index}></span></l>
                    </div>
                </div>`
            }
        }
    } else {
        //default sorting order for the notes
        notesObj.forEach(function(element, index) {
            if (index % 8 == 0) {
                let str = notesObj[index + 1],
                    substr;
                let str2 = notesObj[index],
                    substr2;

                if (str.length > 80) {
                    substr = str.substring(0, 80) + "...";
                } else {
                    substr = str;
                }

                if (str2.length > 22) {
                    substr2 = str2.substring(0, 22) + "...";
                } else {
                    substr2 = str2;
                }
                html += ` <br>
                <div class="cn" id="${index}">
                    <div class="delete">
                        <button class="btn-delete" id="${index}" onclick=deleted(${index})><l><span class="glyphicon glyphicon-remove remove "></span></l></button>
                    </div>
                    <div class="box" onclick=inside(${index})>
                        <h1 id="nheadHu">${substr2.toLowerCase()}</h1>
                        <p class="content">
                        ${substr} 
                        </p>
                        <p class="date">
                        ${notesObj[index+2]} 
                        </p>
                        <l><span class="glyphicon glyphicon-star imp none" id=B${index}></span></l>
                    </div>
                </div>`
            }
        })
    }

    let notesElem = document.querySelector('.con2');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = "<br><br><h2> Please Add notes to display. </h2>";
    }
    star();
    view();
    moode();
}



// sorting by importance

let importance = document.getElementById("li1");
importance.addEventListener("click", function(e) {
    if (notesObj[5] == 0) {
        notesObj.forEach(function(element, index) {
            if (index % 8 == 0) {
                notesObj[index + 5] = 1;
                notesObj[index + 6] = 0;
                notesObj[index + 7] = 0;
            }
        })
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // console.log(notesObj[5]);
    showNotes();
})


//sorting by old first 

let oldFirst = document.getElementById("li3");
oldFirst.addEventListener("click", function(e) {
    if (notesObj[6] == 0) {
        notesObj.forEach(function(element, index) {
            if (index % 8 == 0) {
                notesObj[index + 5] = 0;
                notesObj[index + 6] = 1;
                notesObj[index + 7] = 0;
            }
        })
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // console.log(notesObj[6]);
    showNotes();
})


//sorting by new first

let newFirst = document.getElementById("li2");
newFirst.addEventListener("click", function(e) {
    if (notesObj[7] == 0) {
        notesObj.forEach(function(element, index) {
            if (index % 8 == 0) {
                notesObj[index + 5] = 0;
                notesObj[index + 6] = 0;
                notesObj[index + 7] = 1;
            }
        })
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // console.log(notesObj[7]);
    showNotes();
})

//on click view of note

let box = document.querySelectorAll(".box");
let updateNote = document.querySelector(".update-note");

let index;
let imp = document.querySelector(".rc2");
let nimp = document.querySelector(".rc1");

function inside(index) {
    let cn = document.querySelectorAll(".cn")
    Array.from(cn).forEach(function(element) {
        element.classList.add("none");
    })
    con2.classList.add("none");
    row4.classList.remove("none");
    row5.classList.remove("none");
    row1.classList.add("none");
    row2.classList.add("none");
    row3.classList.add("none");
    addNote.classList.add("none");
    updateNote.classList.remove("none");
    right.classList.remove("none");
    if (notesObj[index + 3] == 1) {
        nimp.classList.add("none");
        imp.classList.remove("none");
    } else {
        nimp.classList.remove("none");
        imp.classList.add("none");
    }
    ta1.classList.remove("none");
    ta2.classList.remove("none");
    ta1.value = notesObj[index];
    ta2.value = notesObj[index + 1];

    ind = new constru(index);
}

function constru(index) {
    this.index = index;
    // console.log(this.index + " is given");
}

updateNote.addEventListener("click", function(e) {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    let date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + formatAMPM(new Date);
    let index = ind.index;
    if (ta1.value == "" || ta2.value == "" || ta1.value == " " || ta2.value == " ") {
        alert("Note Cannot be Empty!")
    } else {
        notesObj[index] = ta1.value;
        notesObj[index + 1] = ta2.value;
        notesObj[index + 2] = date;
        localStorage.setItem('notes', JSON.stringify(notesObj));
    }
    let cn = document.querySelectorAll(".cn");
    Array.from(cn).forEach(function(element) {
        element.classList.remove("none");
    })
    con2.classList.remove("none");
    row4.classList.add("none");
    row5.classList.add("none");
    row1.classList.remove("none");
    row2.classList.remove("none");
    row3.classList.remove("none");
    ta1.placeholder = "";
    ta2.placeholder = "";
    showNotes();

})


//marking a note as important


nimp.addEventListener("click", function(e) {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    let date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + formatAMPM(new Date);
    let index = ind.index;
    notesObj[index + 3] = 1;
    notesObj[index + 2] = date;
    localStorage.setItem('notes', JSON.stringify(notesObj));
    imp.classList.remove("none");
    nimp.classList.add("none");
    alert("Note has been marked as important")
    moode();
    showNotes();
    star();
});
imp.addEventListener("click", function(e) {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    let date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + formatAMPM(new Date);
    let index = ind.index;
    notesObj[index + 3] = 0;
    notesObj[index + 2] = date;
    localStorage.setItem('notes', JSON.stringify(notesObj));
    nimp.classList.remove("none");
    imp.classList.add("none");
    alert("Note has been Removed From Importance.")
    moode();
    showNotes();
    star();
})


// putting star on the notes

function star() {
    notesObj.forEach(function(element, index) {
        if (index % 8 == 0 && notesObj[index + 3] == 1) {
            let star = document.getElementById("B" + index).classList.remove("none");
        } else if (index % 8 == 0 && notesObj[index + 3] == 0) {
            let star = document.getElementById("B" + index).classList.add("none");
        }
    });
}

//changing the view of the note

function view() {
    let cn = document.querySelectorAll(".cn");
    let content = document.querySelectorAll(".content");
    let im = document.querySelectorAll(".imp")
    if (notesObj[4] == 1) {
        listView.classList.add("none");
        gridView.classList.remove("none");
        Array.from(cn).forEach(function(element) {
            element.classList.add('line');
        });
        Array.from(content).forEach(function(element) {
            element.classList.add('none');
        });
        Array.from(im).forEach(function(element) {
            element.classList.add('new');
        });
    } else if (notesObj[4] == 0) {
        listView.classList.remove("none");
        gridView.classList.add("none");
        Array.from(cn).forEach(function(element) {
            element.classList.remove('line');
        });
        Array.from(content).forEach(function(element) {
            element.classList.remove('none');
        });
        Array.from(im).forEach(function(element) {
            element.classList.remove('new');
        });
    }
}


gridView.addEventListener("click", function(e) {
    notesObj.forEach(function(element, index) {
        if (index % 8 == 0) {
            notesObj[index + 4] = 0;
        }
    })
    localStorage.setItem('notes', JSON.stringify(notesObj));
    view();
});
listView.addEventListener("click", function(e) {
    notesObj.forEach(function(element, index) {
        if (index % 8 == 0) {
            notesObj[index + 4] = 1;
        }
    })
    localStorage.setItem('notes', JSON.stringify(notesObj));
    view();
});


//searching a note

search.addEventListener("click", function(e) {
    let cn = document.querySelectorAll(".cn")
    Array.from(cn).forEach(function(element) {
        element.classList.add("none");
    });
    right.classList.add("none");
    sback.classList.remove("none");
    cback.classList.add("none");
    row4.classList.remove("none");
    row5.classList.remove("none");
    row1.classList.add("none");
    row2.classList.add("none");
    row3.classList.add("none");
    ta2.classList.add("none");
    ta1.value = "";
    ta2.value = "";
    ta1.placeholder = "Search Your Note...";
    ta1.addEventListener("input", function() {
        if (ta1.value == "") {
            let cn = document.querySelectorAll(".cn")
            Array.from(cn).forEach(function(element) {
                element.classList.add("none");
            });
        }
        notesObj.forEach(function(element, index) {
            if (index % 8 == 0) {
                if (notesObj[index].toLowerCase().includes(ta1.value.toLowerCase()) || notesObj[index + 1].toLowerCase().includes(ta1.value.toLowerCase())) {
                    document.getElementById(index).classList.remove("none");
                } else {
                    document.getElementById(index).classList.add("none");
                }
            }
        });
        if (ta1.value == "") {
            let cn = document.querySelectorAll(".cn")
            Array.from(cn).forEach(function(element) {
                element.classList.add("none");
            });
        }
    });
});