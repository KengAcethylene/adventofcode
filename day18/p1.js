const { readFileSync, writeFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8')
    .split('\n')
    .map((row) => row.split(' '));

const dir = { L: [0, -1], R: [0, 1], U: [-1, 0], D: [1, 0] };

const points = [[0, 0]];
let b = 0;

for (const row of rows) {
    const [direction, value] = row;

    const [dr, dc] = dir[direction];

    const valueInt = parseInt(value);

    b += valueInt;
    const [r, c] = points.at(-1);
    points.push([r + dr * valueInt, c + dc * valueInt]);
}

// apply shoelace formula & pick theorem
const A =
    Math.abs(
        points
            .map(
                ([r, _], idx) =>
                    r *
                    (points.at((idx + 1) % points.length)[1] -
                        points.at(idx - 1)[1])
            )
            .reduce((prev, cur) => prev + cur, 0)
    ) / 2;
console.log(A, b);
const i = A - parseInt(b / 2) + 1;

console.log(i + b);
