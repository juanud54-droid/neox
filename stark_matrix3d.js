// =====================================================================
// NeoX OS v22.0 - MOTOR GRÁFICO 3D EXPANDIDO - PARTE 1 (200 NODOS)
// =====================================================================

const canvas = document.getElementById("neuralNet");
const ctx = canvas ? canvas.getContext("2d") : null;
window.nodos = [];
const totalNodos = 200; // Escala definitiva de 200 neuronas totales

let angY = 0.003, angX = 0.001;
let isDraggingNetwork = false;
let previousMousePosition = { x: 0, y: 0 };
let fov = 130;
let seleccionadoIndex = null;
let multiplicadorVelocidad = 1;

// Bandera centinela para destruir el bucle infinito de reapertura automática
let bloqueoToqueRedencion = false;
window.resCanvas = function() {
    if (!canvas || !canvas.parentNode) return;
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight - 40;
};
window.addEventListener('resize', window.resCanvas);
setTimeout(window.resCanvas, 200);

// Sincronizador de base de datos local para la persistencia en Hermit
let memoriasGuardadas = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];

// Población de la esfera de 200 nodos integrando de forma nativa las 60 neuronas maestras
for (let i = 0; i < totalNodos; i++) {
    let theta = Math.random() * 2 * Math.PI;
    let phi = Math.acos(2 * Math.random() - 1);
    let r = 95;
    
    let memoriaHistorica = memoriasGuardadas.find(function(m) { return m.index === i; });
    let esMaestra = i < 60;
    
    window.nodos.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        label: memoriaHistorica ? memoriaHistorica.label : (esMaestra && window.neuronasMaestras && window.neuronasMaestras[i] ? window.neuronasMaestras[i].label : null),
        desc: memoriaHistorica ? memoriaHistorica.desc : (esMaestra && window.neuronasMaestras && window.neuronasMaestras[i] ? window.neuronasMaestras[i].desc : (esMaestra ? "Célula analítica maestra." : null))
    });
}
// Activadores unificados con soporte absoluto para PC y Tablet Móvil
if (canvas) {
    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('touchstart', function(e) { 
        if (e.touches.length === 1) dragStart(e.touches[0]); 
    }, { passive: true });
}

window.addEventListener('mousemove', dragMove);
window.addEventListener('touchmove', function(e) { 
    if (isDraggingNetwork && e.touches.length === 1) { 
        dragMove(e.touches[0]); 
    } 
}, { passive: true });

window.addEventListener('mouseup', dragEnd); 
window.addEventListener('touchend', dragEnd);

function dragStart(punto) {
    isDraggingNetwork = true; 
    bloqueoToqueRedencion = false; // Resetea el rastreador de arrastre
    const rect = canvas.getBoundingClientRect();
    let mx = punto.clientX - rect.left; 
    let my = punto.clientY - rect.top;
    if (isNaN(mx) || isNaN(my)) { mx = canvas.width / 2; my = canvas.height / 2; }
    previousMousePosition = { x: mx, y: my }; 
}
function dragMove(punto) {
    if (!isDraggingNetwork) return; 
    const rect = canvas.getBoundingClientRect();
    let cx = punto.clientX - rect.left; 
    let cy = punto.clientY - rect.top;
    
    if (isNaN(cx) || isNaN(cy) || Math.abs(cx) > 4000 || Math.abs(cy) > 4000) return;
    
    let dx = cx - previousMousePosition.x;
    let dy = cy - previousMousePosition.y;
    
    // Si el dedo se desplaza más de 4 píxeles, se considera rotación y se bloquea el clic fortuito
    if (Math.sqrt(dx*dx + dy*dy) > 4) {
        bloqueoToqueRedencion = true;
    }
    
    angY = dx * 0.005; 
    angX = dy * 0.005;
    previousMousePosition = { x: cx, y: cy };
}

function dragEnd(e) { 
    isDraggingNetwork = false; 
    
    // Si no fue un arrastre de rotación, procesamos el toque como un clic real en un nodo
    if (!bloqueoToqueRedencion) {
        const rect = canvas.getBoundingClientRect();
        let mx = previousMousePosition.x;
        let my = previousMousePosition.y;
        procesarClickNodo(mx, my);
    }
    
    setTimeout(function() { 
        if (!isDraggingNetwork) { 
            if (multiplicadorVelocidad === 1) { angY = 0.003; angX = 0.001; }
            else if (multiplicadorVelocidad === 4) { angY = 0.012; angX = 0.004; }
            else { angY = 0; angX = 0; }
        } 
    }, 1200); 
}

function procesarZoom(e) { 
    e.preventDefault(); 
    fov += e.deltaY * 0.1; 
    fov = Math.max(50, Math.min(250, fov)); 
}
if (canvas) canvas.addEventListener('wheel', procesarZoom);
function procesarClickNodo(mx, my) {
    const cx = canvas.width / 2, cy = canvas.height / 2; 
    let det = null; 
    let minDist = 22;
    window.nodos.forEach(function(n, idx) {
        let e = fov / (fov + n.z), nx = cx + n.x * e, ny = cy + n.y * e;
        let dist = Math.sqrt(Math.pow(mx - nx, 2) + Math.pow(my - ny, 2));
        if (dist < minDist) { minDist = dist; det = n; seleccionadoIndex = idx; }
    });
    
    const pW = document.getElementById("hologram-window"); if (pW) pW.style.display = "flex";
    const pH = document.getElementById("card-content");
    const fBtn = document.getElementById("floating-node-btn");
    
    if (pH && det) {
        pH.innerHTML = '<div><strong>[ID] :</strong> N_' + (seleccionadoIndex < 100 ? "0" : "") + seleccionadoIndex + '</div>' +
                       '<div><strong>[STATUS] :</strong> ' + (det.label ? "INDEXADO" : "VACIA") + '</div>' +
                       '<div><strong>[ETIQUETA] :</strong> ' + (det.label || "DISPONIBLE") + '</div>' +
                       '<div><strong>[REGISTRO] :</strong> ' + (det.desc || "Bahía Stark_Web lista.") + '</div>';
        
        // Proyección exacta del botón Ampliar en coordenadas 2D junto a la neurona
        if (fBtn) {
            let e = fov / (fov + det.z);
            let nx = cx + det.x * e;
            let ny = cy + det.y * e;
            fBtn.style.left = (nx + 25) + "px";
            fBtn.style.top = (ny - 15) + "px";
            fBtn.style.display = "block";
        }
    } else if (fBtn) {
        fBtn.style.display = "none";
    }
}

window.actualizarNeuronasDesdeChat = function(lbl, desc) {
    let vacios = []; 
    window.nodos.forEach(function(n, idx) { if (!n.label && idx >= 60) vacios.push(idx); });
    let idxObj = vacios.length > 0 ? vacios[Math.floor(Math.random() * vacios.length)] : Math.floor(Math.random() * window.nodos.length);
    let obj = window.nodos[idxObj];
    if (obj) {
        obj.label = lbl; 
        obj.desc = desc;
        let g = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
        g = g.filter(function(m) { return m.index !== idxObj; }); 
        g.push({ index: idxObj, label: lbl, desc: desc });
        localStorage.setItem("neox_persisted_neuronas", JSON.stringify(g));
    }
};

function rotar() {
    let cY = Math.cos(angY), sY = Math.sin(angY), cX = Math.cos(angX), sX = Math.sin(angX);
    window.nodos.forEach(function(n) {
        let x1 = n.x * cY - n.z * sY, z1 = n.z * cY + n.x * sY;
        let y2 = n.y * cX - z1 * sX, z2 = z1 * cX + n.y * sX;
        n.x = x1; n.y = y2; n.z = z2;
    });
}
        function render() {
            if (!canvas || !ctx) return; if (canvas.width === 0) window.resCanvas();
            ctx.clearRect(0, 0, canvas.width, canvas.height); rotar();
            const cx = canvas.width / 2, cy = canvas.height / 2;
            ctx.strokeStyle = "rgba(0, 240, 255, 0.12)"; ctx.lineWidth = 1;
            
            for (let i = 0; i < window.nodos.length; i++) {
                for (let j = i + 1; j < window.nodos.length; j++) {
                    if (Math.sqrt(Math.pow(window.nodos[i].x - window.nodos[j].x, 2) + Math.pow(window.nodos[i].y - window.nodos[j].y, 2)) < 80) {
                        let si = fov / (fov + window.nodos[i].z), sj = fov / (fov + window.nodos[j].z);
                        ctx.beginPath(); ctx.moveTo(cx + window.nodos[i].x * si, cy + window.nodos[i].y * si); ctx.lineTo(cx + window.nodos[j].x * sj, cy + window.nodos[j].y * sj); ctx.stroke();
                    }
                }
            }
            
            window.nodos.forEach(function(n, idx) {
                let e = fov / (fov + n.z), x = cx + n.x * e, y = cy + n.y * e, rd = Math.max(1, 2.8 * e), al = (fov - n.z) / (2 * fov);
                
                if (idx === seleccionadoIndex) {
                    ctx.fillStyle = "var(--red)";
                } else if (n.label) {
                    if (idx < 60) {
                        ctx.fillStyle = "rgba(0, 136, 255, " + (al + 0.5) + ")"; // 60 Nodos Maestros Estables (Azul)
                    } else if (n.label.startsWith("ROOT") || n.label.startsWith("ID_")) {
                        ctx.fillStyle = "rgba(255, 51, 51, " + (al + 0.5) + ")";  // Rojo Crítico (Daniel/Identidad)
                    } else if (n.label.includes("WEB") || n.label.includes("SCAN") || n.label.includes("POL")) {
                        ctx.fillStyle = "rgba(255, 204, 0, " + (al + 0.5) + ")";   // Amarillo (Internet / Política)
                    } else {
                        ctx.fillStyle = "rgba(0, 255, 102, " + (al + 0.4) + ")";  // Verde Neón (Nodos Adquiridos)
                    }
                } else {
                    ctx.fillStyle = "rgba(0, 240, 255, " + (al + 0.15) + ")";     // Azul base disponible
                }
                
                ctx.beginPath(); ctx.arc(x, y, rd, 0, 2 * Math.PI); ctx.fill();
                if (n.label && n.z < 25) { ctx.fillStyle = "rgba(230, 237, 243, " + (al + 0.3) + ")"; ctx.font = "9px sans-serif"; ctx.fillText("[" + n.label + "]", x + 6, y + 3); }
            });
            
            const loadPct = document.getElementById("load-percentage"); if (loadPct) loadPct.innerText = Math.floor(95 + Math.random() * 6) + "%";
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        // =====================================================================
        // INTERFACES Y HERRAMIENTAS REALES EXCLUSIVAS DEL MONITOR BRAIN
        // =====================================================================

        window.ajustarVelocidadNodos = function() {
            const indicador = document.getElementById("speed-indicator");
            if (multiplicadorVelocidad === 1) {
                multiplicadorVelocidad = 4; angY = 0.012; angX = 0.004;
                if (indicador) indicador.innerText = "4x";
                window.logTerminalCore("BRAIN_TOOLS", "Aceleración de rotación forzada. Frecuencia crítica: 4x.");
            } else if (multiplicadorVelocidad === 4) {
                multiplicadorVelocidad = 0; angY = 0; angX = 0;
                if (indicador) indicador.innerText = "0x";
                window.logTerminalCore("BRAIN_TOOLS", "Frenado cuántico activado. Esfera congelada para examen.");
            } else {
                multiplicadorVelocidad = 1; angY = 0.003; angX = 0.001;
                if (indicador) indicador.innerText = "1x";
                window.logTerminalCore("BRAIN_TOOLS", "Restaurando velocidad base stable de 1x en el chasis.");
            }
        };

        window.inyectarNodoPrueba = function() {
            window.actualizarNeuronasDesdeChat("TEST_SYN", "Sinapsis de telemetría inyectada manualmente desde la consola del monitor BRAIN.");
            window.logTerminalCore("BRAIN_TOOLS", "Inyección forzada de nodo experimental exitosa.");
            window.efectoEscribir("SYSTEM_MONITOR", "Se ha inyectado una sinapsis de prueba [TEST_SYN] en la red de 200 nodos.", "neox");
        };

        window.forzarRefrescoCachera = function() {
            window.logTerminalCore("BRAIN_TOOLS", "Enviando pulso de recarga destructiva de caché a Hermit...");
            location.reload(true);
        };
