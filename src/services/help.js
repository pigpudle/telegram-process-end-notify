const help = (commands) => {
    const list = Object.keys(commands).sort();
    const table = list.map(commandName => ({
        name: commandName,
        description: commands[commandName].description
    }));
    console.table(table);
};

module.exports = help;