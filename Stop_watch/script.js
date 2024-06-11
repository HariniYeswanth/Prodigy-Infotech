let timer;
let startTime;
let isRunning = false;
let laps = [];

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
        timer = setInterval(updateDisplay, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('display').textContent = '00:00:00';
    laps = [];
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        let lapTime = Date.now() - startTime - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
        laps.push(lapTime);
        let lapDisplay = formatTime(lapTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = lapDisplay;
        document.getElementById('laps').appendChild(lapItem);
    }
}

function updateDisplay() {
    let elapsedTime = Date.now() - startTime - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(millisecondsFormatted)}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}
