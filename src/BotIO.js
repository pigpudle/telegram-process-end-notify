const EventEmitter = require('events');
const { MenuTemplate, MenuMiddleware } = require('telegraf-inline-menu');

const menuTemplate = new MenuTemplate(() => 'Select an item:');

class BotIO extends EventEmitter {

    constructor() {
        super();

        this.resetMenuData();

        menuTemplate.choose('unique',
            () => this.menuData.items.map(item => {
                // crop text to fit buttons
                if (item.length > 40) {
                    return item.substring(0, 18) + '...' + item.substring(item.length - 19);
                }

                return item;
            })
                .reduce((obj, val, index) => ({ ...obj, [index]: val }), {}),
            {
                do: async (ctx, key) => {
                    this.menuData.callback(null, key, this.menuData.metadata);
                    this.resetMenuData();
                    return true;
                }
            }
        );

        this.menuMiddleware = new MenuMiddleware('/', menuTemplate)
    }

    resetMenuData() {
        this.menuData = {
            items: [],
            callback: () => {},
            metadata: {}
        };
    }

    setup(context, bot) {
        this.context = context;
        this.bot = bot;
    }

    emit(event, ...args) {
        switch(event) {
            case 'info': {
                const message = args[0];
                this.context.reply(message);
                break;
            }
            case 'get': {
                const message = args[0];
                const callback = args[1];
                const metadata = args[2];
                let isAnswered = false;

                this.context.reply(message);                

                this.bot.on('text', (ctx) => {
                    if (!isAnswered) {
                        isAnswered = true;
                        callback(null, ctx.message.text, metadata);
                    }
                });
                break;
            }
            case 'menu': {
                const message = args[0];
                const items = args[1];
                const callback = args[2];
                const metadata = args[3];

                this.context.reply(message);
                setTimeout(() => {
                    this.menuData = {
                        items,
                        callback,
                        metadata
                    };
                    this.menuMiddleware.replyToContext(this.context);                     
                });
                
                break;
            }
            case 'error':
                const error = args[0];
                this.context.reply(`Error occured: ${error.message}`);
                break;
            default:
                super.on(...args);
        }
    }

}

module.exports = BotIO;