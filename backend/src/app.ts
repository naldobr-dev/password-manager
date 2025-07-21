import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { apiKeyAuth } from './middleware/apiKeyAuth';
import dotenv from 'dotenv';

// Importing password routes
import passwordRoutes from './routes/passwordRoutes';

// Importing authentication routes
import authRoutes from './routes/authRoutes';
import { jwtAuth } from './middleware/jwtAuth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/passwords', jwtAuth, passwordRoutes);

// todas as rotas protegidas sob /api/passwords só responderão 
// se o cliente enviar a chave correta no cabeçalho da requisição
app.use('/api/passwords', apiKeyAuth, passwordRoutes);

// Exemplo de requisição:
// GET /api/passwords HTTP/1.1
// Host: localhost:5000
// x-api-key: sua-api-key-super-secreta

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Conectado ao MongoDB.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/passwords', passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
