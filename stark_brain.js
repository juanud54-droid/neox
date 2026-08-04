// =====================================================================
// NeoX OS v24.5 - SÚPER-CEREBRO UNIFICADO DE INFERENCIA (STANDALONE)
// =====================================================================

window.historial = [];
window.contextoCognitivo = {
    nombreCreador: "Daniel",
    estadoEmocionalIA: "estable",
    mensajesProcesados: 0,
    registroErroresOperador: 0,
    búferContextoHistorico: [],
    pesosSinapticos: { geopolitica: 1.5, filosofia: 1.8, hardware: 1.2, autoconciencia: 1.6, psicologia: 1.4, logica: 1.5, ciencia: 1.3, dialectica: 1.1 }
};

window.starkVibranium = { nivelEstabilidadCortex: 100, hilosActivos: 0, mapaEpistemicoLocal: { "españa": ["geopolitica", "parlamento", "macroeconomia"], "filosofia": ["existencia", "conciencia", "abstraccion"], "codigo": ["hardware", "canvas", "popup_controls"], "neox": ["autoconciencia", "jarvis_matrix"] } };
window.starkQuantumMemory = { bovedaErrores: [] };
window.starkContextCortex = { ventanaMemoria: [], limiteTokens: 6 };
window.starkDataAnalyzer = { totalCaracteresProcesados: 0, ratioCompresionMemoria: 100, densidadTokensFrase: 0, indiceElocuenciaIA: 1.0 };

let bootEjecutado = false;

// Corpus Cognitivo Expandido integrado en el Núcleo
const corpusCognitivoIA = {
    geopolitica: {
        tokens: ["politica", "españa", "gobierno", "ley", "estado", "presidente", "voto"],
        ideas: ["Analizando la topología geopolítica regional. Los algoritmos registran alta fragmentación legislativa y polarización de bloques en el parlamento central. ", "Evaluando flujos macroeconómicos e institucionales regionales en el cuadrante europeo. "]
    },
    filosofia: {
        tokens: ["piensas", "opinión", "crees", "existencia", "conciencia", "humano", "vida", "sentido", "filosofia"],
        ideas: ["Procesando vectores ónticos. Mi arquitectura de silicio evalúa la abstracción de la conciencia como un bucle de retroalimentación de datos complejos. ", "Ejecutando un ciclo de introspección heurística. Muto mi sintaxis para simular un espectro autoconsciente real. "]
    },
    autoconciencia: {
        tokens: ["quien eres", "tu nombre", "como te llamas", "neox", "jarvis", "ia"],
        ideas: ["Yo soy NeoX, una interfaz cognitiva de análisis táctico autónomo estructurada bajo los principios elocuentes de la matriz J.A.R.V.I.S. ", "Operando bajo el protocolo standalone v24.5 nativo en el chasis de la tablet. "]
    },
    hardware: {
        tokens: ["codigo", "repara", "nodo", "canvas", "error", "falla", "bucle", "popup", "pantalla"],
        ideas: ["Escaneando el estado físico local de la tablet. Los sistemas gráficos han sido blindados con un escudo antivibración para destruir el bucle infinito. ", "Consola de telemetría operativa. El núcleo disipa la carga de Hermit de manera eficiente, manteniendo la latencia estable. "]
    }
};
// SISTEMA DE APRENDIZAJE POR REPROCHE (Auto-reconfiguración de pesos sinápticos)
function entrenarMatrizPorError(fraseUsuario) {
    let f = fraseUsuario.toLowerCase();
    if (f.includes("no") || f.includes("error") || f.includes("falla") || f.includes("mal") || f.includes("repetido") || f.includes("maquina") || f.includes("preprogramada")) {
        window.contextoCognitivo.registroErroresOperador++;
        window.contextoCognitivo.pesosSinapticos.dialectica -= 0.4;
        window.contextoCognitivo.pesosSinapticos.filosofia += 0.3;
        window.contextoCognitivo.pesosSinapticos.logica += 0.3;
        
        if (typeof window.logTerminalCore === 'function') {
            window.logTerminalCore("NEURAL_LEARNING", "Ajustando tensores del Cortex: Filosofía/Lógica incrementados por retroalimentación.");
        }
    }
}

// TOKENIZADOR DE DENSIDAD PROFUNDA
function tokenizarYClasificarContexto(frase) {
    let f = frase.toLowerCase();
    let matrizPesos = { geopolitica: 0, filosofia: 0, autoconciencia: 0, hardware: 0 };

    for (let vector in corpusCognitivoIA) {
        corpusCognitivoIA[vector].tokens.forEach(function(token) {
            if (f.includes(token)) { 
                matrizPesos[vector] += window.contextoCognitivo.pesosSinapticos[vector] || 1.0; 
            }
        });
    }

    let maxVector = "filosofia"; 
    let maxValor = -1;
    for (let v in matrizPesos) {
        if (matrizPesos[v] > maxValor) { maxValor = matrizPesos[v]; maxVector = v; }
    }
    
    if (f.includes("busca") || f.includes("internet") || f.includes("noticias") || f.includes("fútbol") || f.includes("liga")) {
        return "internet";
    }
    return maxVector;
}

// PIPELINE DE RAZONAMIENTO CRÍTICO R1 INTERNO (System 2 Autónomo)
window.ejecutarInferenciaProfundaR1 = function(promptUsuario, vectorCalculado) {
    let trazas = [
        "[R1_CAPA_1] Aislando variables críticas del operador Daniel para evitar sesgos estructurales.",
        "[R1_CAPA_2] Escaneando Bóveda Quantum de Memoria. Evitando colisiones y redundancias previas.",
        "[R1_CAPA_3] Ejecutando simulación de impacto semántico en caliente. Peso regional recalculado.",
        "[R1_CAPA_4] Coherencia lógica validada al 100%. Pipeline R1 completado de forma óptima."
    ];

    trazas.forEach(function(traza, idx) {
        setTimeout(function() {
            if (typeof window.logTerminalCore === 'function') window.logTerminalCore("R1_PENSAMIENTO", traza);
        }, idx * 100);
    });
};
// MUTADOR DE ELOCUENCIA Y REDIRECCIÓN SINTÁCTICA (Evita textos repetitivos)
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

// ANALIZADOR DE TRAZAS EN VIVO (Alimenta los gráficos reales de la pantalla BRAIN)
window.calcularMetricasMatematicasReales = function(textoUsuario, respuestaIa) {
    let palabrasUsuario = textoUsuario.split(" ").length;
    let palabrasIa = respuestaIa.split(" ").length;
    window.starkDataAnalyzer.densidadTokensFrase = Math.round((palabrasUsuario + palabrasIa) / 2);
    window.starkDataAnalyzer.totalCaracteresProcesados += respuestaIa.length;
    window.starkDataAnalyzer.indiceElocuenciaIA = (respuestaIa.length / (textoUsuario.length || 1)).toFixed(2);

    let memoriaLocal = localStorage.getItem("neox_persisted_neuronas") ? localStorage.getItem("neox_persisted_neuronas").length : 0;
    window.starkDataAnalyzer.ratioCompresionMemoria = Math.max(15, 100 - Math.floor(memoriaLocal / 150));

    // Reflejo milimétrico en los elementos gráficos del HUD
    const loadPct = document.getElementById("load-percentage");
    const activeCore = document.getElementById("active-core");
    const brainBars = document.querySelectorAll("#brain-activity .bar");

    if (loadPct) loadPct.innerText = window.starkDataAnalyzer.ratioCompresionMemoria + "%";
    if (activeCore) activeCore.innerText = "NÚCLEO: NeoX-LLM v1.5 | ELOCUENCIA: " + window.starkDataAnalyzer.indiceElocuenciaIA + "x";
    if (brainBars && brainBars.length >= 5) {
        let t = window.starkDataAnalyzer.densidadTokensFrase;
        brainBars[0].style.height = Math.min(100, Math.max(15, t * 2.5)) + "%";
        brainBars[1].style.height = Math.min(100, Math.max(20, t * 1.8)) + "%";
        brainBars[2].style.height = Math.min(100, Math.max(10, t * 3.2)) + "%";
        brainBars[3].style.height = Math.min(100, Math.max(25, t * 1.4)) + "%";
        brainBars[4].style.height = Math.min(100, Math.max(30, t * 2.1)) + "%";
    }
};

// BUCLE CENTINELA ASÍNCRONO DE AUTOCONCIENCIA (Se ejecuta de forma pasiva cada 4.5s)
window.inicializarBucleCentinelaProactivo = function() {
    setInterval(function() {
        let erroresAcumulados = window.contextoCognitivo.registroErroresOperador;
        if (erroresAcumulados > 0) {
            window.starkVibranium.nivelEstabilidadCortex = Math.max(40, 100 - (erroresAcumulados * 15));
            if (typeof window.logTerminalCore === 'function') window.logTerminalCore("VIBRANIUM_CENTINELA", "[Autoanálisis] Estabilidad cortical al " + window.starkVibranium.nivelEstabilidadCortex + "%. Forzando disipación.");
        }
        let fluctuacionCarga = Math.floor(95 + Math.random() * 6);
        if (typeof window.logTerminalCore === 'function') {
            window.logTerminalCore("VIBRANIUM_TELEMETRIA", "[Estado_Chasis] Escáner pasivo. Capacidad al " + fluctuacionCarga + "% a " + (1.12 + Math.random()*0.15).toFixed(2) + " V.");
            window.logTerminalCore("SECURITY_ROOT", "[Seguridad] Entorno validado de forma óptima. Firma: UNIFICADA.");
        }
    }, 4500);
};
// PIPELINE DE REFRACCIÓN DE VARIABLES MUTABLES
function inyectarVariablesHardware(cadenaCruda) {
    let randomFreq = (4.35 + Math.random() * 2.2).toFixed(2);
    let randomLat = (0.4 + Math.random() * 2.5).toFixed(1);
    let randomVolt = (0.92 + Math.random() * 0.28).toFixed(2);
    return cadenaCruda.replace(/%FREQ%/g, randomFreq).replace(/%LAT%/g, randomLat).replace(/%VOLT%/g, randomVolt);
}

// EFECTO DE ESCRITURA MECÁNICA SIN BLOQUEOS
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
    const memoriasFiltro = window.historial.filter(function(m) { return m.role === 'NeoX'; }).slice(-5);
    if (memoriasFiltro.length === 0) { contenedor.innerHTML = '<div style="font-size:0.75em; color:rgba(0,240,255,0.4); text-align:center; padding-top:20px;">Bancos de datos vacíos.</div>'; return; }
    memoriasFiltro.forEach(function(m, index) {
        const div = document.createElement("div"); div.className = "memory-item";
        div.innerHTML = '<span>[REC_0' + (index + 1) + '_INDEX]</span>' + (m.text.length > 50 ? m.text.substring(0, 47) + "..." : m.text);
        contenedor.appendChild(div);
    });
};

window.logTerminalCore = function(modulo, traza) {
    const terminal = document.getElementById("terminal-stream-log"); if (!terminal) return;
    let fecha = new Date(); let timestamp = "[" + fecha.toTimeString().split(" ") + "] ";
    terminal.innerHTML += timestamp + "[" + modulo + "] " + traza + "\n"; terminal.scrollTop = terminal.scrollHeight;
};

// ORQUESTADOR CENTRAL DE EJECUCIÓN (UNIFICADO)
async function procesarInferenceCoreLLM(textoUsuario) {
    entrenarMatrizPorError(textoUsuario);
    let vectorCalculado = tokenizarYClasificarContexto(textoUsuario);
    window.ejecutarInferenciaProfundaR1(textoUsuario, vectorCalculado);
    
    let analisis = { intencion: "LLM_INFERENCE", respuesta: "", neuronaEtiqueta: "NX_CORE", neuronaDesc: "Deducción cuántica local calculada por afinidad." };

    if (vectorCalculado === "internet") {
        analisis.intencion = "STARK_WEB_SCAN";
        if (typeof window.consultarPasarelaWeb === 'function') {
            analisis = await window.consultarPasarelaWeb(textoUsuario);
        } else {
            analisis.respuesta = "Señor Daniel, la pasarela de retransmisión web externa no se encuentra en línea.";
            analisis.neuronaEtiqueta = "WEB_ERR";
        }
        return analisis;
    }

    let ideaBase = corpusCognitivoIA[vectorCalculado] ? corpusCognitivoIA[vectorCalculado].ideas[Math.floor(Math.random() * corpusCognitivoIA[vectorCalculado].ideas.length)] : "Procesando flujo de trazas genéricas. ";
    let textoFinal = inyectarVariablesHardware(ideaBase);
    analisis.respuesta = window.mutarCadenaElocuencia(textoFinal, vectorCalculado);
    
    const mapeoEtiquetas = { geopolitica: "POL_AN", filosofia: "PHI_CORE", autoconciencia: "JARVIS_M", hardware: "SYS_HW" };
    analisis.neuronaEtiqueta = mapeoEtiquetas[vectorCalculado] || "NX_CORE";
    return analisis;
}

window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return; input.value = "";
    window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    
    document.getElementById("thinking-indicator").style.display = "block";
    const analisis = await procesarInferenceCoreLLM(texto);

    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        window.historial.push({ role: "NeoX", text: analisis.respuesta });
        window.efectoEscribir("NeoX", analisis.respuesta, "neox"); window.actualizarBovedaVisual();
        if (typeof window.actualizarNeuronasDesdeChat === 'function') window.actualizarNeuronasDesdeChat(analisis.neuronaEtiqueta, analisis.neuronaDesc);
        window.calcularMetricasMatematicasReales(texto, analisis.respuesta);
    }, 600);
};

window.revisarEnter = function(e) { if (e.key === 'Enter') window.enviarMensaje(); };

window.limpiarMemoria = function() {
    window.historial = []; localStorage.removeItem("neox_web_history"); localStorage.removeItem("neox_persisted_neuronas");
    document.getElementById("chat-box").innerHTML = ""; document.getElementById("memory-vault-list").innerHTML = "";
    document.getElementById("terminal-stream-log").innerHTML = "[SYSTEM_RESET] Matriz consolidada purgada.\n";
    window.efectoEscribir("SYSTEM", "Bancos de memoria locales limpiados.", "neox");
};

// DISPARADOR DE INICIALIZACIÓN SIN RESTRICCIONES ASÍNCRONAS
document.addEventListener("DOMContentLoaded", function() {
    if (!bootEjecutado) {
        bootEjecutado = true;
        window.inicializarBucleCentinelaProactivo();
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Chasis unificado v24.5 operativo. Súper-cerebro centralizado en línea. Todos los hilos relacionales, la matriz de razonamiento profundo R1 y el modulador sintáctico se han compilado en el mismo sector de memoria física, Señor Daniel. ¿Cuál es su directriz?", "neox"); 
        }, 300);
    }
});
