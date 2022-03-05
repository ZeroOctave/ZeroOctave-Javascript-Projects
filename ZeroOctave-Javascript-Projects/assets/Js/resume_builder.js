
function printpdf()
{
        var content=document.getElementById("print");
        var button2=document.getElementById("skilladd");
        var button3=document.getElementById("langadd");
        var button4=document.getElementById("achadd");
        var button5=document.getElementById("Intadd");
        var button6=document.getElementById("eduadd");
        var button7=document.getElementById("secadd");
        button2.classList.add("none");
        button3.classList.add("none");
        button4.classList.add("none");
        button5.classList.add("none");
        button6.classList.add("none");
        button7.classList.add("none");
        html2pdf(content,{
            html2canvas:{scale:1,logging:true,dpi:500}
        });
        button2.classList.remove("none");
        button3.classList.remove("none");
        button4.classList.remove("none");
        button5.classList.remove("none");
        button6.classList.remove("none");
        button7.classList.remove("none");
}


function addedu()
{
    const head=document.createElement('div');
    document.getElementById("education").appendChild(head);
    head.innerHTML=('<div class="edublock"><div class="head" contenteditable="true">YOUR DEGREE</div><div ><span contenteditable="true">Institute name</span> - <span contenteditable="true">Passing Year</span></div></div>');

}
function addskill()
{
    const head=document.createElement('div');
    document.getElementById("skills").appendChild(head);
    head.innerHTML=('<div class="skill"><span><i class="fas fa-chevron-circle-right"></i></span>&nbsp&nbsp&nbsp<span contenteditable="true">write your skill here</span></div>');
}
function addLang()
{
    const head=document.createElement('div');
    document.getElementById("languages").appendChild(head);
    head.innerHTML=('<div class="language"><span contenteditable="true">LANGNAME</span>&nbsp-&nbsp<span contenteditable="true">level u know</span></div>');
}
function addAch()
{
    const head=document.createElement('div');
    document.getElementById("achievement").appendChild(head);
    head.innerHTML=('<div class="achieve" ><span contenteditable="true">Write your achievement</span></div>');
}
function addInt()
{
    const head=document.createElement('div');
    document.getElementById("interest").appendChild(head);
    head.innerHTML=('<div class="achieve" ><span contenteditable="true">Write interest</span></div>');
}
function addsec()
{
    const head=document.createElement('div');
    document.getElementById("newsec").appendChild(head);
    head.innerHTML=('<br><br><span class="title" contenteditable="true">NEW SECTION</span><br><br><div contenteditable="true">This is the description part of your new section. Try to stay within limit and write something which has less than 200 words. The spaces and symbols you use will also be included so use them for an indentation effect.</div>');
}
function saveresume()
{
    var sec=document.getElementById("print");
    value1=sec.innerHTML;
    var info=document.getElementById("custinfo");
    info.value=value1;
}
setInterval(saveresume,1000);