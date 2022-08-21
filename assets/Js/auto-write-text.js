const text = "Hi, My name is Shivam Gupta";

let index = 0;

function writeText() {
    document.Message.innerText = text.slice(0, index);

    index++;

    if (index > text.length - 1) {
        index = 0;
    }
}
setInterval(writeText, 100);