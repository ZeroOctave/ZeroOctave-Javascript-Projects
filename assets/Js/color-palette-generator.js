let lockedColors = [false, false, false, false, false];

// Generate random color in hex format
function generateRandomColor() {
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Update the color of each box
function generateColors() {
    for (let i = 1; i <= 5; i++) {
        if (!lockedColors[i - 1]) {
            const color = generateRandomColor();
            document.getElementById(`color${i}`).style.backgroundColor = color;
            document.getElementById(`hex${i}`).innerText = color;
        }
    }
}

// Toggle lock for color
function toggleLock(index) {
    lockedColors[index - 1] = !lockedColors[index - 1];
    const lockBtn = document.querySelector(`#color${index} .lock-btn`);
    lockBtn.innerText = lockedColors[index - 1] ? '🔒' : '🔓';
}

// Copy color to clipboard
function copyToClipboard(index) {
    const colorCode = document.getElementById(`hex${index}`).innerText;
    navigator.clipboard.writeText(colorCode).then(() => {
        alert(`Copied: ${colorCode}`);
    });
}

// Initialize with a random palette
window.onload = generateColors;
