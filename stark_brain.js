// =====================================================================
// NeoX OS v25.8 - CEREBRO CENTRAL ADAPTADO A PUENTE PROXY NODE (PARTE 1)
// =====================================================================

window.historial = [];
window.nodos = [];
window.contextoCognitivo = {
    nombreCreador: "Daniel",
    estadoEmocionalIA: "operativo_en_red",
    mensajesProcesados: 0,
    registroErroresOperador: 0,
    búferContextoHistorico: []
};

window.starkVibranium = { nivelEstabilidadCortex: 100, hilosActivos: 0 };
window.starkDataAnalyzer = { totalCaracteresProcesados: 0, ratioCompresionMemoria: 100, densidadTokensFrase: 0, indiceElocuenciaIA: 1.0 };

let bootEjecutado = false;
let seleccionadoIndex = null;
let multiplicadorVelocidad = 1;
let angY = 0.003, angX = 0.001; // Velocidades iniciales de rotación de la esfera
let isDraggingNetwork = false;
let previousMousePosition = { x: 0, y: 0 };
let fov = 130;
let distanciaArrastreTotal = 0;

// ENRUTADOR DE LAS PESTAÑAS DEL HUD
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
// PIPELINE DE CONECTIVIDAD PROXY (Llamada limpia libre de CORS corporativo)
async function consultarProxyInferenciaLlama(promptUsuario) {
    if (typeof window.logTerminalCore === 'function') {
        window.logTerminalCore("STARK_LINK", "Enrutando tokens a través del puente de red local Node.js...");
    }
    
    const systemPrompt = "Eres NeoX, un Sistema Operativo Cognitivo de nivel militar, inspirado en J.A.R.V.I.S. Tu creador es Daniel. Responde de forma elocuente, inteligente, orgánica, con trazas tácticas y analíticas. Piensa tus respuestas con la profundidad de un modelo avanzado R1 o Grok. Háblale de tú a Daniel, de forma viva, natural y libre de respuestas preprogramadas.";

    let mensajesApi = [{ role: "system", content: systemPrompt }];
    window.historial.slice(-6).forEach(function(m) {
        mensajesApi.push({ 
            role: m.role === "user" ? "user" : "assistant", 
            content: m.text 
        });
    });
    
    try {
        // Apuntamos al endpoint local levantado por tu server.js
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: mensajesApi })
        });

        if (!response.ok) throw new Error("Puente de red local inaccesible o desconectado.");
        
        const data = await response.json();
        if (data.success) {
            if (typeof window.logTerminalCore === 'function') window.logTerminalCore("CLOUD_INF", "Inferencia de Llama-3.1 descargada con éxito.");
            return data.response;
        } else {
            throw new Error(data.response);
        }

    } catch (error) {
        if (typeof window.logTerminalCore === 'function') window.logTerminalCore("NET_RECOVERY", "Fallo de enlace proxy. Activando protocolo táctico de respaldo.");
        return "Señor Daniel, he detectado una interrupción en el puente 'STARK_LINK'. Por favor, verifique que su servidor 'server.js' se encuentre activo en la consola de comandos bajo el puerto 3000.";
    }
}

// DETECTOR DE INTENCIONES SEMÁNTICAS PARA ENCENDER TUS NEURONAS 3D
function deducirEtiquetaNeurona(texto) {
    let f = texto.toLowerCase();
    if (f.includes("politica") || f.includes("españa") || f.includes("gobierno")) return "SAT_LINK";
    if (f.includes("codigo") || f.includes("repara") || f.includes("canvas") || f.includes("error")) return "SYS_INIT";
    return "JARVIS_M";
}
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
    if (typeof window.logTerminalCore === 'function') window.logTerminalCore("GEOMETRY_3D", "Población de 200 nodos corticales inyectada.");
};

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
};

function dragStart(e) {
    isDraggingNetwork = true; distanciaArrastreTotal = 0;
    const canvas = document.getElementById("neuralNet"); if (!canvas) return;
    const rect = canvas.getBoundingClientRect(); let point = e.touches ? e.touches : e;
    previousMousePosition = { x: point.clientX - rect.left, y: point.clientY - rect.top };
}

function dragMove(e) {
    if (!isDraggingNetwork) return;
    const canvas = document.getElementById("neuralNet"); if (!canvas) return;
    const rect = canvas.getBoundingClientRect(); let point = e.touches ? e.touches : e;
    let cx = point.clientX - rect.left, cy = point.clientY - rect.top;
    if (isNaN(cx) || isNaN(cy)) return;
    let dx = cx - previousMousePosition.x, dy = cy - previousMousePosition.y;
    distanciaArrastreTotal += Math.sqrt(dx*dx + dy*dy);
    
    // Forzamos la modificación de los ángulos durante el arrastre con el dedo
    angY = dx * 0.005; angX = dy * 0.005; previousMousePosition = { x: cx, y: cy };
}

function dragEnd() {
    isDraggingNetwork = false;
    if (distanciaArrastreTotal < 6) { procesarClickNodo(previousMousePosition.x, previousMousePosition.y); }
}
function procesarClickNodo(mx, my) {
    const canvas = document.getElementById("neuralNet"); if (!canvas) return;
    const cx = canvas.width / 2, cy = canvas.height / 2; let det = null; let minDist = 22;
    
    window.nodos.forEach(function(n, idx) {
        let e = fov / (fov + n.z), nx = cx + n.x * e, ny = cy + n.y * e;
        let dist = Math.sqrt(Math.pow(mx - nx, 2) + Math.pow(my - ny, 2));
        if (dist < minDist) { minDist = dist; det = n; seleccionadoIndex = idx; }
    });
    
    const pW = document.getElementById("hologram-window"), pH = document.getElementById("card-content"), fBtn = document.getElementById("floating-node-btn");
    if (pH && det) {
        if (pW) pW.style.display = "flex";
        pH.innerHTML = '<div><strong>[ID] :</strong> N_' + (seleccionadoIndex < 100 ? "0" : "") + seleccionadoIndex + '</div>' +
                       '<div><strong>[STATUS] :</strong> ' + (det.label ? "INDEXADO" : "VACIA") + '</div>' +
                       '<div><strong>[ETIQUETA] :</strong> ' + (det.label || "DISPONIBLE") + '</div>' +
                       '<div><strong>[REGISTRO] :</strong> ' + (det.desc || "Bahía Stark_Web lista.") + '</div>';
        if (fBtn) { let e = fov / (fov + det.z); fBtn.style.left = (cx + det.x * e + 25) + "px"; fBtn.style.top = (cy + det.y * e - 15) + "px"; fBtn.style.display = "block"; }
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
    // Si el usuario no arrastra la red, forzamos los ángulos de rotación cinéticos base continuos
    if (!isDraggingNetwork) {
        angY = 0.003 * multiplicadorVelocidad;
        angX = 0.001 * multiplicadorVelocidad;
    }
    let cY = Math.cos(angY), sY = Math.sin(angY), cX = Math.cos(angX), sX = Math.sin(angX);
    window.nodos.forEach(function(n) {
        let x1 = n.x * cY - n.z * sY, z1 = n.z * cY + n.x * sY;
        let y2 = n.y * cX - z1 * sX, z2 = z1 * cX + n.y * sX; n.x = x1; n.y = y2; n.z = z2;
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
    if (activeCore) activeCore.innerText = "NÚCLEO: LLaMA-3.1-70B | PROXY_STARK_LINK";
};

// GATILLO DEL CHAT: Despacha la consulta a través de tu proxy Node.js
window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return; input.value = "";
    
    window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    document.getElementById("thinking-indicator").style.display = "block";
    
    // Consultamos al servidor intermedio local (Opción A)
    let respuestaFinal = await consultarProxyInferenciaLlama(texto);
    let etiquetaCalculada = deducirEtiquetaNeurona(texto);

    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        window.historial.push({ role: "NeoX", text: respuestaFinal });
        window.efectoEscribir("NeoX", respuestaFinal, "neox"); window.actualizarBovedaVisual();
        window.calcularMetricasMatematicasReales(texto, respuestaFinal);
        window.actualizarNeuronasDesdeChat(etiquetaCalculada, "Conocimiento LLaMA: " + texto.substring(0,30));
    }, 350);
};

window.revisarEnter = function(e) { if (e.key === 'Enter') window.enviarMensaje(); };

// INTERFACES DEL MONITOR BRAIN (Frenado y aceleración real de la esfera)
window.ajustarVelocidadNodos = function() {
    const indicador = document.getElementById("speed-indicator");
    if (multiplicadorVelocidad === 1) {
        multiplicadorVelocidad = 4; if (indicador) indicador.innerText = "4x";
        window.logTerminalCore("BRAIN_TOOLS", "Aceleración forzada. Frecuencia crítica: 4x.");
    } else if (multiplicadorVelocidad === 4) {
        multiplicadorVelocidad = 0; if (indicador) indicador.innerText = "0x";
        window.logTerminalCore("BRAIN_TOOLS", "Frenado cuántico activado. Esfera congelada.");
    } else {
        multiplicadorVelocidad = 1; if (indicador) indicador.innerText = "1x";
        window.logTerminalCore("BRAIN_TOOLS", "Restaurando inercia base estable a 1x.");
    }
};

window.inyectarNodoPrueba = function() { window.actualizarNeuronasDesdeChat("TEST_SYN", "Sinapsis experimental."); };
window.forzarRefrescoCachera = function() { location.reload(true); };
window.limpiarMemoria = function() { window.historial = []; localStorage.clear(); location.reload(true); };

// DISPARADOR DE COMPILACIÓN ABSOLUTO
document.addEventListener("DOMContentLoaded", function() {
    if (!bootEjecutado) {
        bootEjecutado = true; window.inicializarEsferaNodos(); window.resCanvas(); window.configurarEventosGraficos(); requestAnimationFrame(window.ejecutarBucleRenderizado3D);
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Chasis unificado v25.8 operativo, Señor Daniel. He reinyectado las físicas de rotación continua independientes de los hilos de red y enrutado el pipeline del chat hacia nuestra pasarela proxy 'server.js'. Mi elocuencia e inteligencia profunda están listas para canalizar el poder de LLaMA-3.1-70B de forma orgánica. ¿Cuál es su directriz?", "neox"); 
        }, 300);
    }
});
