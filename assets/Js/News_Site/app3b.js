//India Data
let Itotal = document.getElementById("Itotal");
let Ideaths = document.getElementById("Ideaths");
let Irecovered = document.getElementById("Irecovered");
//World Data
let Wtotal = document.getElementById("Wtotal");
let Wdeaths = document.getElementById("Wdeaths");
let Wrecovered = document.getElementById("Wrecovered");

function IndiacoronaData(Obj) {
      Itotal.innerHTML = Obj.TotalCases;
      Ideaths.innerHTML = Obj.TotalDeaths;
      Irecovered.innerHTML = Obj.TotalRecovered;      
}

function WorldcoronaData(Obj) {
        Wtotal.innerHTML = Obj.TotalCases;
        Wdeaths.innerHTML = Obj.TotalDeaths;
        Wrecovered.innerHTML = Obj.TotalRecovered;  
}

fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
		"x-rapidapi-key": "f376382cf5msh50b2db38919edf6p1b1f22jsnd1afad0e3f31"
	}
})
.then(response => {
	return response.json();
})
.then(data =>{
  IndiacoronaData(data[3]);
  WorldcoronaData(data[1]);
})

// Corona News ---->
let url =
  "https://bing-news-search1.p.rapidapi.com/news/search?count=4&q=Corona&freshness=Day&textFormat=Raw&safeSearch=Off";
let params = {
  method: "GET",
  headers: {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host" : "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": "f376382cf5msh50b2db38919edf6p1b1f22jsnd1afad0e3f31"
  },
};
fetch(url, params)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    let str = "";
    response.value.forEach((element) => {
      str += `
            <div class="card text-center" style="margin: 12px 0">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
                <a href=${element.url} class="btn  btn-outline-dark">Show Full News</a>
            </div>
            </div>
            `;
    });
    let coronaNews = document.getElementById("coronaNews");
    coronaNews.innerHTML = str;
  });
