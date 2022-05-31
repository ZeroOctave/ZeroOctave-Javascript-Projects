const btns = document.querySelectorAll(".faq-collapse")
const faq = document.querySelectorAll(".faq")
btns.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        btn.parentNode.classList.toggle("active");
    })
})
