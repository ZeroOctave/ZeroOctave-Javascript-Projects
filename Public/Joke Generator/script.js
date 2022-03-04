const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const api = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";


let getJoke = () =>{
    jokeContainer.classList.remove("fade");
    fetch(api)
    .then(data => data.json())
    .then(item => {
        jokeContainer.textContent = `${item.joke}`;
        jokeContainer.classList.add("fade");
    });
}

btn.addEventListener("click", getJoke);

getJoke();