const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('DuckieDuck Pro Backend funcionando al 100% 🦆');
});

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.status(400).json({ error: 'Falta el mensaje' });
    }

    const aiReply = `Entendido pariente, procesando tu solicitud en Render para Duckie Guai-fai'v: "${userMessage}"`;

    res.json({ reply: aiReply });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});