let gameArea = document.getElementById('stadium');

// Función para agregar un nuevo elemento al estadio
function addObject(type) {
    const element = document.createElement('div');
    element.classList.add('elemento', type);

    // Establecer un valor aleatorio para la ubicación inicial (simulando el diseño libre)
    element.style.top = `${Math.random() * 80}%`;
    element.style.left = `${Math.random() * 80}%`;

    // Añadir el elemento al estadio
    gameArea.appendChild(element);

    // Hacer el elemento movible
    makeElementDraggable(element);
}

// Función para hacer que los elementos sean movibles
function makeElementDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        element.style.transition = 'none'; // Desactivar la transición mientras arrastra
    });

    window.addEventListener('mousemove', function (e) {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    window.addEventListener('mouseup', function () {
        isDragging = false;
        element.style.transition = 'transform 0.3s ease'; // Volver a la transición normal
    });
}

// Guardar el estado del estadio (simulación de persistencia en localStorage)
window.addEventListener('beforeunload', () => {
    let elements = gameArea.getElementsByClassName('elemento');
    let elementsState = Array.from(elements).map(el => ({
        type: el.classList[1],
        top: el.style.top,
        left: el.style.left
    }));
    localStorage.setItem('stadiumState', JSON.stringify(elementsState));
});

// Cargar el estado del estadio (al recargar la página)
window.addEventListener('load', () => {
    let savedState = JSON.parse(localStorage.getItem('stadiumState')) || [];
    savedState.forEach(state => {
        addObject(state.type);
        let element = gameArea.lastElementChild;
        element.style.top = state.top;
        element.style.left = state.left;
    });
});
