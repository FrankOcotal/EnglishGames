// Seleccionar elementos del DOM
const workspace = document.getElementById('workspace');
const imagenesMenu = document.getElementById('imagenesMenu');
const selectCategoria = document.getElementById('categoria');
const addTextButton = document.getElementById('addTextButton');
const exportButton = document.getElementById('exportButton');
const textSizeSelect = document.getElementById('textSize');

// Función para cargar imágenes en el menú
function cargarImagenes(categoria) {
    imagenesMenu.innerHTML = ''; // Limpia el menú

    imagenes[categoria].forEach(ruta => {
        const img = document.createElement('img');
        img.src = ruta;
        img.draggable = true; // Hace la imagen arrastrable (HTML5)

        // Event listener para arrastrar desde el menú
        img.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', ruta);
        });

        imagenesMenu.appendChild(img);
    });
}

// Event listener para el select de categoría
selectCategoria.addEventListener('change', () => {
    cargarImagenes(selectCategoria.value);
});

// Cargar imágenes iniciales
cargarImagenes('objetos-clase');

// Función para crear un elemento interactivo en el área de trabajo
function createInteractiveElement(element) {
    workspace.appendChild(element);
    interact(element).draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        listeners: {
            start(event) {
                // Opcional: Añadir algún estilo o clase durante el arrastre
            },
            move(event) {
                const x = (parseFloat(element.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(element.getAttribute('data-y')) || 0) + event.dy;
                element.style.transform = `translate(${x}px, ${y}px)`;
                element.setAttribute('data-x', x);
                element.setAttribute('data-y', y);
            },
            end(event) {
                // Opcional: Limpiar estilos o clases después del arrastre
            }
        }
    }).resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
            start(event) {
                // Opcional: Añadir algún estilo o clase durante el redimensionamiento
            },
            move(event) {
                let { x, y } = element.dataset;
                x = (parseFloat(x) || 0) + event.deltaRect.left;
                y = (parseFloat(y) || 0) + event.deltaRect.top;
                Object.assign(element.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                });
                Object.assign(element.dataset, { x, y });

                // Ajustar el tamaño de la fuente proporcionalmente
                if (element.classList.contains('texto-editable')) {
                    const fontSize = textSizeSelect.value;
                    element.style.fontSize = `${fontSize}px`;
                }
            },
            end(event) {
                // Opcional: Limpiar estilos o clases después del redimensionamiento
            }
        }
    });
}

// Event listener para soltar elementos en el área de trabajo
workspace.addEventListener('dragover', (event) => {
    event.preventDefault();
});

workspace.addEventListener('drop', (event) => {
    event.preventDefault();
    const rutaImagen = event.dataTransfer.getData('text/plain');
    const img = document.createElement('img');
    img.src = rutaImagen;
    img.classList.add('elemento-interactivo', 'imagen');
    createInteractiveElement(img);
});

// Agregar texto editable
addTextButton.addEventListener('click', () => {
    const textElement = document.createElement('div');
    textElement.contentEditable = true;
    textElement.innerText = 'Texto Editable';
    textElement.classList.add('elemento-interactivo', 'texto-editable');
    // Aplicar tamaño de texto inicial
    textElement.style.fontSize = `${textSizeSelect.value}px`;
    createInteractiveElement(textElement);
});

// Cambiar el tamaño de la fuente de los elementos de texto editables
textSizeSelect.addEventListener('change', () => {
    const fontSize = textSizeSelect.value;
    document.querySelectorAll('.texto-editable').forEach(element => {
        element.style.fontSize = `${fontSize}px`;
    });
});

// Exportar el área de trabajo como PNG
exportButton.addEventListener('click', () => {
    html2canvas(workspace).then(canvas => {
        const link = document.createElement('a');
        link.download = 'workspace.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
