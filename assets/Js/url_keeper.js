const inputEl = document.querySelector('#input-el')
const inpBtnEl = document.querySelector('#inpbtn-el')
const tabBtnEl = document.querySelector('#tabbtn-el')
const clBtnEl = document.querySelector('#clbtn-el')
let ulEl = document.querySelector('#ul-el')
const urlsFromLocalStorage = JSON.parse(localStorage.getItem('urls'))
let urls = []

if(urlsFromLocalStorage){
    urls = urlsFromLocalStorage
    renderUrls(urls)
}

inpBtnEl.addEventListener('click', function(){
    if(inputEl.value){
        urls.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem('urls', JSON.stringify(urls))
        renderUrls(urls)
    }
    else{
        alert('Please enter url.')
    }
})

tabBtnEl.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        urls.push(tabs[0].url)
        localStorage.setItem("urls", JSON.stringify(urls))
        renderUrls(urls)
    })
})

clBtnEl.addEventListener('click', function(){
    localStorage.clear()
    urls = []
    renderUrls(urls)
})

function renderUrls(urls){
    let listItems = ""
    for(let i = 0; i < urls.length; i++){
        listItems += `
        <li>
            <a href=${urls[i]}>${urls[i]}</a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}