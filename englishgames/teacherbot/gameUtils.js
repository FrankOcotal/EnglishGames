import { levelPhrases } from './phrases.js';

function updateScores() {
  correctCountElem.textContent = 'Correct: ' + window.correctCount;
  incorrectCountElem.textContent = 'Incorrect: ' + window.incorrectCount;
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
  updateLevel(); // Inicializa el nivel mostrado
}

export { updateScores, updateLevel, randomPhrase, startGame };
