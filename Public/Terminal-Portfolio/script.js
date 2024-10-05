const portfolioInfo = {
    name: "John Doe",
    personalBrand: 'CodeMaster',
    title: "Full Stack Developer",
    about: "I'm a passionate full-stack developer with a love for creating innovative web applications and solving complex problems.",
    summary: "I'm John Doe, a full-stack developer with experience in building robust web applications. I enjoy working with modern technologies and frameworks to create efficient and scalable solutions. I'm always eager to learn new skills and take on challenging projects.",
    skills: [
        "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "SQL",
        "Python", "Django", "HTML5", "CSS3", "Git", "Docker",
        "AWS", "RESTful APIs", "GraphQL"
    ],
    experience: [
        {
            company: "Tech Innovations Inc.",
            position: "Senior Full Stack Developer",
            duration: "2018 - Present",
            description: "Lead development of complex web applications, mentored junior developers, and implemented best practices for code quality and performance optimization."
        },
        {
            company: "WebSolutions Co.",
            position: "Full Stack Developer",
            duration: "2015 - 2018",
            description: "Developed and maintained various client projects, collaborated with cross-functional teams, and contributed to the company's internal tools and frameworks."
        }
    ],
    education: [
        {
            school: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            duration: "2011 - 2015"
        }
    ],
    contact: "email: john.doe@example.com | tel: +1 (555) 123-4567",
    certificates: {
        webDevelopment: [
            "Advanced Web Development Bootcamp",
            "React and Redux Masterclass",
            "Node.js Advanced Concepts"
        ],
        cloudComputing: [
            "AWS Certified Solutions Architect",
            "Google Cloud Professional Developer",
            "Azure Fundamentals"
        ]
    }
};

const asciiBanner = `
█▀▀ █▀█ █▀▄ █▀▀ █▀▄▀█ ▄▀█ █▀ ▀█▀ █▀▀ █▀█
█▄▄ █▄█ █▄▀ ██▄ █░▀░█ █▀█ ▄█ ░█░ ██▄ █▀▄
`;

let commandHistory = [];

const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');

function initializeTerminal() {
    commandHistory = [
        centerASCII(asciiBanner),
        "Type 'help' for available commands.",
    ];
    updateTerminal();
}

function centerASCII(art) {
    const lines = art.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    return lines.map(line => line.padStart(line.length + Math.floor((maxLength - line.length) / 2)).padEnd(maxLength)).join('\n');
}

function updateTerminal() {
    terminalOutput.innerHTML = commandHistory.map(line =>
        `<div${line.startsWith('$') ? ' style="margin-top: 1rem;"' : ''}>${line}</div>`
    ).join('');
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function executeCommand(command) {
    const [cmd, ...args] = command.trim().split(" ");
    let output = "";

    switch (cmd.toLowerCase()) {
        case "about":
            output = getAboutInfo();
            break;
        case "skills":
            output = getSkillsInfo();
            break;
        case "experience":
            output = getExperienceInfo();
            break;
        case "education":
            output = getEducationInfo();
            break;
        case "contact":
            output = getContactInfo();
            break;
        case "clear":
            clearTerminal();
            return;
        case "help":
            output = getHelpInfo();
            break;
        case "certificates":
            output = getCertificatesInfo();
            break;
        default:
            output = `Command not recognized: ${cmd}. Type 'help' for available commands.`;
    }

    commandHistory.push(`$ ${command}`, output, "");
    updateTerminal();
}

function getAboutInfo() {
    return `Name: ${portfolioInfo.name}\nPersonal Brand: ${portfolioInfo.personalBrand}\nTitle: ${portfolioInfo.title}\n\n${portfolioInfo.about}\n\n${portfolioInfo.summary}`;
}

function getSkillsInfo() {
    return portfolioInfo.skills.join(", ");
}

function getExperienceInfo() {
    return "Professional Experience:\n\n" + portfolioInfo.experience.map(exp =>
        `${exp.position} (${exp.duration})\n${exp.company}\n${exp.description}\n`
    ).join("\n");
}

function getEducationInfo() {
    return portfolioInfo.education.map(edu => `${edu.degree}\n${edu.school}\n${edu.duration}\n`).join("\n");
}

function getContactInfo() {
    return portfolioInfo.contact;
}

function getCertificatesInfo() {
    let output = "";
    output += "Web Development:\n" + portfolioInfo.certificates.webDevelopment.map(cert => `- ${cert}`).join('\n') + "\n\n";
    output += "Cloud Computing:\n" + portfolioInfo.certificates.cloudComputing.map(cert => `- ${cert}`).join('\n');
    return output;
}

function getHelpInfo() {
    return "Available commands:\n\n" +
        "about        - Display personal information\n" +
        "skills       - List technical skills\n" +
        "experience   - Show work experience\n" +
        "education    - Display educational background\n" +
        "certificates - Display CS50 and freeCodeCamp certificates\n" +
        "contact      - Show contact information\n" +
        "clear        - Clear the terminal\n" +
        "help         - Show this help message";
}

function clearTerminal() {
    commandHistory = [
        centerASCII(asciiBanner),
        "Terminal cleared. Type 'help' for available commands.",
    ];
    updateTerminal();
}

function handleUserInput(e) {
    if (e.key === "Enter" && commandInput.value.trim()) {
        executeCommand(commandInput.value);
        commandInput.value = "";
    }
}

function generateStars(count) {
    const starsContainer = document.getElementById('stars-container');
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        const size = `${Math.random() * 3 + 1}px`;
        star.style.width = size;
        star.style.height = size;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s linear infinite`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}

function init() {
    commandInput.addEventListener('keydown', handleUserInput);
    generateStars(200);
    initializeTerminal();
}

init();