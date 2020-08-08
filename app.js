const parseArgs = require('minimist');
const colors = require('colors');

const command = parseArgs(process.argv.slice(2,3));
delete command._;

const handleCommand = ({ add, remove, list }) => {
    if(add){
        if(typeof (add) !== 'string'){
            return console.log('Wpisz treść zadania w postaci tekstu'.red);
        } else {
            console.log(`Twoje zadanie: ${add.green}`)
        }
    } else if(remove){

    } else if(list){

    } else {

    }
    console.log(add, remove, list)
};

handleCommand(command);