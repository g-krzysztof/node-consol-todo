const parseArgs = require('minimist');
const colors = require('colors');

const command = parseArgs(process.argv.slice(2,3));
delete command._;

const handleCommand = ({ add, remove, list }) => {
    if(add){
        if(typeof(add) !== 'string'){
            return console.log('Wpisz treść zadania w postaci tekstu'.red);
        } else if (add.length < 7){
            return console.log('Tekst musi mieć minimum 6 znaków'.red);
        } else {
            console.log(`Twoje zadanie: ${add.green}`)
            handleData(add)
        }
    } else if(remove){
        if(typeof(remove) !== 'string' || remove.length < 7){
            return console.log('Wpisz nazwę zadania do usunięcia. Zadania mają długość nazwy z minimum 6 znaków.'.red)
        } else {
            console.log(`Usunięte zadanie: ${remove.green}`)
            handleData(remove)
        }
    } else if(list || list === ""){
        console.log('Pokazuję listę'.green)
        handleData(list)
    } else {
        console.log('Nie rozumiem polecenia'.red)
    }

};

const handleData = (data) =>{
    console.log(data)
}

handleCommand(command);