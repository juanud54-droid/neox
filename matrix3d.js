// =====================================================================
// NeoX COGNITIVE OS v12.1 - MOTOR INTERACTIVO TÁCTIL 3D - PARTE 1 DE 2
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

// Inicializador de las neuronas del chasis
for (let i = 0; i < totalNodos; i++) {
    let u = Math.random(), v = Math.random();
    let theta = u * 2 * Math.PI, phi = Math.acos(2 * v - 1);
    let r = 90;
    nodos.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        label: i < labelsBase.length ? labelsBase[i] : null,
        desc: i < labelsBase.length ? "Registro maestro indexado de forma correcta en sector de arranque." : null
    });
}

// CAPTURA TÁCTIL MULTI-ENTORNO CON SOPORTE ANDROID PARA LA VENTANA FLOTANTE
const popup = document.getElementById("hologram-window");
const dragZone = document.getElementById("popup-drag-zone");
const resizer = document.getElementById("popup-resizer");

let activeDrag = false;
let activeResize = false;
let startX, startY, startWidth, startHeight, startLeft, startTop;

// Interceptores táctiles y de ratón unificados
if (dragZone && popup) {
    dragZone.addEventListener('mousedown', initDrag);
    dragZone.addEventListener('touchstart', function(e) { initDrag(e.changedTouches[0]); }, { passive: false });
}
if (resizer && popup) {
    resizer.addEventListener('mousedown', initResize);
    resizer.addEventListener('touchstart', function(e) { initResize(e.changedTouches[0]); }, { passive: false });
}

window.addEventListener('mousemove', doAction);
window.addEventListener('touchmove', function(e) { if(activeDrag || activeResize) { e.preventDefault(); doAction(e.changedTouches[0]); } }, { passive: false });
window.addEventListener('mouseup', stopAction);
window.addEventListener('touchend', stopAction);

function initDrag(point) {
    activeDrag = true;
    startX = point.clientX; startY = point.clientY;
    startLeft = popup.offsetLeft; startTop = popup.offsetTop;
}

function initResize(point) {
    activeResize = true;
    startX = point.clientX; startY = point.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(popup).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(popup).height, 10);
}

function doAction(point) {
    if (activeDrag) {
        popup.style.left = (startLeft + (point.clientX - startX)) + 'px';
        popup.style.top = (startTop + (point.clientY - startY)) + 'px';
    }
    if (activeResize) {
        popup.style.width = Math.max(200, startWidth + (point.clientX - startX)) + 'px';
        popup.style.height = Math.max(150, startHeight + (point.clientY - startY)) + 'px';
    }
}

function stopAction() { activeDrag = false; activeResize = false; }
window.cerrarPopup = function() { if (popup) popup.style.display = "none"; };
// =====================================================================
// NeoX COGNITIVE OS v12.1 - MOTOR INTERACTIVO TÁCTIL 3D - PARTE 2 DE 2
// =====================================================================

// CAPTURA DE EVENTOS DE ARRASTRE PARA LA ROTACIÓN DE LA RED NEURONAL 3D
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

// TELEMETRÍA MILITAR ULTRA DETALLADA J.A.R.V.I.S. (12 PUNTOS DE DECODIFICACIÓN)
function procesarClickNodo(mx, my) {
    const cx = canvas.width / 2, cy = canvas.height / 2;
    let nodoDetectado = null;
    let distanciaMinima = 22; // Margen de error óptimo para dedos

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
    if (popup) popup.style.display = "flex"; 

    if (panelHud && nodoDetectado) {
        // Simulación de registros analíticos militares en tiempo real
        let freq = (4.1 + Math.random() * 2.8).toFixed(2);
        let lat = (1.2 + Math.random() * 4.5).toFixed(1);
        let volt = (0.8 + Math.random() * 0.6).toFixed(2);
        let load = Math.floor(15 + Math.random() * 45);
        let sectorFisico = seleccionadoIndex < 10 ? "CORE_PRIMARY_ALPHA" : "BAHIA_SYNAPSE_0" + Math.floor(seleccionadoIndex / 10);
        let estadoLogico = nodoDetectado.label ? "ESTABLE_INDEXADO" : "VIRGEN_DISPONIBLE";
        
        panelHud.innerHTML = 
            '<div><strong>[ID_NEURON] :</strong> N_0' + seleccionadoIndex + '</div>' +
            '<div><strong>[SECTOR_ID]:</strong> ' + sectorFisico + '</div>' +
            '<div><strong>[STATUS]   :</strong> ' + estadoLogico + '</div>' +
            '<div><strong>[ETIQUETA] :</strong> ' + (nodoDetectado.label || "VACIA") + '</div>' +
            '<div style="color:var(--cyan); margin:4px 0; border-bottom:1px dashed rgba(0,240,255,0.2);">--- TELEMETRIA SYNAPSE_LINK ---</div>' +
            '<div><strong>[FRECUENCIA]:</strong> ' + freq + ' GHz</div>' +
            '<div><strong>[LATENCIA]  :</strong> ' + lat + ' ms</div>' +
            '<div><strong>[VOLTAJE]   :</strong> ' + volt + ' V</div>' +
            '<div><strong>[CARGA_MEM] :</strong> ' + load + ' %</div>' +
            '<div><strong>[ENLACE_AI] :</strong> DIRECT_MODE</div>' +
            '<div style="color:var(--cyan); margin:4px 0; border-bottom:1px dashed rgba(0,240,255,0.2);">--- REGISTRO COGNITIVO ---</div>' +
            '<div style="font-size:0.9em; line-height:1.2; color:#fff;">' + (nodoDetectado.desc || "Bahia disponible. Lista para asentar nuevos registros semanticos en el proximo ciclo de transmision.") + '</div>';
    }
}

window.actualizarNeuronasRecientes = function(t) {
    let p = t.split(" ").filter(function(w) { return w.length > 5 && w.length < 11; });
    if (p.length > 0) {
        let nodosVacios = nodos.filter(function(n) { return !n.label; });
        let objetivo = nodosVacios.length > 0 ? nodosVacios[Math.floor(Math.random() * nodosVacios.length)] : nodos[Math.floor(Math.random() * nodos.length)];
        let lim = p[Math.floor(Math.random() * p.length)].replace(/[^a-zA-Z]/g, "").toUpperCase();
        if (lim) {
            objetivo.label = lim;
            objetivo.desc = "Concepto adquirido de forma autónoma durante el análisis semántico de la última directriz del Creador.";
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

function render() {
    if (!canvas || !ctx) return;
    if (canvas.width === 0) window.resCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rotar();
    
    const cx = canvas.width / 2, cy = canvas.height / 2;
    
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
    
    nodos.forEach(function(n, idx) {
        let e = fov / (fov + n.z), x = cx + n.x * e, y = cy + n.y * e, rd = Math.max(1, 3 * e), al = (fov - n.z) / (2 * fov);
        
        if (idx === seleccionadoIndex) {
            ctx.fillStyle = "var(--red)";
            rd = rd * 1.5;
        } else if (n.label) {
            ctx.fillStyle = "rgba(0, 255, 102, " + (al + 0.4) + ")"; // Verde J.A.R.V.I.S.
        } else {
            ctx.fillStyle = "rgba(0, 136, 255, " + (al + 0.6) + ")"; // Azul Cobalto Eléctrico de alta visibilidad
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
