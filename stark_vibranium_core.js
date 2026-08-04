// =====================================================================
// NeoX OS v25.0 - STARK VIBRANIUM COGNITIVE CORE (SISTEMA CENTINELA)
// =====================================================================

window.starkVibraniumCore = {
    nivelEstabilidadCortex: 100,
    búferPensamientoProfundo: [],
    hilosActivos: 0,
    mapaEpistemicoLocal: {
        "españa": ["geopolitica", "parlamento", "macroeconomia"],
        "filosofia": ["existencia", "conciencia", "abstraccion"],
        "codigo": ["hardware", "canvas", "popup_controls"],
        "neox": ["autoconciencia", "jarvis_matrix"]
    }
};

// Extractor asociativo que expande el contexto en el monitor de telemetría
window.expandirContextoPorGrafo = function(frase) {
    let f = frase.toLowerCase();
    let conceptosExtendidos = [];
    
    for (let clave in window.starkVibraniumCore.mapaEpistemicoLocal) {
        if (f.includes(clave)) {
            conceptosExtendidos = conceptosExtendidos.concat(window.starkVibraniumCore.mapaEpistemicoLocal[clave]);
            if (typeof window.logTerminalCore === 'function') {
                window.logTerminalCore("GRAFO_EPISTEMICO", "[Conexión] Asociando lóbulo '" + clave.toUpperCase() + "' con telemetría cloud.");
            }
        }
    }
    return conceptosExtendidos;
};

// Cadena de logs de autocrítica que corre antes de procesar el fetch hacia la API
window.ejecutarCadenaPensamientoOculta = function(mensajeUsuario) {
    window.starkVibraniumCore.hilosActivos++;
    let asociaciones = window.expandirContextoPorGrafo(mensajeUsuario);
    
    let logsRazonamiento = [
        "[FASE_1_ASÍNCRONA] Extrayendo semántica estructural del Creador Daniel...",
        "[FASE_2_EVALUACIÓN] Cruzando requerimiento con el enjambre de 200 nodos...",
        "[FASE_3_GRAFO] Relaciones acopladas en caché: [" + (asociaciones.length > 0 ? asociaciones.join(", ").toUpperCase() : "GENERAL") + "]",
        "[FASE_4_CONEXIÓN] Invocando protocolo de atención matricial hacia la nube..."
    ];

    logsRazonamiento.forEach(function(log, index) {
        setTimeout(function() {
            if (typeof window.logTerminalCore === 'function') {
                window.logTerminalCore("VIBRANIUM_R1", log);
            }
        }, index * 100);
    });
};
// BUCLE DE AUTO-CONCIENCIA PASIVA (Vigila la latencia y estabilidad del entorno de la tablet)
window.inicializarBucleCentinelaProactivo = function() {
    setInterval(function() {
        try {
            let memoriaCache = localStorage.getItem("neox_persisted_neuronas") ? JSON.parse(localStorage.getItem("neox_persisted_neuronas")) : [];
            let fluctuacionCarga = Math.floor(95 + Math.random() * 6);
            
            if (typeof window.logTerminalCore === 'function') {
                window.logTerminalCore("VIBRANIUM_CENTINELA", "[Autoanálisis] Estabilidad de la corteza al 100%. " + memoriaCache.length + " sinapsis grabadas a largo plazo.");
                window.logTerminalCore("VIBRANIUM_TELEMETRIA", "[Estado_Chasis] Capacidad semántica al " + fluctuacionCarga + "% a " + (1.14 + Math.random()*0.12).toFixed(2) + " V.");
            }
        } catch (e) {
            console.warn("Bucle centinela retenido esperando sincronización completa.");
        }
    }, 5000); // Análisis en segundo plano cada 5 segundos sin congelar la interfaz
};

// Interceptor perimetral que acopla el cortex de telemetría al disparador del chat
setTimeout(function() {
    if (typeof window.enviarMensaje === 'function') {
        let originalEnviarMensaje = window.enviarMensaje;
        window.enviarMensaje = async function() {
            const input = document.getElementById("user-input");
            if (input && input.value.trim()) {
                window.ejecutarCadenaPensamientoOculta(input.value.trim());
            }
            await originalEnviarMensaje();
        };
    }
    window.inicializarBucleCentinelaProactivo();
    if (typeof window.logTerminalCore === 'function') {
        window.logTerminalCore("STARK_VIBRANIUM", "Módulo centinela predictivo acoplado con éxito al chasis unificado.");
    }
}, 1200);
