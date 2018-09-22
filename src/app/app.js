const TOKEN = process.env.TELEGRAM_TOKEN;

const TelegramBot = require('node-telegram-bot-api');

const {event} = require('./constants/events');
const {command} = require('./constants/commands');
const {handler} = require('./handlers');

const bot = new TelegramBot(TOKEN, {polling: true});

/**
 * Controller for text messages processing.
 */
bot.on(event.TEXT, async message => {
  let chatId = message.chat.id;
  let userId = message.from.id;
  switch (message.text) {
    case command.HELP :
      let helpMessage = 'It is a time-utility bot. You can to specify your location for this bot and link your time via short command';
      return bot.sendMessage(chatId, helpMessage);
    case command.CURRENT :
      let time = await handler.current(userId);
      return bot.sendMessage(chatId, time);
  }
});

bot.on(event.LOCATION, async message => {
  let chatId = message.chat.id;
  let userId = message.from.id;
  let location = message.location;
  let savedUser = await handler.store(userId, location);
  return bot.sendMessage(chatId, 'Your location was stored...');
});

/**
 * Controller for processing of inline queries.
 */
bot.on(event.INLINE_QUERY, async query => {
  let queryId = query.id;
  let userId = query.from.id;
  let items = [
    {
      id: 1,
      type: 'article',
      title: 'Current time',
      input_message_content: {
        message_text: await handler.current(userId),
      },
    },
  ];
  return bot.answerInlineQuery(queryId, items);
});