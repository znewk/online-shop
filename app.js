const express = require('express');
const tourRouter = require("./routes/tourRouter");
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require('body-parser')
const hbs = require('hbs')
const db = require("./helpers/db");

const token = '1897548081:AAF2kHQiOXVhJqZk_LV9CjQbDEPokjVt0H8';

const bot = new TelegramBot(token, { polling: true });
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// hbs <<
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    this.switch_break = false;
    return options.fn(this);
});

hbs.registerHelper('case', function(value, options) {
    if (value == this.switch_value) {
        this.switch_break = true;
        return options.fn(this);
    }
});

hbs.registerHelper('default', function(value, options) {
    if (this.switch_break == false) {
        return value;
    }
});

// hbs >>

// static sett <<

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static(__dirname + '/public'));

// static sett >>

app.use("/tours", tourRouter);

// telegram bot <<

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Добро пожаловать, для регистрации администратора пропишите следующую команду - /register')
});

bot.onText(/\/register/, (msg) => {

    let userName = msg.chat.username
    let chatID = msg.chat.id

    db.registerAdminTB(userName, chatID)


});

// telegram bot >>

app.listen(4040)