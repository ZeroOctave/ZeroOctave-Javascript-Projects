const openBtn = document.querySelector('.openbtn')
const closeBtn = document.querySelector('.closebtn')
const nav = document.querySelectorAll('.nav')

openBtn.addEventListener('click',() =>{
    nav.forEach(navE =>navE.classList.add('visible'))
})

closeBtn.addEventListener('click',() =>{
    nav.forEach(navE =>navE.classList.remove('visible'))
})