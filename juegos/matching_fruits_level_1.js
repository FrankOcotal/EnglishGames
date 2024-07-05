let score = 0;
let attempts = 5;

// Dictionary for matching images and words
const levels = [
  {
    img1: "word1",
    img2: "word2",
    img3: "word3",
    img4: "word4",
   
  },
  // Add more levels as needed
];

let currentLevel = 0;
const matchingPairs = levels[currentLevel];

function updateScore() {
  document.getElementById('score').textContent = score;
}

function updateAttempts() {
  document.getElementById('attempts').textContent = attempts;
  if (attempts <= 0) {
    resetGame();
  }
}

function resetGame() {
  score = 0;
  attempts = 5;
  updateScore();
  updateAttempts();
  document.querySelectorAll('.draggable').forEach(elem => {
    elem.classList.remove('matched');
    document.querySelector('.w3-center:last-child').appendChild(elem);
  });
  document.querySelectorAll('.dropzone img').forEach(img => {
    img.classList.remove('w3-opacity');
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var dropzone = ev.target.closest('.dropzone');

  if (matchingPairs[dropzone.id] === data) {
    var draggableElem = document.getElementById(data);
    draggableElem.classList.add('matched');
    dropzone.appendChild(draggableElem);
    dropzone.firstElementChild.classList.add('w3-opacity');
    score++;
    updateScore();
    playWinSound();
  } else {
    attempts--;
    updateAttempts();
    playErrorSound();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  resetGame();
});
