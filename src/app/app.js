/**
 * Read variables from environment.
 */
const TOKEN = process.env.TELEGRAM_TOKEN;

/**
 * Random UUID generator.
 * @type {v4}
 */
const uuidv4 = require('uuid/v4');

const TelegramBot = require('node-telegram-bot-api');
const eventTypes = require('./constants/eventTypes');

const bot = new TelegramBot(TOKEN, {polling: true});

/**
 * Controller for messages processing.
 */
bot.on(eventTypes.MESSAGE, msg => {
  const chatId = msg.chat.id;

  return bot.sendMessage(chatId, 'I see you');
});

/**
 * Controller for processing of inline queries.
 */
bot.on(eventTypes.INLINE_QUERY, query => {
  let queryId = query.id;
  let answer = [];
  let id = uuidv4();

  let text = {
    id: id,
    type: 'article',
    title: 'Dino about',
    input_message_content: {
      message_text: 'There is a dino which is saying "I love you!"...',
    },
  };
  answer.push(text);
  return bot.answerInlineQuery(queryId, answer);
});