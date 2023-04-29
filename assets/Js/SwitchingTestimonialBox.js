const testimonialsContainer = document.querySelector('.testimonialContainer')
const testimonial =document.querySelector('.testimonial')
const userImage = document.querySelector(".user-image")
const username = document.querySelector(".username")
const role = document.querySelector('.role')

const testimonials = [
    {
        name: 'Priyanks Roy',
        position: 'Marketing Chef',
        photo:'https://media.istockphoto.com/photos/portrait-of-young-woman-smiling-picture-id1304581885?k=20&m=1304581885&s=612x612&w=0&h=gFwtPwB8wyM9FCsFq2WB43iAM6ihmrVtDHR-MqNMBQA=' ,
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, dolore omnis id nostrum alias obcaecati culpa quos neque sapiente enim quae aperiam possimus aliquam rem voluptatum nam natus odio aut.",
    },
    {
        name: 'Vikaram Sharma',
        position: 'Director',
        photo:'https://media.istockphoto.com/photos/portrait-of-a-young-man-outdoors-smiling-picture-id1135381173?k=20&m=1135381173&s=612x612&w=0&h=pZEZ7V-VbBOTSekv7rlKhjtQP5ZyxDQ3YDYN-dofHmk=' ,
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At suscipit nisi deserunt sit, iusto ipsam animi sapiente perspiciatis cumque, sequi ullam numquam, sed voluptatibus dignissimos optio eveniet alias perferendis magni?",
    },
    {
        name: 'Riya Dixit',
        position: 'Manager',
        photo:'https://media.istockphoto.com/photos/portrait-of-a-young-woman-outdoors-smiling-picture-id1135381120?k=20&m=1135381120&s=612x612&w=0&h=8utfDKWn-21DKO7bVKSANdfc2qqXZDVCtVFPlZf-yeE=' ,
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, dolore omnis id nostrum alias obcaecati culpa quos neque sapiente enim quae aperiam possimus aliquam rem voluptatum nam natus odio aut.",
    },
    {
        name: 'Samy Vedya',
        position: 'Advocate',
        photo:'https://media.gettyimages.com/photos/smiling-black-man-picture-id1170953056?s=612x612' ,
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt totam molestiae iure pariatur fuga ut fugit blanditiis rerum laboriosam labore possimus illum saepe, quidem assumenda libero ullam aut? Ex, nihil.",
    },
    {
        name: 'Shatish Patil',
        position: 'Influencer',
        photo:'https://media.gettyimages.com/photos/portrait-of-a-young-man-picture-id1318928248?s=612x612' ,
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At suscipit nisi deserunt sit, iusto ipsam animi sapiente perspiciatis cumque, sequi ullam numquam, sed voluptatibus dignissimos optio eveniet alias perferendis magni?",
    },
]

let idx = 1
function updateTestimonial(){
   const{name, position , photo,text} = testimonials[idx]
   testimonial.innerHTML =text
   userImage.src = photo
   username.innerHTML=name
   role.innerHTML = position

   idx++

   if(idx> testimonials.length -1 ){
       idx=0
   }
}

setInterval(updateTestimonial,10000) 