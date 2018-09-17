/**
 * Read variables from environment.
 */
const TOKEN = process.env.TELEGRAM_TOKEN;

const TelegramBot = require('node-telegram-bot-api');
const {event} = require('./events');
const {command} = require('./commands');
const {handler} = require('./handlers');

const bot = new TelegramBot(TOKEN, {polling: true});

/**
 * Controller for messages processing.
 */
bot.on(event.MESSAGE, message => {
  switch (message.text) {
    case command.HELP :
      let answer = handler.help();
      return bot.sendMessage(message.chat.id, answer);
    default:
      return () => {};
  }
});

/**
 * Controller for processing of inline queries.
 */
bot.on(event.INLINE_QUERY, query => {
  let items = [
    {
      id: 0,
      type: 'article',
      title: 'Help',
      input_message_content: {
        message_text: handler.help(),
      },
    },
    {
      id: 1,
      type: 'article',
      title: 'Current time',
      input_message_content: {
        message_text: handler.current(query.from.id),
      },
    },
  ];

  return bot.answerInlineQuery(query.id, items);
});