const logger = require('./logger');

class Command {
    constructor({ argsLength, runner, helpMessage, description }) {
        this.argsLength = argsLength;
        this.runner = runner;
        this.helpMessage = helpMessage;
        this.description = description;
    }

    run(args = []) {
        if (
            (Array.isArray(this.argsLength) && !this.argsLength.includes(args.length)) ||
            (Number.isInteger(this.argsLength) && args.length !== this.argsLength)
        ) {
            return logger.error(`Usage: ${this.helpMessage}`);
        }
        return this.runner(args);
    }
}

module.exports = Command;