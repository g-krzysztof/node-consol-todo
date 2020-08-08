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
            handleData(1, add)
        }
    } else if(remove){
        if(typeof(remove) !== 'string' || remove.length < 7){
            return console.log('Wpisz nazwę zadania do usunięcia. Zadania mają długość nazwy z minimum 6 znaków.'.red)
        } else {
            handleData(2, remove)
        }
    } else if(list || list === ""){
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
    // console.log(tasks)

    if(type === 1 || type === 2) {
        const isExisted = tasks.find(item => item.task === task) ? true : false;

        if(type === 1 && isExisted){
            return console.log('Takie zadanie już istnieje'.red)
        } else if (type === 2 && !isExisted){
            return console.log('Takie zadanie nie istnieje'.red)
        }
    }

    switch(type){
        case 1:
            console.log('Dodaję zadanie'.green)
            const id = tasks.length + 1;
            tasks.push({
                id, task
            });
            const dataJSON = JSON.stringify(tasks);
            fs.writeFileSync('./taskdb.json', dataJSON)
            break;
        case 2:
            console.log('Usuwam zadanie'.green)
            break;
        case 3:
            console.log('Pokazuję listę'.green)
            break;
    }

}

handleCommand(command);