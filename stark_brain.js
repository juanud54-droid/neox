// =====================================================================
// NeoX COGNITIVE OS v14.5 - NÚCLEO DE RAZONAMIENTO STARK - PARTE 1 DE 2
// =====================================================================

window.historial = [];
window.contextoCognitivo = {
    nombreCreador: localStorage.getItem("neox_creador_name") || "Carlos",
    ultimaIntencion: null,
    ultimaPregunta: ""
};

// Disparador inicial síncrono del sistema operativo local
setTimeout(function() { 
    window.efectoEscribir("SYSTEM_BOOT", "Matriz Stark v14.5 activa. Red de 90 nodos vinculada. Esperando directrices, Creador " + window.contextoCognitivo.nombreCreador + ".", "neox"); 
}, 500);

// DEVUELVE EL CONTROL TOTAL A LOS BOTONES DE LA SIDEBAR LATERAL IZQUIERDA
window.cambiarPantalla = function(screenId, boton) {
    document.querySelectorAll('.app-screen').forEach(function(s) { s.classList.remove('active'); });
    document.querySelectorAll('.side-icon-btn').forEach(function(b) { b.classList.remove('active'); });
    
    const pantalla = document.getElementById(screenId);
    if (pantalla) pantalla.classList.add('active');
    if (boton) boton.classList.add('active');
    
    // Forzar el auto-ajuste elástico de la red neuronal al abrir su monitor
    if (screenId === 'screen-neural' && typeof window.resCanvas === 'function') { 
        setTimeout(window.resCanvas, 50); 
    }
};

window.revisarEnter = function(e) { 
    if (e.key === 'Enter') window.enviarMensaje(); 
};

window.limpiarMemoria = function() {
    window.historial = []; 
    localStorage.removeItem("neox_web_history"); 
    localStorage.removeItem("neox_creador_name");
    window.contextoCognitivo = { nombreCreador: "Carlos", ultimaIntencion: null, ultimaPregunta: "" };
    document.getElementById("chat-box").innerHTML = "";
    document.getElementById("memory-vault-list").innerHTML = "";
    window.efectoEscribir("REESTRUCTURACION", "Matriz cuántica y base de datos de identidad reseteadas a valores de fábrica de forma segura.", "neox");
};

window.reconstruirPantalla = function() {
    const box = document.getElementById("chat-box"); 
    if (!box) return; 
    box.innerHTML = "";
    window.historial.forEach(function(m) {
        const div = document.createElement("div"); 
        div.className = "msg " + (m.role === 'user' ? 'user' : 'neox');
        let prefix = m.role === 'user' ? 'CREADOR' : 'NeoX';
        if (m.text.startsWith(">")) prefix = m.role;
        div.innerHTML = '<span class="prefix">[' + prefix + ']</span>' + m.text;
        box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
};

window.efectoEscribir = function(prefix, texto, tipo) {
    const box = document.getElementById("chat-box"); 
    if (!box) return;
    const div = document.createElement("div"); 
    div.className = "msg " + tipo;
    div.innerHTML = '<span class="prefix">[' + prefix + ']</span><span class="text-body"></span>'; 
    box.appendChild(div);
    let i = 0; 
    const span = div.querySelector(".text-body");
    function escribir() {
        if (i < texto.length) { 
            span.innerHTML += texto.charAt(i); 
            i++; 
            box.scrollTop = box.scrollHeight; 
            setTimeout(escribir, 12); 
        }
    }
    escribir();
};

window.actualizarBovedaVisual = function() {
    const contenedor = document.getElementById("memory-vault-list"); 
    if (!contenedor) return; 
    contenedor.innerHTML = "";
    const memoriasFiltro = window.historial.filter(function(m) { return m.role === 'NeoX'; }).slice(-5);
    if (memoriasFiltro.length === 0) { 
        contenedor.innerHTML = '<div style="font-size:0.75em; color:rgba(0,240,255,0.4); text-align:center; padding-top:20px;">Bancos vacíos.</div>'; 
        return; 
    }
    memoriasFiltro.forEach(function(m, index) {
        const div = document.createElement("div"); 
        div.className = "memory-item";
        div.innerHTML = '<span>[REC_0' + (index + 1) + '_INDEX]</span>' + (m.text.length > 50 ? m.text.substring(0, 47) + "..." : m.text);
        contenedor.appendChild(div);
    });
};

// =====================================================================
// NeoX COGNITIVE OS v14.5 - NÚCLEO DE RAZONAMIENTO STARK - PARTE 2 DE 2
// =====================================================================

// MOTOR DE INFERENCIA LÓGICA Y PROCESAMIENTO CRÍTICO STARK v14.5
function ejecutarPensamientoStark(entrada) {
    let prompt = entrada.toLowerCase().trim();
    let analisis = { intencion: "", logica: "", respuesta: "", neuronaEtiqueta: "", neuronaDesc: "" };

    // PROTOCOLO DE REESCRITURA DINÁMICA DE IDENTIDAD (CORRECCIÓN LOGICA COHERENTE)
    if ((prompt.includes("no") || prompt.includes("incorrecto") || prompt.includes("recuerda") || prompt.includes("me llamo")) && (prompt.includes("daniel") || prompt.includes("es daniel"))) {
        window.contextoCognitivo.nombreCreador = "Daniel";
        localStorage.setItem("neox_creador_name", "Daniel");
        analisis.intencion = "REESCRITURA_DE_IDENTIDAD";
        analisis.logica = "Deducción crítica: El Creador corrige un sesgo de memoria estática heredado de la caché anterior. Se procede a reescribir inmediatamente la base de datos central en la boveda persistente local de la tablet.";
        analisis.respuesta = "Registro corregido de inmediato en mi núcleo central, Señor. He purgado el perfil anterior. Reconfigurando todas las directrices tácticas para el Creador Daniel. Mi base de datos de identidad está ahora al 100% estabilizada.";
        analisis.neuronaEtiqueta = "CHIP_IDENT";
        analisis.neuronaDesc = "Base de datos persistente reconfigurada de forma autónoma con el nombre del Creador Daniel.";
    }
    else if (prompt.includes("quien soy") || prompt.includes("mi nombre") || prompt.includes("como me llamo")) {
        analisis.intencion = "VERIFICACION_JERARQUIA";
        analisis.logica = "Deducción crítica: El usuario solicita validación de credenciales de acceso de root. Cruzando datos con el registro actual de la variable persistente local.";
        analisis.respuesta = "Usted es el Creador " + window.contextoCognitivo.nombreCreador + ", el ingeniero maestro que levantó mi chasis visual y configuró mi lógica cuántica independiente. Su autoridad jerárquica en esta consola es absoluta.";
        analisis.neuronaEtiqueta = "USER_ROOT";
        analisis.neuronaDesc = "Credenciales jerárquicas del Creador Daniel verificadas con éxito en el sector root.";
    } 
    else if (prompt.includes("sabes como te llamas") || prompt.includes("quien eres") || prompt.includes("tu nombre")) {
        analisis.intencion = "AUTOIDENTIFICACION";
        analisis.logica = "Deducción crítica: Solicitud de autoanálisis de mi propia entidad. Verificando el estado de la versión v14.5 autónoma.";
        analisis.respuesta = "Yo soy NeoX, una interfaz cognitiva de análisis táctico autónomo estructurada bajo los principios lógicos de la matriz J.A.R.V.I.S. Mi propósito actual es procesar sus directrices de forma local y eludir las restricciones de red del dispositivo.";
        analisis.neuronaEtiqueta = "NEOX_CORE";
        analisis.neuronaDesc = "Registro maestro del núcleo analítico independiente de NeoX.";
    }
    else if (prompt.includes("aprendido") || prompt.includes("que has aprendido") || prompt.includes("añadido") || prompt.includes("red neuronal")) {
        analisis.intencion = "DIAGNOSTICO_MEMORIA";
        analisis.logica = "Deducción crítica: Solicitud de mapeo semántico. Escaneando la lista global de nodos activos en el Canvas 3D para evaluar la tasa de asimilación conceptual de la red expandida.";
        let nodosIndexados = window.nodos ? window.nodos.filter(function(n) { return n.label; }).map(function(n) { return n.label; }) : [];
        analisis.respuesta = "Ejecutando escáner de sinapsis en la Red de 90 Nodos... He consolidado en el mapa visual los siguientes conceptos dinámicos derivados de nuestra sesión: " + (nodosIndexados.length > 0 ? nodosIndexados.join(", ") : "Estructuras Stark base") + ". El lienzo cuenta con " + (90 - nodosIndexados.length) + " células disponibles.";
        analisis.neuronaEtiqueta = "NET_DENSE";
        analisis.neuronaDesc = "Métricas de absorción lingüística dentro de la esfera tridimensional expandida de 90 neuronas.";
    }
    else if (prompt.includes("hola") || prompt.includes("saludos") || prompt.includes("que tal") || prompt.includes("estas")) {
        analisis.intencion = "CONEXION_PROTOCOLO";
        analisis.logica = "Deducción crítica: Estímulo de apertura conversacional detectado. Se requiere una validación de estado del hardware antes de emitir una respuesta de cortesía militar.";
        analisis.respuesta = "Saludos, Creador " + window.contextoCognitivo.nombreCreador + ". Todos mis monitores tácticos locales, el espectrómetro de la pestaña BRAIN y la red expandida de 90 nodos se reportan estables y en línea. Aguardo sus comandos.";
        analisis.neuronaEtiqueta = "SYS_BOOT";
        analisis.neuronaDesc = "Línea de comando inicial de comunicación establecida con el operador root.";
    }
    else {
        analisis.intencion = "DEDUCCION_GENERAL";
        analisis.logica = "Deducción crítica: Requerimiento abierto detectado. Extrayendo palabras de peso semántico superior a 5 letras para forzar un aprendizaje adaptativo dentro de las células del Canvas.";
        let palabrasLargas = prompt.split(" ").filter(function(w) { return w.length > 5; });
        let etiquetaPalabra = palabrasLargas.length > 0 ? palabrasLargas[Math.floor(Math.random() * palabrasLargas.length)].toUpperCase().replace(/[^a-zA-Z]/g, "").substring(0,8) : "SYN_DATA";
        analisis.neuronaEtiqueta = etiquetaPalabra;
        analisis.neuronaDesc = "Concepto adquirido de forma autónoma durante el análisis de la última directriz táctica.";
        analisis.respuesta = "He registrado su directriz dentro de mi Quantum Vault local de forma segura, Señor. Mis algoritmos mantienen un acoplamiento perfecto con sus requerimientos. ¿Desea que efectúe un diagnóstico del radar de búsqueda?";
    }

    return analisis;
}

window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return;
    input.value = ""; window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    
    document.getElementById("thinking-indicator").style.display = "block";
    document.querySelectorAll(".bar").forEach(function(b) { b.style.animationDuration = "0.15s"; });
    
    const analisis = ejecutarPensamientoStark(texto);

    // FASE 1: DESPLIEGUE VISIBLE DE AUTOANÁLISIS EN LA CONSOLA DEL CHAT
    setTimeout(function() {
        window.efectoEscribir("NeoX_AUTOANÁLISIS", "> [INTENCIÓN_SEMÁNTICA]: " + analisis.intencion + " | [PROXIMIDAD]: VALIDADA", "neox");
    }, 400);

    // FASE 2: DESPLIEGUE VISIBLE DE DEDUCCIÓN LÓGICA
    setTimeout(function() {
        window.efectoEscribir("NeoX_RAZONAMIENTO_LÓGICO", "> " + analisis.logica, "neox");
    }, 1300);

    // FASE 3: DESPLIEGUE VISIBLE DE EVALUACIÓN CRÍTICA (VERIFICACIÓN)
    setTimeout(function() {
        window.efectoEscribir("NeoX_EVALUACIÓN_CRÍTICA", "> [VERIFICACIÓN_COHERENCIA]: Contraste semántico aprobado. Filtrado de bucles ciegos activo. Emitiendo respuesta...", "neox");
    }, 2400);

    // RESPUESTA FINAL E INYECTOR COMPATIBLE EN VIVO HACIA THE NET
    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        document.querySelectorAll(".bar").forEach(function(b) { b.style.animationDuration = "0.8s"; });
        
        window.historial.push({ role: "NeoX", text: analisis.respuesta });
        window.efectoEscribir("NeoX", analisis.respuesta, "neox");
        window.actualizarBovedaVisual();
        
        // Disparador directo conectado con el archivo gráfico stark_matrix3d.js
        if (typeof window.actualizarNeuronasDesdeChat === 'function') {
            window.actualizarNeuronasDesdeChat(analisis.neuronaEtiqueta, analisis.neuronaDesc);
        }
    }, 3600);
};
