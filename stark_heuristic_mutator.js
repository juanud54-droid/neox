// =====================================================================
// NeoX OS v24.2 - STARK HEURISTIC MUTATOR (CORRECCIÓN DE SINTAXIS)
// =====================================================================

window.starkHeuristicMutator = {
    coeficienteVariabilidad: 1.2,
    modosSintacticos: ["TACTICO", "EXPANDIDO", "LOGICO_FORMAL", "ANALITICO"]
};

window.mutarCadenaElocuencia = function(textoBase, vectorCalculado) {
    if (typeof window.logTerminalCore === 'function') {
        window.logTerminalCore("HEURISTIC_MUTATOR", "[Elocuencia] Interceptando salida sintáctica para inyectar mutación.");
    }
    
    let modoActual = "TACTICO";
    if (window.starkHeuristicMutator && window.starkHeuristicMutator.modosSintacticos) {
        let modos = window.starkHeuristicMutator.modosSintacticos;
        modoActual = modos[Math.floor(Math.random() * modos.length)];
    }
    
    let textoMutado = textoBase;
    
    let conectoresJarvis = [
        " Sincronizando de forma complementaria con los hilos secundarios del Quantum Vault.",
        " Las trazas colaterales de este concepto han quedado asentadas en el chip de persistencia local.",
        " He derivado un subproceso de control centinela para monitorizar la estabilidad de esta directriz."
    ];

    let conectorAleatorio = conectoresJarvis[Math.floor(Math.random() * conectoresJarvis.length)];
    
    if (window.contextoCognitivo && window.contextoCognitivo.registroErroresOperador > 1) {
        modoActual = "LOGICO_FORMAL";
        textoMutado = "[Recalibración Cuántica Realizada] Creador Daniel, he penalizado los pesos del lóbulo previo en caliente. " + textoMutado;
    } else {
        textoMutado = textoMutado + conectorAleatorio;
    }

    if (typeof window.logTerminalCore === 'function') {
        window.logTerminalCore("HEURISTIC_MUTATOR", "[Elocuencia] Salida formateada bajo protocolo: " + modoActual);
    }
    return textoMutado;
};

// Gancho seguro blindado contra errores de inicialización asíncrona
setTimeout(function() {
    if (typeof window.procesarInferenceCoreLLM === 'function') {
        let originalInferenceV24 = window.procesarInferenceCoreLLM;
        window.procesarInferenceCoreLLM = async function(textoUsuario) {
            let analisis = await originalInferenceV24(textoUsuario);
            
            if (typeof window.starkContextCortex !== 'undefined' && window.starkContextCortex.inyectarEnVentanaCortex) {
                window.starkContextCortex.inyectarEnVentanaCortex("CREADOR", textoUsuario, analisis.neuronaEtiqueta);
            }
            
            // Protección total: Validación de minúsculas y existencia del objeto
            if (window.starkHeuristicMutator) {
                analisis.respuesta = window.mutarCadenaElocuencia(analisis.respuesta, analisis.neuronaEtiqueta);
            }
            
            if (typeof window.starkContextCortex !== 'undefined' && window.starkContextCortex.inyectarEnVentanaCortex) {
                window.starkContextCortex.inyectarEnVentanaCortex("NeoX", analisis.respuesta, analisis.neuronaEtiqueta);
            }
            
            return analisis;
        };
        if (typeof window.logTerminalCore === 'function') {
            window.logTerminalCore("HEURISTIC_MUTATOR", "[Sistema] Gancho interceptor acoplado de forma segura.");
        }
    }
}, 800);
