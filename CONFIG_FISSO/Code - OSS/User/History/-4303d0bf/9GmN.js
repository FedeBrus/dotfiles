class Element {
    constructor() {
        
    }
}

function addElement(url, width, height, rotation, startX, startY, zIndex) {
    const element = document.createElement('div');
    element.className = "dungeon-element";
    element.dataset.rotation = 0;

    const img = document.createElement('img');
    img.src = url;
    element.appendChild(img);
    positionElement(element, width, height, startX, startY, zIndex, rotation);

    // HACKKKK
    if (rotation === 0 || rotation === 180) {
        img.style.width = element.style.width;
        img.style.height = element.style.height;
    } else {
        img.style.width = element.style.height;
        img.style.height = element.style.width;
    }

    // Rimozione
    element.addEventListener('dblclick', () => element.remove());

    // Rotazione
    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        let currentRotation = parseInt(element.dataset.rotation, 10);
        let newRotation = (currentRotation + 90) % 360;
        
        let img = element.querySelector('img');
        let oldWidth = element.offsetWidth;
        let oldHeight = element.offsetHeight;

        element.style.width = `${oldHeight}px`;
        element.style.height = `${oldWidth}px`;

        let left = parseInt(element.style.left, 10) + (oldWidth - oldHeight) / 2;
        let top = parseInt(element.style.top, 10) + (oldHeight - oldWidth) / 2;

        element.style.left = `${left}px`;
        element.style.top = `${top}px`;

        // INFINITE BESTEMMIE
        img.style.position = "absolute";
        img.style.top = "50%";
        img.style.left = "50%";
        img.style.transformOrigin = "center";
        img.style.transform = `translate(-50%, -50%) rotate(${newRotation}deg)`;

        element.dataset.rotation = newRotation;

        const containerRect = canvasContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        // let newX = snap((e.clientX - containerRect.left) / scale) - snap(absoluteMouseX) + offsetElementX;
        // let newY = snap((e.clientY - containerRect.top) / scale) - snap(absoluteMouseY) + offsetElementY;

        let newX = snap(Math.round((elementRect.left - containerRect.left) / scale));
        let newY = snap(Math.round((elementRect.top - containerRect.top) / scale));

        if (newX <= 0) newX = 0;
        if (newX > canvasDim - (elementRect.width / scale)) newX = canvasDim - (elementRect.width / scale);

        if (newY <= 0) newY = 0;
        if (newY > canvasDim - (elementRect.height / scale)) newY = canvasDim - (elementRect.height / scale);

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
    });

    // Cambiamento cursore
    element.addEventListener('mouseenter', (e) => {
        element.style.cursor = "pointer";
    });

    // Trascinamento
    element.addEventListener('mousedown', startDrag);

    canvasContainer.appendChild(element);
}

let draggedElement = null;
let relativeMouseX, relativeMouseY;
let absoluteMouseX, absoluteMouseY;
let offsetElementX, offsetElementY;

function startDrag(e) {
    if (e.button !== 0) return;

    draggedElement = e.target.closest('.dungeon-element');
    const containerRect = canvasContainer.getBoundingClientRect();
    const elementRect = draggedElement.getBoundingClientRect();

    // Distanza tra mouse e bordo dell'elemento
    relativeMouseX = (e.clientX - elementRect.left) / scale;
    relativeMouseY = (e.clientY - elementRect.top) / scale;

    // Distanza tra mouse e bordo della griglia
    absoluteMouseX = (e.clientX - containerRect.left) / scale;
    absoluteMouseY = (e.clientY - containerRect.top) / scale;

    // Distanza tra elemento e griglia
    offsetElementX = ((elementRect.left - containerRect.left) / scale);
    offsetElementY = ((elementRect.top - containerRect.top) / scale);

    editorDiv.addEventListener('mousemove', drag);
    editorDiv.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (draggedElement) {
        const containerRect = canvasContainer.getBoundingClientRect();
        const elementRect = draggedElement.getBoundingClientRect();

        let newX = snap((e.clientX - containerRect.left) / scale) - snap(absoluteMouseX) + offsetElementX;
        let newY = snap((e.clientY - containerRect.top) / scale) - snap(absoluteMouseY) + offsetElementY;

        if (newX <= 0) newX = 0;
        if (newX > canvasDim - (elementRect.width / scale)) newX = canvasDim - (elementRect.width / scale);

        if (newY <= 0) newY = 0;
        if (newY > canvasDim - (elementRect.height / scale)) newY = canvasDim - (elementRect.height / scale);

        draggedElement.style.left = `${newX}px`;
        draggedElement.style.top = `${newY}px`;
    }
}

function stopDrag() {
    editorDiv.removeEventListener('mousemove', drag);
    editorDiv.removeEventListener('mouseup', stopDrag);
    draggedElement = null;
}

function positionElement(element, width, height, x, y, z, rotation) {
    element.style.width = `${width * gridSize}px`;
    element.style.height = `${height * gridSize}px`;

    for (let i = 0; i < Math.round(rotation / 90); i++) {
        rotateElement(element, rotation);
    }

    element.style.left = `${x * gridSize}px`;
    element.style.top = `${y * gridSize}px`;
    element.style.zIndex = z;
}

// CHI SA PROGRAMMARE CHIUDA GLI OCCHI! HACK!!!
function rotateElement(element) {
    let currentRotation = parseInt(element.dataset.rotation, 10);
    let newRotation = (currentRotation + 90) % 360;
    
    let img = element.querySelector('img');

    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transformOrigin = "center";
    img.style.transform = `translate(-50%, -50%) rotate(${newRotation}deg)`;

    element.dataset.rotation = newRotation;

    let width = parseInt(element.style.width);
    let height = parseInt(element.style.height);

    element.style.height = `${width}px`;
    element.style.width = `${height}px`;
}

function snap(x) {
    return Math.floor(x / gridSize) * gridSize;
}

/*
TODO

URGENTE: REFACTORARE TUTTO, 
- creare classe elemento
- definire dei metodi solidi


- reinserire tutto porcoddio (meccanico)
- snapping custom per porte ***** (ONE DAY)
- esportare in jpg la configurazione **** (html2canvas) <--- sia lodato Cristo
- inserire la modalità per il tabellone standard del gioco (EZ MA DOPO TI PREGO ToT)
*/

