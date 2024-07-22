import { levelPhrases } from './phrases.js';

function updateScores() {
  correctCountElem.textContent = 'Correct: ' + window.correctCount;
  incorrectCountElem.textContent = 'Incorrect: ' + window.incorrectCount;
  
  // Guardar puntos en localStorage
  localStorage.setItem('correctCount', window.correctCount);
  localStorage.setItem('incorrectCount', window.incorrectCount);
}

function updateLevel() {
  levelElem.textContent = 'Level: ' + window.currentLevel;
}

function randomPhrase() {
  var phrases = Object.keys(levelPhrases[window.currentLevel]);
  var number = Math.floor(Math.random() * phrases.length);
  return phrases[number];
}

function startGame() {
  // Recuperar puntos del localStorage
  window.correctCount = parseInt(localStorage.getItem('correctCount')) || 0;
  window.incorrectCount = parseInt(localStorage.getItem('incorrectCount')) || 0;

  updateLevel(); // Inicializa el nivel mostrado
}

export { updateScores, updateLevel, randomPhrase, startGame };
