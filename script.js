const nav = document.querySelector(".nav");

const fixNav = () => {
  if (window.scrollY > nav.offsetHeight + 150) nav.classList.add("active");
  else nav.classList.remove("active");
};

window.addEventListener("scroll", fixNav);



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
       <div class="image">
           <img src="${project.image}" alt="">
        </div>
        <div class="card-data">
            <p class="card-heading">${project.name}</p>
            <a href=${project.link} target="_blank"><button class="btnn">View</button></a>
        </div>
 
    </div>`;
    
})

experi.innerHTML = htmlString;

}

getProject();
