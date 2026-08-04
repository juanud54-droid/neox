// =====================================================================
// NeoX OS v21.0 - MOTOR GRÁFICO 3D EXPANDIDO - PARTE 1 (140 NODOS FIJOS)
// =====================================================================

const canvas = document.getElementById("neuralNet");
const ctx = canvas ? canvas.getContext("2d") : null;
window.nodos = [];
const totalNodos = 140; // Densidad expansible Stark escalada de 90 a 140

let angY = 0.003, angX = 0.001;
let isDraggingNetwork = false;
let previousMousePosition = { x: 0, y: 0 };
let fov = 130;
let seleccionadoIndex = null;
window.resCanvas = function() {
    if (!canvas || !canvas.parentNode) return;
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight - 40;
};
window.addEventListener('resize', window.resCanvas);
setTimeout(window.resCanvas, 200);

// Recuperador de sinapsis grabadas a largo plazo en Hermit
let memoriasGuardadas = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];

// Población de la esfera de 140 nodos integrando las 20 neuronas maestras pre-codificadas
for (let i = 0; i < totalNodos; i++) {
    let theta = Math.random() * 2 * Math.PI;
    let phi = Math.acos(2 * Math.random() - 1);
    let r = 95;
    
    let memoriaHistorica = memoriasGuardadas.find(function(m) { return m.index === i; });
    let esMaestra = i < 20;
    
    window.nodos.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        label: memoriaHistorica ? memoriaHistorica.label : (esMaestra ? neuronasMaestrasBase[i].label : null),
        desc: memoriaHistorica ? memoriaHistorica.desc : (esMaestra ? neuronasMaestrasBase[i].desc : null),
        colorTipo: esMaestra ? "rgba(0, 136, 255, " : "rgba(0, 240, 255, "
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
    const rect = canvas.getBoundingClientRect();
    let mx = punto.clientX - rect.left; 
    let my = punto.clientY - rect.top;
    if (isNaN(mx) || isNaN(my)) { mx = canvas.width / 2; my = canvas.height / 2; }
    previousMousePosition = { x: mx, y: my }; 
    procesarClickNodo(mx, my);
}
function dragMove(punto) {
    if (!isDraggingNetwork) return; 
    const rect = canvas.getBoundingClientRect();
    let cx = punto.clientX - rect.left; 
    let cy = punto.clientY - rect.top;
    
    // Escudo matemático radical contra lecturas corruptas NaN en tablets
    if (isNaN(cx) || isNaN(cy) || Math.abs(cx) > 4000 || Math.abs(cy) > 4000) return;
    
    angY = (cx - previousMousePosition.x) * 0.005; 
    angX = (cy - previousMousePosition.y) * 0.005;
    previousMousePosition = { x: cx, y: cy };
}

function dragEnd() { 
    isDraggingNetwork = false; 
    setTimeout(function() { if (!isDraggingNetwork) { angY = 0.003; angX = 0.001; } }, 1200); 
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
    if (pH && det) {
        pH.innerHTML = '<div><strong>[ID] :</strong> N_' + (seleccionadoIndex < 100 ? "0" : "") + seleccionadoIndex + '</div>' +
                       '<div><strong>[STATUS] :</strong> ' + (det.label ? "INDEXADO" : "VACIA") + '</div>' +
                       '<div><strong>[ETIQUETA] :</strong> ' + (det.label || "DISPONIBLE") + '</div>' +
                       '<div><strong>[REGISTRO] :</strong> ' + (det.desc || "Bahía Stark_Web lista.") + '</div>';
    }
}

window.actualizarNeuronasDesdeChat = function(lbl, desc) {
    let vacios = []; 
    window.nodos.forEach(function(n, idx) { if (!n.label && idx >= 20) vacios.push(idx); });
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
                
                // Cromatismo dinámico según intención semántica actual
                if (idx === seleccionadoIndex) {
                    ctx.fillStyle = "var(--red)";
                } else if (n.label) {
                    if (idx < 20) {
                        ctx.fillStyle = "rgba(0, 136, 255, " + (al + 0.5) + ")"; // Nodos Maestros estables
                    } else if (n.label.startsWith("ID_") || n.label.startsWith("ROOT")) {
                        ctx.fillStyle = "rgba(255, 51, 51, " + (al + 0.5) + ")";  // Rojo Crítico (Daniel/Identidad)
                    } else if (n.label.includes("WEB")) {
                        ctx.fillStyle = "rgba(255, 204, 0, " + (al + 0.5) + ")";   // Amarillo (Internet)
                    } else {
                        ctx.fillStyle = "rgba(0, 255, 102, " + (al + 0.4) + ")";  // Verde Neón (Nodos Libres Adquiridos)
                    }
                } else {
                    ctx.fillStyle = "rgba(0, 240, 255, " + (al + 0.15) + ")";     // Azul base disponible
                }
                
                ctx.beginPath(); ctx.arc(x, y, rd, 0, 2 * Math.PI); ctx.fill();
                if (n.label && n.z < 25) { ctx.fillStyle = "rgba(230, 237, 243, " + (al + 0.3) + ")"; ctx.font = "9px sans-serif"; ctx.fillText("[" + n.label + "]", x + 6, y + 3); }
            });
            
            const p = document.getElementById("load-percentage"); if (p) p.innerText = Math.floor(95 + Math.random() * 6) + "%";
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
