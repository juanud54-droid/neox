// =====================================================================
// NeoX STARK OS v16.5 - PLUGIN DE RASTREO SATELITAL - stark_proxy_web.js
// =====================================================================

// FILTRO EXTRACTOR DE TÓPICOS MEJORADO STARK
window.extraerTopicoBusqueda = function(frase) {
    return frase
        .replace(/(neox|jarvis|puedes|buscar|busca|en|internet|noticias|sobre|datos|de|por|favor|info|informacion|que|es|un|una|los|las|el)/g, "")
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "")
        .trim();
};

// MOTOR DE CONEXIÓN EN PARALELO INMUNE A BLOQUEOS CORS
window.consultarInternetReal = async function(topico) {
    if (!topico) return null;
    
    // Convertir espacios en guiones bajos para el formato de servidores de conocimiento
    const queryUrl = "https://wikipedia.org" + encodeURIComponent(topico.replace(/ /g, "_"));
    
    // PASARELA SATELITAL POR ENTRADA DE PETICION "GET" PURA (Sálta el CORS móvil al 100%)
    const urlProxy = "https://allorigins.win" + encodeURIComponent(queryUrl);
    
    if (typeof window.logTerminalCore === 'function') {
        window.logTerminalCore("STARK_WEB_SCAN", "Desviando tráfico de forma segura a través de pasarela de retransmisión GET...");
    }
    
    try {
        const respuesta = await fetch(urlProxy, { method: "GET" });
        if (respuesta.status === 200) {
            const dataJson = await respuesta.json();
            if (dataJson && dataJson.extract) {
                return {
                    exito: true,
                    extracto: dataJson.extract,
                    titulo: dataJson.title || topico.toUpperCase()
                };
            }
        }
        return { exito: false, motivo: "Código de respuesta: " + respuesta.status };
    } catch (error) {
        return { exito: false, motivo: error.toString() };
    }
};
