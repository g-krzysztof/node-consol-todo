const parseArgs = require('minimist');
const handleCommand = require('./handleCommand');
// const colors = require('colors');
// const fs = require('fs');

const command = parseArgs(process.argv.slice(2,3));
delete command._;

handleCommand(command);