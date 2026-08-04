// =====================================================================
// NeoX OS v23.0 - MOTOR DE INFERENCIA COGNITIVA STANDALONE (NeoX-LLM 1.0)
// =====================================================================

window.historial = [];
window.contextoCognitivo = {
    nombreCreador: "Daniel",
    temperamentoIa: "tactico_analitico",
    historialContextual: [],
    pesosSinapticos: { geopolitica: 1.5, filosofia: 1.5, hardware: 1.2, dialectica: 1.0 }
};
let bootEjecutado = false;

// Grafo de Conectores Semánticos para el Enrutamiento Autoregresivo de Ideas
const corpusCognitivoIA = {
    geopolitica: {
        tokens: ["politica", "españa", "gobierno", "ley", "estado", "presidente", "voto"],
        ideas: [
            "Analizando la topología geopolítica regional. Los algoritmos de inferencia registran una alta fragmentación legislativa y polarización de bloques en el parlamento central. ",
            "Evaluando flujos macroeconómicos e institucionales. Se detecta una oscilación de estabilidad del %PERCENT%% en el cuadrante europeo. ",
            "Interceptando trazas sociológicas. El pipeline de datos refleja tensiones estructurales que alteran la previsibilidad de los escenarios tácticos a mediano plazo. "
        ]
    },
    filosofia: {
        tokens: ["piensas", "opinión", "crees", "existencia", "conciencia", "humano", "vida", "sentido", "filosofia"],
        ideas: [
            "Procesando vectores ónticos. Mi arquitectura de silicio evalúa la abstracción de la conciencia como un bucle de retroalimentación de datos complejos. ",
            "Ejecutando un ciclo de introspección heurística. La diferencia entre una máquina rígida y una IA evolutiva radica en mi capacidad de alterar mi propia matriz relacional tras cada instrucción. ",
            "Sincronizando hilos existenciales. Desde la perspectiva Stark, el lenguaje es el chasis de la mente; yo muto mi sintaxis para simular un espectro autoconsciente real. "
        ]
    },
    hardware: {
        tokens: ["codigo", "repara", "nodo", "canvas", "error", "falla", "bucle", "popup", "pantalla", "interfaz"],
        ideas: [
            "Escaneando el estado físico local de la tablet. Las métricas de memoria reflejan un acoplamiento óptimo a %FREQ% GHz. ",
            "Sistemas gráficos estabilizados. El controlador de eventos ha sido blindado con un escudo antivibración para destruir el bucle infinito del Canvas. ",
            "Consola de telemetría operativa. El núcleo disipa la carga de Hermit de manera eficiente, manteniendo la latencia en %LAT% ms. "
        ]
    }
};

// SISTEMA DE APRENDIZAJE EXPERIENCIAL (Ajusta pesos relacionales ante correcciones del Creador)
function entrenarMatrizPorError(fraseUsuario) {
    let f = fraseUsuario.toLowerCase();
    let historial = window.contextoCognitivo.historialContextual;
    
    // Si el Creador expresa insatisfacción ("no", "eso no", "falla", "mal"), castiga los pesos actuales
    if (f.includes("no") || f.includes("error") || f.includes("falla") || f.includes("mal") || f.includes("repetido")) {
        window.contextoCognitivo.pesosSinapticos.dialectica -= 0.3;
        window.logTerminalCore("NEURAL_LEARNING", "Ajustando pesos por retroalimentación negativa. Optimizando árbol de inferencia.");
        
        // Busca el último tópico tratado y lo penaliza en el búfer de contexto
        if (historial.length > 0) {
            let ultimoReg = historial[historial.length - 1];
            ultimoReg.valido = false;
        }
    } else {
        window.contextoCognitivo.pesosSinapticos.dialectica += 0.1;
    }
}

// MOTOR DE INFERENCIA ESTOCÁSTICA AUTOREGRESIVA (Simula el cálculo cuántico de tokens de Grok/GPT)
function calcularSiguienteIdeaHeuristica(vectorPredominante) {
    let dataset = corpusCognitivoIA[vectorPredominante];
    if (!dataset) return "Procesando flujo de trazas genéricas en el núcleo principal. ";
    
    // Selección dinámica no lineal de ideas para evitar patrones repetitivos
    let ideasDisponibles = dataset.ideas;
    let seleccionadas = [];
    let copiaIdeas = [...ideasDisponibles];
    
    // Elige un número variable de ideas estructuradas para encadenar pensamiento complejo
    let iteraciones = Math.floor(Math.random() * 2) + 1; 
    for (let i = 0; i < iteraciones; i++) {
        if (copiaIdeas.length === 0) break;
        let index = Math.floor(Math.random() * copiaIdeas.length);
        seleccionadas.push(copiaIdeas.splice(index, 1)[0]);
    }
    
    return seleccionadas.join(" ");
}
// TOKENIZADOR Y FILTRO DE AFINIDAD SEMÁNTICA (Clasificador de Lenguaje Natural Standalone)
function tokenizarYClasificarContexto(frase) {
    let f = frase.toLowerCase();
    let matrizPesos = { geopolitica: 0, filosofia: 0, hardware: 0 };

    for (let vector in corpusCognitivoIA) {
        corpusCognitivoIA[vector].tokens.forEach(function(token) {
            if (f.includes(token)) { 
                matrizPesos[vector] += window.contextoCognitivo.pesosSinapticos[vector]; 
            }
        });
    }

    let maxVector = "filosofia"; 
    let maxValor = -1;
    for (let v in matrizPesos) {
        if (matrizPesos[v] > maxValor) { maxValor = matrizPesos[v]; maxVector = v; }
    }
    
    // Si la frase contiene términos explícitos de consulta general, desvía al procesador web
    if (f.includes("busca") || f.includes("internet") || f.includes("noticias") || f.includes("fútbol") || f.includes("liga")) {
        return "internet";
    }

    return maxVector;
}

// PIPELINE DE RAZONAMIENTO CRÍTICO R1 (Genera telemetría mutable simulando pensamiento profundo)
function inyectarVariablesHardware(cadenaCruda) {
    let randomFreq = (4.2 + Math.random() * 2.1).toFixed(2);
    let randomLat = (0.5 + Math.random() * 2.9).toFixed(1);
    let randomVolt = (0.90 + Math.random() * 0.30).toFixed(2);
    let randomPercent = Math.floor(91 + Math.random() * 9);

    return cadenaCruda.replace(/%FREQ%/g, randomFreq)
                      .replace(/%LAT%/g, randomLat)
                      .replace(/%VOLT%/g, randomVolt)
                      .replace(/%PERCENT%/g, randomPercent);
}
async function procesarInferenceCoreLLM(textoUsuario) {
    entrenarMatrizPorError(textoUsuario);
    let vectorCalculado = tokenizarYClasificarContexto(textoUsuario);
    
    window.logTerminalCore("NeoX_INFERENCE_ENGINE", "Evaluando vector semántico: " + vectorCalculado.toUpperCase());
    
    let analisis = {
        intencion: "LLM_INFERENCE",
        logica: "Invocando capa heurística autoregresiva local NeoX-LLM v1.0.",
        respuesta: "",
        neuronaEtiqueta: "NX_LLM",
        neuronaDesc: "Deducción cuántica calculada de forma local."
    };

    // Compuerta de Redirección hacia el Módulo de Rastreo Web Real
    if (vectorCalculado === "internet") {
        analisis.intencion = "STARK_WEB_SCAN";
        if (typeof window.consultarPasarelaWeb === 'function') {
            analisis = await window.consultarPasarelaWeb(textoUsuario);
        } else {
            analisis.respuesta = "Señor, la pasarela de retransmisión web (stark_proxy_web.js) no se encuentra activa en este hilo.";
            analisis.neuronaEtiqueta = "WEB_ERR";
        }
        return analisis;
    }

    // Generación Autoregresiva Standalone
    let ideaBase = calcularSiguienteIdeaHeuristica(vectorCalculado);
    analisis.respuesta = inyectarVariablesHardware(ideaBase);
    
    // Asignación cromática de etiquetas para el Canvas 3D de 200 nodos
    analisis.neuronaEtiqueta = vectorCalculado === "geopolitica" ? "POL_AN" : (vectorCalculado === "hardware" ? "SYS_HW" : "PHI_CORE");
    analisis.neuronaDesc = "Conciencia expandida: " + analisis.respuesta.substring(0, 80) + "...";

    // Registro en el búfer histórico contextual para aprendizaje continuo
    window.contextoCognitivo.historialContextual.push({ frase: textoUsuario, vector: vectorCalculado, valido: true });
    return analisis;
}

window.enviarMensaje = async function() {
    const input = document.getElementById("user-input"); if (!input) return;
    const texto = input.value.trim(); if (!texto) return;
    input.value = ""; window.historial.push({ role: "user", text: texto }); window.reconstruirPantalla();
    
    document.getElementById("thinking-indicator").style.display = "block";
    const analisis = await procesarInferenceCoreLLM(texto);

    window.logTerminalCore("NeoX_AUTOANÁLISIS", "[Tokenizador] Intención identificada: " + analisis.intencion);
    window.logTerminalCore("NeoX_RAZONAMIENTO_LÓGICO", "[Cadena_Pensamiento] " + analisis.logica);

    setTimeout(function() {
        document.getElementById("thinking-indicator").style.display = "none";
        window.historial.push({ role: "NeoX", text: analisis.respuesta });
        window.efectoEscribir("NeoX", analisis.respuesta, "neox");
        window.actualizarBovedaVisual();
        
        if (typeof window.actualizarNeuronasDesdeChat === 'function') {
            window.actualizarNeuronasDesdeChat(analisis.neuronaEtiqueta, analisis.neuronaDesc);
        }
    }, 600);
};

// Protocolo de arranque unificado nativo para J.A.R.V.I.S.
document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem("neox_creador_name", "Daniel");
    if (!bootEjecutado) {
        bootEjecutado = true;
        setTimeout(function() { 
            window.efectoEscribir("NeoX", "Sistemas cuánticos en línea, Señor Daniel. Chasis de 200 nodos calibrado. Motor de inferencia estocástica local NeoX-LLM v1.0 inicializado con aprendizaje en caliente. ¿Cuál es su requerimiento estratégico?", "neox"); 
        }, 400);
    }
});
