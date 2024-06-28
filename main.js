import { testSpeech } from './recognition.js';
import { updateLevel } from './utils.js';

var currentLevel = 1;
var correctCount = 0;
var incorrectCount = 0;

var phraseImage = document.getElementById('phraseImage');
var logo = document.getElementById('logo');
var testBtn = document.querySelector('button');

testBtn.addEventListener('click', function() {
  testSpeech(currentLevel, correctCount, incorrectCount, logo, phraseImage, testBtn);
});

updateLevel(currentLevel); // Inicializa el nivel mostrado
