
Read.kz Project

1. Установка:
- Установить Node.js
- Выполнить: npm install express body-parser axios

2. Запуск сервера:
- node server.js

3. Настройка webhook:
- Использовать ngrok (https://ngrok.com/)
- Запустить: ngrok http 3000
- Получить публичный URL и установить webhook Telegram:
  https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=<YOUR_NGROK_URL>/webhook

4. Использование:
- На сайте кнопка «Купить» открывает Telegram-бота с параметром варианта.
- Пользователь отправляет чек в бот.
- Админ подтверждает командой /ok <user_id>.
- Бот отправляет ссылку на скачивание.

5. Токен бота уже вставлен в server.js.

