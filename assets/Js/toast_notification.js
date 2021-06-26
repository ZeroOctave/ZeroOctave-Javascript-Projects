const btn = document.getElementById('btn');
const conatiner = document.getElementById('container');
btn.addEventListener('click', () => {
    createNotification();
})

function createNotification() {
    const notif = document.createElement('div');
    notif.classList.add('toast');
    notif.innerText = "This challenge is crazy";
    conatiner.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    }, 3000);
}