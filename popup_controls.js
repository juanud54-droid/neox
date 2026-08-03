// =====================================================================
// NeoX COGNITIVE OS v12.5 - INTERFAZ DE VENTANAS FLOTANTES TÁCTILES
// =====================================================================

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("hologram-window");
    const dragZone = document.getElementById("popup-drag-zone");
    const resizer = document.getElementById("popup-resizer");

    if (!popup || !dragZone || !resizer) return;

    let isDragging = false;
    let isResizing = false;
    let startX, startY, startWidth, startHeight, startLeft, startTop;

    // --- SISTEMA DE ARRASTRE DE PANTALLA (DRAG) ---
    function startDrag(e) {
        // Detener el scroll nativo de Android mientras mueves la ventana
        e.preventDefault();
        isDragging = true;
        
        // Identificar si es toque con el dedo o clic con ratón
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        startX = clientX;
        startY = clientY;
        startLeft = popup.offsetLeft;
        startTop = popup.offsetTop;
    }

    // --- SISTEMA DE REDIMENSIONAMIENTO (RESIZE) ---
    function startResize(e) {
        e.preventDefault();
        e.stopPropagation(); // Evita que se active el arrastre al estirar de la esquina
        isResizing = true;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        startX = clientX;
        startY = clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(popup).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(popup).height, 10);
    }

    // --- MANEJO DE MOVIMIENTOS GLOBAL ---
    function moveAction(e) {
        if (!isDragging && !isResizing) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        if (isDragging) {
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            popup.style.left = (startLeft + deltaX) + "px";
            popup.style.top = (startTop + deltaY) + "px";
        }

        if (isResizing) {
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            popup.style.width = Math.max(220, startWidth + deltaX) + "px";
            popup.style.height = Math.max(160, startHeight + deltaY) + "px";
        }
    }

    function stopAction() {
        isDragging = false;
        isResizing = false;
    }

    // ACPLAMIENTO DE CAPTURADORES DE PRESIÓN TÁCTIL (MÓVIL / TABLET)
    dragZone.addEventListener("mousedown", startDrag);
    dragZone.addEventListener("touchstart", startDrag, { passive: false });

    resizer.addEventListener("mousedown", startResize);
    resizer.addEventListener("touchstart", startResize, { passive: false });

    window.addEventListener("mousemove", moveAction);
    window.addEventListener("touchmove", moveAction, { passive: false });

    window.addEventListener("mouseup", stopAction);
    window.addEventListener("touchend", stopAction);
});

// FUNCIÓN DE CIERRE DE COMPUERTA EXPORTADA AL ENTORNO GENERAL
window.cerrarPopup = function() {
    const popup = document.getElementById("hologram-window");
    if (popup) popup.style.display = "none";
};
