const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require("cors")

const app = express();
const prismaClient = new PrismaClient();

app.use(cors())
app.use(express.json());

// Rota teste
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

app.post('/criarusuario', async (req, res) => {
  const { nome, email, ...produtos } = req.body;

  if (!nome || !email) {
    return res.json({ message: "Preencha todos os campos fornecidos" });
  }

  const verifyUserExists = await prismaClient.moldes.findUnique({
    where: { email }
  });

  if (verifyUserExists) {
    return res.json({ message: "O email já existe" });
  }

  // monta objeto dinamicamente
  const data = { name: nome, email };
  for (const [key, value] of Object.entries(produtos)) {
    if (value) {
      data[key] = value;
    }
  }

  const user = await prismaClient.moldes.create({ data });

  res.json(user);
});


app.get('/buscardados/:email', async (req, res) => {
  const { email } = req.params;
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

app.post('/processar-compra', async (req, res) => {
  try {
    const { email, items } = req.body;

    if (!email || !items) {
      return res.status(400).json({ message: "Email e items são obrigatórios" });
    }

    // Lista dos SKUs reais de cada produto
    const produtosSku = {
      produto1: "EWLE5GQRH",
      produto2: "B6VPC7C5V",
      produto3: "SKU_PRODUTO_3",
      produto4: "SKU_PRODUTO_4",
      produto5: "SKU_PRODUTO_5",
      produto6: "SKU_PRODUTO_6",
      produto7: "SKU_PRODUTO_7",
      produto8: "SKU_PRODUTO_8",
      produto9: "SKU_PRODUTO_9",
      produto10: "SKU_PRODUTO_10",
      produto11: "J47AS59AY",
      produto12: "EP2PRG7RZ",
      produto13: "SKU_PRODUTO_13",
      produto14: "SKU_PRODUTO_14"
    };

    // Busca usuário no banco
    const user = await prismaClient.moldes.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Objeto para atualizar somente os produtos encontrados
    let updateData = {};

    items.data.forEach(item => {
      const sku = item?.item_sku;
      if (sku) {
        for (let key in produtosSku) {
          if (sku === produtosSku[key]) {
            // só atualiza se ainda não for true no banco
            if (user[key] !== true) {
              updateData[key] = true;
            }
          }
        }
      }
    });

    // Se não teve nada pra atualizar
    if (Object.keys(updateData).length === 0) {
      return res.json({
        message: "Nenhum produto novo para atualizar",
        user
      });
    }

    // Atualiza apenas os campos necessários
    const userUpdated = await prismaClient.moldes.update({
      where: { email },
      data: updateData
    });

    return res.json({
      message: "Compra processada com sucesso",
      user: userUpdated
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});



// Iniciar servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
