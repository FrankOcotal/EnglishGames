let score = 0;
let attempts = 5;
let currentLevel = 0;
let levels = [];

function fetchLevels() {
  return fetch('levels.json')
    .then(response => response.json())
    .then(data => {
      levels = data;
      loadLevel(currentLevel);
    });
}

function updateScore() {
  document.getElementById('score').textContent = score;
  if (score === 4) {
    if (currentLevel < levels.length - 1) {
      currentLevel++;
      score = 0; // Reset score for new level
      loadLevel(currentLevel);
    } else {
      showCompletionMessage();
    }
  }
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
  currentLevel = 0;
  updateScore();
  updateAttempts();
  loadLevel(currentLevel);
}

function loadLevel(levelIndex) {
  const level = levels[levelIndex];
  const dropzonesContainer = document.getElementById('dropzones');
  const draggablesContainer = document.getElementById('draggables');

  dropzonesContainer.innerHTML = '';
  draggablesContainer.innerHTML = '';

  document.getElementById('level').textContent = levelIndex + 1;

  for (const [imgId, imgSrc] of Object.entries(level.images)) {
    const dropzone = document.createElement('div');
    dropzone.className = 'w3-card dropzone';
    dropzone.id = imgId;
    dropzone.ondrop = drop;
    dropzone.ondragover = allowDrop;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '100px';
    img.style.height = '100px';

    dropzone.appendChild(img);
    dropzonesContainer.appendChild(dropzone);
  }

  for (const [wordId, word] of Object.entries(level.words)) {
    const draggable = document.createElement('div');
    draggable.className = 'draggable';
    draggable.id = wordId;
    draggable.draggable = true;
    draggable.ondragstart = drag;
    draggable.textContent = word;

    draggablesContainer.appendChild(draggable);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const dropzone = ev.target.closest('.dropzone');

  if (levels[currentLevel].pairs[dropzone.id] === data) {
    const draggableElem = document.getElementById(data);
    draggableElem.classList.add('matched');
    dropzone.appendChild(draggableElem);
    dropzone.firstElementChild.classList.add('w3-opacity');
    score++;
    updateScore();
    playWinSound(); // Define esta función si es necesario
  } else {
    attempts--;
    updateAttempts();
    playErrorSound(); // Define esta función si es necesario
  }
}

function showCompletionMessage() {
  const gameContainer = document.querySelector('.w3-container');
  gameContainer.innerHTML = `
    <div class="w3-card w3-center w3-padding-large">
      <h2>¡Has logrado todos los niveles!</h2>
     
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchLevels().then(() => {
    loadLevel(currentLevel);
  });
});
