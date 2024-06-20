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

// Crear un objeto de audio para los aplausos y precargarlo
var applauseAudio = new Audio('applause.mp3');

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

  recognition.onresult = function(event) {
    var speechResult = event.results[0][0].transcript.toLowerCase();
    if (speechResult === phrase) {
      logo.src = 'img/happy_mode.png';  // Cambiar a la imagen correcta
      correctCount++;
      applauseAudio.play();  // Reproducir el audio de aplausos
      if (correctCount % 5 === 0) {
        currentLevel++;
        if (currentLevel > Object.keys(levelPhrases).length) {
          currentLevel = 1; // Reiniciar al primer nivel si excede el número de niveles
        }
        updateLevel();
      }
    } else {
      logo.src = 'img/sad_mode.png';  // Cambiar a la imagen incorrecta
      incorrectCount++;
    }
    updateScores();
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    console.log('Error occurred in recognition: ' + event.error);
  }

  recognition.onaudiostart = function(event) {
    console.log('SpeechRecognition.onaudiostart');
  }

  recognition.onaudioend = function(event) {
    console.log('SpeechRecognition.onaudioend');
  }

  recognition.onend = function(event) {
    console.log('SpeechRecognition.onend');
  }

  recognition.onnomatch = function(event) {
    console.log('SpeechRecognition.onnomatch');
  }

  recognition.onsoundstart = function(event) {
    console.log('SpeechRecognition.onsoundstart');
  }

  recognition.onsoundend = function(event) {
    console.log('SpeechRecognition.onsoundend');
  }

  recognition.onspeechstart = function(event) {
    console.log('SpeechRecognition.onspeechstart');
  }

  recognition.onstart = function(event) {
    console.log('SpeechRecognition.onstart');
  }
}

testBtn.addEventListener('click', testSpeech);
updateLevel(); // Inicializa el nivel mostrado
