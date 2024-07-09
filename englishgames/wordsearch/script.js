let gridSize = 10;
let grid = [];
let selectedCells = [];
let isSelecting = false;
let words = [];

function createGrid() {
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
}

function fillGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
}

function placeWord(word) {
    let placed = false;
    while (!placed) {
        const dir = Math.floor(Math.random() * 2); // 0 horizontal, 1 vertical
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        if (dir === 0 && col + word.length <= gridSize) {
            if (grid[row].slice(col, col + word.length).every(cell => cell === '')) {
                for (let i = 0; i < word.length; i++) {
                    grid[row][col + i] = word[i];
                }
                placed = true;
            }
        } else if (dir === 1 && row + word.length <= gridSize) {
            if (grid.slice(row, row + word.length).every(row => row[col] === '')) {
                for (let i = 0; i < word.length; i++) {
                    grid[row + i][col] = word[i];
                }
                placed = true;
            }
        }
    }
}

function renderGrid() {
    const gridElement = document.getElementById('word-search');
    gridElement.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.textContent = grid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('mousedown', (e) => startSelecting(e, cell));
            cell.addEventListener('mouseenter', (e) => continueSelecting(e, cell));
            cell.addEventListener('mouseup', stopSelecting);
            cell.addEventListener('touchstart', (e) => startSelecting(e, cell), { passive: true });
            cell.addEventListener('touchmove', (e) => continueSelecting(e, cell), { passive: true });
            cell.addEventListener('touchend', stopSelecting);
            gridElement.appendChild(cell);
        }
    }
}

function renderWords() {
    const wordList = document.getElementById('words');
    wordList.innerHTML = '';
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        listItem.dataset.word = word;
        wordList.appendChild(listItem);
    });
}

function startSelecting(event, cell) {
    event.preventDefault();
    isSelecting = true;
    selectedCells = [];
    cell.classList.add('selected');
    selectedCells.push(cell);
}

function continueSelecting(event, cell) {
    if (isSelecting) {
        cell.classList.add('selected');
        selectedCells.push(cell);
    }
}

function stopSelecting(event) {
    isSelecting = false;
    const word = getSelectedWord();
    if (words.includes(word)) {
        markWordAsFound(word);
        highlightWordCells();
    } else {
        clearSelectedCells();
    }
}

function getSelectedWord() {
    if (selectedCells.length < 2) return '';
    const firstCell = selectedCells[0];
    const lastCell = selectedCells[selectedCells.length - 1];
    const row1 = parseInt(firstCell.dataset.row);
    const col1 = parseInt(firstCell.dataset.col);
    const row2 = parseInt(lastCell.dataset.row);
    const col2 = parseInt(lastCell.dataset.col);

    if (row1 === row2) {
        return selectedCells.map(cell => cell.textContent).join('');
    } else if (col1 === col2) {
        return selectedCells.map(cell => cell.textContent).join('');
    }
    return '';
}

function markWordAsFound(word) {
    const listItem = document.querySelector(`#words [data-word="${word}"]`);
    if (listItem) {
        listItem.classList.add('found');
    }
}

function highlightWordCells() {
    selectedCells.forEach(cell => {
        cell.classList.add('found');
        cell.classList.remove('selected');
    });
}

function clearSelectedCells() {
    selectedCells.forEach(cell => cell.classList.remove('selected'));
    selectedCells = [];
}

function exportAsPNG() {
    const wordSearchContainer = document.getElementById('word-search-container');
    html2canvas(wordSearchContainer).then(canvas => {
        const link = document.createElement('a');
        link.download = 'sopa_de_letras.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

function generateWordSearch() {
    const wordsInput = document.getElementById('words-input').value;
    words = wordsInput.split(',').map(word => word.trim().toUpperCase()).filter(word => word.length > 0).slice(0, 7);
    if (words.length === 0) {
        alert('Por favor, ingrese al menos una palabra.');
        return;
    }
    createGrid();
    words.forEach(word => placeWord(word));
    fillGrid();
    renderGrid();
    renderWords();
}

function init() {
    document.getElementById('generate-button').addEventListener('click', generateWordSearch);
    document.getElementById('export-button').addEventListener('click', exportAsPNG);
}

document.addEventListener('DOMContentLoaded', init);
