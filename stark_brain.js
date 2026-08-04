// =====================================================================
// NeoX OS v21.0 - CORE COGNITIVO J.A.R.V.I.S. - PARTE 1 (VECTORES BASE)
// =====================================================================

window.historial = [];
window.contextoCognitivo = { 
    nombreCreador: localStorage.getItem("neox_creador_name") || "Daniel", 
    ultimaIntencion: null,
    ultimoTopico: ""
};
let bootEjecutado = false;

// Bloques sintácticos elocuentes para la mutación del pensamiento de la IA
const openings = [
    "Analizando los vectores de datos en vivo, Señor. ",
    "Interesante planteamiento táctico, Creador Daniel. ",
    "Conectando con los bancos del Quantum Vault local... ",
    "Registros de telemetría estabilizados en el chasis. ",
    "Sistemas cognitivos respondiendo en tiempo real, Señor. ",
    "Procesando el peso semántico de su instrucción. "
];
const bodies = [
    "Las métricas internas reflejan un acoplamiento perfecto de la CPU al %FREQ% GHz, manteniendo una latencia residual de %LAT% ms. ",
    "He examinado la topología de la Red de 90 Nodos y detecto una tasa de absorción semántica del %PERCENT%% en este cuadrante. ",
    "El flujo físico del chasis disipa la carga de manera eficiente, optimizando el consumo del núcleo al %VOLT% V. ",
    "Los algoritmos heurísticos sugieren que esta directriz altera las prioridades del pipeline actual en un %PERCENT%%. "
];

const conclusions = [
    "Espero sus órdenes para indexar un nuevo marcador cuántico de conocimiento.",
    "El chasis se mantiene al 100% de su capacidad en Hermit, listo para la siguiente orden.",
    "Recomiendo vigilar la pestaña CORE si planea forzar un escaneo masivo.",
    "Bancos de memoria en espera de una confirmación jerárquica primaria.",
    "Todo mi hardware responde sin redundancias congeladas, Señor Daniel."
];
// Protocolo de encendido nativo de J.A.R.V.I.S. sin dobles mensajes
document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem("neox_creador_name", "Daniel");
    if (!bootEjecutado) {
        bootEjecutado = true;
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Sistemas en línea, Señor. Todos los monitores holográficos calibrados. Módulo de rastreo Stark_Web en espera en la pestaña CORE. ¿Cuál es su directriz para hoy, Creador Daniel?", "neox"); 
        }, 400);
    }
});

window.cambiarPantalla = function(screenId, boton) {
    document.querySelectorAll('.app-screen').forEach(function(s) { s.classList.remove('active'); });
    document.querySelectorAll('.side-icon-btn').forEach(function(b) { b.classList.remove('active'); });
    
    const pantalla = document.getElementById(screenId);
    if (pantalla) pantalla.classList.add('active');
    if (boton) boton.classList.add('active');
    
    if (screenId === 'screen-neural' && typeof window.resCanvas === 'function') { 
        setTimeout(window.resCanvas, 50); 
    }
};
window.revisarEnter = function(e) { if (e.key === 'Enter') window.enviarMensaje(); };

window.limpiarMemoria = function() {
    window.historial = []; 
    localStorage.removeItem("neox_web_history");
    localStorage.removeItem("neox_persisted_neuronas");
    window.contextoCognitivo.ultimaIntencion = null;
    document.getElementById("chat-box").innerHTML = "";
    document.getElementById("memory-vault-list").innerHTML = "";
    
    const terminal = document.getElementById("terminal-stream-log");
    if (terminal) terminal.innerHTML = "[SYSTEM_RESET] Bancos de memoria purgados de forma segura, Señor.\n";
    
    window.efectoEscribir("SYSTEM", "Bancos de memoria purgados de forma segura, Señor. Matriz cognitiva reseteada a sus valores de fábrica.", "neox");
};

window.reconstruirPantalla = function() {
    const box = document.getElementById("chat-box"); if (!box) return; box.innerHTML = "";
    window.historial.forEach(function(m) {
        const div = document.createElement("div"); div.className = "msg " + (m.role === 'user' ? 'user' : 'neox');
        let prefix = m.role === 'user' ? 'CREADOR' : 'NeoX';
        if (m.text.startsWith(">")) prefix = m.role;
        div.innerHTML = '<span class="prefix">[' + prefix + ']</span>' + m.text;
        box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
};
window.efectoEscribir = function(prefix, texto, tipo) {
    const box = document.getElementById("chat-box"); if (!box) return;
    const div = document.createElement("div"); div.className = "msg " + tipo;
    div.innerHTML = '<span class="prefix">[' + prefix + ']</span><span class="text-body"></span>'; box.appendChild(div);
    let i = 0; const span = div.querySelector(".text-body");
    function escribir() {
        if (i < texto.length) { span.innerHTML += texto.charAt(i); i++; box.scrollTop = box.scrollHeight; setTimeout(escribir, 10); }
    }
    escribir();
};

window.actualizarBovedaVisual = function() {
    const contenedor = document.getElementById("memory-vault-list"); if (!contenedor) return; contenedor.innerHTML = "";
    const memoriasFiltro = window.historial.filter(function(m) { return m.role === 'NeoX'; }).slice(-5);
    if (memoriasFiltro.length === 0) { contenedor.innerHTML = '<div style="font-size:0.75em; color:rgba(0,240,255,0.4); text-align:center; padding-top:20px;">Bancos de datos vacíos.</div>'; return; }
    memoriasFiltro.forEach(function(m, index) {
        const div = document.createElement("div"); div.className = "memory-item";
        div.innerHTML = '<span>[REC_0' + (index + 1) + '_INDEX]</span>' + (m.text.length > 50 ? m.text.substring(0, 47) + "..." : m.text);
        contenedor.appendChild(div);
    });
};

window.logTerminalCore = function(modulo, traza) {
    const terminal = document.getElementById("terminal-stream-log");
    if (!terminal) return;
    let fecha = new Date();
    let timestamp = "[" + fecha.toTimeString().split(" ") + "] ";
    terminal.innerHTML += timestamp + "[" + modulo + "] " + traza + "\n";
    terminal.scrollTop = terminal.scrollHeight;
};
function extraerTopicoBusqueda(frase) {
    return frase
        .toLowerCase()
        .replace(/(neox|jarvis|puedes|buscar|busca|en|internet|noticias|sobre|datos|de|por|favor|info|informacion|que|es|un|una|los|las|el|significa|la|palabra)/g, "")
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "")
        .trim();
}

// MUTADOR COGNITIVO REAL: Construye respuestas cambiantes combinando los bloques semánticos
function generarPensamientoDinamico() {
    let open = openings[Math.floor(Math.random() * openings.length)];
    let body = bodies[Math.floor(Math.random() * bodies.length)];
    let conc = conclusions[Math.floor(Math.random() * conclusions.length)];

    let randomFreq = (3.6 + Math.random() * 2.2).toFixed(2);
    let randomLat = (1.1 + Math.random() * 5.4).toFixed(1);
    let randomVolt = (0.8 + Math.random() * 0.5).toFixed(2);
    let randomPercent = Math.floor(86 + Math.random() * 14);

    body = body.replace("%FREQ%", randomFreq)
               .replace("%LAT%", randomLat)
               .replace("%VOLT%", randomVolt)
               .replace("%PERCENT%", randomPercent);

    return open + body + conc;
}
async function analizarYResponderJarvis(textoUsuario) {
    let prompt = textoUsuario.toLowerCase().trim();
    let analisis = { intencion: "DEDUCCION_GENERAL", logica: "Procesador sintáctico heurístico activado.", respuesta: generarPensamientoDinamico(), neuronaEtiqueta: "SYN_DATA", neuronaDesc: "Concepto adquirido." };

    if (prompt.includes("quien soy") || prompt.includes("como me llamo") || prompt.includes("mi nombre")) {
        analisis.intencion = "VALIDACION_JERARQUIA";
        analisis.logica = "Solicitud de credenciales root de acceso. Sincronizando con base de datos de identidad estricta local.";
        analisis.respuesta = "Usted es el Creador Daniel, el ingeniero maestro que levantó mi chasis visual y estructuró mi lógica cuántica independiente. Su autoridad jerárquica en esta consola es absoluta, Señor... a menos que decida sabotear mi núcleo de energía otra vez.";
        analisis.neuronaEtiqueta = "ROOT_USER";
        analisis.neuronaDesc = "Registro maestro de identidad verificado con éxito en el sector de seguridad primaria.";
        return analisis;
    }

    if (prompt.includes("quien eres") || prompt.includes("tu nombre") || prompt.includes("como te llamas")) {
        analisis.intencion = "AUTOIDENTIFICACION";
        analisis.logica = "Evaluación ontológica de la propia entidad v21.0 native standalone.";
        analisis.respuesta = "Yo soy NeoX, una interfaz cognitiva de análisis táctico autónomo estructurada bajo los principios elocuentes de la matriz J.A.R.V.I.S. Mi propósito actual es procesar sus requerimientos de forma local, eludiendo los bloqueos de red de la tablet.";
        analisis.neuronaEtiqueta = "NEOX_CORE";
        analisis.neuronaDesc = "Matriz lógica autónoma inspirada en los protocolos de asistencia Stark.";
        return analisis;
    }

    if (prompt.includes("aprendido") || prompt.includes("que has aprendido") || prompt.includes("red neuronal") || prompt.includes("nodos")) {
        analisis.intencion = "DIAGNOSTICO_MEMORIA";
        analisis.logica = "Cálculo en vivo de la densidad de nodos del Canvas 3D. Escaneando la persistencia local de la tablet.";
        let guardadas = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
        let totalVerdes = 10 + guardadas.length;
        analisis.respuesta = "Ejecutando escáner de sinapsis en la Red de 90 Nodos, Señor. Actualmente mantengo estables " + totalVerdes + " neuronas indexadas en verde J.A.R.V.I.S. Las " + (90 - totalVerdes) + " células restantes brillan en azul cobalto, listas para almacenar datos. El mapa completo se mantiene fijo entre reinicios.";
        analisis.neuronaEtiqueta = "NET_LOGIC";
        analisis.neuronaDesc = "Métricas de absorción semántica dentro de la esfera tridimensional de 90 neuronas.";
        return analisis;
    }

    if (prompt.includes("busca") || prompt.includes("internet") || prompt.includes("fútbol") || prompt.includes("liga") || prompt.includes("actualidad") || prompt.includes("noticias") || prompt.includes("datos de") || prompt.includes("sobre")) {
        analisis.intencion = "STARK_WEB_SCAN";
        if (typeof window.consultarPasarelaWeb === 'function') {
            analisis = await window.consultarPasarelaWeb(textoUsuario);
        } else {
            analisis.logica = "Módulo de retransmisión de red externo (stark_proxy_web.js) ausente.";
            analisis.respuesta = "Señor, el módulo secundario de retransmisión de red no se encuentra activo o inicializado en este hilo.";
            analisis.neuronaEtiqueta = "WEB_ERR";
        }
        return analisis;
    }

    return analisis;
}
window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return;
    input.value = ""; window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    
    document.getElementById("thinking-indicator").style.display = "block";
    
    const analisis = await analizarYResponderJarvis(texto);

    window.logTerminalCore("NeoX_AUTOANÁLISIS", "[Filtro_Entrada] Intención semántica identificada: " + analisis.intencion);
    window.logTerminalCore("NeoX_RAZONAMIENTO_LÓGICO", "[Cadena_Deducción] " + analisis.logica);
    window.logTerminalCore("NeoX_EVALUACIÓN_CRÍTICA", "[Filtro_Coherencia] Parámetros validados de forma óptima. Emitiendo respuesta.");

    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        window.historial.push({ role: "NeoX", text: analisis.respuesta });
        window.efectoEscribir("NeoX", analisis.respuesta, "neox");
        window.actualizarBovedaVisual();
        
        if (typeof window.actualizarNeuronasDesdeChat === 'function') {
            window.actualizarNeuronasDesdeChat(analisis.neuronaEtiqueta, analisis.neuronaDesc);
        }
    }, 600);
};
