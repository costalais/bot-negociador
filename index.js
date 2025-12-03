const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const socketIO = require('socket.io');
const http = require('http');
const qrcode = require('qrcode');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "bot-negociador" }),
  puppeteer: { headless: true }
});


client.on('qr', async qr => {
  console.log('📲 QR Code gerado!');
  const qrImage = await qrcode.toDataURL(qr);
  io.emit('qr', qrImage);
  io.emit('status', '📲 QR Code gerado, escaneie com o WhatsApp');
});


client.on('ready', () => {
  console.log('✅ Sessão autenticada e pronta!');
  io.emit('status', '✅ Sessão autenticada e pronta!');
});


client.on('disconnected', () => {
  console.log('❌ Sessão desconectada');
  io.emit('status', '❌ Sessão desconectada, recarregue para gerar novo QR');
});


client.on('message_create', async msg => {
  if (msg.fromMe) {
    io.emit('mensagem', `🙋 Você: ${msg.body}`);
  } else {
    io.emit('mensagem', `📩 De ${msg.from}: ${msg.body}`);
  }

  const texto = msg.body.toLowerCase();

  if (texto === 'olá' || texto === 'oi') {
    const resposta = `Contrato 12345, saldo R$ 1.250,00.\nOpções:\n1️⃣ à vista 20% desc.\n2️⃣ 3x 10% desc.\n3️⃣ 6x sem juros.`;
    msg.reply(resposta);
    io.emit('mensagem', `🤖 Bot: ${resposta}`);
  } else if (texto === '1') {
    const resposta = `✅ Você escolheu: à vista com 20% de desconto.`;
    msg.reply(resposta);
    io.emit('mensagem', `🤖 Bot: ${resposta}`);
  } else if (texto === '2') {
    const resposta = `✅ Você escolheu: parcelar em 3x com 10% de desconto.`;
    msg.reply(resposta);
    io.emit('mensagem', `🤖 Bot: ${resposta}`);
  } else if (texto === '3') {
    const resposta = `✅ Você escolheu: parcelar em 6x sem juros.`;
    msg.reply(resposta);
    io.emit('mensagem', `🤖 Bot: ${resposta}`);
  } else if (texto === 'menu' || texto === 'ajuda') {
    const resposta = `📋 Menu de opções:\n1️⃣ à vista 20% desc.\n2️⃣ 3x 10% desc.\n3️⃣ 6x sem juros.`;
    msg.reply(resposta);
    io.emit('mensagem', `🤖 Bot: ${resposta}`);
  }
});

io.on('connection', socket => {
  socket.emit('status', '🔌 Conectado ao servidor');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

client.initialize();
