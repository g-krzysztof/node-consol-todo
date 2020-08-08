parseArgs = require('minimist');

const command = parseArgs(process.argv.slice(2,3));
delete command._;

const handleCommand = ({ add, remove, list }) => {
    console.log(add, remove, list)
};

handleCommand(command);