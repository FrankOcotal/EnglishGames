import { playApplause, playError } from './audio.js';
import { updateScores, updateLevel, randomPhrase } from './gameUtils.js';
import { levelPhrases } from './phrases.js';

// Definir SpeechRecognition y otros objetos relacionados
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognitionTimeout;

function initSpeechRecognition() {
  // Función para inicializar el reconocimiento de voz
}

function testSpeech() {
  window.testBtn.disabled = true;
  window.testBtn.textContent = 'Test in progress';

  var phraseKey = randomPhrase();
  var phraseImageUrl = levelPhrases[window.currentLevel][phraseKey]; // Usar levelPhrases importado
  var phrase = phraseKey.toLowerCase();

  window.phraseImage.src = phraseImageUrl;
  window.phraseImage.style.display = 'block';

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognitionTimeout = setTimeout(function() {
    recognition.stop();
    handleNoSpeechDetected();
  }, 10000);

  recognition.onresult = function(event) {
    clearTimeout(recognitionTimeout);
    var speechResult = event.results[0][0].transcript.toLowerCase();
    if (speechResult === phrase) {
      window.logo.src = 'img/happy_mode.png';
      window.correctCount++;
      playApplause();
      if (window.correctCount % 4 === 0) {
        window.currentLevel++;
        if (window.currentLevel > Object.keys(levelPhrases).length) {
          window.currentLevel = 1;
        }
        updateLevel();
      }
    } else {
      window.logo.src = 'img/sad_mode.png';
      window.incorrectCount++;
      playError();
    }
    updateScores();

    setTimeout(function() {
      window.testBtn.disabled = false;
      window.testBtn.textContent = 'Start new test';
    }, 2000);
  }

  recognition.onspeechend = function() {
    clearTimeout(recognitionTimeout);
    recognition.stop();
  }

  recognition.onerror = function(event) {
    clearTimeout(recognitionTimeout);
    handleNoSpeechDetected();
    console.log('Error occurred in recognition: ' + event.error);
  }

  recognition.onend = function(event) {
    clearTimeout(recognitionTimeout);
    window.testBtn.disabled = false;
    window.testBtn.textContent = 'Start new test';
  }
}

function handleNoSpeechDetected() {
  window.logo.src = 'img/sad_mode.png';
  window.incorrectCount++;
  playError();
  updateScores();
  window.testBtn.disabled = false;
  window.testBtn.textContent = 'Start new test';
}

export { initSpeechRecognition, testSpeech };
