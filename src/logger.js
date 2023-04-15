const logger = {
    error(message) {
        console.log('\033[31m' + message + '\033[39m'); // Octal escape sequences are not allowed in template strings.
    }
};

module.exports = logger;