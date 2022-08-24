let userAgent = navigator.userAgent;

let Browser;
if(userAgent.match(/edg/i)){
    Browser = "Edge";
}else if(userAgent.match(/opr/i)){
    Browser = "Opera";
}else if(userAgent.match(/firefox/i)){
    Browser = "Firefox";
}else if(userAgent.match(/chrome/i)){
    Browser = "Chrome";
}else if(userAgent.match(/safari/i)){
    Browser = "Safari";
}else{
    alert("Other Browser");
}

const logo = document.querySelector(`.logo .${Browser}`);
if(logo != ""){
    logo.style.opacity = "1";
}