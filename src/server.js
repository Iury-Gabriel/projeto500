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
  try {
    const { nome, email, items, ...produtos } = req.body;

    console.log(req.body)

    if (!nome || !email) {
      return res.json({ message: "Preencha todos os campos fornecidos" });
    }

    const verifyUserExists = await prismaClient.resinas.findUnique({
      where: { email }
    });

    if (verifyUserExists) {
      return res.json({ message: "O email já existe" });
    }

    // Lista dos SKUs reais de cada produto
    const produtosSku = {
      produto1: "H6FQ4N3ME",
      produto2: "NVS6XU3PS",
      produto3: "QVZKXKSKQ"
    };

    // monta objeto dinamicamente com nome e email
    const data = { name: nome, email };

    // inclui produtos vindos direto do body
    for (const [key, value] of Object.entries(produtos)) {
      if (value) {
        data[key] = value;
      }
    }

    // Se vier items (compra) no body, processa também
    if (items?.data?.length > 0) {
      items.data.forEach(item => {
        const sku = item?.item_sku;
        if (sku) {
          for (let key in produtosSku) {
            if (sku === produtosSku[key]) {
              data[key] = true; // já marca o produto como comprado
            }
          }
        }
      });
    }

    const user = await prismaClient.resinas.create({ data });

    return res.json({
      message: "Usuário criado com sucesso",
      user
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});


app.get('/buscardados/:email', async (req, res) => {
  const { email } = req.params;
  const resinas = await prismaClient.resinas.findUnique({
    where: {
      email
    }
  })
  res.json(resinas);
});

app.post('/verificaremail', async (req, res) => {
  const { email } = req.body;
  const resinas = await prismaClient.resinas.findUnique({
    where: {
      email
    }
  })
  if (resinas) {
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
      produto1: "H6FQ4N3ME",
      produto2: "NVS6XU3PS",
      produto3: "QVZKXKSKQ"
    };

    // Busca usuário no banco
    const user = await prismaClient.resinas.findUnique({
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
    const userUpdated = await prismaClient.resinas.update({
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

app.post('/canecas/criarusuario', async (req, res) => {
  try {
    const { nome, email, items, ...produtos } = req.body;

    console.log(req.body)

    if (!nome || !email) {
      return res.json({ message: "Preencha todos os campos fornecidos" });
    }

    const verifyUserExists = await prismaClient.canecas.findUnique({
      where: { email }
    });

    if (verifyUserExists) {
      return res.json({ message: "O email já existe" });
    }

    // Lista dos SKUs reais de cada produto
    const produtosSku = {
      produto1: "B6VPC7C5V",
      produto2: "B9ZY4C5YU",
      produto3: "B5UJD92RB",
      produto4: "EP2PRG7RZ",
      produto5: "PCTJ3Y2AT"
    };

    // monta objeto dinamicamente com nome e email
    const data = { name: nome, email };

    // inclui produtos vindos direto do body
    for (const [key, value] of Object.entries(produtos)) {
      if (value) {
        data[key] = value;
      }
    }

    // Se vier items (compra) no body, processa também
    if (items?.data?.length > 0) {
      items.data.forEach(item => {
        const sku = item?.item_sku;
        if (sku) {
          for (let key in produtosSku) {
            if (sku === produtosSku[key]) {
              data[key] = true; // já marca o produto como comprado
            }
          }
        }
      });
    }

    const user = await prismaClient.canecas.create({ data });

    return res.json({
      message: "Usuário criado com sucesso",
      user
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});


app.get('/canecas/buscardados/:email', async (req, res) => {
  const { email } = req.params;
  const canecas = await prismaClient.canecas.findUnique({
    where: {
      email
    }
  })
  res.json(canecas);
});

app.post('/canecas/verificaremail', async (req, res) => {
  const { email } = req.body;
  const canecas = await prismaClient.canecas.findUnique({
    where: {
      email
    }
  })
  if (canecas) {
    res.json(true)
  } else {
    res.json(false)
  }
});

app.post('/canecas/processar-compra', async (req, res) => {
  try {
    const { email, items } = req.body;

    if (!email || !items) {
      return res.status(400).json({ message: "Email e items são obrigatórios" });
    }

    // Lista dos SKUs reais de cada produto
    const produtosSku = {
      produto1: "B6VPC7C5V",
      produto2: "B9ZY4C5YU",
      produto3: "B5UJD92RB",
      produto4: "EP2PRG7RZ",
      produto5: "PCTJ3Y2AT"
    };

    // Busca usuário no banco
    const user = await prismaClient.canecas.findUnique({
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
    const userUpdated = await prismaClient.canecas.update({
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
