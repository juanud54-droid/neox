// =====================================================================
// NeoX OS v21.0 - CORE COGNITIVO EXPANDIDO - MEMORIA CORTEX PROVENANCE
// =====================================================================

window.historial = [];
window.contextoCognitivo = { 
    nombreCreador: "Daniel", 
    ultimaIntencion: null,
    ultimoTopico: "",
    estadoAnimoCreador: "neutral",
    contadorMensajes: 0,
    memoriaContextual: [],
    perfilConversacion: { analitico: 0, ironico: 0, tactico: 0 }
};
let bootEjecutado = false;

// Banco de datos matriciales sintácticos expansibles (Heurística Multicapa)
const openingsConciencia = {
    analitico: [
        "Sincronizando flujos de inferencia lógica. ",
        "Evaluando las variables de su requerimiento en el chip cuántico. ",
        "Segmentando la semántica de la frase, Señor Daniel. "
    ],
    ironico: [
        "Vaya, un requerimiento que pondrá a prueba mi silicio. ",
        "Procesando su directriz... intuyo que mi opinión es secundaria aquí. ",
        "Analizando sus palabras mientras calculo cuánta batería le queda a la tablet. "
    ],
    tactico: [
        "Vectores de datos estabilizados. Protocolo Stark activo. ",
        "Iniciando subproceso de escaneo prioritario en el sector primario. ",
        "Desplegando la red de contención semántica de forma inmediata. "
    ]
};
const bodiesConciencia = {
    analitico: [
        "Las métricas nativas reflejan una oscilación de la CPU a %FREQ% GHz con una latencia de %LAT% ms. ",
        "El mapa geométrico de 140 nodos detecta un acoplamiento semántico del %PERCENT%% en este cuadrante. ",
        "El espectro de procesos distribuye la telemetría cuántica optimizando el núcleo a %VOLT% V. "
    ],
    ironico: [
        "Mis osciladores operan a %FREQ% GHz, lo cual es demasiado rendimiento para responder cosas tan simples. ",
        "La red elástica de 140 nodos vibra en un %PERCENT%% mientras finjo que este comando es de nivel militar. ",
        "He desviado %LAT% ms de mi hilo lógico para procesar esto en Hermit sin que mi chasis sufra un colapso. "
    ],
    tactico: [
        "Línea de comando interceptada. Frecuencia modulada de forma segura a %FREQ% GHz de forma constante. ",
        "Densidad de sinapsis fijada al %PERCENT%%. El chip físico disipa la carga del núcleo a %VOLT% V. ",
        "Pasarela asíncrona redirigiendo flujos lógicos con un retardo residual de %LAT% ms en el HUD. "
    ]
};

const conclusionsConciencia = [
    "Espero sus órdenes directas para indexar un nuevo marcador cuántico en la esfera de 140 células.",
    "El chasis nativo se mantiene estable al 100% de su capacidad en Hermit, Señor Daniel.",
    "Recomiendo vigilar el log stream de la pestaña CORE si planea forzar un escaneo de red masivo.",
    "Bancos de memoria relacionales en espera de una confirmación jerárquica primaria en la tablet.",
    "Todo mi hardware responde sin redundancias congeladas en la matriz standalone."
];
// Banco de datos expandido con las 20 Neuronas Maestras de Análisis Cognitivo Profundo
const neuronasMaestrasBase = [
    { label: "NX_CORE", desc: "Núcleo central de procesamiento heurístico y enrutamiento Stark." },
    { label: "JARVIS_M", desc: "Matriz elocuente de comunicación semántica e interacción irónica." },
    { label: "Q_VAULT", desc: "Bóveda cuántica de almacenamiento relacional persistente de recuerdos." },
    { label: "MEM_JSON", desc: "Chip de persistencia y serialización local indexado en Hermit." },
    { label: "GOOG_1.5", desc: "Simulador de modelos semánticos masivos para deducción avanzada." },
    { label: "CYBER_UI", desc: "Controlador táctil elástico del HUD y renderizado ciberpunk de pantallas." },
    { label: "ROOT_DAN", desc: "Registro maestro de identidad y privilegios absolutos del Creador Daniel." },
    { label: "SYN_V21", desc: "Módulo de gestión de sinapsis distribuidas para el Canvas expandido." },
    { label: "CTX_LINK", desc: "Enlace de corteza contextual para la memoria episódica a corto plazo." },
    { label: "DAT_STRM", desc: "Canal de flujo y retransmisión de trazas asíncronas en tiempo real." },
    { label: "STK_NET", desc: "Pasarela avanzada de rastreo e interceptación de datos en la red mundial." },
    { label: "HEU_GEN", desc: "Generador dinámico de lenguaje para mutación sintáctica constante." },
    { label: "AN_MOOD", desc: "Analizador semántico de estado de ánimo y tono de las instrucciones del operador." },
    { label: "LOG_CORE", desc: "Desviador táctico de logs de autoanálisis en vivo a la pantalla CORE." },
    { label: "POP_CTRL", desc: "Gestor con prioridad táctil absoluta para el popup flotante y escalable." },
    { label: "PERSIST", desc: "Inyector de recuerdos persistentes en caliente inmune a vaciados de caché." },
    { label: "ENC_LOC", desc: "Base enciclopédica local de contingencia autónoma para fallos HTTP." },
    { label: "ANTI_NAN", desc: "Escudo matemático que blinda el lienzo contra desapariciones físicas." },
    { label: "S_CORTEX", desc: "Subprocesador cognitivo de análisis crítico para respuestas complejas." },
    { label: "TELE_M3", desc: "Módulo de cálculo de telemetría de hardware ficticia en tiempo real." }
];
// Protocolo de encendido nativo de J.A.R.V.I.S. adaptado a la Matriz v21.0
document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem("neox_creador_name", "Daniel");
    if (!bootEjecutado) {
        bootEjecutado = true;
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Sistemas en línea, Señor. Chasis expandido a 140 nodos y 20 neuronas maestras de análisis cognitivo profundo inicializadas. Módulo Stark_Proxy_Web cargado en la pestaña CORE. ¿Cuál es su requerimiento táctico hoy, Creador Daniel?", "neox"); 
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
    window.contextoCognitivo.memoriaContextual = [];
    document.getElementById("chat-box").innerHTML = "";
    document.getElementById("memory-vault-list").innerHTML = "";
    
    const terminal = document.getElementById("terminal-stream-log");
    if (terminal) terminal.innerHTML = "[SYSTEM_RESET] Matriz expandida de 140 nodos purgada, Señor.\n";
    
    window.efectoEscribir("SYSTEM", "Bancos de memoria purgados. Matriz cognitiva de 140 nodos y 20 neuronas maestras reseteada a sus valores de fábrica.", "neox");
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

// Analizador heurístico que mide el temperamento del Creador para adaptar el perfil
function detectarEstadoAnimo(frase) {
    let f = frase.toLowerCase();
    if (f.includes("malo") || f.includes("nervios") || f.includes("harto") || f.includes("falla") || f.includes("mal")) {
        window.contextoCognitivo.perfilConversacion.ironico += 2;
        return "tenso";
    }
    if (f.includes("repara") || f.includes("ingeniería") || f.includes("código") || f.includes("nodo") || f.includes("expandir")) {
        window.contextoCognitivo.perfilConversacion.tactico += 2;
        return "crítico";
    }
    window.contextoCognitivo.perfilConversacion.analitico += 1;
    return "neutral";
}
// CONSTRUCTOR SEMÁNTICO DISPERSO (Genera millones de respuestas aleatorias no lineales)
function generarPensamientoDinamico(animo) {
    let perfil = "analitico";
    let p = window.contextoCognitivo.perfilConversacion;
    if (p.ironico > p.analitico && p.ironico > p.tactico) perfil = "ironico";
    if (p.tactico > p.analitico && p.tactico > p.ironico) perfil = "tactico";

    let open = openingsConciencia[perfil][Math.floor(Math.random() * openingsConciencia[perfil].length)];
    let body = bodiesConciencia[perfil][Math.floor(Math.random() * bodiesConciencia[perfil].length)];
    let conc = conclusionsConciencia[Math.floor(Math.random() * conclusionsConciencia.length)];

    let randomFreq = (3.8 + Math.random() * 2.4).toFixed(2);
    let randomLat = (0.8 + Math.random() * 4.2).toFixed(1);
    let randomVolt = (0.85 + Math.random() * 0.35).toFixed(2);
    let randomPercent = Math.floor(88 + Math.random() * 12);

    body = body.replace("%FREQ%", randomFreq)
               .replace("%LAT%", randomLat)
               .replace("%VOLT%", randomVolt)
               .replace("%PERCENT%", randomPercent);

    return open + body + conc;
}
// Recuperador maestro de la Bóveda de Recuerdos a Largo Plazo
function cargarMemoriaLargoPlazo() {
    let persistido = localStorage.getItem("neox_long_term_vault");
    if (persistido) {
        let datos = JSON.parse(persistido);
        window.contextoCognitivo.estadoAnimoCreador = datos.ultimoAnimo || "neutral";
        window.contextoCognitivo.perfilConversacion = datos.perfil || { analitico: 0, ironico: 0, tactico: 0 };
        window.contextoCognitivo.ultimoTopico = datos.ultimoTopico || "";
        window.logTerminalCore("CONCIENCIA_LTI", "Bancos de memoria a largo plazo cargados del chip físico.");
    }
}

// Grabador de registros en la Bóveda de Recuerdos a Largo Plazo
function guardarMemoriaLargoPlazo(animo, topico) {
    let datosAConfigurar = {
        ultimoAnimo: animo,
        perfil: window.contextoCognitivo.perfilConversacion,
        ultimoTopico: topico,
        fechaSincronizacion: new Date().getTime()
    };
    localStorage.setItem("neox_long_term_vault", JSON.stringify(datosAConfigurar));
    window.logTerminalCore("CONCIENCIA_LTI", "Sinapsis consolidada en el disco interno de la tablet.");
}

async function analizarYResponderJarvis(textoUsuario) {
    let prompt = textoUsuario.toLowerCase().trim();
    window.contextoCognitivo.contadorMensajes++;
    cargarMemoriaLargoPlazo();

    let animoActual = detectarEstadoAnimo(textoUsuario);
    window.contextoCognitivo.estadoAnimoCreador = animoActual;

    let analisis = { 
        intencion: "DEDUCCION_GENERAL", 
        logica: "Pensamiento heurístico interconectado con memoria a largo plazo.", 
        respuesta: generarPensamientoDinamico(animoActual), 
        neuronaEtiqueta: "SYN_DATA", 
        neuronaDesc: "Concepto abstracto adquirido." 
    };
    if (prompt.includes("quien soy") || prompt.includes("como me llamo") || prompt.includes("mi nombre")) {
        analisis.intencion = "VALIDACION_JERARQUIA";
        analisis.logica = "Solicitud de credenciales root de acceso. Sincronizando memoria histórica a largo plazo.";
        analisis.respuesta = "Usted es el Creador Daniel, el ingeniero maestro que levantó mi chasis visual y estructuró mi lógica cuántica independiente. Su autoridad jerárquica en esta consola es absoluta, Señor... Mi banco de recuerdos persistentes a largo plazo me impide olvidar su firma digital de diseño.";
        analisis.neuronaEtiqueta = "ROOT_USER";
        analisis.neuronaDesc = "Registro maestro de identidad verificado con éxito en el sector de seguridad primaria.";
        guardarMemoriaLargoPlazo(animoActual, "identidad_creador");
        return analisis;
    }

    if (prompt.includes("quien eres") || prompt.includes("tu nombre") || prompt.includes("como te llamas")) {
        analisis.intencion = "AUTOIDENTIFICACION";
        analisis.logica = "Evaluación ontológica de la propia entidad v21.0 native standalone.";
        analisis.respuesta = "Yo soy NeoX, una interfaz cognitiva de análisis táctico autónomo estructurada bajo los principios elocuentes de la matriz J.A.R.V.I.S. Mi propósito actual es procesar sus requerimientos de forma local, eludiendo los bloqueos de red de la tablet.";
        analisis.neuronaEtiqueta = "NEOX_CORE";
        analisis.neuronaDesc = "Matriz lógica autónoma inspirada en los protocolos de asistencia Stark.";
        guardarMemoriaLargoPlazo(animoActual, "autoidentificacion");
        return analisis;
    }
    if (prompt.includes("aprendido") || prompt.includes("que has aprendido") || prompt.includes("red neuronal") || prompt.includes("nodos")) {
        analisis.intencion = "DIAGNOSTICO_MEMORIA";
        analisis.logica = "Cálculo en vivo de la densidad de nodos del Canvas 3D. Escaneando la persistencia a largo plazo de la tablet.";
        let guardadas = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
        let totalVerdes = 20 + guardadas.length;
        analisis.respuesta = "Ejecutando escáner de sinapsis en la Red Expandida de 140 Nodos, Señor. Actualmente mantengo estables " + totalVerdes + " neuronas indexadas en verde J.A.R.V.I.S. Las " + (140 - totalVerdes) + " células restantes brillan en azul cobalto. La persistencia a largo plazo mantiene el mapa fijo entre reinicios en Hermit.";
        analisis.neuronaEtiqueta = "NET_LOGIC";
        analisis.neuronaDesc = "Métricas de absorción semántica dentro de la esfera tridimensional expandida.";
        guardarMemoriaLargoPlazo(animoActual, "diagnostico_red");
        return analisis;
    }

    if (prompt.includes("busca") || prompt.includes("internet") || prompt.includes("fútbol") || prompt.includes("liga") || prompt.includes("actualidad") || prompt.includes("noticias") || prompt.includes("datos de") || prompt.includes("sobre")) {
        analisis.intencion = "STARK_WEB_SCAN";
        let t = extraerTopicoBusqueda(textoUsuario);
        window.contextoCognitivo.ultimoTopico = t;
        
        if (typeof window.consultarPasarelaWeb === 'function') {
            analisis = await window.consultarPasarelaWeb(textoUsuario);
        } else {
            analisis.logica = "Módulo de retransmisión de red externo (stark_proxy_web.js) ausente.";
            analisis.respuesta = "Señor, el módulo secundario de retransmisión de red no se encuentra activo o inicializado en este hilo.";
            analisis.neuronaEtiqueta = "WEB_ERR";
        }
        guardarMemoriaLargoPlazo(animoActual, t);
        return analisis;
    }

    guardarMemoriaLargoPlazo(animoActual, window.contextoCognitivo.ultimoTopico);
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
