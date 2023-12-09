const { readFileSync } = require('fs');

const lines = readFileSync(`${__dirname}/text.txt`, 'utf-8')
    .split('\n')
    .map((line) => line.split(' ').map((x) => parseInt(x)));

function process(line) {
    if (!line.every((num) => num === line[0])) {
        const newLine = line.reduce((prev, curr, idx) => {
            if (prev.length !== 0) {
                prev[prev.length - 1] = curr - prev[prev.length - 1];
            }
            if (idx !== line.length - 1) {
                prev.push(curr);
            }
            return prev;
        }, []);

        return line[line.length - 1] + process(newLine);
    } else {
        return line[0];
    }
}

const sum = lines.reduce((prev, line) => prev + process(line), 0);
console.log(sum);
