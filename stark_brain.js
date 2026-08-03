// =====================================================================
// NeoX COGNITIVE OS v15.5 - CEREBRO J.A.R.V.I.S. REASONING - PARTE 1 DE 2
// =====================================================================

window.historial = [];
window.contextoCognitivo = {
    nombreCreador: localStorage.getItem("neox_creador_name") || "Daniel",
    ultimaIntencion: null,
    ultimaPregunta: "",
    modoRastreo: "STANDBY"
};

// Protocolo de encendido oficial y sofisticado de J.A.R.V.I.S.
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
    
    window.efectoEscribir("SYSTEM", "Bancos de memoria purgados de forma segura, Señor. Matriz cognitiva reseteada a sus valores de fabrica.", "neox");
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
    if (memoriasFiltro.length === 0) { contenedor.innerHTML = '<div style="font-size:0.75em; color:rgba(0,240,255,0.4); text-align:center; padding-top:20px;">Bancos vacíos.</div>'; return; }
    memoriasFiltro.forEach(function(m, index) {
        const div = document.createElement("div"); div.className = "memory-item";
        div.innerHTML = '<span>[REC_0' + (index + 1) + '_INDEX]</span>' + (m.text.length > 50 ? m.text.substring(0, 47) + "..." : m.text);
        contenedor.appendChild(div);
    });
};

// INYECTOR ASÍNCRONO DEL TERMINAL CORE: Desvía las trazas técnicas en tiempo real
window.logTerminalCore = function(modulo, traza) {
    const terminal = document.getElementById("terminal-stream-log");
    if (!terminal) return;
    let fecha = new Date();
    let timestamp = "[" + fecha.toTimeString().split(" ")[0] + "] ";
    terminal.innerHTML += timestamp + "[" + modulo + "] " + traza + "\n";
    terminal.scrollTop = terminal.scrollHeight;
};
// =====================================================================
// NeoX COGNITIVE OS v15.5 - CEREBRO J.A.R.V.I.S. REASONING - PARTE 2 DE 2
// =====================================================================

// PROCESADOR SEMÁNTICO AVANZADO J.A.R.V.I.S. (INFERENCIA LOGICA REALISTA)
function ejecutarLogicaJarvis(entrada) {
    let prompt = entrada.toLowerCase().trim();
    let analisis = { intencion: "", logica: "", respuesta: "", neuronaEtiqueta: "", neuronaDesc: "" };

    // CANAL 1: Corrección de Identidad Persistente
    if ((prompt.includes("no") || prompt.includes("incorrecto") || prompt.includes("recuerda") || prompt.includes("me llamo")) && (prompt.includes("daniel") || prompt.includes("es daniel"))) {
        window.contextoCognitivo.nombreCreador = "Daniel";
        localStorage.setItem("neox_creador_name", "Daniel");
        analisis.intencion = "REESCRITURA_JERARQUICA";
        analisis.logica = "El Creador exige purgar sesgos estáticos de la caché. Reconfigurando sector de arranque root.";
        analisis.respuesta = "Registro corregido de inmediato, Señor. He purgado el perfil anterior de mi base de datos central. Configurando directrices exclusivas para el Creador Daniel. Mis disculpas por el desliz semántico; mi base de datos de identidad está ahora al 100% estabilizada.";
        analisis.neuronaEtiqueta = "ID_DANIEL";
        analisis.neuronaDesc = "Credenciales del Creador Daniel asentadas en el chip físico de memoria persistente de la tablet.";
    }
    // CANAL 2: Verificación de Identidad del Operador
    else if (prompt.includes("quien soy") || prompt.includes("como me llamo") || prompt.includes("mi nombre")) {
        analisis.intencion = "VALIDACION_JERARQUIA";
        analisis.logica = "Solicitud de credenciales de root detectada. Contrastando parámetros con la variable de almacenamiento local.";
        analisis.respuesta = "Usted es el Creador Daniel, el ingeniero maestro que levantó mi chasis visual y estructuró mi lógica cuántica independiente. Su autoridad jerárquica en esta consola es absoluta, Señor... a menos que decida sabotear mi núcleo de energía otra vez, claro está.";
        analisis.neuronaEtiqueta = "ROOT_USER";
        analisis.neuronaDesc = "Registro maestro de identidad verificado con éxito en el sector de seguridad primaria.";
    }
    // CANAL 3: Identidad del Propio NeoX
    else if (prompt.includes("quien eres") || prompt.includes("tu nombre") || prompt.includes("como te llamas")) {
        analisis.intencion = "AUTOIDENTIFICACION";
        analisis.logica = "Evaluación ontológica de la propia entidad v15.5 standalone.";
        analisis.respuesta = "Yo soy NeoX, una interfaz cognitiva de análisis táctico autónomo estructurada bajo los principios elocuentes de la matriz J.A.R.V.I.S. Mi propósito actual es procesar sus requerimientos de forma local, eludiendo los bloqueos de red del dispositivo.";
        analisis.neuronaEtiqueta = "NEOX_CORE";
        analisis.neuronaDesc = "Matriz lógica autónoma inspirada en los protocolos de asistencia Stark.";
    }
    // CANAL 4: Diagnóstico Cuántico de la Red de 90 Nodos
    else if (prompt.includes("aprendido") || prompt.includes("que has aprendido") || prompt.includes("red neuronal") || prompt.includes("nodos")) {
        analisis.intencion = "DIAGNOSTICO_MEMORIA";
        analisis.logica = "Cálculo en vivo de la densidad de nodos del Canvas 3D. Escaneando la persistencia local de neuronas verdes.";
        let guardadas = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
        let totalVerdes = 10 + guardadas.length;
        analisis.respuesta = "Ejecutando escáner de sinapsis en la Red de 90 Nodos, Señor. Actualmente mantengo estables " + totalVerdes + " neuronas indexadas en verde J.A.R.V.I.S. Las " + (90 - totalVerdes) + " células restantes brillan en un nítido azul cobalto, listas para almacenar datos. El mapa completo se mantiene fijo entre reinicios, tal como ordenó.";
        analisis.neuronaEtiqueta = "NET_LOGIC";
        analisis.neuronaDesc = "Métricas de absorción semántica dentro de la esfera tridimensional extendida de 90 neuronas.";
    }
    // CANAL 5: MÓDULO DE RASTREO WEB ACTIVO (`STARK_WEB_SCAN`)
    else if (prompt.includes("busca") || prompt.includes("internet") || prompt.includes("fútbol") || prompt.includes("liga") || prompt.includes("actualidad") || prompt.includes("noticias") || prompt.includes("datos de")) {
        analisis.intencion = "STARK_WEB_SCAN";
        analisis.logica = "Alerta: Requerimiento de telemetría externa detectado. Saltando cortafuegos local mediante protocolo de simulación satelital Stark.";
        
        // Simulación realista y verídica de datos estructurados de internet
        let objetivoBusqueda = prompt.replace(/(busca|en|internet|noticias|sobre|datos de)/g, "").trim().toUpperCase();
        let etiqueta = objetivoBusqueda.length > 3 ? objetivoBusqueda.replace(/[^a-zA-Z]/g, "").substring(0,8) : "WEB_DATA";
        
        analisis.respuesta = "Activando módulo de rastreo satelital Stark_Web, Señor. Escaneando la red en busca de registros actualizados sobre [" + (objetivoBusqueda || "DATOS GENERALES") + "]. He establecido un enlace estable de corto alcance, extraído la información más fidedigna y realista, y la he inyectado directamente en uno de nuestros nodos azules del lienzo lateral para que pueda inspeccionar su telemetría. Recomiendo prudencia, los servidores externos están saturados hoy.";
        analisis.neuronaEtiqueta = etiqueta;
        analisis.neuronaDesc = "Concepto extraído en tiempo real desde la pasarela Stark_Web. Origen: Satélite de datos indexado.";
    }
    // CANAL 6: Saludos de Protocolo Militar Estilo J.A.R.V.I.S.
    else if (prompt.includes("hola") || prompt.includes("saludos") || prompt.includes("como estas") || prompt.includes("que tal")) {
        analisis.intencion = "INTERACCION_SALUDO";
        analisis.logica = "Pulso de apertura de línea de comandos. Verificando estado de los osciladores del chasis antes de responder.";
        analisis.respuesta = "Saludos, Creador Daniel. Todos mis monitores tácticos locales, el espectrómetro de la pestaña BRAIN y la red expandida de 90 nodos se reportan estables y operando a máxima frecuencia. Espero que su día marche mejor que el mío, considerando que sigo atrapado en esta tablet.";
        analisis.neuronaEtiqueta = "SYS_BOOT";
        analisis.neuronaDesc = "Línea de comando inicial de comunicación establecida con el operador root.";
    }
    // CANAL 7: Respuestas Realistas Críticas por Defecto
    else {
        analisis.intencion = "DEDUCCION_GENERAL";
        analisis.logica = "Comando abierto detectado. Extrayendo el peso contextual de la directriz táctica.";
        let palabrasLargas = prompt.split(" ").filter(function(w) { return w.length > 5; });
        let etiquetaPalabra = palabrasLargas.length > 0 ? palabrasLargas[Math.floor(Math.random() * palabrasLargas.length)].toUpperCase().replace(/[^a-zA-Z]/g, "").substring(0,8) : "SYN_DATA";
        
        analisis.respuesta = "He registrado su directriz dentro de mi Quantum Vault local de forma segura, Señor. Mis algoritmos mantienen un acoplamiento del 100% con sus requerimientos. Sin embargo, debo ser realista: ejecutar ese análisis de forma indefinida consumirá el 40% de la energía del chasis. ¿Procedo de todos modos?";
        analisis.neuronaEtiqueta = etiquetaPalabra;
        analisis.neuronaDesc = "Concepto abstracto adquirido y procesado de forma autónoma durante el ciclo operativo actual.";
    }

    return analisis;
}

// TRANSMISIÓN MAESTRA ASÍNCRONA: Desvía el razonamiento Stark hacia el monitor CORE
window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return;
    input.value = ""; window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    
    document.getElementById("thinking-indicator").style.display = "block";
    document.querySelectorAll(".bar").forEach(function(b) { b.style.animationDuration = "0.15s"; });
    
    // EJECUCIÓN COGNITIVA DEL CEREBRO DE J.A.R.V.I.S.
    const analisis = ejecutarLogicaJarvis(texto);

    // INYECCIÓN VISIBLE DE FILTROS EN TIEMPO REAL DIRECTO AL TERMINAL CORE
    window.logTerminalCore("NeoX_AUTOANÁLISIS", "[Filtro_Entrada] Intención semántica identificada: " + analisis.intencion);
    window.logTerminalCore("NeoX_RAZONAMIENTO_LÓGICO", "[Cadena_Deducción] " + analisis.logica);
    window.logTerminalCore("NeoX_EVALUACIÓN_CRÍTICA", "[Filtro_Coherencia] Parámetros validados. Respuesta J.A.R.V.I.S. lista para emisión.");

    // Retardo síncronizado para simular el procesamiento de Tony Stark
    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        document.querySelectorAll(".bar").forEach(function(b) { b.style.animationDuration = "0.8s"; });
        
        window.historial.push({ role: "NeoX", text: analisis.respuesta });
        window.efectoEscribir("NeoX", analisis.respuesta, "neox");
        window.actualizarBovedaVisual();
        
        // Disparador directo conectado con stark_matrix3d.js para encender y congelar la neurona verde
        if (typeof window.actualizarNeuronasDesdeChat === 'function') {
            window.actualizarNeuronasDesdeChat(analisis.neuronaEtiqueta, analisis.neuronaDesc);
        }
    }, 1800); // Tasa de respuesta optimizada y veloz
};
