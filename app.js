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

    let dataJSON = "";
    switch(type){
        case 1:
            const id = tasks.length + 1;
            tasks.push({
                id, task
            });
            dataJSON = JSON.stringify(tasks);
            fs.writeFileSync('./taskdb.json', dataJSON)
            console.log(`Dodaję zadanie: ${task}`.black.bgGreen)
            break;
        case 2:
            const index = tasks.findIndex(item=> item.task === task);
            tasks.splice(index,1);
            dataJSON = JSON.stringify(tasks);
            fs.writeFileSync('./taskdb.json', dataJSON)
            console.log(`Usuwam zadanie: ${task}`.black.bgGreen)
            break;
        case 3:
            console.log('Twoja lista zadań:'.green)
            if(tasks.length > 0 ){
                tasks.forEach( (task, index) => {
                    if( index % 2) return console.log(task.task.green)
                    return console.log(task.task.yellow)
                })
            }
            break;
    }

}

handleCommand(command);