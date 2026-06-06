const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes'); // Importa as rotas

app.use(cors({
  origin: 'http://localhost:3001' 
})); // Habilita CORS para todas as rotas
app.use(express.json()); // Middleware para parsear JSON
app.use(routes); // Usa as rotas definidas

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});