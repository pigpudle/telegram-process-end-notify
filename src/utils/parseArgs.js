module.exports = (args) => {
    const parts = args.slice(2);
    return {
        command: parts[0],
        args: parts.slice(1)
    };
};