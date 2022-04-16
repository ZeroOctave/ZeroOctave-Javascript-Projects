const wrapper =document.querySelector(".wrapper");
generateQR = wrapper.querySelector(".data_form button");
inputQR = wrapper.querySelector(".data_form input");
imageQR = wrapper.querySelector(".code img");

generateQR.addEventListener("click", ()=>{
    let QRValue = inputQR.value;
    if(!QRValue){ 
        generateQR.title = `please enter text or url`;
        return;
    }
    generateQR.innerText = "Generating :)";
    imageQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${QRValue}`
    imageQR.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateQR.innerText = "Generate New QR";
    });
});

inputQR.addEventListener("keyup", () => {
    if(!inputQR.value){
        wrapper.classList.remove("active");
        generateQR.innerText = "Generate";
        generateQR.title = `please enter text or url`;
    }
})