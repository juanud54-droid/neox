// =====================================================================
// NeoX OS v24.0 - STARK SYNAPTIC WEIGHT (OPTIMIZADOR DE PLASTICIDAD)
// =====================================================================

window.starkSynapticWeight = {
    tasaPlasticidad: 0.05,
    historicoConsultasNodos: {},
    vectorPredominanteActual: "filosofia"
};

// Modifica la gravedad y distancias físicas de la esfera de 200 nodos según el uso real
window.recalcularPlasticidadRed = function() {
    if (!window.nodos || window.nodos.length === 0) return;
    window.logTerminalCore("SYNAPTIC_WEIGHT", "[Plasticidad] Ejecutando tensor de gravedad sobre los 200 lóbulos lógicos.");

    let mapeoLóbulos = { POL_AN: "geopolitica", PHI_CORE: "filosofia", JARVIS_M: "autoconciencia", SYS_HW: "hardware" };

    window.nodos.forEach(function(n) {
        let vectorAsociado = mapeoLóbulos[n.label] || "neutral";
        
        // Si el lóbulo coincide con lo que el motor piensa, atrae el nodo hacia el centro para mayor velocidad
        if (vectorAsociado === window.starkSynapticWeight.vectorPredominanteActual) {
            n.x *= 0.98;
            n.y *= 0.98;
            n.z *= 0.98;
        } else {
            // Desplaza los nodos inactivos hacia la periferia exterior de la corteza
            let dist = Math.sqrt(n.x*n.x + n.y*n.y + n.z*n.z);
            if (dist < 95) { n.x *= 1.01; n.y *= 1.01; n.z *= 1.01; }
        }
    });
};

// Escucha en segundo plano enganchado al analizador del Cerebro
if (typeof window.procesarInferenceCoreLLM === 'function') {
    let originalInferenceV24_B = window.procesarInferenceCoreLLM;
    window.procesarInferenceCoreLLM = async function(textoUsuario) {
        let ans = await originalInferenceV24_B(textoUsuario);
        if (ans && ans.neuronaEtiqueta) {
            let mapeoLóbulos = { POL_AN: "geopolitica", PHI_CORE: "filosofia", JARVIS_M: "autoconciencia", SYS_HW: "hardware" };
            window.starkSynapticWeight.stark_vector = mapeoLóbulos[ans.neuronaEtiqueta] || "filosofia";
            window.starkSynapticWeight.vectorPredominanteActual = window.starkSynapticWeight.stark_vector;
            window.recalcularPlasticidadRed();
        }
        return ans;
    };
}
