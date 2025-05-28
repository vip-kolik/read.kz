
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = '7939666264:AAFK_ZJKmQJ6zw6ta8PH8NgSLNFX1nROzaE';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

let pendingPayments = {}; // userId -> variantId

// Обработка webhook
app.post('/webhook', async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text || '';

    if (text.startsWith('/start buy_')) {
      const variantId = text.split('_')[1];
      pendingPayments[chatId] = variantId;
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `Вы выбрали вариант ${variantId}. Отправьте-100тенге на Kaspi Gold номер +77077179415.После оплаты отправьте чек сюда.`
      });
    } else if (text.startsWith('/ok')) {
      // Команда для администратора подтверждения платежа
      // Формат: /ok <userId>
      const parts = text.split(' ');
      if (parts.length === 2) {
        const userId = parts[1];
        if (pendingPayments[userId]) {
          const variantId = pendingPayments[userId];
          await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: userId,
            text: `Оплата подтверждена! Вот ссылка на скачивание варианта ${variantId}: https://read.kz/варианттар/info${variantId}.rtf`
          });
          delete pendingPayments[userId];
          await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `Пользователь ${userId} получил ссылку.`
          });
        } else {
          await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `Пользователь ${userId} не найден в списке ожидающих.`
          });
        }
      }
    } else {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: 'Я вас не понимаю. Используйте /start buy_<номер варианта> для покупки или /ok <userId> для подтверждения оплаты.'
      });
    }
  }

  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
