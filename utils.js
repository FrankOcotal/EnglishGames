export function updateScores(correctCount, incorrectCount) {
  var correctCountElem = document.getElementById('correctCount');
  var incorrectCountElem = document.getElementById('incorrectCount');
  correctCountElem.textContent = 'Correct: ' + correctCount;
  incorrectCountElem.textContent = 'Incorrect: ' + incorrectCount;
}

export function updateLevel(currentLevel) {
  var levelElem = document.getElementById('level');
  levelElem.textContent = 'Level: ' + currentLevel;
}

export function speak(text) {
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  synth.speak(utterance);
}
