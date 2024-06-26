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

// Crear objetos de audio y precargarlos
var applauseAudio = new Audio('win.wav');
var errorAudio = new Audio('error.wav');

applauseAudio.preload = 'auto';
errorAudio.preload = 'auto';

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

function speak(text) {
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  synth.speak(utterance);
}

function resetButton() {
  testBtn.disabled = false;
  testBtn.textContent = 'Start new test';
}

function handleSpeechRecognitionResult(event, expectedResponse) {
  var speechResult = event.results[0][0].transcript.toLowerCase();
  var isCorrect = false;

  if (currentLevel < 5) {
    isCorrect = (speechResult === expectedResponse);
  } else {
    var expectedPrefix = levelResponses[phraseKey].toLowerCase();
    isCorrect = speechResult.startsWith(expectedPrefix);
  }

  if (isCorrect) {
    logo.src = 'img/happy_mode.png';
    correctCount++;
    applauseAudio.play();
    if (correctCount % 5 === 0) {
      currentLevel++;
      if (currentLevel > Object.keys(levelPhrases).length) {
        currentLevel = 1; // Reiniciar al primer nivel si excede el número de niveles
      }
      updateLevel();
    }
  } else {
    logo.src = 'img/sad_mode.png';
    incorrectCount++;
    errorAudio.play();
  }
  updateScores();
  console.log('Confidence: ' + event.results[0][0].confidence);

  setTimeout(resetButton, 3000);
}

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phraseKey = randomPhrase();
  var phraseImageUrl = levelPhrases[currentLevel][phraseKey];
  var phrase = phraseKey.toLowerCase();

  if (currentLevel < 5) {
    phraseImage.src = "img/" + phraseImageUrl;
    phraseImage.style.display = 'block';
  } else {
    speak(phraseKey);
  }

  var expectedResponse = (currentLevel < 5) ? phrase : levelResponses[phraseKey].toLowerCase();

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + expectedResponse + ' | ' + expectedResponse.replace(/[^a-zA-Z ]/g, '') + ';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    handleSpeechRecognitionResult(event, expectedResponse);
  };

  recognition.onspeechend = function() {
    recognition.stop();
  };

  recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
    logo.src = 'img/sad_mode.png';
    incorrectCount++;
    errorAudio.play();
    updateScores();
    setTimeout(resetButton, 3000);
  };

  recognition.onnomatch = function(event) {
    console.log('SpeechRecognition.onnomatch');
    logo.src = 'img/sad_mode.png';
    incorrectCount++;
    errorAudio.play();
    updateScores();
    setTimeout(resetButton, 3000);
  };

  recognition.onaudiostart = function(event) {
    console.log('SpeechRecognition.onaudiostart');
  };

  recognition.onaudioend = function(event) {
    console.log('SpeechRecognition.onaudioend');
  };

  recognition.onend = function(event) {
    console.log('SpeechRecognition.onend');
  };

  recognition.onsoundstart = function(event) {
    console.log('SpeechRecognition.onsoundstart');
  };

  recognition.onsoundend = function(event) {
    console.log('SpeechRecognition.onsoundend');
  };

  recognition.onspeechstart = function(event) {
    console.log('SpeechRecognition.onspeechstart');
  };

  recognition.onstart = function(event) {
    console.log('SpeechRecognition.onstart');
  };
}

testBtn.addEventListener('click', testSpeech);
updateLevel(); // Inicializa el nivel mostrado
