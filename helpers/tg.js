const TelegramBot = require("node-telegram-bot-api");

const token = '1897548081:AAF2kHQiOXVhJqZk_LV9CjQbDEPokjVt0H8';

const bot = new TelegramBot(token, { polling: true });