const result = document.querySelector('#result'),
        copyBtn = document.querySelector('.result-copy'),
        length = document.querySelector('#length'),
        uppercase = document.querySelector('#uppercase'),
        lowercase = document.querySelector('#lowercase'),
        numbers = document.querySelector('#numbers'),
        symbols = document.querySelector('#symbols'),
        generate = document.querySelector('#generate'),
        message = document.querySelector('.message');


generate.addEventListener('click', function(e) {
        e.preventDefault();
        let passwordLength = length.value;
        if(passwordLength > 4 && passwordLength <= 25) {
                let password = '';
                for(let i = 0; i < passwordLength; i++) {
                        password += generateRandomCharacter();
                }
                result.value = password;
                message.textContent = "";
        }
        else {
                message.textContent = "Select a length between 5 and 25";
                if(message.classList.contains('message-success')) {
                        message.classList.remove('message-success');
                }
                result.value = "";
                hideMessage();
        }
});

copyBtn.addEventListener('click', function() {
        const textarea = document.createElement('textarea');
        const password = result.value;

        if(!password) { return; }

        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        message.textContent = "Password copied to clipboard";
        message.classList.add('message-success');
        hideMessage();
});


function getRandomUppercase() {
        // (65 to 90) ascii values for (A to Z)
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowercase() {
        // (97 to 122) ascii values for (a to z)
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
        return Math.floor(Math.random() * 10).toString();
}

function getRandomSymbol() {
        const str = "!@#$%^&*()_+<>{}?:";
        return str[Math.floor(Math.random() * str.length)];
}


// calling a random function from the above 4 functions
function generateRandomCharacter() {
        if(uppercase.checked && lowercase.checked && numbers.checked && symbols.checked) {
                const functions = {
                        0: getRandomUppercase,
                        1: getRandomLowercase,
                        2: getRandomNumber,
                        3: getRandomSymbol
                }
                return functions[Math.floor(Math.random() * 4)]();
        }
        if(uppercase.checked && lowercase.checked && numbers.checked && !symbols.checked) {
                const functions = {
                        0: getRandomUppercase,
                        1: getRandomLowercase,
                        2: getRandomNumber
                }
                return functions[Math.floor(Math.random() * 3)]();
        }
        if(uppercase.checked && lowercase.checked && !numbers.checked && symbols.checked) {
                const functions = {
                        0: getRandomUppercase,
                        1: getRandomLowercase,
                        2: getRandomSymbol
                }
                return functions[Math.floor(Math.random() * 3)]();
        }
        if(uppercase.checked && lowercase.checked && !numbers.checked && !symbols.checked) {
                const functions = {
                        0: getRandomUppercase,
                        1: getRandomLowercase
                }
                return functions[Math.floor(Math.random() * 2)]();
        }
}

function hideMessage() {
        setTimeout(function() {
                message.textContent = "";
        }, 3000)
}

