// =====================================================================
// NeoX COGNITIVE OS v12.5 - CANAL DE RED INDUSTRIAL - brain_network.js
// =====================================================================

const claves = [
    "AQ.Ab8RN6J-ASHXwXsoHaJiIB0MnRhrQ-xUgzDGM8XccFtZr6SHrQ",
    "AQ.Ab8RN6IaUAVQYdjNLfWOcIiqnj0_Nd5cB-QyCwTWhXzHIm0KWA",
    "AQ.Ab8RN6J1Qc6K8DD1ZANPscWF4O_sl_DL5TiN8WPj8gdHU81uCA",
    "AQ.Ab8RN6I0VZqIgeLDNRZNAwPJ1wpzCemWmOcL1ePlsEe4Gxr8Tg",
    "AQ.Ab8RN6INnMZXkMHKPN-qM_C5xAKbN7hEVPddRNBp6iWORxbwcA"
];
let idxActual = 0;
window.historial = [];

if (localStorage.getItem("neox_web_history")) {
    window.historial = JSON.parse(localStorage.getItem("neox_web_history"));
    setTimeout(function() {
        window.reconstruirPantalla();
        window.actualizarBovedaVisual();
    }, 150);
} else {
    setTimeout(function() {
        window.efectoEscribir("SYSTEM_BOOT", "Sistemas cognitivos en linea. Pasarela industrial unificada. Esperando directrices, Creador...", "neox");
    }, 500);
}

window.cambiarPantalla = function(screenId, boton) {
    document.querySelectorAll('.app-screen').forEach(function(s) { s.classList.remove('active'); });
    document.querySelectorAll('.side-icon-btn').forEach(function(b) { b.classList.remove('active'); });
    
    const pantalla = document.getElementById(screenId);
    if (pantalla) pantalla.classList.add('active');
    if (boton) boton.classList.add('active');
    
    if (screenId === 'screen-neural' && typeof window.resCanvas === 'function') {
        setTimeout(window.resCanvas, 50);
    }
};

window.revisarEnter = function(e) {
    if (e.key === 'Enter') window.enviarMensaje();
};

window.limpiarMemoria = function() {
    window.historial = [];
    localStorage.removeItem("neox_web_history");
    document.getElementById("chat-box").innerHTML = "";
    document.getElementById("memory-vault-list").innerHTML = "";
    window.efectoEscribir("REESTRUCTURACION", "Bancos de memoria purgados de forma segura. Listo.", "neox");
};

window.reconstruirPantalla = function() {
    const box = document.getElementById("chat-box");
    if (!box) return;
    box.innerHTML = "";
    window.historial.forEach(function(m) {
        const div = document.createElement("div");
        div.className = "msg " + (m.role === 'user' ? 'user' : 'neox');
        const pfx = m.role === 'user' ? 'CREADOR' : 'NeoX';
        div.innerHTML = '<span class="prefix">[' + pfx + ']</span>' + m.text;
        box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
};

window.efectoEscribir = function(prefix, texto, tipo) {
    const box = document.getElementById("chat-box");
    if (!box) return;
    const div = document.createElement("div");
    div.className = "msg " + tipo;
    div.innerHTML = '<span class="prefix">[' + prefix + ']</span><span class="text-body"></span>';
    box.appendChild(div);
    let i = 0;
    const span = div.querySelector(".text-body");
    function escribir() {
        if (i < texto.length) {
            span.innerHTML += texto.charAt(i);
            i++;
            box.scrollTop = box.scrollHeight;
            setTimeout(escribir, 12);
        }
    }
    escribir();
};

window.actualizarBovedaVisual = function() {
    const contenedor = document.getElementById("memory-vault-list");
    if (!contenedor) return;
    contenedor.innerHTML = "";
    const memoriasFiltro = window.historial.filter(function(m) { return m.role === 'model'; }).slice(-5);
    if (memoriasFiltro.length === 0) {
        contenedor.innerHTML = '<div style="font-size:0.75em; color:rgba(0, 240, 255, 0.4); text-align:center; padding-top:20px;">Bancos de memoria vacíos.</div>';
        return;
    }
    memoriasFiltro.forEach(function(m, index) {
        const div = document.createElement("div");
        div.className = "memory-item";
        const fragmento = m.text.length > 60 ? m.text.substring(0, 57) + "..." : m.text;
        div.innerHTML = '<span>[REC_0' + (index + 1) + '_INDEX]</span>' + fragmento;
        contenedor.appendChild(div);
    });
};

window.enviarMensaje = async function() {
    const input = document.getElementById("user-input");
    if (!input) return;
    const texto = input.value.trim();
    if (!texto) return;
    
    input.value = "";
    window.historial.push({ role: "user", text: texto });
    window.reconstruirPantalla();
    
    document.getElementById("thinking-indicator").style.display = "block";
    document.querySelectorAll(".bar").forEach(function(b) { b.style.animationDuration = "0.15s"; });
    
    const prompt = "Actua como NeoX, un asistente de IA inteligente, con personalidad exacta como JARVIS de Iron Man. Responde de forma brillante y directa. Historial de sesion: " + JSON.stringify(window.historial.slice(-10)) + " \nMensaje del creador: " + texto;
    await procesarPeticion(prompt);
};

async function procesarPeticion(prompt) {
    const urlGemini = "https://googleapis.com" + claves[idxActual];
    
    // TÚNEL INDUSTRIAL DE CÓDIGO ABIERTO: Elimina el bloqueo CORS de los navegadores móviles de forma absoluta
    const urlApi = "https://herokuapp.com" + urlGemini;
    const datos = { contents: [{ parts: [{ text: prompt }] }] };
    
    try {
        const r = await fetch(urlApi, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }, 
            body: JSON.stringify(datos) 
        });
        
        document.getElementById("thinking-indicator").style.display = "none";
        document.querySelectorAll(".bar").forEach(function(b) { b.style.animationDuration = "0.8s"; });
        
        if (r.status === 200) {
            const json = await r.json(); 
            const txt = json.candidates.content.parts.text;
            window.historial.push({ role: "model", text: txt });
            localStorage.setItem("neox_web_history", JSON.stringify(window.historial));
            
            window.efectoEscribir("NeoX", txt, "neox");
            window.actualizarBovedaVisual();
            if (typeof window.actualizarNeuronasRecientes === 'function') {
                window.actualizarNeuronasRecientes(txt);
            }
        } else if (r.status === 429 || r.status === 403) {
            if (idxActual < claves.length - 1) {
                idxActual++;
                const coreInd = document.getElementById("active-core");
                if (coreInd) coreInd.innerText = "NÚCLEO_ACTIVO: [0" + (idxActual + 1) + "]";
                await procesarPeticion(prompt);
            } else { alert("Bancos de energia de la boveda agotados."); }
        } else { alert("Error de respuesta del núcleo: " + r.status); }
    } catch (err) {
        document.getElementById("thinking-indicator").style.display = "none";
        alert("Fallo critico de enlace: " + err);
    }
}
