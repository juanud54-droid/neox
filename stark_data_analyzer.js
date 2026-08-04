// =====================================================================
// NeoX OS v24.0 - STARK DATA ANALYZER (MOTOR ESTADÍSTICO DE TRAZAS)
// =====================================================================

window.starkDataAnalyzer = {
    totalCaracteresProcesados: 0,
    ratioCompresionMemoria: 100,
    densidadTokensFrase: 0,
    indiceElocuenciaIA: 1.0
};

// Algoritmo matemático real que desglosa el rendimiento analítico de la sesión
window.calcularMetricasMatematicasReales = function(textoUsuario, respuestaIa) {
    window.logTerminalCore("DATA_ANALYZER", "[Métricas] Calculando rendimiento sintáctico en vivo.");

    // Cálculo real de la densidad de tokens (palabras aproximadas)
    let palabrasUsuario = textoUsuario.split(" ").length;
    let palabrasIa = respuestaIa.split(" ").length;
    window.starkDataAnalyzer.densidadTokensFrase = Math.round((palabrasUsuario + palabrasIa) / 2);

    // Medidor de elocuencia según la riqueza sintáctica de la respuesta de NeoX-LLM
    window.starkDataAnalyzer.totalCaracteresProcesados += respuestaIa.length;
    window.starkDataAnalyzer.indiceElocuenciaIA = (respuestaIa.length / (textoUsuario.length || 1)).toFixed(2);

    // Ratio de compresión ficticio pero acoplado a la longitud de los registros del localStorage
    let memoriaLocal = localStorage.getItem("neox_persisted_neuronas") ? localStorage.getItem("neox_persisted_neuronas").length : 0;
    window.starkDataAnalyzer.ratioCompresionMemoria = Math.max(15, 100 - Math.floor(memoriaLocal / 150));

    // Sincronización forzada directa con los componentes del HUD de la pantalla BRAIN
    window.actualizarGraficosHudReales();
};
// Inyector matemático que alimenta el ecualizador y los porcentajes del HUD
window.actualizarGraficosHudReales = function() {
    const loadPct = document.getElementById("load-percentage");
    const activeCore = document.getElementById("active-core");
    const brainBars = document.querySelectorAll("#brain-activity .bar");

    // Sincroniza el porcentaje principal con el ratio de compresión de memoria real
    if (loadPct) {
        loadPct.innerText = window.starkDataAnalyzer.ratioCompresionMemoria + "%";
        window.logTerminalCore("DATA_ANALYZER", "[HUD_Sync] Ratio de memoria acoplado al anillo principal.");
    }

    // Inyecta el índice de elocuencia calculado en la etiqueta del núcleo
    if (activeCore) {
        activeCore.innerText = "NÚCLEO: NeoX-LLM v1.5 | ELOCUENCIA: " + window.starkDataAnalyzer.indiceElocuenciaIA + "x";
    }

    // Modula las alturas de las barras del ecualizador según la densidad de tokens reales
    if (brainBars && brainBars.length >= 5) {
        let t = window.starkDataAnalyzer.densidadTokensFrase;
        brainBars[0].style.height = Math.min(100, Math.max(15, t * 2.5)) + "%";
        brainBars[1].style.height = Math.min(100, Math.max(20, t * 1.8)) + "%";
        brainBars[2].style.height = Math.min(100, Math.max(10, t * 3.2)) + "%";
        brainBars[3].style.height = Math.min(100, Math.max(25, t * 1.4)) + "%";
        brainBars[4].style.height = Math.min(100, Math.max(30, t * 2.1)) + "%";
        window.logTerminalCore("DATA_ANALYZER", "[HUD_Sync] Espectro de actividad ecualizado con éxito.");
    }
};

// Gancho cuántico interceptor en el pipeline de ejecución de NeoX-LLM
if (typeof window.procesarInferenceCoreLLM === 'function') {
    let originalInferenceV24_C = window.procesarInferenceCoreLLM;
    window.procesarInferenceCoreLLM = async function(textoUsuario) {
        let ans = await originalInferenceV24_C(textoUsuario);
        
        // Ejecuta el cálculo estadístico inmediatamente después de generar la respuesta
        if (ans && ans.respuesta) {
            window.calcularMetricasMatematicasReales(textoUsuario, ans.respuesta);
        }
        return ans;
    };
}

// Inicialización pasiva del analizador en el HUD
setTimeout(function() {
    window.logTerminalCore("DATA_ANALYZER", "Procesador de trazas estadísticas enlazado y listo para interceptar.");
}, 1200);

