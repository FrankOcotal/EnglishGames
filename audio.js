// audio.js
// Crear objetos de audio y precargarlos
var applauseAudio = new Audio('audio/win.wav');
var errorAudio = new Audio('audio/error.wav');

applauseAudio.preload = 'auto';
errorAudio.preload = 'auto';

export function playApplause() {
  applauseAudio.play();
}

export function playError() {
  errorAudio.play();
}
