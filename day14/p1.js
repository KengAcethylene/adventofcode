const { readFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');

const transposeRow = rows[0]
    .split('')
    .map((_, colIndex) => rows.map((row) => row[colIndex]))
    .map((row) => row.join(''));

let sum = 0;
for (const row of transposeRow.values()) {
    let next = 0;
    for (const [c, char] of row.split('').entries()) {
        if (char === 'O') {
            sum += row.length - next;
            next++;
        } else if (char === '#') {
            next = c + 1;
        }
    }
}

console.log(sum);
