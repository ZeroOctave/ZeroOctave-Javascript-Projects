const nav = document.querySelector(".nav");

let projects = [];
const experi = document.getElementById("cardd");
const searchBar = document.getElementById("searchbar");

searchBar.addEventListener("keyup", (e) => {
	const searchString = e.target.value;
	const filteredProjects = projects.filter((projects) => {
		return projects.name.toLowerCase().includes(searchString.toLowerCase());
	});

	console.log(filteredProjects);
	displayProjects(filteredProjects);
});

const getProject = fetch("cards.json")
	.then((response) => response.json())
	.then((data) => {
		projects = data;
		displayProjects(projects);
		console.log(projects);
	});

const handleChange = (id) => {
	const modal = document.getElementById("exampleModal");

	modal.innerHTML = `
				<div class="modal-dialog modal-div modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="modal-title">Text to Be Filled</h5>
						<button
							type="button"
							class="close modal-btn"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="row">
								<div class="modal-img modal-column col-12 col-md-6">
									<div class="bg-img-div">
										<img class="" src="./assets/Images/2048.png" alt="" />
									</div>
									<div>
										<img src="./assets/Images/2048.png" alt="" />
									</div>
								</div>
								<div class="modal-column col-12 col-md-6" id="md-text"></div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-dismiss="modal"
						>
							View Project
						</button>
					</div>
				</div>
			</div>
	`;

	console.log("clicked", id);
	const project = projects[id];
	const heading = document.getElementById("modal-title");
	heading.innerText = project.name;
};
const displayProjects = (projects) => {
	const htmlString = projects.map((project, id) => {
		return `<div class="stylebox">
	  <p class="card-heading">${project.name}</p>
       <div class="image" >
           <img src="${project.image}" alt="">
        </div>
        <div class="card-data">
           <button id="btnn"
		    onclick={handleChange(${id})}
			class="btnn"
			data-toggle="modal"
			data-target="#exampleModal"
			 >
			 Check Out!
			 </button>
        </div>
 
    </div>`;
	});

	experi.innerHTML = htmlString;
};

// var converter = new showdown.Converter();
const fetchMarkdown = async (url) => {
	const fetchData = fetch(url)
		.then((response) => response.text())
		.then((data) => {
			return data;
		});
	return fetchData;
};

fetchMarkdown("assets/docs/starter-guide.md");
getProject();
