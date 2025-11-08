// Countdown Generator Module

let countdownInterval;
let currentCountdownTarget;

function setCountdown(preset) {
    const now = new Date();
    let targetDate, eventName;

    switch(preset) {
        case 'defcon':
            targetDate = new Date('2025-08-07T00:00:00-07:00');
            eventName = 'DefCon 2025';
            break;
        case 'newyear':
            targetDate = new Date(`${now.getFullYear() + 1}-01-01T00:00:00`);
            eventName = 'New Year';
            break;
        case 'birthday':
            targetDate = new Date(`${now.getFullYear()}-09-25T00:00:00`);
            if (targetDate < now) {
                targetDate = new Date(`${now.getFullYear() + 1}-09-25T00:00:00`);
            }
            eventName = "Clarke's Birthday";
            break;
        case 'christmas':
            targetDate = new Date(`${now.getFullYear()}-12-25T00:00:00`);
            if (targetDate < now) {
                targetDate = new Date(`${now.getFullYear() + 1}-12-25T00:00:00`);
            }
            eventName = 'Christmas';
            break;
        case 'custom':
            document.getElementById('customCountdownPicker').style.display = 'block';
            return;
    }

    document.getElementById('customCountdownPicker').style.display = 'none';
    startCountdown(targetDate, eventName);
}

function generateCustomCountdown() {
    const date = document.getElementById('countdownDate').value;
    const hour = document.getElementById('countdownHour').value;
    const minute = document.getElementById('countdownMinute').value;
    const title = document.getElementById('countdownTitle').value || 'Custom Event';

    if (!date || hour === '' || minute === '') {
        alert('Please select date and time');
        return;
    }

    const targetDate = new Date(`${date}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`);
    startCountdown(targetDate, title);
}

function startCountdown(targetDate, eventName) {
    if (countdownInterval) clearInterval(countdownInterval);
    
    currentCountdownTarget = targetDate;
    document.getElementById('countdownEventName').textContent = eventName;
    
    countdownInterval = setInterval(() => {
        updateCountdownDisplay(targetDate, eventName);
    }, 1000);
    
    updateCountdownDisplay(targetDate, eventName);
    generateCountdownHTML(targetDate, eventName);
}

function updateCountdownDisplay(targetDate, eventName) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('countdownValue').textContent = '🎉 TIME!';
        document.getElementById('countdownDetails').textContent = 'Event has arrived!';
        if (countdownInterval) clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let displayText;
    if (days > 0) {
        displayText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        displayText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    document.getElementById('countdownValue').textContent = displayText;
    
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    document.getElementById('countdownDetails').textContent = `${totalHours.toLocaleString()} hours • ${totalMinutes.toLocaleString()} minutes remaining`;
}

function generateCountdownHTML(targetDate, eventName) {
    const timestamp = Math.floor(targetDate.getTime() / 1000);
    const htmlCode = `<!-- Time Generator Countdown -->
<div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 30px; text-align: center; font-family: 'Inter', sans-serif; color: #fff; max-width: 400px;">
    <div style="font-size: 1.2em; color: #888; margin-bottom: 15px;">${eventName}</div>
    <div id="countdown-${timestamp}" style="font-size: 2.5em; font-weight: 700; color: #fff; margin-bottom: 15px; font-variant-numeric: tabular-nums;">Loading...</div>
</div>
<script>
(function() {
    const target = new Date(${targetDate.getTime()});
    const element = document.getElementById('countdown-${timestamp}');
    
    function update() {
        const now = new Date();
        const diff = target - now;
        
        if (diff <= 0) {
            element.textContent = '🎉 TIME!';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (days > 0) {
            element.textContent = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
        } else {
            element.textContent = hours.toString().padStart(2, '0') + ':' + 
                                 minutes.toString().padStart(2, '0') + ':' + 
                                 seconds.toString().padStart(2, '0');
        }
    }
    
    update();
    setInterval(update, 1000);
})();
</script>`;

    document.getElementById('htmlCode').value = htmlCode;
    document.getElementById('htmlExport').style.display = 'block';
}

function copyCountdownHTML() {
    const htmlCode = document.getElementById('htmlCode');
    htmlCode.select();
    navigator.clipboard.writeText(htmlCode.value).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#4a4';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#222';
        }, 2000);
    });
}

function populateCountdownSelectors() {
    const hourSelect = document.getElementById('countdownHour');
    for (let i = 0; i < 24; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        hourSelect.appendChild(option);
    }

    const minuteSelect = document.getElementById('countdownMinute');
    for (let i = 0; i < 60; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        minuteSelect.appendChild(option);
    }
}