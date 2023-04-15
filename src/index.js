const { Telegraf } = require('telegraf');
const { Watcher } = require('process-end-notify');
const BotIO = require('./BotIO');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const botIO = new BotIO();

bot.start(async (ctx) => {
    botIO.setup(ctx, bot);
    await new Watcher(botIO, () => {
        finish();
    }, (isError) => {
        finish(isError);        
    }).start();
});

const finish = () => {
    botIO.context.reply('Finishing...');
        
    setTimeout(() => {
        bot.stop();
        process.exit();
    }, 1000);   
};

bot.launch();
bot.use(botIO.menuMiddleware);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))