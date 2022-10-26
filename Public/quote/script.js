var body= document.getElementsByTagName('body')[0];
body.style.backgroundColor= '#FF8787';


window.onscroll= ()=>{
     if (window.scrollY<300){
        body.style.backgroundColor= '#FF8787';
     } else if (window.scrollY>=500 && window.scrollY<=1000){
        body.style.backgroundColor= '#BCE29E';
     } else if (window.scrollY>=1000 && window.scrollY<=1500){
        body.style.backgroundColor= '#DFD3C3';
     } else if (window.scrollY>=1500 && window.scrollY<=2000){
        body.style.backgroundColor= '#7D6E83';
     } else if (window.scrollY>=2000  && window.scrollY<=2500){
        body.style.backgroundColor= '#815B5B';
     } else if (window.scrollY>=3000 && window.scrollY<=3500){
        body.style.backgroundColor= '#7D6E83';
     } else if (window.scrollY>=3500 && window.scrollY<=4000){
        body.style.backgroundColor= '#D0B8A8';
     }else {
        body.style.backgroundColor= '#E5EBB2';
     }
}