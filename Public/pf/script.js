const pr=document.getElementById("pr")
const pc=document.getElementById("pc")
const cr=document.getElementById("cr")
const cc=document.getElementById("cc")
const br=document.getElementById("br")
const bc=document.getElementById("bc")
const box=document.getElementById("pic")
const pic=document.getElementById("picture")
const ccolor=document.getElementById("image")
pr.addEventListener('change',function(){
    box.style.padding=pr.value+"px"
})
cr.addEventListener('change',function(){
    pic.style.width=cr.value+"vw"
    pic.style.height=cr.value+"vw"
})
br.addEventListener('change',function(){
    box.style.borderWidth=br.value+"px"
})
pc.addEventListener('change',function(){
    box.style.backgroundColor=pc.value
})
bc.addEventListener('change',function(){
    box.style.borderColor=bc.value
})
cc.addEventListener('change',function(){
    ccolor.style.backgroundColor=cc.value
})
