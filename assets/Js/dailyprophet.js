// 860b5291c252478ea8851edd724a9879

let myNews=document.getElementById('myNews');
let source='bbc-news';
let myKey='860b5291c252478ea8851edd724a9879';
const xhr=new XMLHttpRequest();
xhr.open('GET',`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${myKey}`,true);

xhr.onload=function(){
    if(this.status===200){
        let json=JSON.parse(this.responseText);
        let article=json.articles;
        let html="";
        article.forEach(function(element,index){
            let news=` 
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                <b>Breaking News ${index+1} : </b>   <a>${element["title"]}</a>
                </button>
              </h2>
              <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  ${element["content"]}. <a href="${element['url']}" target="_blank">  Read more here >>></a><br>
                  <br>
                  <b>View image :  </b><a href="${element["urlToImage"]}" target="_blank">  Click here</a>
                  <br>
                  <b>Published at :  </b>  ${element["publishedAt"]}
                  <br>
                  <b>Author :  </b>  ${element["author"]}

                </div>
                
              </div>
          </div>`;
          html=html+news;
        });
        myNews.innerHTML=html;
    }
    else{
        console.log("Some error occurred");
    }
}
xhr.send();

let search=document.getElementById('searchTxt');
search.addEventListener('input',runSearch);
function runSearch(){
    let myVal=search.value.toLowerCase();
    let myCards=document.getElementsByClassName('accordion-item');
    Array.from(myCards).forEach(function(element){
        let topHead=element.getElementsByTagName('a')[0].innerHTML;
        if(topHead.toLowerCase().includes(myVal)){
            element.style.display='block';
        }
        else{
            element.style.display='none'
        }
    })
}





