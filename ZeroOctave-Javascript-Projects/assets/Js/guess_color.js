// Hold the answer
var ans;
// Hold the color of answer block
var selectedBlock;
// Hold the total number of block based on level
var numberOfBlocks;
// Variable, to hold the level selector
var levelSelector = document.getElementById("levelSelector");

// Generate a random dark color
const randomColor = () => {
  return `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(
    Math.random() * 100
  )}, ${Math.floor(Math.random() * 100)}, 0.8)`;
};

// Return a colored html element, that remove on click
const colorBlock = () => {
  const div = document.createElement("div");
  div.style.backgroundColor = randomColor();
  div.className = "blocks";
  div.addEventListener("click", () => {
    if (div === selectedBlock) {
      const playAgain = window.confirm(
        "Winner Winner, Chicken dinner. Do you want to play again"
      );
      if (playAgain) {
        addingAllColor(6);
      } else {
        window.close();
      }
    }
    div.remove();
  });
  return div;
};

// Initilize the game
const addingAllColor = (level) => {
  // Selecting the contained to put the coloured blocks
  const container = document.getElementById("container");
  //   Clearing the container
  container.innerHTML = "";

  //   Selecting the number of blocks, based on the level
  if (level === "beginner") {
    numberOfBlocks = 2;
    container.style.width = "30rem";
  }
  if (level === "easy") {
    numberOfBlocks = 4;
    container.style.width = "35rem";
  }
  if (level === "medium") {
    numberOfBlocks = 6;
    container.style.width = "50rem";
  }
  if (level === "hard") {
    numberOfBlocks = 8;
    container.style.width = "65rem";
  }

//   Selecting a random block as answer
  ans = Math.floor(Math.random() * numberOfBlocks);
//   Inserting the colored block in the container
  for (var i = 0; i < numberOfBlocks; i++) {
    const newColor = colorBlock();
    if (i === ans) {
      selectedBlock = newColor;
      document.getElementById("color").innerText =
        newColor.style.backgroundColor.toUpperCase();
    }
    container.appendChild(newColor);
  }
};

// Initilize the functions
addingAllColor("hard");
// Level selector in action
levelSelector.addEventListener("change", (event) => addingAllColor(event.target.value))