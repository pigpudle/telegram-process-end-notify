const packageJson = require('../package.json');
const Command = require('./Command');
const logger = require('./logger');
const help = require('./services/help');
const version = require('./services/version');

const 
    CLI_COMMAND = Object.keys(packageJson.bin)[0],
    VERSION = packageJson.version;

const commands = {
    ...['-h', '--help'].reduce((obj, cur) => ({ ...obj, [cur]: new Command({
        argsLength: 0,
        runner: () => help(commands),
        helpMessage: `${CLI_COMMAND} --help`,
        description: 'Returns list of available commands'
    })}), {}),
    ...['-v', '--version'].reduce((obj, cur) => ({ ...obj, [cur]: new Command({
        argsLength: 0,
        runner: () => version(VERSION),
        helpMessage: `${CLI_COMMAND} --version`,
        description: 'Returns package version'
    })}), {}),
    ['set-bot']: new Command({
        argsLength: 1,
        runner: () => {},
        helpMessage: `${CLI_COMMAND} set-bot <BOT_TOKEN>`,
        description: 'Sets a bot token'
    }),
    ['run-watch']: new Command({
        argsLength: [ 1, 2 ],
        runner: () => {},
        helpMessage: `${CLI_COMMAND} run-watch <COMMAND> <?ARGS>`,
        description: 'Runs a watching process'
    })
};

class CommandRunner {
    constructor(command, args) {
        this.command = command;
        this.args = args;
    }

    run() {
        if (!commands[this.command]) {
            return logger.error(`No such command. Use '${CLI_COMMAND} --help' to see the list of available commands`);
        }
        commands[this.command].runner(this.args);
    }
}

module.exports = CommandRunner;