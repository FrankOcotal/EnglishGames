var applauseAudio = new Audio('win.wav');
applauseAudio.preload = 'auto';

var errorAudio = new Audio('error.mp3');
errorAudio.preload = 'auto';

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

export { playApplause, playError };
