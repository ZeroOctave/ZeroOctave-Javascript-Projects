const data = [
    {
        designation : "Teacher",
        content : "A hardworking and dedicated Teacher. I believe in creating a healthy environment which can help each one of us to grow.",
        Name : "Joy Spencer",
        image : "/assets/Images/person1"
    },
    {
        designation : "Manager",
        content : "A hardworking and dedicated Manager. I believe in creating a healthy environment which can help each one of us to grow.",
        Name : "Naudette Harvay",
        image : "/assets/Images/person2"
    },
    {
        designation : "Director",
        content : "A hardworking and dedicated Director. I believe in creating a healthy environment which can help each one of us to grow..",
        Name : "Jennifer Spencer",
        image : "/assets/Images/person3"
    },
    {
        designation : "UI/UX Designer",
        content : "A hardworking and dedicated UI/UX Designer. I believe in creating a healthy environment which can help each one of us to grow.",
        Name : "Harley Spencer",
        image : "/assets/Images/person4"
    }
]

let main = document.getElementById('main');
let image = document.getElementById('image');
let Name = document.getElementById('Name');
let designation = document.getElementById('designation');
let content = document.getElementById('content');
let prevbtn = document.getElementById('prev');
let nextbtn = document.getElementById('next');
let setcount = 0;
nextbtn.addEventListener('click',nextinfo);
function nextinfo() {
    setcount++;
    console.log("hellonextinfohere");
    if(setcount>=data.length)
    {
        setcount=0;
    }
    image.setAttribute('src',data[setcount].image+".jpg");
    Name.innerHTML = data[setcount].Name;
    designation.innerHTML = data[setcount].designation;
    content.innerHTML = data[setcount].content;
}
prevbtn.addEventListener('click',previnfo);
function previnfo() {
    console.log("helloprevinfohere");
    setcount--;
    if(setcount<0)
    {
        setcount=(data.length)-1;
    }
    image.setAttribute('src',data[setcount].image+".jpg");
    Name.innerHTML = data[setcount].Name;
    designation.innerHTML = data[setcount].designation;
    content.innerHTML = data[setcount].content;
}
