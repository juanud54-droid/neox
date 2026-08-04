// =====================================================================
// NeoX OS v24.0 - STARK QUANTUM MEMORY (CÓRTEX DE REGISTRO PERSISTENTE)
// =====================================================================

window.starkQuantumMemory = {
    bovedaErrores: [],
    preferenciasCreador: { topicosFavoritos: [], temperamentoRequerido: "táctico" },
    historicoSinapsis: []
};

// Indexador de retroalimentación negativa para evitar respuestas repetitivas
window.registrarFalloEnBoveda = function(fraseReproche, ultimoVector) {
    let timestamp = new Date().getTime();
    window.starkQuantumMemory.bovedaErrores.push({
        id: "ERR_" + timestamp,
        vectorPenalizado: ultimoVector,
        huellaFrase: fraseReproche.toLowerCase(),
        timestamp: timestamp
    });
    
    // Almacenamiento físico persistente inmune a reinicios en Hermit
    localStorage.setItem("neox_quantum_errors", JSON.stringify(window.starkQuantumMemory.bovedaErrores));
    window.logTerminalCore("QUANTUM_MEMORY", "[Ajuste] Huella de error indexada para el lóbulo: " + ultimoVector.toUpperCase());
};

// Carga inicial del chip físico de la tablet al encender el chasis
window.cargarBovedaQuantum = function() {
    let datos = localStorage.getItem("neox_quantum_errors");
    if (datos) {
        window.starkQuantumMemory.bovedaErrores = JSON.parse(datos);
        window.logTerminalCore("QUANTUM_MEMORY", "[Sistema] Bóveda de errores cargada con " + window.starkQuantumMemory.bovedaErrores.length + " registros analíticos.");
    }
};

// Escudo preventivo que evalúa si el cerebro está a punto de caer en un bucle lógico
window.validarPrevencionBucle = function(siguienteRespuesta, vectorActual) {
    let fallos = window.starkQuantumMemory.bovedaErrores.filter(function(e) { return e.vectorPenalizado === vectorActual; });
    if (fallos.length > 2 && siguienteRespuesta.includes("Analizando el estado")) {
        window.logTerminalCore("QUANTUM_MEMORY", "[Escudo] Desviando texto preprogramado detectado en base de fallos.");
        return true;
    }
    return false;
};

// Inicialización asíncrona
setTimeout(window.cargarBovedaQuantum, 500);

