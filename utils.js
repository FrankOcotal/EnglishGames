export function updateScores(correctCount, incorrectCount) {
  document.getElementById('correctCount').textContent = 'Correct: ' + correctCount;
  document.getElementById('incorrectCount').textContent = 'Incorrect: ' + incorrectCount;
}

export function updateLevel(currentLevel) {
  document.getElementById('level').textContent = 'Level: ' + currentLevel;
}

export function resetButton(testBtn) {
  testBtn.disabled = false;
  testBtn.textContent = 'Start new test';
}

export function speak(text) {
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  synth.speak(utterance);
}
