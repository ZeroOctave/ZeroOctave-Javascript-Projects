//console.log("This is my console index.js");
//Data is an array of objects which contain the data about the candidates
const data=[
    {
        name:'Rohan Das',
        age:18,
        city:'Kolkata',
        language:'Python',
        framework:'Django',
        image:'https://randomuser.me/api/portraits/men/51.jpg'
    },
    {
        name: 'Shubham Sharma',
        age: 28,
        city: 'Bangalore',
        language: 'JavaScript',
        framework: 'Angular',
        image: 'https://randomuser.me/api/portraits/men/54.jpg'
    },

    {
        name: 'Camella Cabello',
        age: 18,
        city: 'Kolkata',
        language: 'Python',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/women/55.jpg'
    },

    {
        name: 'Aishwariya Rai',
        age: 45,
        city: 'Mumbai',
        language: 'Python',
        framework: 'Flask',
        image: 'https://randomuser.me/api/portraits/women/57.jpg'
    },

    {
        name: 'Rohit Sharma',
        age: 34,
        city: 'Jharkhand',
        language: 'Go',
        framework: 'Go Framework',
        image: 'https://randomuser.me/api/portraits/men/61.jpg'
    }
]
//Cv iterator
function cvIterator(profiles){
    let nextIndex=0;
    return{
        next:function(){
            return nextIndex<profiles.length?{
                value:profiles[nextIndex++],done:false
        }:{done:true}
        }
    };
}
const candidates=cvIterator(data);
//Button listener for next button
const next=document.getElementById('next');
next.addEventListener('click', nextCV);
nextCV();
function nextCV(){
    const currentCandidate=candidates.next().value;
    if(currentCandidate!=undefined){
    let image=document.getElementById('image');
    let profiles=document.getElementById('profiles');
    image.innerHTML=`<img src='${currentCandidate.image}'>`;
    profiles.innerHTML=`<ul class="list-group">
    <li class="list-group-item">Name: ${currentCandidate.name}</li>
    <li class="list-group-item">Age: ${currentCandidate.age} years old</li>
    <li class="list-group-item">Lines in ${currentCandidate.city}</li>
    <li class="list-group-item">Primarily works on ${currentCandidate.language}</li>
    <li class="list-group-item">uses  ${currentCandidate.framework} framework</li>
    
  </ul>`;
    }
    else{
        alert('applications Ended');
        window.location.reload();
    }
}