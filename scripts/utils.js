// Utility Functions Module

function createOutputItem(label, value) {
    return `
        <div class="output-item">
            <span class="output-label">${label}</span>
            <span class="output-value">${value}</span>
            <button class="copy-btn" onclick="copyToClipboard('${value.toString().replace(/'/g, "\\'")}', this)">Copy</button>
        </div>
    `;
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 2000);
    });
}

function getRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (Math.abs(days) > 0) return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ${diff > 0 ? 'ago' : 'from now'}`;
    if (Math.abs(hours) > 0) return `${Math.abs(hours)} hour${Math.abs(hours) !== 1 ? 's' : ''} ${diff > 0 ? 'ago' : 'from now'}`;
    if (Math.abs(minutes) > 0) return `${Math.abs(minutes)} minute${Math.abs(minutes) !== 1 ? 's' : ''} ${diff > 0 ? 'ago' : 'from now'}`;
    return 'just now';
}

function populateTimeSelectors(hourId, minuteId) {
    const hourSelect = document.getElementById(hourId);
    for (let i = 0; i < 24; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        hourSelect.appendChild(option);
    }

    const minuteSelect = document.getElementById(minuteId);
    for (let i = 0; i < 60; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        minuteSelect.appendChild(option);
    }
}