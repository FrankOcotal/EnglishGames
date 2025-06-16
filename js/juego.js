const questions = [
  {
    question: "¿Qué tipo de energía se obtiene al girar un motor pequeño con la mano?",
    image: "img/energia_electrica.jpg",
    options: ["Térmica", "Solar", "Eléctrica", "Química"],
    answer: 2
  },
  {
    question: "¿Qué función tiene el eje del motor en este experimento?",
    image: "img/eje_motor.jpg",
    options: ["Girar para producir energía", "Absorber calor", "Emitir luz", "Transportar agua"],
    answer: 0
  },
  {
    question: "¿Qué ocurre si giras el motor más rápido?",
    image: "img/giro_motor.jpg",
    options: ["Se produce más energía", "Se enfría el motor", "Se detiene", "No pasa nada"],
    answer: 0
  },
  {
    question: "¿Cómo se puede comprobar que se generó energía?",
    image: "img/led_encendido.jpg",
    options: ["Se enciende un LED", "Se calienta el motor", "Se escucha un sonido", "Se siente una vibración"],
    answer: 0
  },
  {
    question: "¿Qué dispositivo se puede encender con este tipo de energía?",
    image: "img/luz_led.jpg",
    options: ["Una lámpara LED", "Un microondas", "Una refrigeradora", "Un televisor"],
    answer: 0
  },
  {
    question: "¿Qué se necesita para que el motor genere electricidad?",
    image: "img/energia_mecanica.jpg",
    options: ["Energía mecánica", "Energía solar", "Una batería", "Energía térmica"],
    answer: 0
  },
  {
    question: "¿Qué nombre recibe un motor que genera energía eléctrica al girar?",
    image: "img/generador.jpg",
    options: ["Generador", "Transformador", "Reactor", "Interruptor"],
    answer: 0
  },
  {
    question: "¿Qué tipo de corriente genera un motor pequeño al girar?",
    image: "img/corriente_continua.jpg",
    options: ["Corriente alterna", "Corriente continua", "Corriente de aire", "Corriente marina"],
    answer: 1
  },
  {
    question: "¿Qué parte del motor convierte el movimiento en electricidad?",
    image: "img/bobina.jpg",
    options: ["El bobinado", "El plástico", "La base", "La carcasa"],
    answer: 0
  },
  {
    question: "¿Qué sucede si conectamos un LED directamente al motor girado manualmente?",
    image: "img/led_motor.jpg",
    options: ["Se ilumina si hay suficiente voltaje", "Explota", "Se apaga para siempre", "Se vuelve rojo"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let failures = 0;
let shuffledQuestions = [];
let timer;
let timeLeft = 10;
let currentUser = "";

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  failures = 0;
  timeLeft = 10;
  currentUser = document.getElementById("usernameInput").value.trim();
  if (!currentUser) {
    alert("Por favor, ingresa tu nombre antes de comenzar el juego.");
    return;
  }
  shuffledQuestions = questions.sort(() => 0.5 - Math.random());
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("score").textContent = "";
  document.getElementById("failures").textContent = "";
  document.getElementById("quizBox").style.display = "block";
  document.getElementById("userSection").style.display = "none";
  document.getElementById("scoreBoard").style.display = "none";
  loadQuestion();
}

function loadQuestion() {
  const q = shuffledQuestions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  const existingImg = document.getElementById("questionImage");
  if (existingImg) existingImg.remove();
  const img = document.createElement("img");
  img.id = "questionImage";
  img.src = q.image;
  img.alt = "Ilustración de la pregunta";
  img.style.maxWidth = "400px";
  img.style.margin = "10px auto";
  img.style.display = "block";
  document.getElementById("question").after(img);

  q.options.forEach((opt, index) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => {
      clearInterval(timer);
      checkAnswer(index);
    };
    optionsDiv.appendChild(btn);
  });

  timeLeft = 10;
  document.getElementById("timer").textContent = `⏱ Tiempo restante: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `⏱ Tiempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer(-1);
    }
  }, 1000);
}

function checkAnswer(selected) {
  const options = document.querySelectorAll(".option");
  options.forEach((opt, index) => {
    opt.onclick = null;
    if (index === shuffledQuestions[currentQuestion].answer) {
      opt.classList.add("correct");
    } else if (index === selected) {
      opt.classList.add("incorrect");
    }
  });
  if (selected === shuffledQuestions[currentQuestion].answer) {
    score++;
  } else {
    failures++;
  }
  document.getElementById("nextBtn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion();
    document.getElementById("nextBtn").style.display = "none";
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quizBox").style.display = "none";
  document.getElementById("score").textContent = `Aciertos: ${score} de ${shuffledQuestions.length}`;
  document.getElementById("failures").textContent = `Errores: ${failures}`;
  document.getElementById("restartBtn").style.display = "inline-block";
  saveScore();
}

function saveScore() {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push({ name: currentUser, score });
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

function showScores() {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  const scoreBoard = document.getElementById("scoreBoard");
  scoreBoard.innerHTML = "<h2>🏆 Puntajes de estudiantes</h2>";
  if (scores.length === 0) {
    scoreBoard.innerHTML += "<p>No hay puntajes guardados aún.</p>";
  } else {
    const list = document.createElement("ul");
    list.style.listStyle = "none";
    list.style.padding = "0";
    scores.forEach((entry, index) => {
      const item = document.createElement("li");
      item.style.padding = "8px";
      item.style.margin = "5px auto";
      item.style.border = "1px solid #ccc";
      item.style.borderRadius = "8px";
      item.style.background = "#fff";
      item.style.maxWidth = "300px";
      item.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      item.textContent = `${index + 1}. ${entry.name}: ${entry.score} puntos`;
      list.appendChild(item);
    });
    scoreBoard.appendChild(list);
  }
  scoreBoard.style.display = "block";
}

function clearScores() {
  if (confirm("¿Estás seguro de que deseas borrar todos los puntajes?")) {
    localStorage.removeItem("quizScores");
    document.getElementById("scoreBoard").style.display = "none";
    alert("Puntajes borrados correctamente.");
  }
}

document.getElementById("showScoresBtn").addEventListener("click", showScores);
document.getElementById("clearScoresBtn").addEventListener("click", clearScores);

const timerEl = document.createElement("h3");
timerEl.id = "timer";
document.getElementById("quizBox").insertBefore(timerEl, document.getElementById("options"));
