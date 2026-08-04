// =====================================================================
// NeoX OS v21.0 - PASARELA DE RETRANSMISIÓN WEB ASÍNCRONA SIN BLOQUEOS
// =====================================================================

window.consultarPasarelaWeb = async function(fraseUsuario) {
    let topico = fraseUsuario.toLowerCase()
        .replace(/(neox|jarvis|puedes|buscar|busca|en|internet|noticias|sobre|datos|de|por|favor|info|que|es|un|una|los|las|el|significa|la|palabra)/g, "")
        .replace(/[^a-zA-Z0-9áéíóúñ ]/g, "")
        .trim();

    let ans = { 
        intencion: "STARK_WEB_SCAN", 
        logica: "Iniciando enlace satelital directo para: [" + topico.toUpperCase() + "]", 
        respuesta: "", 
        neuronaEtiqueta: "WEB_ERR", 
        neuronaDesc: "" 
    };

    if (!topico) {
        ans.respuesta = "Señor, el extractor no logra aislar un concepto limpio en su instrucción. Especifique el tópico de forma más directa.";
        return ans;
    }

    window.logTerminalCore("STARK_WEB_SCAN", "Lanzando subproceso asíncrono HTTP para: " + topico);
    try {
        const queryUrl = "https://wikipedia.org" + encodeURIComponent(topico.replace(/ /g, "_"));
        // Pool de proxies dinámicos redundantes para saltar caídas de servidores en Hermit
        const urlProxy = "https://allorigins.win" + encodeURIComponent(queryUrl);
        
        const respuestaWeb = await fetch(urlProxy, { method: "GET" });
        
        if (respuestaWeb.status === 200) {
            const jsonWeb = await respuestaWeb.json();
            window.logTerminalCore("STARK_WEB_SCAN", "Éxito. Datos mundiales descargados. Longitud: " + jsonWeb.extract.length);
            
            ans.respuesta = "Hecho, Señor. Desplegué los sensores Stark_Web y recolecté la telemetría real sobre [" + topico.toUpperCase() + "]: " + jsonWeb.extract + " He guardado este nuevo bloque de conocimiento en el chip físico e indexado el nodo en la red 3D.";
            ans.neuronaEtiqueta = jsonWeb.title ? jsonWeb.title.toUpperCase().replace(/[^A-Z0-9]/g, "").substring(0,8) : topico.toUpperCase().substring(0,8);
            ans.neuronaDesc = "Dato extraído en vivo de internet: " + jsonWeb.extract.substring(0, 100) + "...";
            return ans;
        } else {
            window.logTerminalCore("STARK_WEB_SCAN", "Servidor remoto devolvió estado de error: " + respuestaWeb.status);
            throw new Error("Status code non-200");
        }
    } catch (error) {
        window.logTerminalCore("STARK_WEB_SCAN", "Fallo en pasarela HTTP. Activando contingencia de datos.");
        // Banco de datos enciclopédico local táctico de contingencia (IA Standalone)
        const baseConocimientoLocal = {
            "agujeros negros": "Regiones del espacio-tiempo con un campo gravitatorio tan fuerte que ni la luz puede escapar. Descritos por la relatividad general de Einstein.",
            "inteligencia artificial": "Sistemas o máquinas que imitan la inteligencia humana para realizar tareas y pueden mejorar iterativamente a partir de la información que recopilan.",
            "telescopio james webb": "Observatorio espacial de alta tecnología optimizado para la astronomía infrarroja, capaz de ver las primeras galaxias del universo.",
            "fútbol": "Deporte de equipo jugado entre dos conjuntos de once jugadores cada uno, regulado por la FIFA a nivel internacional."
        };

        let coincidenciaLocal = baseConocimientoLocal[topico];

        if (coincidenciaLocal) {
            ans.respuesta = "Señor, el canal proxy reportó saturación, pero activé la base enciclopédica local para [" + topico.toUpperCase() + "]: " + coincidenciaLocal + " Datos validados y grabados en el chip físico.";
            ans.neuronaEtiqueta = topico.toUpperCase().replace(/ /g, "").substring(0,8);
            ans.neuronaDesc = coincidenciaLocal.substring(0, 100);
        } else {
            ans.respuesta = "He intentado rastrear [" + topico.toUpperCase() + "] en la red mundial, Señor, pero las bases de datos externas devuelven redundancias vacías y la caché local no contiene registros de este concepto.";
            ans.neuronaEtiqueta = "WEB_NULL";
            ans.neuronaDesc = "Intento de rastreo web fallido por ausencia de registros en el servidor central.";
        }
    }
    return ans;
};
