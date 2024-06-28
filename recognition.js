import { levelPhrases, levelResponses } from './phrases.js';
import { updateScores, updateLevel, speak } from './utils.js';
import { playApplause, playError } from './audio.js';

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

export function testSpeech(currentLevel, correctCount, incorrectCount, logo, phraseImage, testBtn) {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phraseKey = randomPhrase(currentLevel);
  var phraseImageUrl = levelPhrases[currentLevel][phraseKey];
  var phrase = phraseKey.toLowerCase();

  if (currentLevel < 5) {
    phraseImage.src = "img/" + phraseImageUrl;
    phraseImage.style.display = 'block';
  } else {
    speak(phraseKey);
  }

  var expectedResponse = (currentLevel < 5) ? phrase : levelResponses[phraseKey].toLowerCase();

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + expectedResponse + ';';
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
    if (speechResult === expectedResponse) {
      logo.src = 'img/happy_mode.png';
      correctCount++;
      playApplause();
      if (correctCount % 5 === 0) {
        currentLevel++;
        if (currentLevel > Object.keys(levelPhrases).length) {
          currentLevel = 1; // Reiniciar al primer nivel si excede el número de niveles
        }
        updateLevel(currentLevel);
      }
    } else {
      logo.src = 'img/sad_mode.png';
      incorrectCount++;
      playError();
    }
    updateScores(correctCount, incorrectCount);

    setTimeout(function() {
      testBtn.disabled = false;
      testBtn.textContent = 'Start new test';
    }, 2000);
  };

  recognition.onspeechend = function() {
    recognition.stop();
  };

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    console.log('Error occurred in recognition: ' + event.error);
  };

  recognition.onsoundend = function() {
    setTimeout(function() {
      testBtn.disabled = false;
      testBtn.textContent = 'Start new test';
    }, 2000);
  };

  recognition.onaudiostart = function(event) {
    console.log('SpeechRecognition.onaudiostart');
  };

  recognition.onaudioend = function(event) {
    console.log('SpeechRecognition.onaudioend');
  };

  recognition.onend = function(event) {
    console.log('SpeechRecognition.onend');
    if (!recognition.finalResult) {
      testBtn.disabled = false;
      testBtn.textContent = 'Start new test';
    }
  };

  recognition.onnomatch = function(event) {
    console.log('SpeechRecognition.onnomatch');
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

function randomPhrase(currentLevel) {
  var phrases = Object.keys(levelPhrases[currentLevel]);
  var number = Math.floor(Math.random() * phrases.length);
  return phrases[number];
}
