function movies(id){
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=5e3b69531098b57d6885d69ae9f5a142&with_genres=" + id)
    .then(data => data.json())
    .then(movieData => {  
        for(let i=0; i<=9;i++)
        if(movieData.results[i].original_language == "en"){
        {const movieText = movieData.results[i].original_title;
     //   console.log(bookText);
     // let output[i]=document.querySelector(".output"+i);
     document.querySelector(".output"+i).textContent =`- ${movieText}  ` ;}}
    })
  }
    
 
  document.getElementById("clickme").addEventListener("click",()=>{
    const type= document.getElementById("type");
    console.log(type.value);
  movies(type.value);});

  document.getElementById("reset").addEventListener("click",()=>{
    for(let i=0; i<=9;i++){
  document.querySelector(".output"+i).textContent= " "; }
    });

