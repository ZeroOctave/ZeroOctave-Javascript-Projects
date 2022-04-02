const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open("GET", "https://bing-news-search1.p.rapidapi.com/news?&mkt=en-IN&safeSearch=Off&textFormat=Raw");
    xhr.setRequestHeader("x-bingapis-sdk", "true");
    xhr.setRequestHeader("x-rapidapi-host", "bing-news-search1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "f376382cf5msh50b2db38919edf6p1b1f22jsnd1afad0e3f31");
    
    xhr.send(data);
    
    xhr.onload = onloadFunc;


function onloadFunc() {
    console.log("onload is running");
    if (this.status !== 200) {
      console.log("some Error occured");
    }
    let newsFeedHTML = "";
    let jsonResponse = JSON.parse(this.responseText);
    let newsImg; 
    
    jsonResponse.value.forEach((element) => {
        if('image' in element){
            newsImg = element.image.thumbnail.contentUrl;
        }
        else newsImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg&usqp=CAU";
      newsFeedHTML += `
                      <div class="card my-3" style="width: 70%;">
                      <div class="card-body">
                      <div class = "card-body-top d-flex justify-content-between flex-row">
                      <div class="card-body-top-content">
                      <h5 class="card-title" id="card-title">${element.name}</h5>
                      <h6 class="card-subtitle text-muted "> Source: ${element.provider[0].name} </h6>
                      <p class = "text-muted">Published at : ${element.datePublished}</p>
                      </div>
                      <img src=${newsImg} alt="Error" class="feedImg">
                      </div>
                          <p class="card-text">${element.description}</p>
                          <button class="btn btn-outline-dark card-btns"><a href=${element.url} target="_blank" class="card-link">Show Full News</a></button>
                          <button class="btn btn-outline-dark card-btns"><a href=${element.author} target="_blank" class="card-link">Source</a></button>
                        </div>
                      </div>
                    `;
    });
  
    let newsSection = document.getElementById("newsfeed");
    newsSection.innerHTML = newsFeedHTML;
    updateSortList(jsonResponse.value);
};


  //-------Topic Wise Search Function -------->
  let topicInputGroup = document.getElementById("topicInputGroup");
  topicInputGroup.addEventListener("change", () => {

    let topicInputGroupVal = topicInputGroup.value;
    if(topicInputGroupVal != "null"){
        xhr.open("GET", `https://bing-news-search1.p.rapidapi.com/news?count=20&category=${topicInputGroupVal}&mkt=en-IN&safeSearch=Off&textFormat=Raw`);
    }
    else xhr.open("GET", "https://bing-news-search1.p.rapidapi.com/news?&mkt=en-IN&safeSearch=Off&textFormat=Raw");
    
    xhr.setRequestHeader("x-bingapis-sdk", "true");
    xhr.setRequestHeader("x-rapidapi-host", "bing-news-search1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "f376382cf5msh50b2db38919edf6p1b1f22jsnd1afad0e3f31");
    xhr.send(null);
    xhr.onload = onloadFunc;

  });


  function updateSortList(arr){
      // arr = jsonResponce.value;
      let channelnames = [];
        arr.forEach((e)=>{
            channelnames.push(e.provider[0].name);
        })
        sorted(channelnames);

      let selectBox = document.getElementById("inputGroupSelect02");
      let str = `<option class="options" value="null" selected>Sort By News Channels...</option>`;
      channelnames.forEach((e)=>{
          str += `<option class="options" value=${e}>${e}</option>` 
      })
      selectBox.innerHTML = str;

  }


  //------- Sort Function --------->
  let selectBox = document.getElementById("inputGroupSelect02");
  selectBox.addEventListener("change" , ()=>{
    let card =  document.getElementsByClassName("card");
    if(selectBox.value !== "null" ){
        Array.from(card).forEach((element) =>{
         element.style.display = "none";
        });
    }
    let jsonResponse = JSON.parse(xhr.responseText);
    jsonResponse.value.forEach((e,index)=>{
        if (e.provider[0].name.includes(selectBox.value)) {
            card[index].style.display = "flex";
        }
    })
})




//-------- Reset Button --------->
document.getElementById("resetBtn").addEventListener("click" , ()=>{
    window.location.reload();
})

//-------Search News-------->
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click" , ()=>{
    let searchbarVal = document.getElementById("searchBar").value;
    console.log(searchbarVal);
    if(searchbarVal !== 0){
        xhr.open("GET", `https://bing-news-search1.p.rapidapi.com/news/search?q=${searchbarVal}&freshness=Day&textFormat=Raw&safeSearch=Off`);    
        xhr.setRequestHeader("x-bingapis-sdk", "true");
        xhr.setRequestHeader("x-rapidapi-host", "bing-news-search1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "f376382cf5msh50b2db38919edf6p1b1f22jsnd1afad0e3f31");
        xhr.send(null);
        xhr.onload = onloadFunc;
        console.log("call");
    }
})


function sorted(arr){
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[j] === arr[i] ) {
                arr.splice(j,1);
            }
        }
    }
    return arr;
}
