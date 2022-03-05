const open = document.getElementById('open');
const close = document.getElementById('close');
const conatiner = document.getElementById('conatiner');

open.addEventListener('click', () => {
    conatiner.classList.add('active');
});
close.addEventListener('click', () => {
    conatiner.classList.remove('active');
});