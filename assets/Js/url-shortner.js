var outputlink = document.getElementsByClassName("copyurlbox");



document.querySelector("#pastebox").addEventListener("click",search);



async function search(){
var myHeaders = new Headers();
myHeaders.append("apikey", process.env.API_KEY);

var inputElement = document.querySelector(".pasteurlbox").value;


var raw = inputElement;

var requestOptions = {
  method: 'POST',
  redirect: 'follow',
  headers: myHeaders,
  body: raw
};

fetch("https://api.apilayer.com/short_url/hash", requestOptions)
  .then(response => response.json())  
  .then(data => {
    var shortUrl = data.short_url; 
    var jumboElement = document.querySelector(".copyurlbox");
    jumboElement.innerText = shortUrl; 

  })
  .catch(error => console.log('error', error));
}


document.querySelector(".copybtn").addEventListener("click",copy);

function copy() {
    var textToCopy = document.querySelector(".copyurlbox").innerText;
    
    navigator.clipboard.writeText(textToCopy).then(function() {
        alert('Text copied to clipboard: ' + textToCopy);
    }).catch(function(err) {
        console.error('Unable to copy text: ', err);
    });
}



    