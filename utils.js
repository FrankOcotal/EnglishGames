// utils.js

var correctCountElem = document.getElementById('correctCount');
var incorrectCountElem = document.getElementById('incorrectCount');

export function updateScores(correctCount, incorrectCount) {
  correctCountElem.textContent = 'Correct: ' + correctCount;
  incorrectCountElem.textContent = 'Incorrect: ' + incorrectCount;
}

export function updateLevel(currentLevel) {
  var levelElem = document.getElementById('level');
  levelElem.textContent = 'Level: ' + currentLevel;
}
