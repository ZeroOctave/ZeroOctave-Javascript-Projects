let parametersBox=document.getElementById('parametersBox');
parametersBox.style.display='none';
let count=0;

function getElementFromString(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}

let jsonRadio=document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display='block';
    document.getElementById('parametersBox').style.display='none';
})

let paramRadio=document.getElementById('paramsRadio');
paramRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display='none';
    document.getElementById('parametersBox').style.display='block';
})

let addBtn=document.getElementById('addParam');
addBtn.addEventListener('click',()=>{
    let params=document.getElementById('paramsContainer');
    let html=`<div class="row g-3 my-2">
        <label for="parameterKey${count+2}" class="col-sm-2 col-form-label">Parameter ${count+2}</label>
        <div class="col-md-4">
            <input type="text" class="form-control" id="parameterKey${count+2}" placeholder="Enter Parameter ${count+2} Key">
        </div>
        <div class="col-md-4">
            <input type="text" class="form-control" id="parameterValue${count+2}" placeholder="Enter Parameter ${count+2} Value">
        </div>
        <button  class="btn btn-sm btn-danger col-md-1 deleteBtn" style="font-size: 18px;">-</button>
</div>`;
let paramElement=getElementFromString(html);
params.appendChild(paramElement);
let deleteParam=document.getElementsByClassName('deleteBtn');
for(item of deleteParam){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove();
    })
}
count++;
});  

let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    let responseJsonText=document.getElementById('responsePrism');
    responseJsonText.innerHTML='Please wait... Fetching response...';
    let url=document.getElementById('url').value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let contentType=document.querySelector("input[name='contentType']:checked").value;
    if(contentType=='params'){
         data={};
        for(let i=0;i<count+1;i++){
            if(document.getElementById('parameterKey'+(i+1))!=undefined){
            let key=document.getElementById('parameterKey'+(i+1)).value;
            let value=document.getElementById('parameterValue'+(i+1)).value;
            data[key]=value;
            }
        } 
        data=JSON.stringify(data) ; 
    }
    
    else{
        data=document.getElementById('requestJsonText').value;
    }

    if(requestType=='GET'){
        fetch(url,{
            method:'GET',
        }).then(response=>response.text()).then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        })
    
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{ "Content-type": "application/json; charset=UTF-8"}

        }).then(response=>response.text()).then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        })
    
    }
})

