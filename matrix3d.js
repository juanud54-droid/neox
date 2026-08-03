// =====================================================================
// NeoX COGNITIVE OS v12.0 - MOTOR GRÁFICO E INTERACTIVO 3D - PARTE 1 DE 2
// =====================================================================

const canvas = document.getElementById("neuralNet");
const ctx = canvas ? canvas.getContext("2d") : null;
let nodos = [];
const totalNodos = 50; 

let angY = 0.003, angX = 0.001;
let isDraggingNetwork = false;
let previousMousePosition = { x: 0, y: 0 };
let fov = 130;
let seleccionadoIndex = null;

let labelsBase = ["NeoX_Core", "JARVIS_Matrix", "Quantum_Vault", "Memory_JSON", "Google_1.5", "Cyberpunk_UI", "User_Carlos", "Synapse_v12", "Cortex_Link", "Data_Stream"];

window.resCanvas = function() {
    if (!canvas || !canvas.parentNode) return;
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight - 40;
};
window.addEventListener('resize', window.resCanvas);
setTimeout(window.resCanvas, 200);

// Generador de coordenadas esféricas 3D
for (let i = 0; i < totalNodos; i++) {
    let u = Math.random(), v = Math.random();
    let theta = u * 2 * Math.PI;
    let phi = Math.acos(2 * v - 1);
    let r = 90;
    nodos.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        label: i < labelsBase.length ? labelsBase[i] : null,
        desc: i < labelsBase.length ? "Registro maestro indexado de forma correcta en sector de arranque." : null
    });
}

// LÓGICA DE CONTROL TÁCTIL AVANZADO PARA ARRASTRAR Y ESCALAR LA VENTANA FLOTANTE
const popup = document.getElementById("hologram-window");
const dragZone = document.getElementById("popup-drag-zone");
const resizer = document.getElementById("popup-resizer");

let activeDrag = false;
let activeResize = false;
let startX, startY, startWidth, startHeight, startLeft, startTop;

if (dragZone && popup) {
    dragZone.addEventListener('mousedown', initDragPopup);
    dragZone.addEventListener('touchstart', function(e) { initDragPopup(e.touches[0]); }, { passive: false });
}
if (resizer && popup) {
    resizer.addEventListener('mousedown', initResizePopup);
    resizer.addEventListener('touchstart', function(e) { initResizePopup(e.touches[0]); }, { passive: false });
}

window.addEventListener('mousemove', doPopupAction);
window.addEventListener('touchmove', function(e) { doPopupAction(e.touches[0]); }, { passive: false });
window.addEventListener('mouseup', stopPopupAction);
window.addEventListener('touchend', stopPopupAction);

function initDragPopup(e) {
    activeDrag = true;
    startX = e.clientX; startY = e.clientY;
    startLeft = popup.offsetLeft; startTop = popup.offsetTop;
}
function initResizePopup(e) {
    activeResize = true;
    startX = e.clientX; startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(popup).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(popup).height, 10);
}
function doPopupAction(e) {
    if (activeDrag) {
        popup.style.left = (startLeft + (e.clientX - startX)) + 'px';
        popup.style.top = (startTop + (e.clientY - startY)) + 'px';
    }
    if (activeResize) {
        popup.style.width = (startWidth + (e.clientX - startX)) + 'px';
        popup.style.height = (startHeight + (e.clientY - startY)) + 'px';
    }
}
function stopPopupAction() { activeDrag = false; activeResize = false; }
window.cerrarPopup = function() { if (popup) popup.style.display = "none"; };

// =====================================================================
// NeoX COGNITIVE OS v12.0 - MOTOR GRÁFICO E INTERACTIVO 3D - PARTE 2 DE 2
// =====================================================================

// CAPTURA DE EVENTOS DE ARRASTRE PARA LA ROTACIÓN DE LA PROPIA RED NEURONAL
if (canvas) {
    canvas.addEventListener('mousedown', iniciarArrastreRed);
    canvas.addEventListener('touchstart', function(e) { if(e.touches.length === 1) iniciarArrastreRed(e.touches[0]); }, { passive: true });
}

function iniciarArrastreRed(e) {
    isDraggingNetwork = true;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    previousMousePosition = { x: mx, y: my };
    procesarClickNodo(mx, my);
}

// Escuchadores globales para el movimiento y parada del dedo en el Canvas
window.addEventListener('mousemove', moverArrastreRed);
window.addEventListener('touchmove', function(e) { if(isDraggingNetwork && e.touches.length === 1) moverArrastreRed(e.touches[0]); }, { passive: true });
window.addEventListener('mouseup', detenerArrastreRed);
window.addEventListener('touchend', detenerArrastreRed);
if (canvas) canvas.addEventListener('wheel', procesarZoom);

function moverArrastreRed(e) {
    if (!isDraggingNetwork) return;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    angY = (currentX - previousMousePosition.x) * 0.005;
    angX = (currentY - previousMousePosition.y) * 0.005;
    
    previousMousePosition = { x: currentX, y: currentY };
}

function detenerArrastreRed() {
    isDraggingNetwork = false;
    setTimeout(function() {
        if (!isDraggingNetwork) { angY = 0.003; angX = 0.001; }
    }, 1500);
}

function procesarZoom(e) {
    e.preventDefault();
    fov += e.deltaY * 0.1;
    fov = Math.max(50, Math.min(250, fov));
}

// DETECTOR DE INTERACCIÓN: Abre y llena la Ventana Táctica Holográfica
function procesarClickNodo(mx, my) {
    const cx = canvas.width / 2, cy = canvas.height / 2;
    let nodoDetectado = null;
    let distanciaMinima = 20; // Sensibilidad táctil idónea

    nodos.forEach(function(n, index) {
        let e = fov / (fov + n.z);
        let nx = cx + n.x * e;
        let ny = cy + n.y * e;
        let dist = Math.sqrt(Math.pow(mx - nx, 2) + Math.pow(my - ny, 2));
        if (dist < distanciaMinima) {
            distanciaMinima = dist;
            nodoDetectado = n;
            seleccionadoIndex = index;
        }
    });

    const panelHud = document.getElementById("card-content");
    if (popup) popup.style.display = "flex"; // Forzar apertura de la ventana flotante

    if (panelHud && nodoDetectado) {
        // Diccionario de funciones sintácticas detalladas simuladas para dar contexto JARVIS
        let sectorFisico = seleccionadoIndex < 10 ? "NÚCLEO_PRIMARIO" : "BAHÍA_APRENDIZAJE_0" + Math.floor(seleccionadoIndex / 10);
        let funcionTeorica = nodoDetectado.label ? "Matriz contextual de indexación semántica en tiempo real." : "Célula sináptica virgen esperando almacenamiento cuántico.";
        
        panelHud.innerHTML = '<span><strong>ID_NURON:</strong> [N_0' + seleccionadoIndex + ']</span><br>' +
                              '<span><strong>SECTOR:</strong> ' + sectorFisico + '</span><br>' +
                              '<span><strong>ETIQUETA:</strong> ' + (nodoDetectado.label || "VACÍA (DISPONIBLE)") + '</span><br>' +
                              '<span><strong>FUNCIÓN:</strong> ' + funcionTeorica + '</span><br>' +
                              '<span><strong>REGISTRO:</strong> ' + (nodoDetectado.desc || "Sin datos almacenados. Neurona lista para expandir el cerebro de NeoX.") + '</span>';
    }
}

// RECEPTOR DE APRENDIZAJE ADAPTATIVO EN TIEMPO REAL
window.actualizarNeuronasRecientes = function(t) {
    let p = t.split(" ").filter(function(w) { return w.length > 5 && w.length < 11; });
    if (p.length > 0) {
        let nodosVacios = nodos.filter(function(n) { return !n.label; });
        // Si hay neuronas vacías, programa una, si no, reescribe una al azar
        let objetivo = nodosVacios.length > 0 ? nodosVacios[Math.floor(Math.random() * nodosVacios.length)] : nodos[Math.floor(Math.random() * nodos.length)];
        let lim = p[Math.floor(Math.random() * p.length)].replace(/[^a-zA-Z]/g, "").toUpperCase();
        if (lim) {
            objetivo.label = lim;
            objetivo.desc = "Concepto adquirido de forma autónoma durante el análisis de la última directriz del Creador.";
        }
    }
};

function rotar() {
    let cY = Math.cos(angY), sY = Math.sin(angY), cX = Math.cos(angX), sX = Math.sin(angX);
    nodos.forEach(function(n) {
        let x1 = n.x * cY - n.z * sY, z1 = n.z * cY + n.x * sY;
        let y2 = n.y * cX - z1 * sX, z2 = z1 * cX + n.y * sX;
        n.x = x1; n.y = y2; n.z = z2;
    });
}

// BUCLE GRÁFICO 3D EN TIEMPO REAL
function render() {
    if (!canvas || !ctx) return;
    if (canvas.width === 0) window.resCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rotar();
    
    const cx = canvas.width / 2, cy = canvas.height / 2;
    
    // Trazado de líneas neuronales interconectadas
    ctx.strokeStyle = "rgba(0, 240, 255, 0.12)"; ctx.lineWidth = 1;
    for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
            let dist = Math.sqrt(Math.pow(nodos[i].x - nodos[j].x, 2) + Math.pow(nodos[i].y - nodos[j].y, 2));
            if (dist < 85) {
                let si = fov / (fov + nodos[i].z), sj = fov / (fov + nodos[j].z);
                ctx.beginPath(); ctx.moveTo(cx + nodos[i].x * si, cy + nodos[i].y * si); ctx.lineTo(cx + nodos[j].x * sj, cy + nodos[j].y * sj); ctx.stroke();
            }
        }
    }
    
    // Renderizado corregido de nodos verdes y azules de alta visibilidad
    nodos.forEach(function(n, idx) {
        let e = fov / (fov + n.z), x = cx + n.x * e, y = cy + n.y * e, rd = Math.max(1, 3 * e), al = (fov - n.z) / (2 * fov);
        
        if (idx === seleccionadoIndex) {
            ctx.fillStyle = "var(--red)"; // Destacado táctico en rojo al seleccionar
            rd = rd * 1.5;
        } else if (n.label) {
            ctx.fillStyle = "rgba(0, 255, 102, " + (al + 0.4) + ")"; // Nodos con memoria (Verde J.A.R.V.I.S.)
        } else {
            ctx.fillStyle = "rgba(0, 102, 255, " + (al + 0.5) + ")"; // CORREGIDO: Nodos disponibles en Azul Cobalto intenso y visible
        }
        
        ctx.beginPath(); ctx.arc(x, y, rd, 0, 2 * Math.PI); ctx.fill();
        
        if (n.label && n.z < 25) {
            ctx.fillStyle = "rgba(230, 237, 243, " + (al + 0.3) + ")"; ctx.font = Math.max(7, 9 * e) + "px 'Share Tech Mono'";
            ctx.fillText("[" + n.label + "]", x + 6, y + 3);
        }
    });
    
    const p = document.getElementById("load-percentage"); if (p) p.innerText = Math.floor(94 + Math.random() * 7) + "%";
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
