var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phraseDictionary = {
  
  'I have a rabbit': 'rabbit.png',
  'this is a pencil': 'pencil.png',
  'this is a tiger': 'tiger.png',
  'this is a lion': 'lion.png',
  
  
};

var phrases = Object.keys(phraseDictionary);

var phrasePara = document.querySelector('.phrase');
var phraseImage = document.getElementById('phraseImage');
var resultImage = document.getElementById('resultImage');

var testBtn = document.querySelector('button');

function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phraseKey = phrases[randomPhrase()];
  var phraseImageUrl = phraseDictionary[phraseKey];
  var phrase = phraseKey.toLowerCase();
  
  phraseImage.src = phraseImageUrl;
  phraseImage.style.display = 'block';
  
  resultImage.style.display = 'none';

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
      resultImage.src = 'correct.png';
      resultImage.style.display = 'block';
    } else {
      resultImage.src = 'wrong.png';
      resultImage.style.display = 'block';
    }

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
