const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rota teste
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

app.post('/criarusuario', async (req, res) => {
  const { nome, email } = req.body;
  if (nome == "" || !email) {
    res.json({ message: "Preencha todos os campos fornecidos" })
  }
  const verifyUserExists = await prismaClient.moldes.findUnique({
    where: {
      email
    }
  })

  if (verifyUserExists) {
    res.json({ message: "O email já existe" })
  }
  const user = await prismaClient.moldes.create({
    data: {
      nome, email
    }
  })

  res.json(user);
});

app.get('/buscardaados', async (req, res) => {
  const { email } = req.body;
  const moldes = await prismaClient.moldes.findUnique({
    where: {
      email
    }
  })
  res.json(moldes);
});

app.get('/verificaremail', async (req, res) => {
  const { email } = req.body;
  const moldes = await prismaClient.moldes.findUnique({
    where: {
      email
    }
  })
  if (moldes) {
    res.json(true)
  } else {
    res.json(false)
  }
});
// Iniciar servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});