//nav button
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('nav-links')[0];

toggleButton.addEventListener('click', function toggle() {
   navbarLinks.classList.toggle('active');
});


//typewriter
let i = 0;
let txt = 'Pakistan founded on 14 August 1947 when the country became an independent nation in the form of Dominion of Pakistan within the British common wealth as the result of Pakistan Movement and the partition of India.';
function typeWriter() {

    if (i < txt.length) {
        document.getElementById("para").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }

}

typeWriter();