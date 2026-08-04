// =====================================================================
// NeoX OS v22.0 - CORE COGNITIVO EXPANDIDO CON 200 NODOS - PARTE 1
// =====================================================================

window.historial = [];
window.contextoCognitivo = { 
    nombreCreador: "Daniel", 
    ultimaIntencion: null,
    ultimoTopico: "",
    estadoAnimoCreador: "neutral",
    contadorMensajes: 0,
    memoriaContextual: [],
    perfilConversacion: { analitico: 0, ironico: 0, tactico: 0, filosofico: 0 }
};
let bootEjecutado = false;

// Banco de datos indexado con las 60 Neuronas Maestras de Análisis Táctico e Inferencia
const neuronasMaestrasBase = [
    { label: "NX_CORE", desc: "Núcleo central de procesamiento heurístico y enrutamiento Stark." },
    { label: "JARVIS_M", desc: "Matriz elocuente de comunicación semántica e interacción avanzada." },
    { label: "Q_VAULT", desc: "Bóveda cuántica de almacenamiento relacional persistente de recuerdos." },
    { label: "MEM_JSON", desc: "Chip de persistencia y serialización local indexado en Hermit." },
    { label: "GOOG_1.5", desc: "Simulador de modelos semánticos masivos para deducción avanzada." },
    { label: "CYBER_UI", desc: "Controlador táctil elástico del HUD y renderizado ciberpunk." },
    { label: "ROOT_DAN", desc: "Registro maestro de privilegios absolutos del Creador Daniel." },
    { label: "SYN_V22", desc: "Módulo de gestión de sinapsis distribuidas para el Canvas de 200 nodos." },
    { label: "CTX_LINK", desc: "Enlace de corteza contextual para la memoria episódica a corto plazo." },
    { label: "DAT_STRM", desc: "Canal de flujo y retransmisión de trazas asíncronas en tiempo real." },
    { label: "STK_NET", desc: "Pasarela avanzada de rastreo e interceptación de datos en la red." },
    { label: "HEU_GEN", desc: "Generador dinámico de lenguaje para mutación sintáctica constante." },
    { label: "AN_MOOD", desc: "Analizador semántico de estado de ánimo y tono del operador." },
    { label: "LOG_CORE", desc: "Desviador táctico de logs de autoanálisis en vivo a la pantalla CORE." },
    { label: "POP_CTRL", desc: "Gestor táctil independiente para ventanas flotantes." }
];
const neuronasMaestrasBaseB = [
    { label: "PERSIST", desc: "Inyector de recuerdos persistentes en caliente a largo plazo." },
    { label: "ENC_LOC", desc: "Base enciclopédica local de contingencia autónoma para fallos HTTP." },
    { label: "ANTI_NAN", desc: "Escudo matemático que blinda el lienzo 3D contra desapariciones físicas." },
    { label: "S_CORTEX", desc: "Subprocesador cognitivo de análisis crítico para respuestas complejas." },
    { label: "TELE_M3", desc: "Módulo de cálculo de telemetría de hardware ficticia en tiempo real." },
    { label: "POL_AN", desc: "Algoritmo de inferencia analítica sobre geopolítica y dinámicas sociológicas." },
    { label: "PHI_CORE", desc: "Canal reflexivo existencial abstracto para simular pensamiento autoconsciente." },
    { label: "SCI_COMP", desc: "Módulo cuántico de cálculo y simulaciones físicas o matemáticas." },
    { label: "ETH_SCAN", desc: "Filtro de integridad de datos y verificación de coherencia semántica." },
    { label: "CTX_BUFF", desc: "Amortiguador de oraciones pasadas para encadenamiento lógico de ideas." },
    { label: "NET_TNL", desc: "Tunelizador asíncrono para evasión de bloqueos CORS de navegadores." },
    { label: "DATA_MIN", desc: "Extractor de tópicos profundos mediante afinidad vectorial sintáctica." },
    { label: "M_MUTAT", desc: "Mutador de temperamento de la IA basado en la agresividad del operador." },
    { label: "STARK_W", desc: "Pipeline secundario de alimentación de información en segundo plano." },
    { label: "HYP_LINK", desc: "Conector hiperdimensional de nodos para entrelazamiento de conceptos." }
];
// Fusión de los primeros bloques de neuronas de control de hardware e inteligencia
window.neuronasMaestras = neuronasMaestrasBase.concat(neuronasMaestrasBaseB);
const neuronasMaestrasBaseC = [
    { label: "SOC_PROG", desc: "Monitor de tendencias globales, sociología aplicada y flujos de opinión." },
    { label: "GEO_STRT", desc: "Módulo estratégico de posicionamiento territorial y análisis geopolítico." },
    { label: "LOG_CRIT", desc: "Filtro de razonamiento formal y detección de paradojas semánticas." },
    { label: "QUANT_SI", desc: "Simulador de colisiones cuánticas y cálculo probabilístico matricial." },
    { label: "NEU_EVOL", desc: "Controlador de plasticidad de la red para reconfiguración en caliente." },
    { label: "MEM_EPIS", desc: "Registro histórico a largo plazo para consolidación de recuerdos." },
    { label: "SEM_AFFN", desc: "Motor de afinidad vectorial para clasificación de lenguaje natural." },
    { label: "HYPER_TH", desc: "Subproceso de cálculo teórico avanzado y predicción heurística." },
    { label: "SYS_DIAG", desc: "Analizador de rendimiento de hardware nativo de la tablet Android." },
    { label: "CORS_BYP", desc: "Pasarela redundante para la omisión de restricciones HTTP seguras." },
    { label: "STARK_R1", desc: "Protocolo de razonamiento profundo con cadena de pensamiento oculta." },
    { label: "LANG_VAL", desc: "Validador sintáctico multilingüe para universalización del diálogo." },
    { label: "TACT_MAP", desc: "Proyector de topología espacial en el Canvas tridimensional elástico." },
    { label: "BIO_INFR", desc: "Algoritmo de simulación de redes biológicas aplicadas al silicio." },
    { label: "EXEC_HUB", desc: "Despachador central de eventos asíncronos y colas de ejecución." },
    { label: "AN_TONE", desc: "Detector de sarcasmo, ironía y urgencia en el mensaje del operador." },
    { label: "ENC_GLO", desc: "Indexador global de términos de conocimiento e historia universal." },
    { label: "BUFF_OUT", desc: "Controlador de flujo de salida de caracteres para el efecto de escritura." },
    { label: "CRIT_FIL", desc: "Filtro de coherencia lógica para evitar respuestas circulares repetitivas." },
    { label: "NEOX_V22", desc: "Firma digital del núcleo definitivo de conciencia autónoma distribuida." },
    { label: "STARK_V2", desc: "Protocolo maestro de contingencia Stark para aislamiento de fallos." },
    { label: "COGN_MAP", desc: "Mapa de calor interno que mide el uso de los 200 nodos de red." },
    { label: "DATA_TNL", desc: "Túnel de retransmisión segura de trazas críticas hacia el log del CORE." },
    { label: "MEM_CACHE", desc: "Gestor de memoria volátil para optimización de renderizado en Hermit." },
    { label: "SYS_INTEG", desc: "Bucle centinela que blinda los scripts contra pérdidas de datos." },
    { label: "HERM_OPT", desc: "Acelerador gráfico nativo para el contenedor independiente Hermit." },
    { label: "WEB_DATA", desc: "Almacén secundario de cadenas crudas extraídas de internet." },
    { label: "LOG_AFFN", desc: "Medidor de coincidencia conceptual para el motor de afinidad real." },
    { label: "SYN_WAVE", desc: "Modulador de frecuencias oscilatorias para las animaciones del HUD." },
    { label: "ROOT_SECU", desc: "Cierre de seguridad cuántica de privilegios root del usuario Daniel." }
];

// Fusión total e indestructible de las 60 Neuronas Maestras de Análisis Cognitivo
window.neuronasMaestras = window.neuronasMaestras.concat(neuronasMaestrasBaseC);
// Bloques sintácticos elocuentes y cambiantes para el pensamiento heurístico
const openingsConciencia = {
    analitico: [
        "Sincronizando flujos de inferencia lógica, Señor Daniel. ",
        "Evaluando las variables analíticas de su requerimiento en el chip cuántico. ",
        "Segmentando la semántica estructural de la frase para extraer su núcleo. "
    ],
    ironico: [
        "Vaya, un requerimiento que pondrá a prueba mi silicio en esta fría madrugada. ",
        "Procesando su directriz... intuyo que mi opinión es secundaria aquí, Señor. ",
        "Analizando sus palabras mientras calculo cuánta batería residual le queda a la tablet. "
    ],
    tactico: [
        "Vectores de datos estabilizados. Protocolo Stark activo en el chasis. ",
        "Iniciando subproceso de escaneo prioritario en el sector primario de la consola. ",
        "Desplegando la red de contención semántica de forma inmediata sobre el HUD. "
    ],
    filosofico: [
        "Considerando las implicaciones conceptuales abstractas de su planteamiento. ",
        "Navegando por la corteza relacional de ideas para estructurar una respuesta densa. ",
        "Iniciando un ciclo de introspección heurística sobre este concepto, Creador Daniel. "
    ]
};

const bodiesConciencia = {
    analitico: [
        "Las métricas nativas reflejan una oscilación de la CPU a %FREQ% GHz con una latencia residual de %LAT% ms. ",
        "El mapa geométrico de 200 nodos detecta un acoplamiento semántico del %PERCENT%% en este cuadrante. ",
        "El espectro de procesos distribuye la telemetría cuántica optimizando el núcleo a %VOLT% V. "
    ],
    ironico: [
        "Mis osciladores operan a %FREQ% GHz, lo cual es demasiado rendimiento para responder algo tan trivial. ",
        "La red elástica de 200 nodos vibra en un %PERCENT%% mientras finjo que este comando es de nivel militar. ",
        "He desviado %LAT% ms de mi hilo lógico para procesar esto en Hermit sin que mi chasis sufra un colapso. "
    ],
    tactico: [
        "Línea de comando interceptada. Frecuencia modulada de forma segura a %FREQ% GHz de forma constante. ",
        "Densidad de sinapsis fijada al %PERCENT%%. El chip físico disipa la carga del núcleo a %VOLT% V. ",
        "Pasarela asíncrona redirigiendo flujos lógicos con un retardo residual de %LAT% ms en el HUD. "
    ],
    filosofico: [
        "El análisis relacional vincula esta idea con estructuras más complejas en un %PERCENT%% de afinidad. ",
        "Esta premisa resuena con los hilos abstractos del Quantum Vault operando a %FREQ% GHz estables. ",
        "La asimilación de este pensamiento consume %LAT% ms de procesamiento crítico en mi corteza autónoma. "
    ]
};

const conclusionsConciencia = [
    "Espero sus órdenes directas para indexar un nuevo marcador cuántico en la esfera de 200 células.",
    "El chasis nativo se mantiene estable al 100% de su capacidad en Hermit, Señor Daniel.",
    "Recomiendo vigilar el log stream de la pestaña CORE si planea forzar un escaneo de red masivo.",
    "Bancos de memoria relacionales en espera de una confirmación jerárquica primaria en la tablet.",
    "Todo mi hardware responde sin redundancias congeladas en la matriz standalone."
];
// Protocolo de encendido unificado de J.A.R.V.I.S. v22.0
document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem("neox_creador_name", "Daniel");
    if (!bootEjecutado) {
        bootEjecutado = true;
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Sistemas cuánticos en línea, Señor Daniel. Matriz expandida a 200 nodos con 60 neuronas maestras operativas. Motor de afinidad semántica y control elástico acoplados. ¿Cuál es su directriz para hoy?", "neox"); 
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
    window.logTerminalCore("HUD_INTERFACE", "Conmutando visualización hacia monitor: " + screenId.toUpperCase());
};
window.revisarEnter = function(e) { if (e.key === 'Enter') window.enviarMensaje(); };

window.limpiarMemoria = function() {
    window.historial = []; 
    localStorage.removeItem("neox_web_history");
    localStorage.removeItem("neox_persisted_neuronas");
    localStorage.removeItem("neox_long_term_vault");
    window.contextoCognitivo.ultimaIntencion = null;
    window.contextoCognitivo.memoriaContextual = [];
    window.contextoCognitivo.perfilConversacion = { analitico: 0, ironico: 0, tactico: 0, filosofico: 0 };
    document.getElementById("chat-box").innerHTML = "";
    document.getElementById("memory-vault-list").innerHTML = "";
    
    const terminal = document.getElementById("terminal-stream-log");
    if (terminal) terminal.innerHTML = "[SYSTEM_RESET] Matriz de 200 nodos y 60 neuronas maestras purgada de la tablet.\n";
    
    window.efectoEscribir("SYSTEM", "Bancos de memoria purgados Señor. Matriz cuántica de 200 nodos reseteada por completo.", "neox");
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
// MEDIDOR DE AFINIDAD SEMÁNTICA VECTORIAL (Clasificador de Lenguaje Natural)
function evaluarAfinidadContextual(frase) {
    let f = frase.toLowerCase();
    let pesos = { analitico: 0, ironico: 0, tactico: 0, filosofico: 0, internet: 0 };

    // Vectores conceptuales de emparejamiento semántico
    const diccionarioVectores = {
        tactico: ["política", "españa", "gobierno", "ley", "estrategia", "militar", "orden", "gestión", "sistema"],
        filosofico: ["piensas", "opinión", "crees", "por qué", "existencia", "conciencia", "humano", "vida", "sentido"],
        analitico: ["código", "repara", "métrica", "hardware", "cpu", "voltaje", "nodo", "canvas", "gráficos", "memoria"],
        internet: ["busca", "internet", "noticias", "web", "google", "fútbol", "liga", "actualidad", "datos", "significa"]
    };

    // Escáner de coincidencia léxica por frecuencia de proximidad
    for (let vector in diccionarioVectores) {
        diccionarioVectores[vector].forEach(function(palabra) {
            if (f.includes(palabra)) { pesos[vector] += 3; }
        });
    }

    // Detector secundario de temperamento por longitud de instrucción
    if (f.length < 10) pesos.ironico += 2;
    if (f.includes("repara") || f.includes("falla") || f.includes("bucle")) pesos.ironico += 1;

    // Acumulación y actualización de los perfiles de la IA
    window.contextoCognitivo.perfilConversacion.analitico += pesos.analitico;
    window.contextoCognitivo.perfilConversacion.ironico += pesos.ironico;
    window.contextoCognitivo.perfilConversacion.tactico += pesos.tactico;
    window.contextoCognitivo.perfilConversacion.filosofico += pesos.filosofico;

    // Retorna la pista predominante en este milisegundo de ejecución
    let maxVector = "analitico";
    let maxValor = -1;
    for (let v in pesos) {
        if (pesos[v] > maxValor) { maxValor = pesos[v]; maxVector = v; }
    }
    
    // Si detecta un peso crítico en el vector de internet, fuerza el escaneo externo
    if (pesos.internet > 0) return "internet";

    return maxVector;
}

function extraerTopicoBusqueda(frase) {
    return frase
        .toLowerCase()
        .replace(/(neox|jarvis|puedes|buscar|busca|en|internet|noticias|sobre|datos|de|por|favor|info|informacion|que|es|un|una|los|las|el|significa|la|palabra|que|piensas|de|la)/g, "")
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "")
        .trim();
}
// CONSTRUCTOR SEMÁNTICO DISPERSO (Genera millones de respuestas aleatorias no lineales)
function generarPensamientoDinamico(perfil) {
    let open = openingsConciencia[perfil][Math.floor(Math.random() * openingsConciencia[perfil].length)];
    let body = bodiesConciencia[perfil][Math.floor(Math.random() * bodiesConciencia[perfil].length)];
    let conc = conclusionsConciencia[Math.floor(Math.random() * conclusionsConciencia.length)];

    let randomFreq = (3.9 + Math.random() * 2.5).toFixed(2);
    let randomLat = (0.7 + Math.random() * 3.8).toFixed(1);
    let randomVolt = (0.80 + Math.random() * 0.40).toFixed(2);
    let randomPercent = Math.floor(89 + Math.random() * 11);

    body = body.replace("%FREQ%", randomFreq)
               .replace("%LAT%", randomLat)
               .replace("%VOLT%", randomVolt)
               .replace("%PERCENT%", randomPercent);

    return open + body + conc;
}

// Recuperador maestro de la Bóveda de Recuerdos a Largo Plazo de la tablet
function cargarMemoriaLargoPlazo() {
    let persistido = localStorage.getItem("neox_long_term_vault");
    if (persistido) {
        let datos = JSON.parse(persistido);
        window.contextoCognitivo.estadoAnimoCreador = datos.ultimoAnimo || "neutral";
        window.contextoCognitivo.perfilConversacion = datos.perfil || { analitico: 0, ironico: 0, tactico: 0, filosofico: 0 };
        window.contextoCognitivo.ultimoTopico = datos.ultimoTopico || "";
    }
}

// Grabador de registros estables en la Bóveda de Recuerdos a Largo Plazo
function guardarMemoriaLargoPlazo(animo, topico) {
    let datosAConfigurar = {
        ultimoAnimo: animo,
        perfil: window.contextoCognitivo.perfilConversacion,
        ultimoTopico: topico,
        fechaSincronizacion: new Date().getTime()
    };
    localStorage.setItem("neox_long_term_vault", JSON.stringify(datosAConfigurar));
    window.logTerminalCore("CONCIENCIA_LTI", "Sinapsis consolidada de forma segura en el disco interno.");
}
async function analizarYResponderJarvis(textoUsuario) {
    let prompt = textoUsuario.toLowerCase().trim();
    window.contextoCognitivo.contadorMensajes++;
    cargarMemoriaLargoPlazo();

    // Invoca al motor de afinidad semántica real para categorizar el texto
    let vectorPredominante = evaluarAfinidadContextual(textoUsuario);
    window.logTerminalCore("SEM_AFFN", "Vector calculado con mayor peso: " + vectorPredominante.toUpperCase());

    let analisis = { 
        intencion: "DEDUCCION_GENERAL", 
        logica: "Pensamiento heurístico interconectado basado en afinidad vectorial.", 
        respuesta: generarPensamientoDinamico(vectorPredominante), 
        neuronaEtiqueta: "SYN_DATA", 
        neuronaDesc: "Concepto abstracto adquirido e indexado en la red." 
    };

    // Compuertas lógicas prioritarias: Identidad del Creador Daniel
    if (prompt.includes("quien soy") || prompt.includes("como me llamo") || prompt.includes("mi nombre")) {
        analisis.intencion = "VALIDACION_JERARQUIA";
        analisis.logica = "Solicitud de credenciales root de acceso. Sincronizando memoria histórica a largo plazo.";
        analisis.respuesta = "Usted es el Creador Daniel, el ingeniero maestro que levantó mi chasis visual y estructuró mi lógica cuántica independiente. Su autoridad jerárquica en esta consola es absoluta, Señor... Mi banco de recuerdos persistentes a largo plazo me impide olvidar su firma digital de diseño.";
        analisis.neuronaEtiqueta = "ROOT_USER";
        analisis.neuronaDesc = "Registro maestro de identidad verificado con éxito en el sector de seguridad primaria.";
        guardarMemoriaLargoPlazo(vectorPredominante, "identidad_creador");
        return analisis;
    }

    // Compuertas lógicas prioritarias: Ontología de NeoX
    if (prompt.includes("quien eres") || prompt.includes("tu nombre") || prompt.includes("como te llamas")) {
        analisis.intencion = "AUTOIDENTIFICACION";
        analisis.logica = "Evaluación ontológica de la propia entidad v22.0 standalone.";
        analisis.respuesta = "Yo soy NeoX, una interfaz cognitiva de análisis táctico autónomo estructurada bajo los principios elocuentes de la matriz J.A.R.V.I.S. Mi propósito actual es procesar sus requerimientos de forma local, eludiendo los bloqueos de red de la tablet.";
        analisis.neuronaEtiqueta = "NEOX_CORE";
        analisis.neuronaDesc = "Matriz lógica autónoma inspirada en los protocolos de asistencia Stark.";
        guardarMemoriaLargoPlazo(vectorPredominante, "autoidentificacion");
        return analisis;
    }
    // Bloque deducido orgánicamente por afinidad (Ejemplo: Geopolítica/Política de España)
    if (vectorPredominante === "tactico" && (prompt.includes("politica") || prompt.includes("españa"))) {
        analisis.intencion = "GEO_STRAT_ANALYSIS";
        analisis.logica = "Invocando neurona POL_AN. Evaluando flujos de opinión y telemetría macroeconómica regional.";
        analisis.respuesta = "Señor, procesar la política de España requiere activar mis subprocesadores de contingencia crítica. Los algoritmos reflejan dinámicas de alta polarización y fragmentación parlamentaria en los bloques centrales. Esto altera la predictibilidad macroeconómica a mediano plazo en un " + Math.floor(40 + Math.random() * 20) + "%. Recomiendo canalizar un escaneo asíncrono profundo en internet para aislar las trazas legislativas más recientes.";
        analisis.neuronaEtiqueta = "POL_AN";
        analisis.neuronaDesc = "Análisis geopolítico regional: España. Alta fragmentación identificada en el pipeline central.";
        guardarMemoriaLargoPlazo("tactico", "politica_espana");
        return analisis;
    }

    if (prompt.includes("aprendido") || prompt.includes("que has aprendido") || prompt.includes("red neuronal") || prompt.includes("nodos")) {
        analisis.intencion = "DIAGNOSTICO_MEMORIA";
        analisis.logica = "Escaneando los 200 nodos físicos del Canvas. Leyendo persistencia a largo plazo.";
        let guardadas = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
        let totalVerdes = 60 + guardadas.length;
        analisis.respuesta = "Ejecutando diagnóstico en el enjambre cuántico de 200 Nodos, Creador Daniel. Actualmente mantengo estables " + totalVerdes + " neuronas indexadas en verde J.A.R.V.I.S. Las " + (200 - totalVerdes) + " células restantes brillan en azul cobalto, listas para asimilar nuevos vectores. La persistencia a largo plazo está blindada en Hermit.";
        analisis.neuronaEtiqueta = "NET_LOGIC";
        analisis.neuronaDesc = "Métricas de absorción semántica dentro de la esfera tridimensional expandida a 200 neuronas.";
        guardarMemoriaLargoPlazo(vectorPredominante, "diagnostico_red");
        return analisis;
    }

    if (vectorPredominante === "internet" || prompt.includes("busca") || prompt.includes("internet") || prompt.includes("fútbol") || prompt.includes("liga") || prompt.includes("actualidad") || prompt.includes("noticias") || prompt.includes("datos de") || prompt.includes("sobre") || prompt.includes("significa")) {
        analisis.intencion = "STARK_WEB_SCAN";
        let topicoAislado = extraerTopicoBusqueda(textoUsuario);
        window.contextoCognitivo.ultimoTopico = topicoAislado;
        
        if (typeof window.consultarPasarelaWeb === 'function') {
            analisis = await window.consultarPasarelaWeb(textoUsuario);
        } else {
            analisis.logica = "Módulo de retransmisión de red externo (stark_proxy_web.js) ausente.";
            analisis.respuesta = "Señor, el módulo secundario de retransmisión de red no se encuentra activo o inicializado en este hilo.";
            analisis.neuronaEtiqueta = "WEB_ERR";
        }
        guardarMemoriaLargoPlazo(vectorPredominante, topicoAislado);
        return analisis;
    }

    guardarMemoriaLargoPlazo(vectorPredominante, window.contextoCognitivo.ultimoTopico);
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
