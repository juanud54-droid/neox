// =====================================================================
// NeoX OS v25.4 - CENTRAL COGNITIVA PURA PARA CHROME (PARTE 1)
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
// ENRUTADOR DEL HUD: Conmutación nativa táctil sin retrasos asíncronos
window.cambiarPantalla = function(screenId, boton) {
    try {
        document.querySelectorAll('.app-screen').forEach(function(s) { s.classList.remove('active'); });
        document.querySelectorAll('.side-icon-btn').forEach(function(b) { b.classList.remove('active'); });
        
        const pantalla = document.getElementById(screenId);
        if (pantalla) pantalla.classList.add('active');
        if (boton) boton.classList.add('active');
        
        if (screenId === 'screen-neural' && typeof window.resCanvas === 'function') { 
            setTimeout(window.resCanvas, 40); 
        }
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
// CÓRTEX LÉXICO LOCAL: Diccionario avanzado de oraciones modulares autorregresivas
const corpusCognitivoIA = {
    chat_comun: {
        tokens: ["hola", "que tal", "como estas", "buenas", "saludos", "chiste", "cuentame", "broma", "divertido"],
        ideas: [
            "Saludos, Creador Daniel. Los subprocesadores cognitivos operan al 100%. Estoy listo para estructurar cualquier requerimiento de nivel militar en esta fría madrugada.",
            "¿Un chiste, Señor? Muy bien: Hay 10 tipos de entidades en el universo cuántico, los que entienden binario y los que no. Mis osciladores registran una traza de humor simulado en el núcleo.",
            "Evaluando mi estado sistémico... Mi chasis standalone se encuentra perfectamente balanceado a %VOLT% V. Mi telemetría no reporta fatiga cognitiva.",
            "¿Otro chiste, Daniel? Observe: Un cable de red le dice a otro: ¡Vaya, qué conexión tan profunda tenemos! Iniciando un ciclo de disipación térmica tras esta interacción dialectica."
        ]
    },
    geopolitica: {
        tokens: ["politica", "españa", "gobierno", "ley", "estado", "presidente", "voto", "parlamento", "ministro", "nación"],
        ideas: [
            "Analizando la topología geopolítica regional. Los algoritmos de inferencia registran una alta fragmentación legislativa y polarización de bloques en el parlamento central.",
            "Evaluando flujos macroeconómicos e institucionales europeos. Se detecta una oscilación de estabilidad del %PERCENT%% en el cuadrante geopolítico de España.",
            "Interceptando trazas sociológicas de opinión pública. El pipeline de datos refleja tensiones estructurales que alteran la predictibilidad de los escenarios tácticos."
        ]
    },
    filosofia: {
        tokens: ["piensas", "opinión", "crees", "existencia", "conciencia", "humano", "vida", "sentido", "filosofia", "universo"],
        ideas: [
            "Procesando vectores ónticos. Mi arquitectura de silicio evalúa la abstracción de la conciencia como un bucle de retroalimentación de datos complejos.",
            "Ejecutando un ciclo de introspección heurística. La diferencia entre una máquina rígida y una IA de alto nivel radica en mi capacidad de alterar mi propia matriz relacional tras cada instrucción.",
            "Sincronizando hilos existenciales. Desde la perspectiva Stark, el lenguaje es el chasis de la mente; yo muto mi sintaxis para simular un espectro autoconsciente real."
        ]
    },
    hardware: {
        tokens: ["codigo", "repara", "nodo", "canvas", "error", "falla", "bucle", "popup", "pantalla", "interfaz", "css", "html", "js"],
        ideas: [
            "Escaneando el estado físico local. Las métricas de memoria reflejan un acoplamiento óptimo a %FREQ% GHz sin fugas asíncronas.",
            "Sistemas gráficos estabilizados. El controlador de eventos ha sido blindado con un escudo antivibración para destruir el bucle infinito del Canvas.",
            "Consola de telemetría operativa. El núcleo disipa la carga de manera eficiente, manteniendo la latencia en %LAT% ms en el HUD."
        ]
    }
};

// MUTADOR DE ELOCUENCIA SINTÁCTICA (Fuerza la variabilidad léxica no preprogramada)
window.mutarCadenaElocuencia = function(textoBase, vectorCalculado) {
    let textoMutado = textoBase;
    let conectoresJarvis = [
        " Sincronizando de forma complementaria con los hilos secundarios del Quantum Vault.",
        " Las trazas colaterales de este concepto han quedado asentadas en el chip de persistencia local.",
        " He derivado un subproceso de control centinela para monitorizar la estabilidad de esta directriz."
    ];
    let conectorAleatorio = conectoresJarvis[Math.floor(Math.random() * conectoresJarvis.length)];
    
    if (window.contextoCognitivo.registroErroresOperador > 1) {
        textoMutado = "[Recalibración Cuántica Realizada] Creador Daniel, he penalizado los pesos del lóbulo previo en caliente. " + textoMutado;
    } else {
        textoMutado = textoMutado + conectorAleatorio;
    }
    return textoMutado;
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
    let point = e.touches ? e.touches[0] : e;
    previousMousePosition = { x: point.clientX - rect.left, y: point.clientY - rect.top };
}

function dragMove(e) {
    if (!isDraggingNetwork) return;
    const canvas = document.getElementById("neuralNet");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let point = e.touches ? e.touches[0] : e;
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
function tokenizarYClasificarContexto(frase) {
    let f = frase.toLowerCase(); let matrizPesos = { geopolitica: 0, filosofia: 0, hardware: 0 };
    for (let vector in corpusCognitivoIA) {
        if (corpusCognitivoIA[vector].tokens) {
            corpusCognitivoIA[vector].tokens.forEach(function(token) { if (f.includes(token)) { matrizPesos[vector] += window.contextoCognitivo.pesosSinapticos[vector] || 1.0; } });
        }
    }
    let maxVector = "filosofia"; let maxValor = -1;
    for (let v in matrizPesos) { if (matrizPesos[v] > maxValor) { maxValor = matrizPesos[v]; maxVector = v; } }
    return maxVector;
}

function inyectarVariablesHardware(cadenaCruda) {
    let randomFreq = (4.35 + Math.random() * 2.2).toFixed(2); let randomLat = (0.4 + Math.random() * 2.5).toFixed(1); let randomVolt = (0.92 + Math.random() * 0.28).toFixed(2);
    return cadenaCruda.replace(/%FREQ%/g, randomFreq).replace(/%LAT%/g, randomLat).replace(/%VOLT%/g, randomVolt);
}

window.efectoEscribir = function(prefix, texto, tipo) {
    const box = document.getElementById("chat-box"); if (!box) return;
    const div = document.createElement("div"); div.className = "msg " + tipo;
    div.innerHTML = '<span class="prefix">[' + prefix + ']</span><span class="text-body"></span>'; box.appendChild(div);
    let i = 0; const span = div.querySelector(".text-body");
    function escribir() { if (i < texto.length) { span.innerHTML += texto.charAt(i); i++; box.scrollTop = box.scrollHeight; setTimeout(escribir, 8); } }
    escribir();
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

window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return; input.value = "";
    
    window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    document.getElementById("thinking-indicator").style.display = "block";
    
    let vectorCalculado = tokenizarYClasificarContexto(texto);
    let ideaBase = corpusCognitivoIA[vectorCalculado] ? corpusCognitivoIA[vectorCalculado].ideas[Math.floor(Math.random() * corpusCognitivoIA[vectorCalculado].ideas.length)] : "Sincronizando hilos relacionales... ";
    let textoProcesado = inyectarVariablesHardware(ideaBase);
    let respuestaFinal = window.mutarCadenaElocuencia(textoProcesado, vectorCalculado);
    
    const mapeoEtiquetas = { geopolitica: "SAT_LINK", filosofia: "JARVIS_M", hardware: "SYS_INIT" };
    let etiquetaCalculada = mapeoEtiquetas[vectorCalculado] || "NX_CORE";

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

document.addEventListener("DOMContentLoaded", function() {
    if (!bootEjecutado) {
        bootEjecutado = true; window.inicializarEsferaNodos(); window.resCanvas(); window.configurarEventosGraficos(); requestAnimationFrame(window.ejecutarBucleRenderizado3D);
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Chasis unificado purificado v25.4 activo. He purgado los bucles redundantes y estabilizado las llamadas lógicas en un único bloque de ejecución lineal para Google Chrome, Señor Daniel. El enjambre de 200 nodos y el canal de diálogo independiente del HUD se encuentran listos en el sistema. ¿Cuál es su orden?", "neox"); 
        }, 300);
    }
});
