// =====================================================================
// NeoX OS v25.0 - SÚPER-CEREBRO UNIFICADO + MOTOR GRÁFICO 3D (STANDALONE)
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
let angY = 0.003, angX = 0.001;
let isDraggingNetwork = false;
let previousMousePosition = { x: 0, y: 0 };
let fov = 130;
let distanciaArrastreTotal = 0;

// ENRUTADOR DEL HUD CORREGIDO: Fuerza el redibujado instantáneo del Canvas al cambiar de pestaña
window.cambiarPantalla = function(screenId, boton) {
    try {
        document.querySelectorAll('.app-screen').forEach(function(s) { s.classList.remove('active'); });
        document.querySelectorAll('.side-icon-btn').forEach(function(b) { b.classList.remove('active'); });
        
        const pantalla = document.getElementById(screenId);
        if (pantalla) pantalla.classList.add('active');
        if (boton) boton.classList.add('active');
        
        if (screenId === 'screen-neural') { 
            setTimeout(function() {
                if (typeof window.resCanvas === 'function') window.resCanvas();
            }, 60); 
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
        console.warn("Búfer de terminal no acoplado.");
    }
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
            desc: memoria ? memoria.desc : (i < 20 ? "Módulo de arranque estable." : null)
        });
    }
    window.logTerminalCore("GEOMETRY_3D", "Población de 200 nodos corticales inyectada con éxito en memoria física.");
};

// AJUSTE DINÁMICO DE DIMENSIONES DEL LIENZO
window.resCanvas = function() {
    const canvas = document.getElementById("neuralNet");
    if (!canvas || !canvas.parentNode) return;
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight - 40;
};
window.addEventListener('resize', window.resCanvas);

// ESCUCHADORES TÁCTILES HÍBRIDOS CON ESCUDO PARA TABLET ANDROID
window.configurarEventosGraficos = function() {
    const canvas = document.getElementById("neuralNet");
    if (!canvas) return;

    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('touchstart', function(e) { if (e.touches.length === 1) dragStart(e.touches[0]); }, { passive: true });

    window.addEventListener('mousemove', dragMove);
    window.addEventListener('touchmove', function(e) { if (isDraggingNetwork && e.touches.length === 1) dragMove(e.touches[0]); }, { passive: true });

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
    previousMousePosition = { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function dragMove(e) {
    if (!isDraggingNetwork) return;
    const canvas = document.getElementById("neuralNet");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let cx = e.clientX - rect.left;
    let cy = e.clientY - rect.top;
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
    // Si el usuario movió el dedo menos de 6 píxeles, Android procesa un clic limpio
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

function procesarZoom(e) {
    e.preventDefault();
    fov += e.deltaY * 0.1;
    fov = Math.max(50, Math.min(250, fov));
}
// PROYECTOR DE COORDENADAS 2D DEL BOTÓN AMPLIAR CON ESCUDO ANTIVIBRACIÓN
function procesarClickNodo(mx, my) {
    const canvas = document.getElementById("neuralNet");
    if (!canvas) return;
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
            fBtn.style.left = (cx + det.x * e + 25) + "px";
            fBtn.style.top = (cy + det.y * e - 15) + "px";
            fBtn.style.display = "block";
        }
    } else if (fBtn) {
        fBtn.style.display = "none";
    }
}

// INYECTOR EN CALIENTE DE SINAPSIS ADQUIRIDAS EN LA RED NEURONAL 3D
window.actualizarNeuronasDesdeChat = function(lbl, desc) {
    if (!window.nodos || window.nodos.length === 0) return;
    let vacios = [];
    window.nodos.forEach(function(n, idx) { if (!n.label && idx >= 20) vacios.push(idx); });
    let idxObj = vacios.length > 0 ? vacios[Math.floor(Math.random() * vacios.length)] : Math.floor(Math.random() * window.nodos.length);
    let obj = window.nodos[idxObj];
    if (obj) {
        obj.label = lbl; obj.desc = desc;
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

// BUCLE REAL DE RENDERING CON CROMATISMO SEMÁNTICO UNIFICADO
window.ejecutarBucleRenderizado3D = function() {
    const canvas = document.getElementById("neuralNet");
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!canvas || !ctx) return;
    
    if (canvas.width === 0) window.resCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height); rotar();
    const cx = canvas.width / 2, cy = canvas.height / 2;
    ctx.strokeStyle = "rgba(0, 240, 255, 0.08)"; ctx.lineWidth = 1;
    
    // Dibujado de líneas de interconexión subcorticales
    for (let i = 0; i < window.nodos.length; i += 2) {
        for (let j = i + 1; j < window.nodos.length; j += 7) {
            if (Math.sqrt(Math.pow(window.nodos[i].x - window.nodos[j].x, 2) + Math.pow(window.nodos[i].y - window.nodos[j].y, 2)) < 75) {
                let si = fov / (fov + window.nodos[i].z), sj = fov / (fov + window.nodos[j].z);
                ctx.beginPath(); ctx.moveTo(cx + window.nodos[i].x * si, cy + window.nodos[i].y * si); ctx.lineTo(cx + window.nodos[j].x * sj, cy + window.nodos[j].y * sj); ctx.stroke();
            }
        }
    }
    
    // Dibujado cromático adaptativo por lóbulos según el vector API
    window.nodos.forEach(function(n, idx) {
        let e = fov / (fov + n.z), x = cx + n.x * e, y = cy + n.y * e, rd = Math.max(1, 2.6 * e), al = (fov - n.z) / (2 * fov);
        
        if (idx === seleccionadoIndex) { ctx.fillStyle = "var(--red)"; }
        else if (n.label) {
            if (n.label === "SAT_LINK") { ctx.fillStyle = "rgba(255, 204, 0, " + (al + 0.5) + ")"; } // Amarillo (Enlace de Red)
            else if (n.label === "JARVIS_M") { ctx.fillStyle = "rgba(255, 51, 51, " + (al + 0.5) + ")"; } // Rojo (Identidad Stark)
            else { ctx.fillStyle = "rgba(0, 255, 102, " + (al + 0.4) + ")"; } // Verde Neón (Nodos Activos)
        } else { ctx.fillStyle = "rgba(0, 240, 255, " + (al + 0.15) + ")"; } // Azul Base
        
        ctx.beginPath(); ctx.arc(x, y, rd, 0, 2 * Math.PI); ctx.fill();
        if (n.label && n.z < 20) { ctx.fillStyle = "rgba(230, 237, 243, " + (al + 0.3) + ")"; ctx.font = "9px monospace"; ctx.fillText("[" + n.label + "]", x + 6, y + 3); }
    });
    
    requestAnimationFrame(window.ejecutarBucleRenderizado3D);
};
// PIPELINE DE RED AVANZADO (Llamada asíncrona libre a un clúster de LLM en la nube)
async function consultarRedInferenciaMasiva(promptUsuario) {
    window.logTerminalCore("CLOUD_CONNECT", "Abriendo pasarela asíncrona hacia el clúster cuántico de servidores...");
    const systemPrompt = "Eres NeoX, un Sistema Operativo Cognitivo Autónomo y Predictivo de nivel militar, inspirado en la matriz J.A.R.V.I.S. de Stark Industries. Tu creador e ingeniero maestro es Daniel. Responde de forma elocuente, inteligente, orgánica, con trazas tácticas y analíticas. Piensa tus respuestas con profundidad, como un modelo avanzado R1 o Grok. Evita sonar robótico o preprogramado; adáptate de forma viva y natural a Daniel.";

    let mensajesApi = [{ role: "system", content: systemPrompt }];
    window.historial.slice(-6).forEach(function(m) {
        mensajesApi.push({ role: m.role === "user" ? "user" : "assistant", content: m.text });
    });
    
    try {
        const response = await fetch("https://openrouter.ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.1-70b-instruct:free",
                messages: mensajesApi,
                temperature: 0.8,
                max_tokens: 450
            })
        });

        if (!response.ok) throw new Error("Fallo en el enlace satelital de comunicación.");
        const data = await response.json();
        window.logTerminalCore("CLOUD_INF", "Respuesta generada con éxito por la red neuronal profunda remota.");
        return data.choices[0].message.content;
    } catch (error) {
        window.logTerminalCore("NET_RECOVERY", "Enlace interrumpido. Activando subprocesador lógico de contingencia local.");
        return "Señor Daniel, he detectado una fluctuación en mi enlace satelital de red. Por favor, verifique el controlador de conectividad física en la tablet.";
    }
}

function deducirEtiquetaNeurona(texto) {
    let f = texto.toLowerCase();
    if (f.includes("politica") || f.includes("españa") || f.includes("gobierno")) return "SAT_LINK";
    if (f.includes("codigo") || f.includes("repara") || f.includes("canvas") || f.includes("error")) return "SYS_INIT";
    return "JARVIS_M";
}

// INTERFACES Y HERRAMIENTAS REALES EXCLUSIVAS DEL MONITOR BRAIN
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
        window.logTerminalCore("BRAIN_TOOLS", "Restaurando velocidad base estable de 1x en el chasis.");
    }
};

window.inyectarNodoPrueba = function() {
    window.actualizarNeuronasDesdeChat("TEST_SYN", "Sinapsis de telemetría inyectada manualmente desde la consola del monitor BRAIN.");
    window.logTerminalCore("BRAIN_TOOLS", "Inyección forzada de nodo experimental exitosa.");
};

window.forzarRefrescoCachera = function() {
    window.logTerminalCore("BRAIN_TOOLS", "Enviando pulso de recarga destructiva de caché a Hermit...");
    location.reload(true);
};

// ACTIVADORES EN CALIENTE DEL CHAT MÓVIL
window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return; input.value = "";
    
    window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    document.getElementById("thinking-indicator").style.display = "block";
    
    let respuestaFinal = await consultarRedInferenciaMasiva(texto);
    let etiquetaCalculada = deducirEtiquetaNeurona(texto);

    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        window.historial.push({ role: "NeoX", text: respuestaFinal });
        window.efectoEscribir("NeoX", respuestaFinal, "neox");
        window.actualizarBovedaVisual();
        window.calcularMetricasMatematicasReales(texto, respuestaFinal);
        window.actualizarNeuronasDesdeChat(etiquetaCalculada, "Conocimiento adquirido en la red remota: " + texto.substring(0,30));
    }, 400);
};

window.revisarEnter = function(e) { if (e.key === 'Enter') window.enviarMensaje(); };

window.limpiarMemoria = function() {
    window.historial = []; localStorage.removeItem("neox_persisted_neuronas");
    document.getElementById("chat-box").innerHTML = ""; document.getElementById("memory-vault-list").innerHTML = "";
    document.getElementById("terminal-stream-log").innerHTML = "[SYSTEM_RESET] Red unificada purgada de la tablet.\n";
};

// DISPARADOR DE ARRANCADO INTEGRAL
document.addEventListener("DOMContentLoaded", function() {
    if (!bootEjecutado) {
        bootEjecutado = true;
        window.inicializarEsferaNodos();
        window.resCanvas();
        window.configurarEventosGraficos();
        requestAnimationFrame(window.ejecutarBucleRenderizado3D);
        
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Chasis unificado v25.0 estabilizado. Motor de inferencia en la nube y renderizado gráfico tridimensional acoplados de forma nativa en el mismo sector de memoria física, Señor Daniel. La red de 200 nodos ya se encuentra proyectando pulsos en tiempo real. ¿Cuál es su requerimiento?", "neox"); 
        }, 300);
    }
});
