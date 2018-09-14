const TOKEN = process.env.TELEGRAM_TOKEN;
const uuidv1 = require('uuid/v1');

const eventTypes = require('./constants/eventTypes');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(TOKEN, {polling: true});

bot.on(eventTypes.MESSAGE, msg => {
  const chatId = msg.chat.id;

  return bot.sendMessage(chatId, 'I see you');
});

bot.on(eventTypes.INLINE_QUERY, query => {
  let q_id = query.id;
  let answer = [];
  let id = uuidv1();

  let text = {
    id: id,
    type: 'article',
    title: 'Dino about',
    input_message_content: {
      message_text: 'There is a dino which is saying "I love you!"...',
    },
  };
  answer.push(text);
  return bot.answerInlineQuery(q_id, answer);
});

bot.on(eventTypes.CHOSEN_INLINE_RESULT, query => {
  return console.log(query);
});