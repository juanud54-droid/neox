// =====================================================================
// NeoX COGNITIVE OS v12.0 - MOTOR DE RED INTERACTIVA 3D - PARTE 1 DE 2
// =====================================================================

const canvas = document.getElementById("neuralNet");
const ctx = canvas ? canvas.getContext("2d") : null;
let nodos = [];
const totalNodos = 50; // Densidad expandida de 50 células de datos

let angY = 0.003, angX = 0.001;
let isDragging = false;
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

// Generador de la rejilla de coordenadas esféricas 3D
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
        desc: i < labelsBase.length ? "Registro de sistema indexado en sector de arranque." : null
    });
}

// CAPTURA DE EVENTOS DE ARRASTRE TÁCTIL Y DESLIZAMIENTO CON EL DEDO
if (canvas) {
    canvas.addEventListener('mousedown', iniciarArrastre);
    canvas.addEventListener('touchstart', function(e) { if(e.touches.length === 1) iniciarArrastre(e.touches[0]); }, { passive: true });
    window.addEventListener('mousemove', moverArrastre);
    window.addEventListener('touchmove', function(e) { if(e.touches.length === 1) moverArrastre(e.touches[0]); }, { passive: true });
    window.addEventListener('mouseup', detenerArrastre);
    window.addEventListener('touchend', detenerArrastre);
    canvas.addEventListener('wheel', procesarZoom);
}

function iniciarArrastre(e) {
    isDragging = true;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    previousMousePosition = { x: mx, y: my };
    procesarClickNodo(mx, my);
}

function moverArrastre(e) {
    if (!isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    // Transmutar la velocidad de tu dedo en velocidad angular esférica
    angY = (currentX - previousMousePosition.x) * 0.005;
    angX = (currentY - previousMousePosition.y) * 0.005;
    
    previousMousePosition = { x: currentX, y: currentY };
}
// =====================================================================
// NeoX COGNITIVE OS v12.0 - MOTOR DE RED INTERACTIVA 3D - PARTE 2 DE 2
// =====================================================================

function detenerArrastre() {
    isDragging = false;
    // Retorno suave inercial tras apartar el dedo de la pantalla
    setTimeout(function() {
        if (!isDragging) { angY = 0.003; angX = 0.001; }
    }, 1500);
}

function procesarZoom(e) {
    e.preventDefault();
    fov += e.deltaY * 0.1;
    fov = Math.max(50, Math.min(250, fov)); // Amplitud focal máxima
}

function procesarClickNodo(mx, my) {
    const cx = canvas.width / 2, cy = canvas.height / 2;
    let nodoDetectado = null;
    let distanciaMinima = 18; // Radio adaptativo para pantallas táctiles

    nodos.forEach(function(n, index) {
        let e = fov / (fov + n.z);
        let nx = cx + n.x * e;
        let ny = cy + n.y * e;
        let dist = Math.sqrt(Math.pow(mx - nx, 2) + Math.pow(my - ny, 2));
        if (dist < distanciaMinima && n.label) {
            distanciaMinima = dist;
            nodoDetectado = n;
            seleccionadoIndex = index;
        }
    });

    const panelHud = document.getElementById("card-content");
    if (panelHud && nodoDetectado) {
        panelHud.innerHTML = '<span><strong>ID_NODO:</strong> [N_0' + seleccionadoIndex + ']</span><br>' +
                              '<span><strong>ETIQUETA:</strong> ' + nodoDetectado.label + '</span><br>' +
                              '<span><strong>STATUS:</strong> Activo / Enlazado</span><br>' +
                              '<span><strong>DATO:</strong> ' + (nodoDetectado.desc || "Célula de contexto cognitivo vacía.") + '</span>';
    }
}

// CAPACIDAD DE APRENDIZAJE ADAPTATIVO EXPORTADA AL ENTORNO GLOBAL
window.actualizarNeuronasRecientes = function(textoRespuesta) {
    let palabras = textoRespuesta.split(" ").filter(function(w) { return w.length > 5 && w.length < 11; });
    if (palabras.length > 0) {
        let nodosVacios = nodos.filter(function(n) { return !n.label; });
        let objetivo = nodosVacios.length > 0 ? nodosVacios[Math.floor(Math.random() * nodosVacios.length)] : nodos[Math.floor(Math.random() * nodos.length)];
        let palabraLimpia = palabras[Math.floor(Math.random() * palabras.length)].replace(/[^a-zA-Z]/g, "").toUpperCase();
        if (palabraLimpia) {
            objetivo.label = palabraLimpia;
            objetivo.desc = "Concepto adquirido de forma autónoma durante el análisis semántico de la última directriz.";
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
    
    // Trazar hilos de sinapsis conectores intermodulares
    ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
            let dist = Math.sqrt(Math.pow(nodos[i].x - nodos[j].x, 2) + Math.pow(nodos[i].y - nodos[j].y, 2));
            if (dist < 85) {
                let si = fov / (fov + nodos[i].z), sj = fov / (fov + nodos[j].z);
                ctx.beginPath();
                ctx.moveTo(cx + nodos[i].x * si, cy + nodos[i].y * si);
                ctx.lineTo(cx + nodos[j].x * sj, cy + nodos[j].y * sj);
                ctx.stroke();
            }
        }
    }
    
    // Dibujar núcleos neuronales densos y nombres espaciales en vivo
    nodos.forEach(function(n, idx) {
        let e = fov / (fov + n.z);
        let x = cx + n.x * e;
        let y = cy + n.y * e;
        let rd = Math.max(1, 3 * e);
        let al = (fov - n.z) / (2 * fov);
        
        if (idx === seleccionadoIndex) {
            ctx.fillStyle = "var(--red)"; // Resaltado visual en el HUD táctico
            rd = rd * 1.5;
        } else {
            ctx.fillStyle = n.label ? "rgba(0, 255, 102, " + (al + 0.4) + ")" : "rgba(0, 240, 255, " + al + ")";
        }
        
        ctx.beginPath();
        ctx.arc(x, y, rd, 0, 2 * Math.PI);
        ctx.fill();
        
        if (n.label && n.z < 25) {
            ctx.fillStyle = "rgba(230, 237, 243, " + (al + 0.3) + ")";
            ctx.font = Math.max(7, 9 * e) + "px 'Share Tech Mono'";
            ctx.fillText("[" + n.label + "]", x + 6, y + 3);
        }
    });
    
    // Refrescar oscilador analítico de carga en BRAIN_ACT
    const indicadorPorcentaje = document.getElementById("load-percentage");
    if (indicadorPorcentaje) indicadorPorcentaje.innerText = Math.floor(94 + Math.random() * 7) + "%";
    
    requestAnimationFrame(render);
}

// Disparar ciclo operativo de fotogramas del lienzo 3D
requestAnimationFrame(render);
