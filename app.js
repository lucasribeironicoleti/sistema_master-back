const express = require('express');
const cors = require('cors');
const pool = require('./db');
const routes = require('./routes');
const app = express();
const PORT = 3001;

// Middlewares: Essenciais para ler JSON e permitir comunicação com o React
app.use(cors()); 
app.use(express.json());

// Usar as rotas
app.use('/api', routes);

// --- ROTA RAIZ (Apenas para testar se o servidor está vivo) ---
app.get('/', (req, res) => {
    res.send("Servidor está rodando!");
});

// Testa conexão com banco de dados
app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ 
            status: 'ok', 
            database: 'connected', 
            timestamp: result.rows[0].now 
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error', 
            database: 'disconnected',
            error: error.message 
        });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
    console.log(`Acesse http://localhost:${PORT} para testar`);
});