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
  } else {
    alert("Incorrect match!");
  }
}
