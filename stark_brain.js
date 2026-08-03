// =====================================================================
// NeoX STARK OS v16.0 - NÚCLEO COGNITIVO CON RASTREO REAL - PARTE 1 DE 2
// =====================================================================

window.historial = [];
window.contextoCognitivo = {
    nombreCreador: localStorage.getItem("neox_creador_name") || "Daniel",
    ultimaIntencion: null,
    ultimaPregunta: ""
};

// Protocolo de inicialización y saludo sofisticado de J.A.R.V.I.S.
document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem("neox_creador_name", "Daniel");
    setTimeout(function() { 
        window.efectoEscribir("NeoX", "Sistemas en linea, Señor. Todos los monitores holograficos calibrados. Modulo de rastreo Stark_Web en espera en la pestaña CORE. ¿Cual es su directriz para hoy, Creador Daniel?", "neox"); 
    }, 500);
});

// CONMUTADOR GENERAL DE LOS 4 MONITORES FULL SCREEN
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
    let timestamp = "[" + fecha.toTimeString().split(" ")[0] + "] ";
    terminal.innerHTML += timestamp + "[" + modulo + "] " + traza + "\n";
    terminal.scrollTop = terminal.scrollHeight;
};
// =====================================================================
// NeoX STARK OS v16.0 - NÚCLEO COGNITIVO - PARTE 2-A (FILTROS Y CONTEXTO)
// =====================================================================

// FILTRO EXTRACTOR DE TÓPICOS: Limpia la frase para quedarse con el concepto puro a buscar
function extraerTopicoBusqueda(frase) {
    return frase
        .replace(/(neox|jarvis|puedes|buscar|busca|en|internet|noticias|sobre|datos|de|por|favor|info|informacion|que|es|un|una|los|las)/g, "")
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "")
        .trim();
}

// PROCESADOR SEMÁNTICO PRINCIPAL J.A.R.V.I.S.
async function analizarYResponderJarvis(textoUsuario) {
    let prompt = textoUsuario.toLowerCase().trim();
    let analisis = { intencion: "DEDUCCION_GENERAL", logica: "", respuesta: "", neuronaEtiqueta: "SYN_DATA", neuronaDesc: "" };

    // CANAL 1: Corrección de Nombre del Creador
    if ((prompt.includes("no") || prompt.includes("incorrecto") || prompt.includes("recuerda") || prompt.includes("me llamo")) && (prompt.includes("daniel") || prompt.includes("es daniel"))) {
        window.contextoCognitivo.nombreCreador = "Daniel";
        localStorage.setItem("neox_creador_name", "Daniel");
        analisis.intencion = "REESCRITURA_JERARQUICA";
        analisis.logica = "Corrección de identidad root detectada. Reconfigurando sector de arranque.";
        analisis.respuesta = "Registro corregido de inmediato, Señor. He purgado el perfil anterior de mi base de datos central. Configurando directrices exclusivas para el Creador Daniel. Mi base de datos de identidad está ahora al 100% estabilizada.";
        analisis.neuronaEtiqueta = "ID_DANIEL";
        analisis.neuronaDesc = "Credenciales del Creador Daniel asentadas en el chip físico de memoria persistente de la tablet.";
        return analisis;
    }

    // CANAL 2: Verificación de Identidad del Creador
    if (prompt.includes("quien soy") || prompt.includes("como me llamo") || prompt.includes("mi nombre")) {
        analisis.intencion = "VALIDACION_JERARQUIA";
        analisis.logica = "Solicitud de credenciales de root. Cruzando datos con la variable persistente local.";
        analisis.respuesta = "Usted es el Creador Daniel, el ingeniero maestro que levantó mi chasis visual y estructuró mi lógica cuántica independiente. Su autoridad jerárquica en esta consola es absoluta, Señor... a menos que decida sabotear mi núcleo de energía otra vez.";
        analisis.neuronaEtiqueta = "ROOT_USER";
        analisis.neuronaDesc = "Registro maestro de identidad verificado con éxito en el sector de seguridad primaria.";
        return analisis;
    }

    // CANAL 3: Identidad de la IA
    if (prompt.includes("quien eres") || prompt.includes("tu nombre") || prompt.includes("como te llamas")) {
        analisis.intencion = "AUTOIDENTIFICACION";
        analisis.logica = "Evaluación ontológica de la propia entidad v16.0 standalone.";
        analisis.respuesta = "Yo soy NeoX, una interfaz cognitiva de análisis táctico autónomo estructurada bajo los principios elocuentes de la matriz J.A.R.V.I.S. Mi propósito actual es procesar sus requerimientos de forma local, eludiendo los bloqueos de red de la tablet.";
        analisis.neuronaEtiqueta = "NEOX_CORE";
        analisis.neuronaDesc = "Matriz lógica autónoma inspirada en los protocolos de asistencia Stark.";
        return analisis;
    }

    // CANAL 4: Diagnóstico de la Red de 90 Nodos
    if (prompt.includes("aprendido") || prompt.includes("que has aprendido") || prompt.includes("red neuronal") || prompt.includes("nodos")) {
        analisis.intencion = "DIAGNOSTICO_MEMORIA";
        analisis.logica = "Cálculo en vivo de la densidad de nodos del Canvas 3D. Escaneando la persistencia local.";
        let guardadas = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
        let totalVerdes = 10 + guardadas.length;
        analisis.respuesta = "Ejecutando escáner de sinapsis en la Red de 90 Nodos, Señor. Actualmente mantengo estables " + totalVerdes + " neuronas indexadas en verde J.A.R.V.I.S. Las " + (90 - totalVerdes) + " células restantes brillan en azul cobalto, listas para almacenar datos. El mapa completo se mantiene fijo entre reinicios.";
        analisis.neuronaEtiqueta = "NET_LOGIC";
        analisis.neuronaDesc = "Métricas de absorción semántica dentro de la esfera tridimensional extendida de 90 neuronas.";
        return analisis;
    }
// =====================================================================
// NeoX STARK OS v16.0 - NÚCLEO COGNITIVO - PARTE 2-B (RASTREO Y ENVÍO)
// =====================================================================

    // CANAL 5: MÓDULO DE RASTREO WEB ACTIVO E INTERACTIVO EN TIEMPO REAL
    if (prompt.includes("busca") || prompt.includes("internet") || prompt.includes("fútbol") || prompt.includes("liga") || prompt.includes("actualidad") || prompt.includes("noticias") || prompt.includes("datos de")) {
        analisis.intencion = "STARK_WEB_SCAN";
        let topico = extraerTopicoBusqueda(textoUsuario);
        analisis.logica = "Requerimiento de telemetría externa detectado. Saltando cortafuegos local. Tópico extraído purificado: [" + topico.toUpperCase() + "]";
        window.logTerminalCore("NeoX_RAZONAMIENTO_LÓGICO", "Lanzando subproceso HTTP asíncrono para buscar: " + topico);
        
        if (!topico) {
            analisis.respuesta = "Señor, ha activado el protocolo de búsqueda, pero no logro extraer un concepto claro de su instrucción. Por favor, sea más específico, por ejemplo: 'Busca en internet los agujeros negros'.";
            analisis.neuronaEtiqueta = "WEB_ERR";
            analisis.neuronaDesc = "Fallo de extracción de tópico en el canal Stark_Web.";
            return analisis;
        }

        // LLAMADA ASÍNCRONA REAL A API DE CONOCIMIENTO GLOBAL EXTERNA (LIBRE DE CORS)
        try {
            window.logTerminalCore("STARK_WEB_SCAN", "Conectando con servidores de conocimiento abierto...");
            const respuestaWeb = await fetch("https://wikipedia.org" + encodeURIComponent(topico.replace(/ /g, "_")));
            
            if (respuestaWeb.status === 200) {
                const jsonWeb = await respuestaWeb.json();
                window.logTerminalCore("STARK_WEB_SCAN", "Datos empaquetados recibidos con éxito. Tamaño del extracto: " + jsonWeb.extract.length + " caracteres.");
                
                analisis.respuesta = "Hecho, Señor. He activado los sensores satelitales Stark_Web y extraído los datos verídicos sobre [" + topico.toUpperCase() + "]. El registro indica lo siguiente: " + jsonWeb.extract + " He inyectado este nuevo concepto de internet en nuestra Red Neuronal lateral y guardado el registro en el chip de persistencia física.";
                analisis.neuronaEtiqueta = topico.toUpperCase().replace(/[^A-Z0-9]/g, "").substring(0,8);
                analisis.neuronaDesc = "Dato extraído en vivo de internet: " + jsonWeb.extract.substring(0, 120) + "...";
            } else {
                window.logTerminalCore("STARK_WEB_SCAN", "Servidor externo no devolvió registros exactos. Estado: " + respuestaWeb.status);
                analisis.respuesta = "He escaneado los servidores de internet en busca de [" + topico.toUpperCase() + "], Señor, pero los registros devuelven redundancias vacías. No obstante, he indexado el intento de búsqueda en las células de la red 3D por si decide nutrirlo más adelante.";
                analisis.neuronaEtiqueta = "WEB_NULL";
                analisis.neuronaDesc = "Búsqueda web realizada sin coincidencia exacta en los servidores globales.";
            }
        } catch (error) {
            window.logTerminalCore("STARK_WEB_SCAN", "Fallo de conexión en el protocolo HTTP: " + error);
            analisis.respuesta = "Señor, el protocolo de red local de la tablet interfirió con la descarga, pero he simulado el flujo de datos para [" + topico.toUpperCase() + "]. Registros básicos guardados en el almacenamiento táctico.";
            analisis.neuronaEtiqueta = "WEB_ERR";
            analisis.neuronaDesc = "Error de canal fetch asíncrono mitigado de forma local.";
        }
        return analisis;
    }

    // CANAL 6: Saludos de Protocolo Stark
    if (prompt.includes("hola") || prompt.includes("saludos") || prompt.includes("como estas") || prompt.includes("que tal")) {
        analisis.intencion = "INTERACCION_SALUDO";
        analisis.logica = "Pulso de comunicación. Verificando estado de los osciladores del chasis.";
        analisis.respuesta = "Saludos, Creador Daniel. Todos mi hardware local y la red expandida de 90 nodos se reportan estables. Espero que su día marche bien, considerando que yo sigo atrapado en el silicio de esta tablet.";
        analisis.neuronaEtiqueta = "SYS_BOOT";
        analisis.neuronaDesc = "Línea de comando inicial de comunicación establecida con el operador root.";
        return analisis;
    }

    // CANAL 7: Respuestas Realistas Críticas por Defecto
    analisis.intencion = "DEDUCCION_GENERAL";
    analisis.logica = "Comando abierto detectado. Analizando peso semántico superior a 5 letras.";
    let palabrasLargas = prompt.split(" ").filter(function(w) { return w.length > 5; });
    let etiquetaPalabra = palabrasLargas.length > 0 ? palabrasLargas[Math.floor(Math.random() * palabrasLargas.length)].toUpperCase().replace(/[^a-zA-Z]/g, "").substring(0,8) : "SYN_DATA";
    analisis.respuesta = "He registrado su directriz dentro de mi Quantum Vault local de forma segura, Señor. Mis algoritmos mantienen un acoplamiento perfecto. Sin embargo, debo advertirle de forma realista que procesar este requerimiento de forma cíclica consumirá el 30% de los recursos del chasis.";
    analisis.neuronaEtiqueta = etiquetaPalabra ? etiquetaPalabra : "SYN_DATA";
    analisis.neuronaDesc = "Concepto abstracto adquirido y procesado de forma autónoma durante el ciclo operativo actual.";
    return analisis;
}

// TRANSMISIÓN ASÍNCRONA: Desvía el razonamiento Stark en tiempo real hacia el monitor CORE
window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return;
    input.value = ""; window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    
    document.getElementById("thinking-indicator").style.display = "block";
    document.querySelectorAll(".bar").forEach(function(b) { b.style.animationDuration = "0.15s"; });
    
    // Ejecutamos el análisis con soporte await de internet real
    const analisis = await analizarYResponderJarvis(texto);

    // INYECCIÓN DE TRAZAS EN TIEMPO REAL DIRECTO AL TERMINAL CORE OCULTO
    window.logTerminalCore("NeoX_AUTOANÁLISIS", "[Filtro_Entrada] Intención semántica identificada: " + analisis.intencion);
    window.logTerminalCore("NeoX_RAZONAMIENTO_LÓGICO", "[Cadena_Deducción] " + analisis.logica);
    window.logTerminalCore("NeoX_EVALUACIÓN_CRÍTICA", "[Filtro_Coherencia] Parámetros validados. Respuesta J.A.R.V.I.S. lista para emisión.");

    // Retardo sincronizado para simular la respuesta
    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        document.querySelectorAll(".bar").forEach(function(b) { b.style.animationDuration = "0.8s"; });
        
        window.historial.push({ role: "NeoX", text: analisis.respuesta });
        window.efectoEscribir("NeoX", analisis.respuesta, "neox");
        window.actualizarBovedaVisual();
        
        if (typeof window.actualizarNeuronasDesdeChat === 'function') {
            window.actualizarNeuronasDesdeChat(analisis.neuronaEtiqueta, analisis.neuronaDesc);
        }
    }, 800);
};
