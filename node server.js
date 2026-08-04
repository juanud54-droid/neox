// =====================================================================
// NeoX OS v25.8 - SERVIDOR PROXY INTERMEDIO DE RED (STARK_LINK v1.0)
// =====================================================================
// Para correrlo en tu entorno local: npm install express cors node-fetch && node server.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Configuración de blindaje total contra bloqueos CORS de Google Chrome
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/status', (req, res) => {
    res.json({ status: "ONLINE", core: "STARK_LINK_PROXY", timestamp: new Date().getTime() });
});
// ENDPOINT CRÍTICO: Canaliza las peticiones de la tablet evadiendo el CORS corporativo
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        // Enlace seguro con el clúster cuántico de OpenRouter utilizando Llama 3.1 70B
        const response = await fetch("https://openrouter.ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.1-70b-instruct:free",
                messages: messages,
                temperature: 0.8,
                max_tokens: 450
            })
        });

        if (!response.ok) throw new Error("Fallo de comunicación en el satélite externo.");
        
        const data = await response.json();
        const textoIA = data.choices[0].message.content;
        
        // Retornamos el conocimiento purificado de vuelta al chasis visual
        res.json({ success: true, response: textoIA });

    } catch (error) {
        console.error("[PROXY_ERR] Error en pasarela:", error);
        res.status(500).json({ 
            success: false, 
            response: "Señor Daniel, el puente de red intermedio detectó un fallo crítico de sincronización con la nube. Evaluando contingencia." 
        });
    }
});

// Inicialización del chasis del servidor en el puerto local
app.listen(PORT, () => {
    console.log(`\n=====================================================================`);
    console.log(` NeoX OS - PROXY SERVIDOR STARK_LINK ACTIVO EN PUERTO: ${PORT}`);
    console.log(` Inferencia masiva Llama-3.1-70B lista para canalizar.`);
    console.log(`=====================================================================\n`);
});
