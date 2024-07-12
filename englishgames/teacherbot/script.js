var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var currentLevel = 1;
var correctCount = 0;
var incorrectCount = 0;

var phraseImage = document.getElementById('phraseImage');
var logo = document.getElementById('logo');
var testBtn = document.querySelector('button');
var correctCountElem = document.getElementById('correctCount');
var incorrectCountElem = document.getElementById('incorrectCount');
var levelElem = document.getElementById('level');
var recognitionTimeout;  // Variable para el temporizador

function updateScores() {
  correctCountElem.textContent = 'Correct: ' + correctCount;
  incorrectCountElem.textContent = 'Incorrect: ' + incorrectCount;
}

function updateLevel() {
  levelElem.textContent = 'Level: ' + currentLevel;
}

function randomPhrase() {
  var phrases = Object.keys(levelPhrases[currentLevel]);
  var number = Math.floor(Math.random() * phrases.length);
  return phrases[number];
}

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phraseKey = randomPhrase();
  var phraseImageUrl = levelPhrases[currentLevel][phraseKey];
  var phrase = phraseKey.toLowerCase();

  phraseImage.src = "img/" + phraseImageUrl;
  phraseImage.style.display = 'block';

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  // Inicia el temporizador de 10 segundos
  recognitionTimeout = setTimeout(function() {
    recognition.stop();
    handleNoSpeechDetected();
  }, 10000);

  recognition.onresult = function(event) {
    clearTimeout(recognitionTimeout);  // Cancela el temporizador si hay un resultado
    var speechResult = event.results[0][0].transcript.toLowerCase();
    if (speechResult === phrase) {
      logo.src = 'img/happy_mode.png';  // Imagen para la respuesta correcta
      correctCount++;
      playApplause();  // Reproducir audio de aplausos
      if (correctCount % 5 === 0) {
        currentLevel++;
        if (currentLevel > Object.keys(levelPhrases).length) {
          currentLevel = 1; // Reiniciar al primer nivel si se excede el número de niveles
        }
        updateLevel();
      }
    } else {
      logo.src = 'img/sad_mode.png';  // Imagen para la respuesta incorrecta
      incorrectCount++;
      playError();  // Reproducir audio de error
    }
    updateScores();
    console.log('Confidence: ' + event.results[0][0].confidence);

    setTimeout(function() {
      testBtn.disabled = false;
      testBtn.textContent = 'Start new test';
    }, 2000); // Rehabilitar el botón después de 2 segundos
  }

  recognition.onspeechend = function() {
    clearTimeout(recognitionTimeout);  // Cancela el temporizador si se detecta el final del habla
    recognition.stop();
  }

  recognition.onerror = function(event) {
    clearTimeout(recognitionTimeout);  // Cancela el temporizador en caso de error
    handleNoSpeechDetected();
    console.log('Error occurred in recognition: ' + event.error);
  }

  recognition.onend = function(event) {
    clearTimeout(recognitionTimeout);  // Asegura que el temporizador se cancela al finalizar el reconocimiento
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    console.log('Speech recognition service disconnected');
  }

  // Otros eventos opcionales de depuración
  recognition.onaudiostart = function(event) { console.log('SpeechRecognition.onaudiostart'); }
  recognition.onaudioend = function(event) { console.log('SpeechRecognition.onaudioend'); }
  recognition.onnomatch = function(event) { console.log('SpeechRecognition.onnomatch'); }
  recognition.onsoundstart = function(event) { console.log('SpeechRecognition.onsoundstart'); }
  recognition.onsoundend = function(event) { console.log('SpeechRecognition.onsoundend'); }
  recognition.onspeechstart = function(event) { console.log('SpeechRecognition.onspeechstart'); }
  recognition.onstart = function(event) { console.log('SpeechRecognition.onstart'); }
}

function handleNoSpeechDetected() {
  logo.src = 'img/sad_mode.png';  // Imagen para el caso de tiempo agotado o error
  incorrectCount++;
  playError();  // Reproducir audio de error
  updateScores();
  testBtn.disabled = false;
  testBtn.textContent = 'Start new test';
}

testBtn.addEventListener('click', testSpeech);
updateLevel(); // Inicializa el nivel mostrado
