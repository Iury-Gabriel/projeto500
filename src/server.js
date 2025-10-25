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

app.post('/canecas/criar', async (req, res) => {
  try {
    const { name, email, produto1, produto2, produto3, produto4, produto5 } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name e email são obrigatórios" });
    }

    const novaCaneca = await prismaClient.canecas.create({
      data: {
        name,
        email,
        produto1,
        produto2,
        produto3,
        produto4,
        produto5
      }
    });

    res.status(201).json(novaCaneca);
  } catch (err) {
    if (err.code === 'P2002') {
      // Prisma erro de unique constraint
      return res.status(400).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ error: err.message });
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

const ACCESS_TOKEN = "E88CFF84-F81ACF6A-985DEB1C-007B9CCA";

// função auxiliar pra requisições
async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
  return data;
}

app.post("/criar-pedido", async (req, res) => {
  try {
    const {
      nome,
      email,
      cpf,
      numero,
      metodo_pagamento, // "pix" ou "credito"
      orderbump1,
      orderbump2,
      orderbump3,
      orderbump4,
      orderbump5,
      cartao, // se for crédito: { number, cvv, month, year, name, installments }
      utm_source,
      utm_campaign,
      utm_medium,
      utm_content,
      utm_term,
    } = req.body;

    const response = await fetch('https://area-de-membros-backend.g8hlwx.easypanel.host/canecas/criar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nome,
      email: email,
      produto1: orderbump1,
      produto2: orderbump2,
      produto3: orderbump3,
      produto4: orderbump4,
      produto5: orderbump5
    })
    });

    const data = await response.json();
    console.log(data);

    // --- 1️⃣ Criar cliente ---
    const [firstname, ...rest] = nome.split(" ");
    const lastname = rest.join(" ") || firstname;

    const cliente = await postJSON(
      "https://admin.appmax.com.br/api/v3/customer",
      {
        "access-token": ACCESS_TOKEN,
        firstname,
        lastname,
        email,
        telephone: numero,
        tracking: {
          utm_source,
          utm_campaign,
          utm_medium,
          utm_content,
          utm_term
        }
      }
    );

    const customer_id = cliente?.data?.id;
    if (!customer_id) throw new Error("Erro ao criar cliente");

    // --- 2️⃣ Calcular total ---
    let total = 6.9;
    const produtos = [
      { sku: "001", name: "Produto Principal", qty: 1 },
    ];

    if (orderbump1) {
      total += 7.9;
      produtos.push({ sku: "ob1", name: "OrderBump 1", qty: 1 });
    }
    if (orderbump2) {
      total += 12.9;
      produtos.push({ sku: "ob2", name: "OrderBump 2", qty: 1 });
    }
    if (orderbump3) {
      total += 14.9;
      produtos.push({ sku: "ob3", name: "OrderBump 3", qty: 1 });
    }
    if (orderbump4) {
      total += 9.9;
      produtos.push({ sku: "ob4", name: "OrderBump 4", qty: 1 });
    }
    if (orderbump5) {
      total += 12.9;
      produtos.push({ sku: "ob4", name: "OrderBump 5", qty: 1 });
    }

    // --- 3️⃣ Criar pedido ---
    const pedido = await postJSON(
      "https://admin.appmax.com.br/api/v3/order",
      {
        "access-token": ACCESS_TOKEN,
        total,
        products: produtos,
        customer_id,
      }
    );

    const order_id = pedido?.data?.id;
    if (!order_id) throw new Error("Erro ao criar pedido");

    // --- 4️⃣ Criar pagamento ---
    let pagamentoData = null;
    let base64 = null;

    if (metodo_pagamento === "pix") {
      const hoje = new Date();
      hoje.setDate(hoje.getDate() + 1);
      const exp = hoje.toISOString().replace("T", " ").substring(0, 19);

      const pagamento = await postJSON(
        "https://admin.appmax.com.br/api/v3/payment/pix",
        {
          "access-token": ACCESS_TOKEN,
          cart: { order_id },
          customer: { customer_id },
          payment: {
            pix: {
              document_number: cpf,
              expiration_date: exp,
            },
          },
        }
      );
      pagamentoData = pagamento?.data?.pix_emv || null;
      base64 = pagamento?.data?.pix_qrcode || null;
    } else if (metodo_pagamento === "credito" && cartao) {
      const pagamentoRes = await fetch("https://admin.appmax.com.br/api/v3/payment/credit-card", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    "access-token": ACCESS_TOKEN,
    cart: { order_id },
    customer: { customer_id },
    payment: {
      CreditCard: {
        number: cartao.number,
        cvv: cartao.cvv,
        month: cartao.month,
        year: cartao.year,
        document_number: cpf,
        name: nome,
        installments: 1,
        soft_descriptor: "CANECA"
      }
    }
  })
});
      console.log(order_id),
      console.log(customer_id);
      console.log(cartao);
      console.log(cpf);
      console.log(nome);



const pagamento = await pagamentoRes.json();
      console.log(pagamento);
      if (!pagamentoRes.ok) {
  const errorText = await pagamentoRes.text();
  throw new Error(`Erro ao criar pagamento: ${pagamentoRes.status} - ${errorText}`);
}


      pagamentoData = pagamento?.data || null;
    }

    return res.json({
      message: "Pedido criado com sucesso",
      customer_id,
      order_id,
      pagamento: pagamentoData,
      base64
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
