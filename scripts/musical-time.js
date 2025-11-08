// Musical Time Calculator Module

let beatInterval;
let isMetronomeRunning = false;

function calculateMusicalTime() {
    const bpm = parseInt(document.getElementById('bpmInput').value) || 120;
    const timeSignature = document.getElementById('timeSignature').value;
    const output = document.getElementById('musicalOutput');
    output.innerHTML = '';

    const beatMs = 60000 / bpm;
    const [numerator, denominator] = timeSignature.split('/').map(Number);
    const beatsPerBar = numerator;
    const noteValue = 4 / denominator;
    
    const barMs = beatMs * beatsPerBar * noteValue;
    const eighthMs = beatMs / 2;
    const sixteenthMs = beatMs / 4;
    const thirtySecondMs = beatMs / 8;

    const tempoMarking = getTempoMarking(bpm);
    document.getElementById('tempoMarking').textContent = tempoMarking;

    const musicalTimes = [
        { label: `Beat (${denominator === 4 ? 'Quarter' : denominator === 8 ? 'Eighth' : 'Note'})`, value: `${beatMs.toFixed(2)}ms` },
        { label: `Bar (${timeSignature})`, value: `${barMs.toFixed(2)}ms` },
        { label: 'Eighth Note', value: `${eighthMs.toFixed(2)}ms` },
        { label: 'Sixteenth Note', value: `${sixteenthMs.toFixed(2)}ms` },
        { label: 'Thirty-Second Note', value: `${thirtySecondMs.toFixed(2)}ms` },
        { label: 'Samples @ 44.1kHz', value: `${Math.round(beatMs * 44.1)} samples/beat` },
        { label: 'Samples @ 48kHz', value: `${Math.round(beatMs * 48)} samples/beat` },
        { label: 'Beat Frequency', value: `${(bpm / 60).toFixed(2)} Hz` },
        { label: 'MIDI Tempo', value: `${Math.round(60000000 / beatMs)} μs/quarter` },
        { label: 'Beats Per Second', value: `${(bpm / 60).toFixed(3)} bps` }
    ];

    musicalTimes.forEach(time => {
        output.innerHTML += createOutputItem(time.label, time.value);
    });

    updateBeatDisplay(beatsPerBar);
    if (isMetronomeRunning) {
        animateBeats(beatMs, beatsPerBar);
    }
}

function getTempoMarking(bpm) {
    if (bpm < 60) return 'Larghissimo (Very, very slow)';
    if (bpm < 66) return 'Largo (Very slow)';
    if (bpm < 76) return 'Adagio (Slow)';
    if (bpm < 108) return 'Andante (Walking pace)';
    if (bpm < 120) return 'Moderato (Moderate)';
    if (bpm < 168) return 'Allegro (Fast)';
    if (bpm < 200) return 'Presto (Very fast)';
    return 'Prestissimo (Extremely fast)';
}

function updateBeatDisplay(beatsPerBar) {
    const beatDisplay = document.getElementById('beatDisplay');
    beatDisplay.innerHTML = '';
    for (let i = 1; i <= beatsPerBar; i++) {
        const beatBox = document.createElement('div');
        beatBox.className = 'beat-box';
        beatBox.textContent = i;
        if (i === 1) beatBox.style.borderColor = '#667eea';
        beatDisplay.appendChild(beatBox);
    }
}

function animateBeats(beatMs, beatsPerBar = 4) {
    if (beatInterval) clearInterval(beatInterval);
    
    let currentBeat = 0;
    const boxes = document.querySelectorAll('.beat-box');
    
    beatInterval = setInterval(() => {
        boxes.forEach(box => box.classList.remove('active'));
        if (boxes[currentBeat]) {
            boxes[currentBeat].classList.add('active');
        }
        currentBeat = (currentBeat + 1) % beatsPerBar;
    }, beatMs);
}

function startMetronome() {
    const bpm = parseInt(document.getElementById('bpmInput').value) || 120;
    const timeSignature = document.getElementById('timeSignature').value;
    const [numerator] = timeSignature.split('/').map(Number);
    const beatMs = 60000 / bpm;
    
    isMetronomeRunning = true;
    animateBeats(beatMs, numerator);
    
    document.querySelector('[onclick="startMetronome()"]').style.background = '#4a4';
    document.querySelector('[onclick="stopMetronome()"]').style.background = '#222';
}

function stopMetronome() {
    if (beatInterval) clearInterval(beatInterval);
    isMetronomeRunning = false;
    
    document.querySelectorAll('.beat-box').forEach(box => box.classList.remove('active'));
    
    document.querySelector('[onclick="startMetronome()"]').style.background = '#222';
    document.querySelector('[onclick="stopMetronome()"]').style.background = '#a44';
}