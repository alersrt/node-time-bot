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
  let chatId = message.chat.id;
  let userId = message.from.id;
  switch (message.text) {
    case command.HELP :
      let helpMessage = 'It is a time-utility bot. You can to specify your location for this bot and link your time via short command';
      return bot.sendMessage(chatId, helpMessage);
    case command.CURRENT :
      return handler.current(userId).then(time => {
        let timeMessage = time.toISOString();
        return bot.sendMessage(chatId, timeMessage);
      });
  }

});

bot.on(event.LOCATION, message => {
  let userId = message.from.id;
  let location = message.location;
  return handler.store(userId, location)
      .then(() => {
        return bot.sendMessage(message.chat.id, 'Your location was stored...');
      }).catch(error => error);
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