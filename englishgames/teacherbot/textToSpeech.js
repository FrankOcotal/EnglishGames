// textToSpeech.js
import { questions } from './questions.js'; // Si tienes un archivo de preguntas

function askForName() {
  return new Promise((resolve) => {
    var msg = new SpeechSynthesisUtterance('What is your name?');
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);

    msg.onend = () => {
      var nameInput = prompt('Please enter your name:');
      resolve(nameInput);
    };
  });
}

function greetPlayer(name) {
  return new Promise((resolve) => {
    var msg = new SpeechSynthesisUtterance('Nice to meet you, ' + name);
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);

    msg.onend = () => {
      resolve();
    };
  });
}

function askQuestion(index) {
  return new Promise((resolve) => {
    const question = questions[index];
    var msg = new SpeechSynthesisUtterance(question.question);
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);

    msg.onend = () => {
      const questionModal = document.getElementById('questionModal');
      const questionText = document.getElementById('questionText');
      const answerButtons = document.getElementById('answerButtons');

      // Mostrar la pregunta
      questionText.textContent = question.question;
      answerButtons.innerHTML = ''; // Limpiar respuestas anteriores

      // Crear botones para cada respuesta
      question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'w3-btn w3-blue w3-margin-bottom';
        button.textContent = answer;
        button.onclick = () => {
          questionModal.style.display = 'none';
          resolve(answer);
        };
        answerButtons.appendChild(button);
      });

      // Mostrar el modal
      questionModal.style.display = 'block';
    };
  });
}

export { askForName, greetPlayer, askQuestion };