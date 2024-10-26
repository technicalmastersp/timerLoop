let timer;
let countdownInterval;
const audio = document.getElementById('audio');
const countdownDisplay = document.getElementById('countdownDisplay');
let timerDuration;

function startTimer(duration) {
    let remainingTime = duration;

    // Start the countdown display
    countdownInterval = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        remainingTime -= 1000;

        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = '00:00';
            audio.currentTime = 0; // Reset audio to the beginning
            audio.play(); // Play audio

            // Automatically restart the timer
            startTimer(timerDuration);
        }
    }, 1000);
}

document.getElementById('startButton').addEventListener('click', () => {
    const minuteValue = parseInt(document.getElementById('minuteInput').value) || 0;
    const secondValue = parseInt(document.getElementById('secondInput').value) || 0;

    if (!isNaN(minuteValue) && !isNaN(secondValue) && (minuteValue > 0 || secondValue > 0)) {
        timerDuration = (minuteValue * 60000) + (secondValue * 1000); // Convert to milliseconds

        // Start the timer
        startTimer(timerDuration);

        document.getElementById('cancelButton').classList.remove('hidden');
        document.getElementById('startButton').disabled = true;
    } else {
        alert('Please enter a valid time.'); // Keep this for user feedback
    }
});

document.getElementById('cancelButton').addEventListener('click', () => {
    clearTimeout(timer);
    clearInterval(countdownInterval);
    countdownDisplay.textContent = '00:00';
    document.getElementById('cancelButton').classList.add('hidden');
    document.getElementById('startButton').disabled = false;
});