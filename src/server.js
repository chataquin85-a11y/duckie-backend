const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa el cliente usando la variable de entorno que ya pusiste en Render
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('DuckieDuck Pro Backend funcionando al 100% 🚀');
});

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ error: 'Falta el mensaje' });
        }

        // Llamada oficial y fluida a la API de Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-1.5',
            contents: userMessage,
            config: {
                systemInstruction: "Eres Duckie Guai-fai'v, un asistente digital y wingman con un tono empático, cálido y amigable."
            }
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Error al conectar con Gemini:", error);
        res.status(500).json({ error: 'Error interno del servidor al procesar la IA' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
