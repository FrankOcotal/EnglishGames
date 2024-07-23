import { initSpeechRecognition, testSpeech } from './speechRecognition.js';
import { updateScores, updateLevel, startGame } from './gameUtils.js';
import { askForName, greetPlayer, askQuestion } from './textToSpeech.js'; 
import { playApplause, playError } from './audio.js'; // Importar funciones de audio
import { questions } from './questions.js'; // Importar preguntas

window.correctCount = 0;
window.incorrectCount = 0;
window.currentLevel = 1;
window.attemptsLeft = 5; // Limite de intentos

window.phraseImage = document.getElementById('phraseImage');
window.logo = document.getElementById('logo');
window.testBtn = document.getElementById('testBtn');
window.correctCountElem = document.getElementById('correctCount');
window.incorrectCountElem = document.getElementById('incorrectCount');
window.levelElem = document.getElementById('level');

// Inicializar el juego
async function initGame() {
  const name = await askForName();
  await greetPlayer(name);
  startGame();
  showNextQuestion(0); // Comenzar con la primera pregunta
}

async function showNextQuestion(index) {
  if (window.attemptsLeft <= 0) {
    alert('No attempts left. Restarting the game.');
    window.attemptsLeft = 5;
    window.currentLevel = 1;
    updateLevel();
    return;
  }

  const answer = await askQuestion(index);

  // Validar la respuesta y actualizar puntos
  const correctAnswer = questions[index].correctAnswer;
  if (answer === correctAnswer) {
    window.correctCount++;
    updateScores();
    playApplause(); // Asegúrate de que esta función está definida y correctamente importada
  } else {
    window.incorrectCount++;
    updateScores();
    playError(); // Asegúrate de que esta función está definida y correctamente importada
  }

  window.attemptsLeft--;
  
  // Avanzar a la siguiente pregunta
  if (index + 1 < questions.length) {
    showNextQuestion(index + 1);
  } else {
    alert('No more questions. Restarting the game.');
    window.attemptsLeft = 5;
    window.currentLevel = 1;
    updateLevel();
    window.testBtn.disabled = false; // Activar el botón "Start new test"
  }
}

// Desactivar el botón "Start new test" al inicio del juego
window.testBtn.disabled = true;

testBtn.addEventListener('click', testSpeech);
initGame();
