// =====================================================================
// NeoX OS v22.0 - CONTROLADOR DE VENTANAS HOLOGRÁFICAS DRAGGABLE & RESIZE
// =====================================================================

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("hologram-window");
    const dragZone = document.getElementById("popup-drag-zone");
    const resizer = document.getElementById("popup-resizer");
    if (!popup || !dragZone || !resizer) return;
    
    let isDragging = false; 
    let isResizing = false;
    let startX, startY, startWidth, startHeight, startLeft, startTop;

    // Activadores para PC y Ratón
    dragZone.addEventListener("mousedown", startDrag);
    resizer.addEventListener("mousedown", startResize);
    window.addEventListener("mousemove", moveAction);
    window.addEventListener("mouseup", stopAction);

    function startDrag(e) {
        isDragging = true;
        const p = e.touches ? e.touches : e;
        startX = p.clientX; 
        startY = p.clientY; 
        startLeft = popup.offsetLeft; 
        startTop = popup.offsetTop;
    }
    // Inyectores táctiles directos con captura nativa para la tablet
    dragZone.addEventListener("touchstart", function(e) {
        if (e.touches.length !== 1) return;
        startDrag(e.touches[0]);
    }, { passive: true });

    resizer.addEventListener("touchstart", function(e) {
        e.stopPropagation();
        if (e.touches.length !== 1) return;
        startResize(e.touches[0]);
    }, { passive: true });

    window.addEventListener("touchmove", function(e) {
        if (!isDragging && !isResizing) return;
        if (e.touches.length !== 1) return;
        moveAction(e.touches[0]);
    }, { passive: true });

    window.addEventListener("touchend", stopAction);

    function startResize(e) {
        isResizing = true;
        startX = e.clientX; 
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(popup).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(popup).height, 10);
    }
    function moveAction(e) {
        if (!isDragging && !isResizing) return;
        const p = e.touches ? e.touches[0] : e;
        
        if (isDragging) {
            popup.style.left = (startLeft + (p.clientX - startX)) + "px";
            popup.style.top = (startTop + (p.clientY - startY)) + "px";
        }
        if (isResizing) {
            popup.style.width = Math.max(220, startWidth + (p.clientX - startX)) + "px";
            popup.style.height = Math.max(160, startHeight + (p.clientY - startY)) + "px";
        }
    }

    function stopAction() {
        isDragging = false;
        isResizing = false;
    }
});

// Despachador para expandir la neurona a pantalla completa de forma independiente
window.ampliarNeuronaCompleta = function() {
    const popup = document.getElementById("hologram-window");
    if (!popup) return;
    popup.style.top = "10px";
    popup.style.left = "80px";
    popup.style.width = "calc(100% - 95px)";
    popup.style.height = "calc(100% - 20px)";
    window.logTerminalCore("HUD_INTERFACE", "Maximizando terminal de sinapsis a pantalla completa.");
};

window.cerrarPopup = function() {
    const p = document.getElementById("hologram-window");
    const b = document.getElementById("floating-node-btn");
    if (p) p.style.display = "none";
    if (b) b.style.display = "none";
    window.logTerminalCore("HUD_INTERFACE", "Cerrando consolas flotantes y limpiando Canvas.");
};
