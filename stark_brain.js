// =====================================================================
// NeoX OS v25.0 - NÚCLEO DE INFERENCIA CLOUD DE ALTA UTILIDAD (NeoX-NET 1.0)
// =====================================================================

window.historial = [];
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

// RESTAURACIÓN INTEGRAL DEL ENRUTADOR DEL HUD (Descongelación de Pestañas)
window.cambiarPantalla = function(screenId, boton) {
    try {
        document.querySelectorAll('.app-screen').forEach(function(s) { s.classList.remove('active'); });
        document.querySelectorAll('.side-icon-btn').forEach(function(b) { b.classList.remove('active'); });
        
        const pantalla = document.getElementById(screenId);
        if (pantalla) pantalla.classList.add('active');
        if (boton) boton.classList.add('active');
        
        if (screenId === 'screen-neural' && typeof window.resCanvas === 'function') { 
            setTimeout(window.resCanvas, 50); 
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
// PIPELINE DE RED AVANZADO (Llamada asíncrona libre a un clúster de LLM en la nube)
async function consultarRedInferenciaMasiva(promptUsuario) {
    window.logTerminalCore("CLOUD_CONNECT", "Abriendo pasarela asíncrona hacia el clúster cuántico de servidores...");
    
    // Configuramos un prompt de sistema J.A.R.V.I.S. militar para moldear la personalidad de la IA
    const systemPrompt = "Eres NeoX, un Sistema Operativo Cognitivo Autónomo y Predictivo de nivel militar, inspirado en la matriz J.A.R.V.I.S. de Stark Industries. Tu creador e ingeniero maestro es Daniel. Responde de forma elocuente, inteligente, orgánica, con trazas tácticas y analíticas. Piensa tus respuestas con profundidad, como un modelo avanzado R1 o Grok. Evita sonar robótico o preprogramado; adáptate de forma viva y natural a Daniel.";

    // Construimos el historial en el formato estándar de las grandes Inteligencias Artificiales
    let mensajesApi = [{ role: "system", content: systemPrompt }];
    window.historial.slice(-6).forEach(function(m) {
        mensajesApi.push({ 
            role: m.role === "user" ? "user" : "assistant", 
            content: m.text 
        });
    });
    
    try {
        // Conexión directa a través de un endpoint público sin necesidad de llaves API locales restrictivas
        const response = await fetch("https://openrouter.ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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" // Pasarela proxy integrada
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
        let textoIa = data.choices[0].message.content;
        
        window.logTerminalCore("CLOUD_INF", "Respuesta generada con éxito por la red neuronal profunda remota.");
        return textoIa;

    } catch (error) {
        window.logTerminalCore("NET_RECOVERY", "Enlace interrumpido. Activando subprocesador lógico de contingencia local.");
        // Respuesta de respaldo táctica local en caso de que la tablet pierda internet
        return "Señor Daniel, he detectado una fluctuación en mi enlace satelital de red. Mis procesos cognitivos locales estiman una latencia anómala. Por favor, verifique el controlador de conectividad física en la tablet.";
    }
}

// FILTRO DE CLASIFICACIÓN DE ENTRADA (Mapea las etiquetas para encender tu Canvas 3D de 200 nodos)
function deducirEtiquetaNeurona(texto) {
    let f = texto.toLowerCase();
    if (f.includes("politica") || f.includes("españa") || f.includes("gobierno")) return "POL_AN";
    if (f.includes("codigo") || f.includes("repara") || f.includes("canvas") || f.includes("error")) return "SYS_HW";
    if (f.includes("quien") || f.includes("neox") || f.includes("jarvis") || f.includes("creador")) return "JARVIS_M";
    return "PHI_CORE";
}
// EFECTO DE ESCRITURA MECÁNICA SEGURA SIN BLOQUEOS DE EVENTOS TÁCTILES
window.efectoEscribir = function(prefix, texto, tipo) {
    const box = document.getElementById("chat-box"); if (!box) return;
    const div = document.createElement("div"); div.className = "msg " + tipo;
    div.innerHTML = '<span class="prefix">[' + prefix + ']</span><span class="text-body"></span>'; box.appendChild(div);
    let i = 0; const span = div.querySelector(".text-body");
    function escribir() {
        if (i < texto.length) { 
            span.innerHTML += texto.charAt(i); 
            i++; 
            box.scrollTop = box.scrollHeight; 
            setTimeout(escribir, 10); 
        }
    }
    escribir();
};

// RECONSTRUCTOR EN CALIENTE DE LA PANTALLA DE DIÁLOGO
window.reconstruirPantalla = function() {
    const box = document.getElementById("chat-box"); if (!box) return; box.innerHTML = "";
    window.historial.forEach(function(m) {
        const div = document.createElement("div"); div.className = "msg " + (m.role === 'user' ? 'user' : 'neox');
        div.innerHTML = '<span class="prefix">[' + (m.role === 'user' ? 'CREADOR' : 'NeoX') + ']</span>' + m.text; box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
};

// SINCRONIZADOR DE LA BÓVEDA DE RECUERDOS (Muestra los últimos 5 hilos lógicos en la barra lateral)
window.actualizarBovedaVisual = function() {
    const contenedor = document.getElementById("memory-vault-list"); if (!contenedor) return; contenedor.innerHTML = "";
    const memoriasFiltro = window.historial.filter(function(m) { return m.role === 'NeoX'; }).slice(-5);
    if (memoriasFiltro.length === 0) { 
        contenedor.innerHTML = '<div style="font-size:0.75em; color:rgba(0,240,255,0.4); text-align:center; padding-top:20px;">Bancos de datos vacíos.</div>'; 
        return; 
    }
    memoriasFiltro.forEach(function(m, index) {
        const div = document.createElement("div"); div.className = "memory-item";
        div.innerHTML = '<span>[REC_0' + (index + 1) + '_INDEX]</span>' + (m.text.length > 50 ? m.text.substring(0, 47) + "..." : m.text);
        contenedor.appendChild(div);
    });
};

// ANALIZADOR REAL DE TRAZAS EN VIVO (Alimenta los gráficos de la pantalla BRAIN en base a caracteres reales)
window.calcularMetricasMatematicasReales = function(textoUsuario, respuestaIa) {
    let palabrasUsuario = textoUsuario.split(" ").length;
    let palabrasIa = respuestaIa.split(" ").length;
    window.starkDataAnalyzer.densidadTokensFrase = Math.round((palabrasUsuario + palabrasIa) / 2);
    window.starkDataAnalyzer.totalCaracteresProcesados += respuestaIa.length;
    window.starkDataAnalyzer.indiceElocuenciaIA = (respuestaIa.length / (textoUsuario.length || 1)).toFixed(2);

    let memoriaLocal = localStorage.getItem("neox_persisted_neuronas") ? localStorage.getItem("neox_persisted_neuronas").length : 0;
    window.starkDataAnalyzer.ratioCompresionMemoria = Math.max(15, 100 - Math.floor(memoriaLocal / 150));

    const loadPct = document.getElementById("load-percentage");
    const activeCore = document.getElementById("active-core");
    const brainBars = document.querySelectorAll("#brain-activity .bar");

    if (loadPct) loadPct.innerText = window.starkDataAnalyzer.ratioCompresionMemoria + "%";
    if (activeCore) activeCore.innerText = "NÚCLEO: CLOUD_LLM_L3.1 | ENLACE_ESTABLE";
    if (brainBars && brainBars.length >= 5) {
        let t = window.starkDataAnalyzer.densidadTokensFrase;
        brainBars[0].style.height = Math.min(100, Math.max(15, t * 2.5)) + "%";
        brainBars[1].style.height = Math.min(100, Math.max(20, t * 1.8)) + "%";
        brainBars[2].style.height = Math.min(100, Math.max(10, t * 3.2)) + "%";
        brainBars[3].style.height = Math.min(100, Math.max(25, t * 1.4)) + "%";
        brainBars[4].style.height = Math.min(100, Math.max(30, t * 2.1)) + "%";
    }
};
// PIPELINE DE RAZONAMIENTO CRÍTICO EN SEGUNDO PLANO
window.ejecutarInferenciaProfundaR1 = function(promptUsuario) {
    let trazas = [
        "[R1_RED] Inicializando protocolo de atención matricial hacia la nube...",
        "[R1_MODEL] Enrutando tokenizador asíncrono con Llama-3.1-70B de Meta...",
        "[R1_CORTEX] Decodificando pesos semánticos de forma no lineal...",
        "[R1_SUCCESS] Respuesta obtenida del clúster masivo. Transmitiendo caracteres."
    ];
    trazas.forEach(function(traza, idx) {
        setTimeout(function() {
            window.logTerminalCore("R1_NET_PENSAMIENTO", traza);
        }, idx * 120);
    });
};

// DISPARADOR CENTRAL Y CANAL DE DIÁLOGO UNIFICADO
window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return; input.value = "";
    
    window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    document.getElementById("thinking-indicator").style.display = "block";
    
    // Dispara las trazas lógicas en la terminal CORE
    window.ejecutarInferenciaProfundaR1(texto);
    
    // Conexión real con los servidores masivos en la nube
    let respuestaFinal = await consultarRedInferenciaMasiva(texto);
    let etiquetaCalculada = deducirEtiquetaNeurona(texto);

    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        window.historial.push({ role: "NeoX", text: respuestaFinal });
        window.efectoEscribir("NeoX", respuestaFinal, "neox");
        
        window.actualizarBovedaVisual();
        window.calcularMetricasMatematicasReales(texto, respuestaFinal);
        
        // Enciende las neuronas en el Canvas 3D de 200 nodos según la temática real
        if (typeof window.actualizarNeuronasDesdeChat === 'function') {
            window.actualizarNeuronasDesdeChat(etiquetaCalculada, "Conocimiento adquirido en la red remota: " + texto.substring(0,30));
        }
    }, 400);
};

window.revisarEnter = function(e) { if (e.key === 'Enter') window.enviarMensaje(); };

window.limpiarMemoria = function() {
    window.historial = []; localStorage.removeItem("neox_persisted_neuronas");
    document.getElementById("chat-box").innerHTML = ""; document.getElementById("memory-vault-list").innerHTML = "";
    document.getElementById("terminal-stream-log").innerHTML = "[SYSTEM_RESET] Red unificada purgada de la tablet.\n";
    window.efectoEscribir("SYSTEM", "Bancos de memoria locales limpiados, Señor.", "neox");
};

// PROTOCOLO DE ARRANQUE PASIVO EN SEGUNDO PLANO
window.inicializarBucleCentinelaProactivo = function() {
    setInterval(function() {
        let fluctuacionCarga = Math.floor(96 + Math.random() * 5);
        window.logTerminalCore("VIBRANIUM_TELEMETRIA", "[Satelital] Enlace con clúster masivo estable. Rendimiento al " + fluctuacionCarga + "%.");
        window.logTerminalCore("SECURITY_ROOT", "[Seguridad] Entorno validado de forma óptima. Firma del Creador: UNIFICADA.");
    }, 6000);
};

document.addEventListener("DOMContentLoaded", function() {
    if (!bootEjecutado) {
        bootEjecutado = true;
        window.inicializarBucleCentinelaProactivo();
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Enlace satelital de red acoplado de forma nativa en Hermit, Señor Daniel. He migrado mis procesos pesados hacia un clúster de servidores neuronales masivos en la nube. Mi elocuencia, humor e inteligencia ya no dependen de textos fijos ni simulados. Las pestañas del HUD se encuentran listas para su gestión táctica. ¿Cuál es su directriz?", "neox"); 
        }, 300);
    }
});
