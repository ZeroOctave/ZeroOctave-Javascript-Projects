const textArea = document.getElementById("textBox");
const btn = document.getElementById("btn");
const para = document.getElementById("paragraph");
const mistakesLabel = document.getElementById("mistakes");
const timeLabel = document.getElementById("time");
const wpmLabel = document.getElementById("wpm");
const cpmLabel = document.getElementById("cpm");

textArea.disabled = true;

let correctWords,
  totalTime = 0;
const paragraph = [
  "What is the best way to get what you want? she asked. He looked down at the ground knowing that she wouldn't like his answer. He hesitated, knowing that the truth would only hurt. How was he going to tell her that the best way for him to get what he wanted was to leave her?",
  "She had been an angel for coming up on 10 years and in all that time nobody had told her this was possible. The fact that it could ever happen never even entered her mind. Yet there she stood, with the undeniable evidence sitting on the ground before her. Angels could lose their wings.",
  "He dropped the ball. While most people would think that this was a metaphor of some type, in Joe's case it was absolutely literal. He had hopes of reaching the Major League and that dream was now it great jeopardy. All because he had dropped the ball.",
  "Welcome to my world. You will be greeted by the unexpected here and your mind will be challenged and expanded in ways that you never thought possible. That is if you are able to survive",
];

let [wpm, cpm, mistakes] = [0, 0, 0];
let paraIndex;
let init = null;

const updatePara = () => {
  paraIndex = Math.floor(Math.random() * paragraph.length);
  para.innerText = paragraph[paraIndex];
};

updatePara();

const getWords = (string) => {
  const words = string.split(" ");
  const wordsAfterRemovingSpaces = [];
  words.forEach((word) => {
    if (word !== " ") {
      wordsAfterRemovingSpaces.push(word);
    }
  });
  return wordsAfterRemovingSpaces;
};

const getCorrectWordsCount = () => {
  let correctWords = 0;
  const actualWords = getWords(paragraph[paraIndex]);
  const userWords = getWords(textArea.value);
  console.log(userWords);
  actualWords.forEach((word, index) => {
    if (word === userWords[index]) {
      correctWords++;
    }
    // console.log((word, " ", userWords[index]));
  });
  return correctWords;
};

const getNumberOfWords = (string) => {
  const words = string.split(" ");
  const wordsAfterRemovingSpaces = [];
  words.forEach((word) => {
    if (word) {
      wordsAfterRemovingSpaces.push(word);
    }
  });
  return wordsAfterRemovingSpaces.length;
};

const stats = () => {
  const userInput = textArea.value;
  const words = getNumberOfWords(userInput);
  let wpm = Math.round((words / totalTime) * 60);
  let cpm = Math.round((userInput.length / totalTime) * 60);
  let mistakes = words - getCorrectWordsCount();
  wpmLabel.textContent = wpm + " WPM";
  cpmLabel.textContent = cpm + " CPM";
  mistakesLabel.textContent = mistakes + " MISTAKES";
};

let [seconds, minutes] = [0, 0];

const timer = () => {
  seconds += 1;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
    }
  }
  totalTime++;

  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  const time = `${m} : ${s}`;
  return time;
};

btn.addEventListener("click", function () {
  if (this.innerText === "Start") {
    this.innerText = "Done";
    textArea.disabled = false;
    textArea.value = "";
    init = setInterval(() => {
      timeLabel.textContent = timer();
    }, 1000);
  } else if ((this.innerText = "Done")) {
    updatePara();
    this.innerText = "Start";
    textArea.disabled = true;
    seconds = -1;
    clearInterval(init);
  }
});


textArea.addEventListener("keyup", (event) => {
  if (event.code == 8 || event.code == 46) {
    event.preventDefault();
  }
});

textArea.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    stats();
  }
});
