const express = require('express');
const tourRouter = require("./routes/tourRouter");
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require('body-parser')

const token = '1897548081:AAF2kHQiOXVhJqZk_LV9CjQbDEPokjVt0H8';

const bot = new TelegramBot(token, { polling: true });
const app = express()

app.set("view engine", "hbs");
app.use("/tours", tourRouter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




// telegram bot <<
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'started')
});

bot.on("message", function(msg) {
        bot.sendMessage(msg.chat.id, 'Hello')
    })
    // telegram bot >>

app.listen(4040)