let score = 0;
let timer = 5;
let timerInterval;

function updateScore() {
  document.getElementById('score').textContent = score;
}

function updateTimer() {
  document.getElementById('timer').textContent = timer;
  if (timer <= 0) {
    clearInterval(timerInterval);
    alert("Time's up! Restarting the game.");
    resetGame();
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    updateTimer();
  }, 1000);
}

function resetGame() {
  score = 0;
  timer = 5;
  updateScore();
  updateTimer();
  document.querySelectorAll('.draggable').forEach(elem => {
    elem.classList.remove('matched');
    document.querySelector('.w3-center:last-child').appendChild(elem);
  });
  document.querySelectorAll('.dropzone img').forEach(img => {
    img.classList.remove('w3-opacity');
  });
  startTimer();
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

  if ((data === "word1" && dropzone.id === "img1") ||
      (data === "word2" && dropzone.id === "img2") ||
      (data === "word3" && dropzone.id === "img3") ||
      (data === "word4" && dropzone.id === "img4") ||
      (data === "word5" && dropzone.id === "img5") ||
      (data === "word6" && dropzone.id === "img6")) {
    var draggableElem = document.getElementById(data);
    draggableElem.classList.add('matched');
    dropzone.appendChild(draggableElem);
    dropzone.firstElementChild.classList.add('w3-opacity');
    score++;
    updateScore();
  } else {
    alert("Incorrect match!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  resetGame();
});
