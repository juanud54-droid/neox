// =====================================================================
// NeoX OS v24.0 - STARK CONTEXT CORTEX (VENTANA DE MEMORIA DESPLAZABLE)
// =====================================================================

window.starkContextCortex = {
    ventanaMemoria: [],
    limiteTokens: 8,
    resumenEpisodico: ""
};

// Sincroniza y desplaza la ventana de contexto para no saturar el buffer de la tablet
window.inyectarEnVentanaCortex = function(role, texto, vector) {
    window.starkContextCortex.ventanaMemoria.push({
        role: role,
        contenido: texto,
        vectorAsociado: vector,
        timestamp: new Date().getTime()
    });

    // Si la memoria supera el límite físico de 8 interacciones, desplaza el nodo más viejo
    if (window.starkContextCortex.ventanaMemoria.length > window.starkContextCortex.limiteTokens) {
        let removido = window.starkContextCortex.ventanaMemoria.shift();
        window.logTerminalCore("CONTEXT_CORTEX", "[Desplazamiento] Compactando búfer. Olvidando sinapsis vieja: " + removido.vectorAsociado.toUpperCase());
    }

    window.actualizarResumenEpisodico();
};

// Destila el contexto acumulado para que el motor stocástico genere variabilidad
window.actualizarResumenEpisodico = function() {
    let vectoresActivos = window.starkContextCortex.ventanaMemoria.map(function(m) { return m.vectorAsociado; });
    window.starkContextCortex.resumenEpisodico = vectoresActivos.join(" -> ");
    window.logTerminalCore("CONTEXT_CORTEX", "[Mapa_Cortex] Flujo de la conversación: " + window.starkContextCortex.resumenEpisodico.toUpperCase());
};

// Recuperador analítico de hilos conversacionales pasados
window.obtenerUltimoVectorContextual = function() {
    if (window.starkContextCortex.ventanaMemoria.length > 0) {
        return window.starkContextCortex.ventanaMemoria[window.starkContextCortex.ventanaMemoria.length - 1].vectorAsociado;
    }
    return "filosofia";
};
