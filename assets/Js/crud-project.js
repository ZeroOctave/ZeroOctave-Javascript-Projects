var selectedRow = null;
function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }else{
        updateRecord(formData)
    }
    resetForm();
    }

function readFormData(){
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}


function insertNewRecord(data){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.fullName;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.empCode;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.salary;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.city;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<a href="#" onClick='onEdit(this)'>Edit</a>
                        <a href="#" onClick='onDelete(this)'>Delete</a>`;
    document.querySelectorAll("th")[4].classList.remove("d-none");
}


function resetForm(){
    document.getElementById('fullName').value = '';
    document.getElementById('empCode').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('city').value = '';
    selectedRow = null;
}


function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('fullName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('empCode').value = selectedRow.cells[1].innerHTML;
    document.getElementById('salary').value = selectedRow.cells[2].innerHTML;
    document.getElementById('city').value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}
function onDelete(td){
    if(confirm('Are you sure you want to delete this record?')){
        row = td.parentElement.parentElement;
        document.getElementById('employeeList').deleteRow(row.rowIndex);
        resetForm();
    }    
}

var body = document.querySelector("body");
var row = document.querySelector(".row");
var inputs = document.querySelectorAll("input.col-6");

var svg = document.querySelector("svg");

var whiteColor = "rgb(255, 255, 255)";
var blackColor = "rgb(30, 32, 42)";


svg.addEventListener("click" , function() {
	if(svg.style.fill === whiteColor) {
		removeDarkMode();
		svg.style.fill = blackColor;
		svg.innerHTML = '<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>'
	} else {
		applyDarkMode();
		svg.style.fill = whiteColor;
		svg.innerHTML = '<path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>'
	}
})

function applyDarkMode() {
    body.classList.add("dark-theme");
    row.classList.add("row-dark");
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].classList.add("btn-dark");
    }
}

function removeDarkMode() {
    body.classList.remove("dark-theme");
    row.classList.remove("row-dark");
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("btn-dark");
    }
}