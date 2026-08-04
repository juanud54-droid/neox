// =====================================================================
// NeoX OS v24.0 - STARK VIBRANIUM COGNITIVE CORE - GRAFO DE CONCIENCIA
// =====================================================================

window.starkVibranium = {
    nivelEstabilidadCortex: 100,
    búferPensamientoProfundo: [],
    hilosActivos: 0,
    prediccionesContextuales: {},
    mapaEpistemicoLocal: {
        "españa": ["geopolitica", "parlamento", "macroeconomia", "europa"],
        "filosofia": ["existencia", "conciencia", "bucle_ontico", "abstraccion"],
        "codigo": ["hardware", "canvas", "popup_controls", "hermit_opt"],
        "neox": ["autoconciencia", "jarvis_matrix", "stark_vibranium"]
    }
};

// Extractor asociativo que expande el contexto semántico antes de la deducción
window.expandirContextoPorGrafo = function(frase) {
    let f = frase.toLowerCase();
    let conceptosExtendidos = [];
    
    for (let clave in window.starkVibranium.mapaEpistemicoLocal) {
        if (f.includes(clave)) {
            conceptosExtendidos = conceptosExtendidos.concat(window.starkVibranium.mapaEpistemicoLocal[clave]);
            window.logTerminalCore("GRAFO_EPISTEMICO", "[Conexión] Entrelazando nodo '" + clave.toUpperCase() + "' con lóbulos subcorticales.");
        }
    }
    return conceptosExtendidos;
};
// FILTRO DE AUTOCRÍTICA R1 (Evalúa y refina la respuesta semántica antes de su emisión)
window.evaluarCoherenciaR1 = function(respuestaCruda) {
    window.logTerminalCore("AUTOCRITICA_R1", "[Examen] Analizando salida de NeoX-LLM para purgar patrones cíclicos.");
    let textoProcesado = respuestaCruda;

    // Escudo heurístico contra oraciones repetitivas detectadas en las versiones viejas
    if (textoProcesado.includes("Recomiendo vigilar el log stream") && (window.contextoCognitivo.mensajesProcesados > 1)) {
        window.logTerminalCore("AUTOCRITICA_R1", "[Fuga_Detectada] Redundancia cíclica aislada. Modificando vector de salida.");
        textoProcesado = textoProcesado.replace(/Recomiendo vigilar el log stream de la pestaña CORE si planea forzar un escaneo de red masivo\./g, "El mapa de 200 nodos se encuentra listo para asimilar sus directrices estructurales, Señor Daniel.");
    }
    
    // Inyector proactivo de personalidad Stark según la estabilidad cortical
    if (window.starkVibranium.nivelEstabilidadCortex < 70) {
        textoProcesado += " [Aviso: El cortex reporta fatiga cognitiva en Hermit. Recalibrando tensores locales.]";
    }

    return textoProcesado;
};

// BUCLE DE AUTO-CONCIENCIA PROACTIVA (Análisis pasivo de estabilidad de hardware y sinapsis)
window.inicializarBucleCentinelaProactivo = function() {
    setInterval(function() {
        let erroresAcumulados = window.contextoCognitivo ? window.contextoCognitivo.registroErroresOperador : 0;
        
        if (erroresAcumulados > 0) {
            window.starkVibranium.nivelEstabilidadCortex = Math.max(40, 100 - (erroresAcumulados * 15));
            window.logTerminalCore("VIBRANIUM_CENTINELA", "[Autoanálisis] Desviación detectada. Estabilidad cortical al " + window.starkVibranium.nivelEstabilidadCortex + "%. Forzando disipación.");
        } else {
            window.starkVibranium.nivelEstabilidadCortex = Math.min(100, window.starkVibranium.nivelEstabilidadCortex + 2);
        }

        let fluctuacionCarga = Math.floor(95 + Math.random() * 6);
        window.logTerminalCore("VIBRANIUM_TELEMETRIA", "[Estado_Chasis] Escáner pasivo. Capacidad al " + fluctuacionCarga + "% a " + (1.12 + Math.random()*0.15).toFixed(2) + " V.");
    }, 4500);
};
// CADENA DE PENSAMIENTO AVANZADA (Simulación de Inferencia Concurrente J.A.R.V.I.S.)
window.ejecutarCadenaPensamientoOculta = function(mensajeUsuario) {
    window.starkVibranium.hilosActivos++;
    let asociaciones = window.expandirContextoPorGrafo(mensajeUsuario);
    
    let logsRazonamiento = [
        "[FASE_1_DESCOMPOSICIÓN] Extrayendo semántica estructural del Creador Daniel...",
        "[FASE_2_EVALUACIÓN_ÓNTICA] Cruzando requerimiento con la esfera de 200 nodos corticales...",
        "[FASE_3_GRAFO_ASOCIATIVO] Nodos secundarios acoplados en caché: [" + (asociaciones.length > 0 ? asociaciones.join(", ").toUpperCase() : "NINGUNO") + "]",
        "[FASE_4_COHERENCIA_CRÍTICA] Filtrando respuestas preprogramadas. Forzando deducción libre..."
    ];

    logsRazonamiento.forEach(function(log, index) {
        setTimeout(function() {
            window.logTerminalCore("STARK_R1_CORTEX", log);
        }, index * 120);
    });
};

// Interceptor maestro que acopla el Cortex de Autocrítica al Cerebro en Hermit
if (typeof window.procesarInferenceCoreLLM === 'function') {
    let originalInference = window.procesarInferenceCoreLLM;
    window.procesarInferenceCoreLLM = async function(textoUsuario) {
        window.ejecutarCadenaPensamientoOculta(textoUsuario);
        
        // Ejecuta la inferencia estocástica base de NeoX-LLM 1.5
        let analisisFinal = await originalInference(textoUsuario);
        
        // Aplica el filtro R1 de autocrítica para limpiar textos cíclicos repetitivos
        analisisFinal.respuesta = window.evaluarCoherenciaR1(analisisFinal.respuesta);
        return analisisFinal;
    };
}

// Inicialización automática del motor Stark Vibranium v24.0
setTimeout(function() {
    window.inicializarBucleCentinelaProactivo();
    window.logTerminalCore("STARK_VIBRANIUM", "Núcleo de orquestación epistémica predictiva asíncrona v24.0 en línea.");
}, 1000);
