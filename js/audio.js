const errorAudio = new Audio('/js/error.mp3');
const winAudio = new Audio('/js/win.wav');

function playErrorSound() {
  errorAudio.play();
}

function playWinSound() {
  winAudio.play();
}
