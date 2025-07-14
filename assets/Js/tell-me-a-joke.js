
        async function getJoke() {
            const res = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data = await res.json();

            const setup = data.setup;
            const punchline = data.punchline;

            document.getElementById('joke').innerHTML = `${setup}<br><strong>${punchline}</strong>`;

            speakWithPause(setup, punchline);
        }

        function speakWithPause(setup, punchline) {
            // Cancel ongoing speech
            window.speechSynthesis.cancel();

            const first = new SpeechSynthesisUtterance(setup);
            first.lang = 'en-US';
            first.pitch = 0.95;
            first.rate = 0.9;

            const second = new SpeechSynthesisUtterance(punchline);
            second.lang = 'en-US';
            second.pitch = 0.95;
            second.rate = 0.85;

            first.onend = () => {
                setTimeout(() => {
                    speechSynthesis.speak(second);
                }, 600); // 600ms pause before punchline
            };

            speechSynthesis.speak(first);
        }
    