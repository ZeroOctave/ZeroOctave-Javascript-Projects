const btn = document.getElementById('btn');
const conatiner = document.getElementById('container');
var titles = [
    'Hello',
    'How are you?',
    'This Challenge is crazy',
    '😉Hope you are doing good.',
    'Js is really awesome💫',
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela", 
    "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. - Steve Jobs", 
    "Life is what happens when you're busy making other plans. - John Lennon", 
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "Only a life lived for others is a life worthwhile. - Albert Einstein",
    "An unexamined life is not worth living. - Socrates",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi",
    "That which does not kill us makes us stronger. - Friedrich Nietzsche",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "The growth of wisdom may be gauged accurately by the decline of ill-temper. - Friedrich Nietzsche",
    "Waste no more time arguing about what a good man should be. Be one. - Marcus Aurelius",
    "Happiness and freedom begin with one principle. Some things are within your control and some are not. - Epictetus",
    "Difficulties strengthen the mind as labor does the body. - Seneca The Younger",
    "Good actions give strength to ourselves and inspire good actions in others. - Plato",
    "They can conquer who believe they can. - Virgil",
    "Everything you can imagine is real. - Pablo Picasso",
    "Where there is love there is life. - Mahatma Gandhi",
    "Monsters are real, and ghosts are real too. They live inside us, and sometimes, they win. - Stephen King",
    "We are but dust and shadow. - Horace",
    "Hard work conquers all. - Virgil",
    "Art is long, life is short. - Hippocrates",
    "Applaud, my friends, the comedy is over! - Augustus",
    "The beginnings of all things are small. - Cicero",
    "Freedom is not worth having if it does not include the freedom to make mistakes. - Mahatma Gandhi",
    "Some faults may claim forgiveness. - Horace",
    "We dont make mistakes, just happy little accidents. - Bob Ross",
    "It began as a mistake. - Charles Bukowski",
    "Who is allowed to make mistakes, makes fewer mistakes. - Ovid",
    "What cannot be resolved, it is cut. - Alexander The Great",
    "Let our advance worrying become advance thinking and planning. - Winston Churchill",
    "Throw off your worries when you throw off your clothes at night. - Napoleon",
    "He who fears being conquered is certain of defeat. - Napoleon",
    "An appeaser is one who feeds a crocodile, hoping it will eat him last. - Winston Churchill",
    "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time. - Mark Twain",
    "There are several good protections against temptations, but the surest is cowardice. - Mark Twain",
    "I would rather die of passion than of boredom. - Vincent Van Gogh",
    "Every hero becomes a bore at last. - Ralph Waldo Emerson",
    "Some people never go crazy. What truly horrible lives they must live. - Charles Bukowski",
    "Everything influences me, nothing changes me. - Salvador Dali",
    "Always the same. - Cicero",
    "You may break your heart, but men will still go on as before. - Marcus Aurelius",
    "To do nothing is sometimes a good remedy. - Hippocrates",
    "States as great engines move slowly. - Francis Bacon",
    "Nature is a labyrinth in which the very haste you move with will make you lose your way. - Francis Bacon",
    "Nature does not make leaps. - Aristotle",
    "To kill time is not murder, it's suicide. - William James",
    "Time is money. - Benjamin Franklin",
    "Eternity is in love with the productions of time. - William Blake",
    "A man that is young in years may be old in hours if he have lost no time. - Francis Bacon"

];
btn.addEventListener('click', () => {
    createNotification();
})

function createNotification() {
   
    const notif = document.createElement('div');
    notif.classList.add('toast');
    var i = (Math.random() * titles.length) | 0;
    notif.innerText=titles[i];
    conatiner.appendChild(notif);
   
    setTimeout(() => {
        notif.remove();
    }, 3000);
  
}
