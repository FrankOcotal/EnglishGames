const errorAudio = new Audio('error.mp3');
const winAudio = new Audio('win.wav');

function playErrorSound() {
  errorAudio.play();
}

function playWinSound() {
  winAudio.play();
}
