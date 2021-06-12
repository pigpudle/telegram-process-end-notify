# telegram-process-end-notify
This package allows you to watch your local processes and get notifications in Telegram when a specific process finishes.

## Usage
1. Clone this repository to your computer.
2. Create a Telegram bot using [this instructions](https://core.telegram.org/bots#6-botfather). Grab an API key.

![Creating a bot using BotFather](https://raw.githubusercontent.com/NeliHarbuzava/telegram-process-end-notify/master/demo/creating-a-bot.png)

3. Create `.env` file with the following content:
```
BOT_TOKEN=<your_bot_api_key>
```
4. Open Telegram and add your bot to your chat list.
5. Open a terminal window inside the repository folder and run:
```
npm run start
```
6. Open your bot in Telegram and type `/start`.

![Communicating with a bot](https://raw.githubusercontent.com/NeliHarbuzava/telegram-process-end-notify/master/demo/communicating-with-bot.png)