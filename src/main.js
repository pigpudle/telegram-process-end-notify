const parseArgs = require('./utils/parseArgs');
const CommandRunner = require('./CommandRunner');

const { command, args } = parseArgs(process.argv);
new CommandRunner(command, args).run();