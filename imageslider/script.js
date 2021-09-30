const slides= document.querySelectorAll('.slide');

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

const auto= false;
const intervaltime =5000;

let slideinterval;

const nextslide = () =>
{
    const current = document.querySelector('.current');

    current.classList.remove('current');

    if(current.nextElementSibling)
    {
        current.nextElementSibling.classList.add('current');

    }
    else
    {
        slides[0].classList.add('current');;

    }
    setTimeout(()=> current.classList.remove('current'))
}


const prevslide = () =>
{
    const current = document.querySelector('.current');

    current.classList.remove('current');

    if(current.previousElementSibling)
    {
        current.previousElementSibling.classList.add('current');

    }
    else
    {
        slides[slides.length -1].classList.add('current');;

    }
    setTimeout(()=> current.classList.remove('current'))
}

// Button events
next.addEventListener('click', e => {
    nextslide();
    if (auto) {
      clearInterval(slideinterval);
      slideinterval = setInterval(nextslide, intervaltime);
    }
  });
  
  prev.addEventListener('click', e => {
    prevslide();
    if (auto) {
      clearInterval(slideinterval);
      slideinterval = setInterval(nextslide, intervaltime);
    }
  });
  
  // Auto slide
  if (auto) {
    // Run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime);
  }