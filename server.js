require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Configurações do Express
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // ou 'frontend'

// Conexão com banco de dados
const db = require('./config/db');
db.query('SELECT 1')
  .then(() => console.log('Conectado ao MySQL'))
  .catch(err => {
    console.error('Erro na conexão com MySQL:', err);
    process.exit(1);
  });

// Rotas da API
app.use('/api/auth', require('./Routes/AuthRoutes'));
app.use('/api/animais', require('./Routes/AnimalRoutes'));

// Rota para página de recuperação de senha
app.get('/recuperar-senha', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'recuperar-senha.html'));
});

// Rota padrão
app.get('/', (req, res) => {
  res.send('API Lar de Patas está funcionando!');
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Servidor rodando em lar-de-patas.cve2oeeg2af0.us-east-1.rds.amazonaws.com${PORT}`);
});             