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

export { askForName, greetPlayer };
