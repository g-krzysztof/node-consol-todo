const handleData = require('./handleData');

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

module.exports = handleCommand;