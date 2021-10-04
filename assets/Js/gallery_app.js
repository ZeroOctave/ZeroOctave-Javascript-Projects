const gallery = document.getElementById('gallery');
const popup = document.getElementById('popup');
const selectedImage = document.getElementById('selectedImage');
const imageIndexes = [1,2,3,4,5,6,7,8,10,11,12];
const selectedindex = null;

imageIndexes.forEach((i)=>{
    const image = document.createElement('img');
    image.src = `../Assets/Images/project-image-${i}.jpeg`;
    image.alt = `Cover image of the number ${i}`;
    image.classList.add('galleryImg');
    image.addEventListener('click',()=>{
        //something something
        popup.style.transform = `translateY(0)`;
        selectedImage.src = `../Assets/Images/project-image-${i}.jpeg`;
        selectedImage.alt = `Cover image of the number ${i}`;
    }); 
    gallery.appendChild(image);

    popup.addEventListener('click',()=>{
        popup.style.transform = `translateY(-100%)`;
        popup.src='';
        popup.alt='';
    })
});
