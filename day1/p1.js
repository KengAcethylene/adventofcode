const { readFileSync } = require('fs');

const lines = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');

const process = (line) => {
    const result = line.match(/\d/g);
    return parseInt(result.at(0) + result.at(-1));
};

const sum = lines.reduce((prev, line) => prev + process(line), 0);
console.log(sum);
