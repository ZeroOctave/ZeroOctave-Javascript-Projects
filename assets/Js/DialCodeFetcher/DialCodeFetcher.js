function generate(){
  var countrylist = JSON.parse(JSON.stringify(list));
  const text = document.getElementById("text").value
  for(let index = 0; index < countrylist.length; index++){
    if (countrylist[index].name == text || countrylist[index].dial_code == text){
        const cn = countrylist[index].name;
        const dc = countrylist[index].dial_code;
        const cc = countrylist[index].code;
        const f = countrylist[index].flag;
        document.getElementById("country").innerHTML = " "+cn+" ";
        document.getElementById("dial").innerHTML = " "+dc+" ";
        document.getElementById("code").innerHTML = " "+cc+" ";
        document.getElementById("flag").innerHTML = " "+f+" ";
    }
  }
}

function clearScreen(){
  country.innerHTML = "";
  dial.innerHTML = "";
  code.innerHTML = "";
  flag.innerHTML = "";
  document.getElementById("text").value = "";
}
