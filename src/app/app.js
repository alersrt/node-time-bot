const TOKEN = process.env.TELEGRAM_TOKEN;

const TelegramBot = require('node-telegram-bot-api');
const {event} = require('./constants/events');
const {command} = require('./constants/commands');
const {handler} = require('./handlers');

const bot = new TelegramBot(TOKEN, {polling: true});

/**
 * Controller for text messages processing.
 */
bot.on(event.TEXT, message => {
  let userId = message.from.id;
  let answer = 'Nothing';
  switch (message.text) {
    case command.HELP :
      answer = handler.help();
      break;
    case command.CURRENT :
      answer = handler.current(userId);
      break;
  }
  return bot.sendMessage(message.chat.id, answer);
});

bot.on(event.LOCATION, message => {
  let userId = message.from.id;
  let location = message.location;
  handler.store(userId, location);

  return bot.sendMessage(message.chat.id, 'Your location was stored...')
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