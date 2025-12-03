# 🤖 Bot Negociador WhatsApp

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-fast%20server-lightgrey?logo=express)
![Socket.IO](https://img.shields.io/badge/Socket.IO-realtime-black?logo=socketdotio)
![WhatsApp Web.js](https://img.shields.io/badge/whatsapp--web.js-powered-brightgreen?logo=whatsapp)
![Status](https://img.shields.io/badge/status-Finalizado-success)

Um projeto para negociação via WhatsApp com painel web em tempo real, usando [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js), Express e Socket.IO.

---

## 📖 Visão geral
Este bot autentica via QR Code e exibe no navegador o status da sessão e todas as mensagens do WhatsApp em tempo real, incluindo as que você envia, as que recebe e as respostas automáticas do bot.  

O fluxo de negociação é simples:
- Digite **“olá”** para ver opções
- Digite **“1”**, **“2”** ou **“3”** para confirmar
- Digite **“menu”** ou **“ajuda”** para reexibir

---

## 🛠️ Stack usada
- **Runtime:** Node.js  
- **Servidor web:** Express  
- **Mensageria em tempo real:** Socket.IO  
- **Integração WhatsApp:** whatsapp-web.js (LocalAuth)  
- **Geração de QR:** qrcode (Data URL)  
- **Frontend:** HTML simples  

---

## 🚀 Passo a passo de execução

## 1. **Clonar e instalar**
   ```bash
   git clone https://github.com/costalais/bot-negociador-whatsapp.git
   cd bot-negociador-whatsapp
   npm install
 ```
## 2. Configurar .gitignore

```Plaintext
node_modules
.wwebjs_auth
 ```
## 3. Inciar o servidor

 ```bash
npm start
 ```
Abra http://localhost:3000 e escaneie o QR Code com o WhatsApp.

---

## 💬 Usar o fluxo de negociação

- **Saudação:** Digite “olá” ou “oi” para ver as opções de pagamento.
- **Escolha de opção:** Digite “1”, “2” ou “3” para confirmar a opção escolhida.
- **Ajuda/Menu:** Digite “menu” ou “ajuda” para reexibir as opções.

---

## 🌐 Endpoints

### 🔹 HTTP
- **GET /**  
  **Descrição:** Retorna o painel web (`public/index.html`) com QR Code e feed de mensagens.

### 🔹 Eventos Socket.IO
- **Evento:** `qr`  
  **Payload:** Data URL (string)  
  **Descrição:** QR Code para autenticação.

- **Evento:** `status`  
  **Payload:** string  
  **Descrição:** Atualizações do estado da sessão.

- **Evento:** `mensagem`  
  **Payload:** string  
  **Descrição:** Mensagens formatadas exibidas no painel.

> ⚠️ As mensagens do WhatsApp são capturadas via evento `message_create` do whatsapp-web.js. O bot também envia mensagens automáticas de acordo com o fluxo definido.

---
---

## ⚠️ Limitações

- ❌ Não há persistência de conversas (histórico não é salvo)
- ❌ Painel em HTML simples, sem autenticação ou controle de acesso
- ❌ Fluxo de negociação básico e hardcoded
- ❌ Sessão depende do dispositivo pareado (sem multiusuário)
- ❌ Sem integração com banco de dados ou APIs externas

---

## 🔮 Próximos passos

- 🗄️ Persistir histórico de conversas (SQLite/PostgreSQL)
- 📊 Criar dashboard com métricas e filtros (por período e status)
- 🔔 Configurar webhooks internos e separar camadas (serviço, domínio, UI)
- 🧩 Adicionar comandos dinâmicos e templates de mensagem
- 🌐 Deploy em servidor (PM2 + HTTPS) e proteção do painel
- 👥 Suporte a múltiplos usuários e sessões independentes

---

