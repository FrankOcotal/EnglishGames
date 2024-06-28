// audio.js
// Crear objetos de audio y precargarlos
var applauseAudio = new Audio('win.wav');
var errorAudio = new Audio('error.mp3');

applauseAudio.preload = 'auto';
errorAudio.preload = 'auto';

export function playApplause() {
  applauseAudio.play();
}

export function playError() {
  errorAudio.play();
}
