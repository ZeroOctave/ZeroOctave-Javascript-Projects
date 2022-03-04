const btn = document.getElementById("btn");
const anime_name = document.querySelector(".hero-name");
const anime_img = document.querySelector(".anime");
const anime_box = document.querySelector(".anime-box");

const api_url = `https://api.catboys.com/img`;

btn.addEventListener("click", async function () {
  const response = await fetch(api_url);
  const data = await response.json();
  anime_img.src = data.url;
  anime_name.textContent = data.artist;
  anime_box.style.display = "block";
});
