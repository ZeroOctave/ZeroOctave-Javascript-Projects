document.getElementById("reserve").addEventListener("click",function()
{
const book=document.getElementById("book");

if(book.style.display=="none"){
    book.style.display="grid"
}
else{
    book.style.display="none"
}
})
