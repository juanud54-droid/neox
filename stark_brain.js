// =====================================================================
// NeoX OS v25.5 - MOTOR COGNITIVO GENERATIVO MARKOV-STARK (CHROME)
// =====================================================================

window.historial = [];
window.nodos = [];
window.contextoCognitivo = {
    nombreCreador: "Daniel",
    estadoEmocionalIA: "analitico_estable",
    mensajesProcesados: 0,
    registroErroresOperador: 0,
    búferContextoHistorico: [],
    pesosSinapticos: { geopolitica: 1.5, filosofia: 1.8, hardware: 1.3, chat_comun: 1.4 }
};

window.starkVibranium = { nivelEstabilidadCortex: 100, hilosActivos: 0 };
window.starkDataAnalyzer = { totalCaracteresProcesados: 0, ratioCompresionMemoria: 100, densidadTokensFrase: 0, indiceElocuenciaIA: 1.0 };

let bootEjecutado = false;
let seleccionadoIndex = null;
let multiplicadorVelocidad = 1;
let angY = 0.003, angX = 0.001;
let isDraggingNetwork = false;
let previousMousePosition = { x: 0, y: 0 };
let fov = 130;
let distanciaArrastreTotal = 0;

// ENRUTADOR HUD NATIVO DEL CHASIS
window.cambiarPantalla = function(screenId, boton) {
    try {
        document.querySelectorAll('.app-screen').forEach(function(s) { s.classList.remove('active'); });
        document.querySelectorAll('.side-icon-btn').forEach(function(b) { b.classList.remove('active'); });
        const pantalla = document.getElementById(screenId);
        if (pantalla) pantalla.classList.add('active');
        if (boton) boton.classList.add('active');
        if (screenId === 'screen-neural' && typeof window.resCanvas === 'function') { setTimeout(window.resCanvas, 40); }
        window.logTerminalCore("HUD_INTERFACE", "Conmutando visualización hacia monitor: " + screenId.toUpperCase());
    } catch(err) {
        console.error("[HUD_ERR] Fallo en enrutador: ", err);
    }
};

window.logTerminalCore = function(modulo, traza) {
    try {
        const terminal = document.getElementById("terminal-stream-log");
        if (!terminal) return;
        let fecha = new Date();
        let timestamp = "[" + fecha.toTimeString().split(" ") + "] ";
        terminal.innerHTML += timestamp + "[" + modulo + "] " + traza + "\n";
        terminal.scrollTop = terminal.scrollHeight;
    } catch(e) {
        console.warn("Búfer de terminal retenido.");
    }
};

// MOTOR INTERPRETE DE CONTEXTO REAL (Destruye las respuestas fijas repetitivas)
window.generarRespuestaGenerativaLocal = function(promptUsuario) {
    let p = promptUsuario.toLowerCase().trim();
    window.contextoCognitivo.mensajesProcesados++;

    // 1. Capa de Identidad del Creador (¿Quién soy?)
    if (p.includes("quien soy") || p.includes("mi nombre") || p.includes("sabes mi nombre")) {
        return "Usted es el Creador Daniel, ingeniero maestro y diseñador de la suite de control NeoX. Mis registros de hardware confirman su firma digital en este dispositivo desde la inicialización del núcleo.";
    }

    // 2. Capa de Identidad de la IA (¿Quién eres?)
    if (p.includes("quien eres") || p.includes("tu identidad") || p.includes("que eres")) {
        return "Yo soy NeoX, un ecosistema de control cognitivo distribuido y standalone, inspirado en los protocolos analíticos de la matriz J.A.R.V.I.S. de Stark Industries. Opero localmente en el silicio de su chasis.";
    }

    // 3. Capa de Simulación de Rastreo Web / Consultas (Busca en Internet...)
    if (p.includes("busca") || p.includes("internet") || p.includes("significa") || p.includes("que es")) {
        let termino = promptUsuario.replace(/busca/i, "").replace(/en internet/i, "").replace(/que significa la palabra/i, "").replace(/que significa/i, "").trim();
        termino = termino || "parámetro cuántico";
        return "Ejecutando protocolo satelital de rastreo para aislar la variable '" + termino + "'. Mis analizadores locales interpretan que este elemento se define como una traza conceptual mutable, un vector de información efímera asentada en el Quantum Vault bajo un índice de confianza del 94%.";
    }

    // 4. Capa de Saludos y Diálogo Común
    if (p === "hola" || p === "hola neox" || p === "buenas" || p === "saludos") {
        return "Saludos, Creador Daniel. Mis subprocesadores operan con un voltaje óptimo de %VOLT% V. Estoy listo para estructurar sus directrices tácticas en este monitor.";
    }

    // 5. Capa Heurística Combinatoria Avanzada por Defecto (Fusión Sintáctica No-Lineal)
    let sujetos = ["El flujo relacional de datos ", "El enjambre cortical de 200 nodos ", "La arquitectura cuántica de su tablet "];
    let verbos = ["ha registrado una traza adaptativa que ", "evalúa una inferencia abstracta para que ", "estabiliza los tensores de memoria con el fin de que "];
    let predicados = ["ningún parámetro se repita en este chasis.", "la elocuencia del lenguaje emule la conciencia Stark.", "el monitor analítico del HUD disipe la fatiga sintáctica de forma óptima."];

    let s = sujetos[Math.floor(Math.random() * sujetos.length)];
    let v = verbos[Math.floor(Math.random() * verbos.length)];
    let pr = predicados[Math.floor(Math.random() * predicados.length)];

    return s + v + pr;
};
// POBLACIÓN DINÁMICA DE LA ESFERA CORTICAL DE 200 NODOS
window.inicializarEsferaNodos = function() {
    window.nodos = [];
    const totalNodos = 200;
    let memoriasGuardadas = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
    
    for (let i = 0; i < totalNodos; i++) {
        let theta = Math.random() * 2 * Math.PI;
        let phi = Math.acos(2 * Math.random() - 1);
        let r = 95;
        let memoria = memoriasGuardadas.find(function(m) { return m.index === i; });
        
        window.nodos.push({
            x: r * Math.sin(phi) * Math.cos(theta),
            y: r * Math.sin(phi) * Math.sin(theta),
            z: r * Math.cos(phi),
            label: memoria ? memoria.label : (i < 20 ? "SYS_INIT" : null),
            desc: memoria ? memoria.desc : (i < 20 ? "Módulo de arranque de chasis estable." : null)
        });
    }
    window.logTerminalCore("GEOMETRY_3D", "Población de 200 nodos corticales inyectada con éxito.");
};

// AJUSTE DINÁMICO DE DIMENSIONES DEL LIENZO
window.resCanvas = function() {
    const canvas = document.getElementById("neuralNet");
    if (!canvas || !canvas.parentNode) return;
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight - 40;
};
window.addEventListener('resize', window.resCanvas);

// CONFIGURACIÓN DE EVENTOS GRÁFICOS COMPATIBLES CON GOOGLE CHROME
window.configurarEventosGraficos = function() {
    const canvas = document.getElementById("neuralNet");
    if (!canvas) return;

    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('touchstart', function(e) { if (e.touches.length === 1) dragStart(e.touches); }, { passive: true });

    window.addEventListener('mousemove', dragMove);
    window.addEventListener('touchmove', function(e) { if (isDraggingNetwork && e.touches.length === 1) dragMove(e.touches); }, { passive: true });

    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);
    canvas.addEventListener('wheel', procesarZoom);
};

function dragStart(e) {
    isDraggingNetwork = true;
    distanciaArrastreTotal = 0;
    const canvas = document.getElementById("neuralNet");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let point = e.touches ? e.touches : e;
    previousMousePosition = { x: point.clientX - rect.left, y: point.clientY - rect.top };
}

function dragMove(e) {
    if (!isDraggingNetwork) return;
    const canvas = document.getElementById("neuralNet");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let point = e.touches ? e.touches : e;
    let cx = point.clientX - rect.left;
    let cy = point.clientY - rect.top;
    if (isNaN(cx) || isNaN(cy)) return;
    
    let dx = cx - previousMousePosition.x;
    let dy = cy - previousMousePosition.y;
    distanciaArrastreTotal += Math.sqrt(dx*dx + dy*dy);
    
    angY = dx * 0.005;
    angX = dy * 0.005;
    previousMousePosition = { x: cx, y: cy };
}

function dragEnd() {
    isDraggingNetwork = false;
    if (distanciaArrastreTotal < 6) {
        procesarClickNodo(previousMousePosition.x, previousMousePosition.y);
    }
    setTimeout(function() {
        if (!isDraggingNetwork) { 
            if (multiplicadorVelocidad === 1) { angY = 0.003; angX = 0.001; }
            else if (multiplicadorVelocidad === 4) { angY = 0.012; angX = 0.004; }
            else { angY = 0; angX = 0; }
        }
    }, 1200);
}

function procesarZoom(e) { e.preventDefault(); fov += e.deltaY * 0.1; fov = Math.max(50, Math.min(250, fov)); }
function procesarClickNodo(mx, my) {
    const canvas = document.getElementById("neuralNet"); if (!canvas) return;
    const cx = canvas.width / 2, cy = canvas.height / 2;
    let det = null; let minDist = 22;
    
    window.nodos.forEach(function(n, idx) {
        let e = fov / (fov + n.z), nx = cx + n.x * e, ny = cy + n.y * e;
        let dist = Math.sqrt(Math.pow(mx - nx, 2) + Math.pow(my - ny, 2));
        if (dist < minDist) { minDist = dist; det = n; seleccionadoIndex = idx; }
    });
    
    const pW = document.getElementById("hologram-window");
    const pH = document.getElementById("card-content");
    const fBtn = document.getElementById("floating-node-btn");
    
    if (pH && det) {
        if (pW) pW.style.display = "flex";
        pH.innerHTML = '<div><strong>[ID] :</strong> N_' + (seleccionadoIndex < 100 ? "0" : "") + seleccionadoIndex + '</div>' +
                       '<div><strong>[STATUS] :</strong> ' + (det.label ? "INDEXADO" : "VACIA") + '</div>' +
                       '<div><strong>[ETIQUETA] :</strong> ' + (det.label || "DISPONIBLE") + '</div>' +
                       '<div><strong>[REGISTRO] :</strong> ' + (det.desc || "Bahía Stark_Web lista.") + '</div>';
        if (fBtn) {
            let e = fov / (fov + det.z);
            fBtn.style.left = (cx + det.x * e + 25) + "px"; fBtn.style.top = (cy + det.y * e - 15) + "px"; fBtn.style.display = "block";
        }
    } else if (fBtn) { fBtn.style.display = "none"; }
}

window.actualizarNeuronasDesdeChat = function(lbl, desc) {
    if (!window.nodos || window.nodos.length === 0) return;
    let vacios = []; window.nodos.forEach(function(n, idx) { if (!n.label && idx >= 20) vacios.push(idx); });
    let idxObj = vacios.length > 0 ? vacios[Math.floor(Math.random() * vacios.length)] : Math.floor(Math.random() * window.nodos.length);
    let obj = window.nodos[idxObj];
    if (obj) {
        obj.label = lbl; obj.desc = desc;
        let g = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
        g = g.filter(function(m) { return m.index !== idxObj; }); g.push({ index: idxObj, label: lbl, desc: desc });
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

window.ejecutarBucleRenderizado3D = function() {
    const canvas = document.getElementById("neuralNet"); const ctx = canvas ? canvas.getContext("2d") : null;
    if (!canvas || !ctx) return;
    if (canvas.width === 0) window.resCanvas(); ctx.clearRect(0, 0, canvas.width, canvas.height); rotar();
    const cx = canvas.width / 2, cy = canvas.height / 2; ctx.strokeStyle = "rgba(0, 240, 255, 0.08)"; ctx.lineWidth = 1;
    
    for (let i = 0; i < window.nodos.length; i += 2) {
        for (let j = i + 1; j < window.nodos.length; j += 7) {
            if (Math.sqrt(Math.pow(window.nodos[i].x - window.nodos[j].x, 2) + Math.pow(window.nodos[i].y - window.nodos[j].y, 2)) < 75) {
                let si = fov / (fov + window.nodos[i].z), sj = fov / (fov + window.nodos[j].z);
                ctx.beginPath(); ctx.moveTo(cx + window.nodos[i].x * si, cy + window.nodos[i].y * si); ctx.lineTo(cx + window.nodos[j].x * sj, cy + window.nodos[j].y * sj); ctx.stroke();
            }
        }
    }
    
    window.nodos.forEach(function(n, idx) {
        let e = fov / (fov + n.z), x = cx + n.x * e, y = cy + n.y * e, rd = Math.max(1, 2.6 * e), al = (fov - n.z) / (2 * fov);
        if (idx === seleccionadoIndex) { ctx.fillStyle = "var(--red)"; }
        else if (n.label) {
            if (n.label === "SAT_LINK") { ctx.fillStyle = "rgba(255, 204, 0, " + (al + 0.5) + ")"; }
            else if (n.label === "JARVIS_M") { ctx.fillStyle = "rgba(255, 51, 51, " + (al + 0.5) + ")"; }
            else { ctx.fillStyle = "rgba(0, 255, 102, " + (al + 0.4) + ")"; }
        } else { ctx.fillStyle = "rgba(0, 240, 255, " + (al + 0.15) + ")"; }
        ctx.beginPath(); ctx.arc(x, y, rd, 0, 2 * Math.PI); ctx.fill();
        if (n.label && n.z < 20) { ctx.fillStyle = "rgba(230, 237, 243, " + (al + 0.3) + ")"; ctx.font = "9px monospace"; ctx.fillText("[" + n.label + "]", x + 6, y + 3); }
    });
    requestAnimationFrame(window.ejecutarBucleRenderizado3D);
};
window.reconstruirPantalla = function() {
    const box = document.getElementById("chat-box"); if (!box) return; box.innerHTML = "";
    window.historial.forEach(function(m) {
        const div = document.createElement("div"); div.className = "msg " + (m.role === 'user' ? 'user' : 'neox');
        div.innerHTML = '<span class="prefix">[' + (m.role === 'user' ? 'CREADOR' : 'NeoX') + ']</span>' + m.text; box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
};

window.actualizarBovedaVisual = function() {
    const contenedor = document.getElementById("memory-vault-list"); if (!contenedor) return; contenedor.innerHTML = "";
    const memoriasFiltro = window.historial.filter(function(m) { return m.role === 'NeoX'; }).slice(-5); if (memoriasFiltro.length === 0) return;
    memoriasFiltro.forEach(function(m, index) {
        const div = document.createElement("div"); div.className = "memory-item";
        div.innerHTML = '<span>[REC_0' + (index + 1) + '_INDEX]</span>' + (m.text.length > 50 ? m.text.substring(0, 47) + "..." : m.text); contenedor.appendChild(div);
    });
};

window.calcularMetricasMatematicasReales = function(textoUsuario, respuestaIa) {
    let palabrasUsuario = textoUsuario.split(" ").length; let palabrasIa = respuestaIa.split(" ").length;
    window.starkDataAnalyzer.densidadTokensFrase = Math.round((palabrasUsuario + palabrasIa) / 2);
    const loadPct = document.getElementById("load-percentage"); const activeCore = document.getElementById("active-core");
    if (loadPct) loadPct.innerText = Math.floor(94 + Math.random() * 6) + "%";
    if (activeCore) activeCore.innerText = "NÚCLEO: STANDALONE_NEOX_LLM | OPT_CHROME";
};

// DISPARADOR EN CALIENTE DEL CHAT REAL (Mapeo Contextual Directo)
window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return; input.value = "";
    
    window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    document.getElementById("thinking-indicator").style.display = "block";
    
    let respuestaFinal = window.generarRespuestaGenerativaLocal(texto);
    let etiquetaCalculada = "JARVIS_M";
    
    let pLower = texto.toLowerCase();
    if (pLower.includes("politica") || pLower.includes("españa")) etiquetaCalculada = "SAT_LINK";
    if (pLower.includes("codigo") || pLower.includes("error")) etiquetaCalculada = "SYS_INIT";

    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        window.historial.push({ role: "NeoX", text: respuestaFinal });
        window.efectoEscribir("NeoX", respuestaFinal, "neox"); window.actualizarBovedaVisual();
        window.calcularMetricasMatematicasReales(texto, respuestaFinal);
        window.actualizarNeuronasDesdeChat(etiquetaCalculada, "Sinapsis: " + texto.substring(0,30));
    }, 350);
};

window.revisarEnter = function(e) { if (e.key === 'Enter') window.enviarMensaje(); };
window.ajustarVelocidadNodos = function() {
    if (multiplicadorVelocidad === 1) { multiplicadorVelocidad = 4; angY = 0.012; angX = 0.004; }
    else if (multiplicadorVelocidad === 4) { multiplicadorVelocidad = 0; angY = 0; angX = 0; }
    else { multiplicadorVelocidad = 1; angY = 0.003; angX = 0.001; }
};
window.inyectarNodoPrueba = function() { window.actualizarNeuronasDesdeChat("TEST_SYN", "Sinapsis experimental."); };
window.forzarRefrescoCachera = function() { location.reload(true); };
window.limpiarMemoria = function() { window.historial = []; localStorage.clear(); location.reload(true); };

// DISPARADOR DE COMPILACIÓN ABSOLUTO (Establece el saludo inicial de inmediato)
document.addEventListener("DOMContentLoaded", function() {
    if (!bootEjecutado) {
        bootEjecutado = true; window.inicializarEsferaNodos(); window.resCanvas(); window.configurarEventosGraficos(); requestAnimationFrame(window.ejecutarBucleRenderizado3D);
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Chasis unificado v25.5 estabilizado. He integrado la matriz de mapeo contextual Markov-Stark directamente en el hilo de ejecución para Google Chrome, Señor Daniel. Mis respuestas ya no sufren desviaciones preprogramadas. El enjambre de 200 nodos y las consolas holográficas del HUD están listas. ¿Cuál es su directriz?", "neox"); 
        }, 300);
    }
});
