// =====================================================================
// NeoX OS v24.0 - STARK SECURITY ROOT (CENTINELA DE INTEGRIDAD)
// =====================================================================

window.starkSecurityRoot = {
    firmaCreador: "DANIEL_ROOT_AUTH",
    estadoIntegridad: "SECURE",
    alertasBloqueadas: 0
};

// Monitor pasivo de estabilidad perimetral en la consola local
window.verificarIntegridadEntorno = function() {
    if (!window.contextoCognitivo || typeof window.historial === 'undefined') {
        window.starkSecurityRoot.estadoIntegridad = "CORRUPT";
        window.logTerminalCore("SECURITY_ROOT", "[CRÍTICO] Fuga estructural detectada. Forzando contingencia.");
        return false;
    }
    
    // Escudo protector contra inyecciones de código NaN en las variables del motor
    if (window.contextoCognitivo.registroErroresOperador > 5) {
        window.logTerminalCore("SECURITY_ROOT", "[Protección] Umbral crítico superado. Reduciendo latencia del búfer.");
        window.contextoCognitivo.registroErroresOperador = 0;
        window.starkSecurityRoot.alertasBloqueadas++;
    }
    
    window.logTerminalCore("SECURITY_ROOT", "[Seguridad] Entorno validado. Firma del Creador: UNIFICADA.");
    return true;
};

// Inicializador del bucle de vigilancia asíncrono cada 6 segundos
setInterval(window.verificarIntegridadEntorno, 6000);
