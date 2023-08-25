jQuery(document).ready(function () {
  jQuery(".toggle").click(function () {
    jQuery("body").toggleClass("day");
    jQuery("body").toggleClass("night");
  });
});

const nav = document.querySelector(".nav");

let projects = [];
const experi = document.getElementById("cardd");
const searchBar = document.getElementById("searchbar");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filteredProjects = projects.filter((projects) => {
    return projects.name.toLowerCase().includes(searchString.toLowerCase());
  });

  // console.log(filteredProjects);
  displayProjects(filteredProjects);
});

const getProject = fetch("./cards.json")
  .then((response) => response.json())
  .then((data) => {
    projects = data;
    displayProjects(projects);
    // REMOVING CONSOLE.LOG DECLARATIONS
    // console.log(projects);
  });

const displayProjects = (projects) => {
  const htmlString = projects.map((project, key) => {
    return `
        <div key="${key}" class="project_box">
          <div class="project_box_image">
            <img src="${project.image}" alt="js-project" />
          </div>
          <p class="project_box_name">${project.name}</p>
          <a href="${project.link}" target="_blank">
            <div class="project_box_link">
                  <i class="fa-solid fa-up-right-from-square"></i> <p>Live</p>
            </div>
          </a>
        </div>
    `;
  });

  experi.innerHTML = htmlString;
};

getProject();
