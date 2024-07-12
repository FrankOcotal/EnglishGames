// audio.js

// Crear objetos de audio y precargarlos
var applauseAudio = new Audio('win.wav');
applauseAudio.preload = 'auto';

var errorAudio = new Audio('error.mp3'); // Asegúrate de tener este archivo de audio
errorAudio.preload = 'auto';

applauseAudio.addEventListener('canplaythrough', function() {
  console.log('Audio de aplausos cargado y listo para reproducirse');
}, false);

applauseAudio.addEventListener('error', function(e) {
  console.log('Error al cargar el audio de aplausos', e);
}, false);

errorAudio.addEventListener('canplaythrough', function() {
  console.log('Audio de error cargado y listo para reproducirse');
}, false);

errorAudio.addEventListener('error', function(e) {
  console.log('Error al cargar el audio de error', e);
}, false);

function playApplause() {
  applauseAudio.play().then(() => {
    console.log('Aplausos reproducidos');
  }).catch((error) => {
    console.log('Error al reproducir aplausos:', error);
  });
}

function playError() {
  errorAudio.play().then(() => {
    console.log('Audio de error reproducido');
  }).catch((error) => {
    console.log('Error al reproducir audio de error:', error);
  });
}
