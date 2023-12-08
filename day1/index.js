const fs = require('fs');
const readline = require('readline');


const lineReader = readline.createInterface({
    input: fs.createReadStream('test.txt')
})

const process = (line) => {
    let firstDegit,lastDegit;

    for (let x = 0; x < line.length; x++){
        const char = line.at(x);
        if (!isNaN(parseInt(char)) && firstDegit === undefined){
            firstDegit = char;
            break;
        }
    }

    for (let x = line.length - 1 ; x >= 0; x--){
        const char = line.at(x);
        if (!isNaN(parseInt(char)) && lastDegit === undefined){
            lastDegit = char;
            break;
        }
    }
    let combine;

    if (firstDegit === undefined){
        combine = lastDegit + lastDegit;
    }
    else if (lastDegit === undefined){
        combine = firstDegit + firstDegit;
    }
    else {
        combine = firstDegit + lastDegit;
    }

    return parseInt(combine);
}

let sum = 0;

lineReader.on('line', (line) => {
    const lineNumber = process(line);
    sum += lineNumber;
    
    console.log(sum);
})