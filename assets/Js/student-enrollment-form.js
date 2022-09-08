let dataArray = []; 

const addData=(e)=>{
    let name=document.getElementById("name").value ;
    let email=document.getElementById("email").value;
    let website=document.getElementById("website").value;
    let imageLink=document.getElementById("imageLink").value; 
    var l1 = document.getElementById("male");  
    var l2 = document.getElementById("female"); 
    var skill="";
    var markedCheckbox = document.getElementsByName('pl');  
    for (var checkbox of markedCheckbox) {  
      if (checkbox.checked)  
       skill=skill + checkbox.value + ', ';  
    }   
  if( name == "" || email == "" || website == "" || imageLink == "" || (l1.checked == false && l2.checked == false) || skill == "" )
  {   
    alert("Required Field cannot be left blank");
    return false;
  }
  else
  { 
    var gender=" ";   
    if (l1.checked == true){  
      var pl1 = l1.value;  
      gender = pl1 ;   
    }   
    else if(l2.checked == true){  
      var pl2 = l2.value;  
      gender = pl2 ;   
    }  

    let localadddata=localStorage.getItem("dataArray");

    if(localadddata != null){
        dataArray = JSON.parse(localadddata);
    }

    let addDataObject = {
        name: name,
        email: email,
        website: website,
        imageLink: imageLink,
        skill: skill,
        gender:gender,
    };
    dataArray.push(addDataObject);
    localStorage.setItem("data", JSON.stringify(dataArray));
    showData();
    return true;
  }

};


const Validation = (e) => {
  var element=document.getElementById(e).value;  
  if( element == "")
  {   
    document.getElementById(e).className="ErrorControl";
    alert("Requried Field cannot be left blank");
    return false;
  }else{
    document.getElementById(e).className="borderColor";
   return true;
  }
};



const showData = () => {
        let todoString = localStorage.getItem("data");
        let content = "";

        if (todoString == null) {
          content += `
          <tr>
          <td><span>No data found</span></td>
          <td class="ImageBoxSize"><span>No Image found</span></td>  
          </tr>
            
            `;
        } else {
          let todos = JSON.parse(todoString);
          for (let todo of todos) {
            content += 
            `
            <tr>
            <td>${todo.name}</br>${todo.gender}</br>${todo.email}</br>${todo.website}</br>${todo.skill}</td>
            <td class="ImageBoxSize"><img class="ImageSize" src="${todo.imageLink}"></td>  
            </tr>
              
              `;
          }
        }

        document.getElementById("main-content").innerHTML = content;
      };


const clearData = () => {
        localStorage.clear();
        location.reload();
        let content = " ";
        content += `
        <tr>
        <td><span>no data found</span></td>
        <td class="ImageBoxSize"><span>Image not found</span></td>  
        </tr>          
          `;
        document.getElementById("main-content").innerHTML = content;
};

  showData();
