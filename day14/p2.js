const { readFileSync } = require('fs');

let rows = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');
let range = 0;
let duplicate = new Set([JSON.stringify(rows)]);
let offset = 1;
const CYCLE = 1000000000;
while (true) {
    rows = cycle(rows);

    if (duplicate.has(JSON.stringify(rows))) {
        range =
            offset -
            [...duplicate].findIndex((value) => value === JSON.stringify(rows));
        break;
    }
    duplicate.add(JSON.stringify(rows));
    offset++;
}

console.log(
    calculate(
        JSON.parse([...duplicate][((CYCLE - offset) % range) + offset - range])
    )
);

//* essential function

function calculate(rows) {
    return rows.reduce((prev, cur, idx) => {
        for (const char of cur) {
            if (char === 'O') {
                prev += rows.length - idx;
            }
        }
        return prev;
    }, 0);
}

function move(rows) {
    const newRows = new Array(rows.length)
        .fill('')
        .map(() => new Array(rows[0].length).fill('.'));
    for (const [r, row] of rows.entries()) {
        let next = 0;
        for (const [c, char] of row.split('').entries()) {
            if (char === 'O') {
                newRows[r][next] = 'O';
                next++;
            } else if (char === '#') {
                newRows[r][c] = '#';
                next = c + 1;
            }
        }
    }

    return newRows.map((x) => x.join(''));
}

function cycle(rows) {
    return headEast(headSouth(headWest(headNorth(rows))));
}

function headNorth(rows) {
    const newRows = move(transpose(rows));
    return transpose(newRows);
}

function headWest(rows) {
    return move(rows);
}

function headSouth(rows) {
    const reversedRow = [...rows].reverse();
    const newRows = move(transpose(reversedRow));
    return [...transpose(newRows)].reverse();
}

function headEast(rows) {
    const newRows = move(reverse(rows));
    return reverse(newRows);
}

function transpose(rows) {
    return rows[0]
        .split('')
        .map((_, colIndex) => rows.map((row) => row[colIndex]))
        .map((row) => row.join(''));
}

function reverse(rows) {
    return rows.map((row) => {
        return [...row.split('')].reverse().join('');
    });
}
