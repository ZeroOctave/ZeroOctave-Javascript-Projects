const data = [
    {
        designation : "Teacher",
        content : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum exercitationem quis eius fuga numquam neque ut laborum aut corrupti sit.",
        Name : "Joy Spencer",
        image : "person1"
    },
    {
        designation : "Manager",
        content : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum exercitationem quis eius fuga numquam neque ut laborum aut corrupti sit.",
        Name : "Naudette Harvay",
        image : "person2"
    },
    {
        designation : "Director",
        content : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum exercitationem quis eius fuga numquam neque ut laborum aut corrupti sit.",
        Name : "Jennifer Spencer",
        image : "person3"
    },
    {
        designation : "UI/UX Designer",
        content : "IIILorem ipsum dolor sit amet consectetur, adipisicing elit. Eum exercitationem quis eius fuga numquam neque ut laborum aut corrupti sit.III",
        Name : "Harley Spencer",
        image : "person4"
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