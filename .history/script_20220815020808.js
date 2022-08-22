jQuery(document).ready(function() {
    jQuery('.toggle').click(function() {
        jQuery('body').toggleClass('day');
        jQuery('body').toggleClass('night');
    });
});

const nav = document.querySelector(".nav");

let projects = [];
const experi = document.getElementById('cardd');
const searchBar = document.getElementById("searchbar");

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value;
  const filteredProjects = projects.filter( projects => {
      
      return projects.name.toLowerCase().includes(searchString.toLowerCase());
  });

  console.log(filteredProjects)
  displayProjects(filteredProjects);
});

const getProject = fetch('cards.json')
                .then(response => response.json())
                .then(data => {
                    projects = data;
                    displayProjects(projects)
                    console.log(projects)

});

const displayProjects = (projects) => {
  const htmlString = projects
.map((project) => {
  return`<div class="stylebox">
  <p class="card-heading">${project.name}</p>
       <div class="image" >
           <img src="${project.image}" alt="">
        </div>
        <div class="card-data">
            <a href=${project.link} target="_blank"><button class="btnn">View</button></a>
        </div>
 
    </div>`;
    
})

experi.innerHTML = htmlString;

}

getProject();
