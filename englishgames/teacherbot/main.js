import { initSpeechRecognition, testSpeech } from './speechRecognition.js';
import { updateScores, updateLevel, startGame } from './gameUtils.js';
import { askForName, greetPlayer } from './textToSpeech.js';

window.correctCount = 0;
window.incorrectCount = 0;
window.currentLevel = 1;

window.phraseImage = document.getElementById('phraseImage');
window.logo = document.getElementById('logo');
window.testBtn = document.getElementById('testBtn');
window.correctCountElem = document.getElementById('correctCount');
window.incorrectCountElem = document.getElementById('incorrectCount');
window.levelElem = document.getElementById('level');

// Inicializar el juego
function initGame() {
  askForName().then(name => {
    greetPlayer(name).then(() => {
      startGame();
    });
  });
}

testBtn.addEventListener('click', testSpeech);
initGame();
