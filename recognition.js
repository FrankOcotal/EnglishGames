
  import { playApplause, playError } from './audio.js';
import { updateScores, updateLevel, resetButton, speak } from './utils.js';

const recognitionTimeout = 5000; // 5 segundos

export function testSpeech(levelPhrases, currentLevel, correctCount, incorrectCount, logo, phraseImage, testBtn) {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phraseKey = randomPhrase(levelPhrases, currentLevel);
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

  var timeoutHandler = setTimeout(function() {
    console.log('No speech detected, timing out.');
    handleNoSpeech();
  }, recognitionTimeout);

  recognition.start();

  recognition.onresult = function(event) {
    clearTimeout(timeoutHandler); // Clear the timeout since we got a result

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
    console.log('Confidence: ' + event.results[0][0].confidence);

    setTimeout(resetButton, 3000, testBtn);
  };

  recognition.onspeechend = function() {
    recognition.stop();
  };

  recognition.onerror = function(event) {
    clearTimeout(timeoutHandler); // Clear the timeout since an error occurred
    handleRecognitionError(event, testBtn, logo, incorrectCount);
  };

  recognition.onnomatch = function(event) {
    clearTimeout(timeoutHandler); // Clear the timeout since no match was found
    handleNoMatch(testBtn, logo, incorrectCount);
  };

  recognition.onaudiostart = function(event) {
    console.log('SpeechRecognition.onaudiostart');
  };

  recognition.onaudioend = function(event) {
    console.log('SpeechRecognition.onaudioend');
  };

  recognition.onend = function(event) {
    clearTimeout(timeoutHandler); // Clear the timeout since recognition ended
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

  function handleNoSpeech() {
    recognition.stop();
    logo.src = 'img/sad_mode.png';
    incorrectCount++;
    playError();
    updateScores(correctCount, incorrectCount);
    resetButton(testBtn);
  }

  function handleRecognitionError(event, testBtn, logo, incorrectCount) {
    console.log('Error occurred in recognition: ' + event.error);
    logo.src = 'img/sad_mode.png';
    incorrectCount++;
    playError();
    updateScores(correctCount, incorrectCount);
    resetButton(testBtn);
  }

  function handleNoMatch(testBtn, logo, incorrectCount) {
    console.log('SpeechRecognition.onnomatch');
    logo.src = 'img/sad_mode.png';
    incorrectCount++;
    playError();
    updateScores(correctCount, incorrectCount);
    resetButton(testBtn);
  }
}

function randomPhrase(levelPhrases, currentLevel) {
  var phrases = Object.keys(levelPhrases[currentLevel]);
  var number = Math.floor(Math.random() * phrases.length);
  return phrases[number];
}
