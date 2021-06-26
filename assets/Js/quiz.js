const quizData = [
    {
        question: "How old is You ?",
        a: '10',
        b: '15',
        c: '18',
        d: '20',
        correct: 'c'
    },
    {
        question: "Which is the beginner friendly programming language ? ",
        a: 'C programming language',
        b: 'Python',
        c: 'Java',
        d: 'Javascript',
        correct: 'b'
    },
    {
        question: "Which is the best place on the earth to visit ?",
        a: 'India',
        b: 'USA',
        c: 'France',
        d: 'Finland',
        correct: 'a'
    },
    {
        question: "Who is the Prime Minister of India ?",
        a: 'Narendra Modi',
        b: 'Rahul Gandhi',
        c: 'Sonia Gandhi',
        d: 'Amit Shah',
        correct: 'a'
    },
    {
        question: "Green city of India ?",
        a: 'Chandigarh',
        b: 'Delhi',
        c: 'Indore',
        d: 'Mumbai',
        correct: 'a'
    }
]

const quiz = document.getElementById('quiz');
const answersE1s = document.querySelectorAll('.answer');
const questionE1 = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;


loadQuiz();
function loadQuiz() {
    deSelectAnswer();
    const currentQuizData = quizData[currentQuiz];

    questionE1.innerText = currentQuizData.question;

    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

}
function getSelected() {

    let answer = undefined;
    answersE1s.forEach(answerE1 => {
        if (answerE1.checked) {
            answer = answerE1.id;

        }

    });
    return answer;
}
function deSelectAnswer() {
    answersE1s.forEach(answerE1 => {
        answerE1.checked = false;

    });

}
submitBtn.addEventListener('click', () => {
    const answer = getSelected();


    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        }
        else {
            quiz.innerHTML = `<h2>You answered correctly ${score}/${quizData.length} questions.</h2> <button onclick="location.reload()">Reload</button>`;
        }
    }
})
