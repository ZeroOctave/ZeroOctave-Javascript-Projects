function seeCap(country){
  fetch("https://restcountries.com/v3.1/name/"+country)
  .then(data => data.json())
  .then(capitalData => {
      const capitalText = capitalData[0].capital;
      const capitals = document.querySelector(".capitals");
      
      capitals.textContent = capitalText;
  })
}

document.getElementById("clickme").addEventListener("click",()=>{
  const country=document.querySelector(".country").value;
  console.log(country);
seeCap(country);});


  