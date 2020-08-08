const parseArgs = require('minimist');
const colors = require('colors');
const fs = require('fs');

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
            handleData(1, add)
        }
    } else if(remove){
        if(typeof(remove) !== 'string' || remove.length < 7){
            return console.log('Wpisz nazwę zadania do usunięcia. Zadania mają długość nazwy z minimum 6 znaków.'.red)
        } else {
            console.log(`Usunięte zadanie: ${remove.green}`)
            handleData(2, remove)
        }
    } else if(list || list === ""){
        console.log('Pokazuję listę'.green)
        handleData(3, null)
    } else {
        console.log('Nie rozumiem polecenia'.red)
    }

};

const handleData = (type, task) =>{
    // type : number // 1 : add // 2 : remove // 3 : list
    // task : string || null

    const data = fs.readFileSync('./taskdb.json');
    const tasks = JSON.parse(data);
    console.log(tasks)
}

handleCommand(command);