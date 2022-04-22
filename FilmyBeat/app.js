const taskContainer=document.querySelector(".taskcontainer");
let globalTaskData =[];

const generateHTML =(taskData)=>
  `<div id=${taskData.id} class="col-md-6 col-lg-3 mt-3" >
    <div class="card" style="margin-left:5px; border:none ">
       <div class="card-header " style="background-color: #0c0b09">
        <div class="d-flex justify-content-end gap-2">
         <button type="button" class="btn btn-outline-light" onclick="editTask(this)">
           <i class="fas fa-pencil-alt"></i>
         </button>
         <button type="button" class="btn btn-outline-light" name=${taskData.id} onclick="deleteTask(this)">
           <i class="far fa-trash-alt"  ></i>
         </button>
        </div> 
      </div>
      <div style="background-color: #0c0b09">
        <img src=${taskData.url} class="card-img-top img-css" alt="image" >
      </div>
      <div class="card-body" style="background-color: #0c0b09">
      <span class="badge bg-warning" style="color:black;margin-bottom:10px">${taskData.type}</span>
        <h5 class="card-title" style="color:white">${taskData.title}</h5>
        <p class="card-text" style="color:white">${taskData.description}</p>
       
        
      </div>
      <div class="card-footer"style="background-color: #0c0b09">
      
        <button class="btn btn-outline-warning " name=${taskData.id}>
          Watch Now
        </button>
      </div>
    </div>
   </div>`;
    
const injectDOM=(content)=>
taskContainer.insertAdjacentHTML("beforeend",content);

const saveToLocalStorage = ()=>
localStorage.setItem("taskyCA", JSON.stringify({ card: globalTaskData }));
 
const addNewCard=()=>{
    const taskData ={
        id:`${Date.now()}`,
        url:document.getElementById("imgurl").value,
        title:document.getElementById("tasktitle").value,
        type:document.getElementById("tasktype").value,
        description:document.getElementById("taskdescription").value,
    };
       //pushing data to globalTaskData array
      globalTaskData.push(taskData);
       //updating the local storage
     saveToLocalStorage();

    //generate  html code 
    const newCard=generateHTML(taskData);
    //Inject it to dom
     injectDOM(newCard);
    //clear form
    document.getElementById("imgurl").value="";
    document.getElementById("tasktitle").value="";
    document.getElementById("tasktype").value="";
    document.getElementById("taskdescription").value="";

    return;
};

const loadExistingCards =()=>{

    //check local storage
    const getData=localStorage.getItem("taskyCA")

    //if data in  local storage exist Parse that data
    if(!getData) return;
    const taskCards = JSON.parse(getData);
    globalTaskData=taskCards.card;


    //generate html code for that data
    globalTaskData.map((taskData)=>{
        const newCard=generateHTML(taskData);

       //inject that data to Dom
        injectDOM(newCard);
    });
    return;
    
};

const deleteTask = (e) => {
  const targetID = e.getAttribute("name");
  globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
  saveToLocalStorage();
  window.location.reload();
}

const editTask = (e) => {
  const targetID = e.getAttribute("name");
  
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")

  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", " saveEditTask(this)")
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
}

const saveEditTask=(e)=>{
  const targetID=e.getAttribute("name");
  const updatedData = {
    title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
    type: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
    description:e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
  };

  
  const updateGlobalTasks = globalTaskData.map((task) => {
    if (task.id === targetID) {
    
      return { ...task, ...updatedData };
    }
    return task;
  });

  globalTaskData = updateGlobalTasks;

  saveToLocalStorage();
  e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "false");
  e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "false");
  e.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "false");
  e.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Watch Now"


}
