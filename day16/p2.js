const { readFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8')
    .split('\n')
    .map((x) => x.split(''));
let max = -Infinity;
const start = Date.now();
console.log(`start ${start}`);
for (const [r, row] of rows.entries()) {
    for (const c of row.keys()) {
        if (r === 0 || r === rows.length - 1) {
            max = Math.max(max, process(r, c, r === 0 ? 1 : -1, 0));
        }

        if (c === 0 || c === row.length - 1) {
            max = Math.max(max, process(r, c, 0, c === 0 ? 1 : -1));
        }
    }
}
const end = Date.now();
console.log(max);
console.log(`end ${end}`);
console.log(`range ${(end - start) / 1000} s`);

//* function
function process(startR, startC, startROff, startCOff) {
    // const rows = JSON.parse(JSON.stringify(rows));
    const next = [[startR, startC, startROff, startCOff]];
    const seen = new Set();

    while (next.length !== 0) {
        const [r, c, rOff, cOff] = next.pop();
        if (r < 0 || r >= rows.length || c < 0 || c >= rows[0].length) {
            continue;
        }
        if (seen.has(JSON.stringify([r, c, rOff, cOff]))) {
            continue;
        }

        const char = rows[r][c];
        if (char === '.') {
            next.push([r + rOff, c + cOff, rOff, cOff]);
        }

        if (char === '/' || char === '\\') {
            const mirror = char === '/' ? -1 : 1;
            if (rOff) {
                next.push([r, c + rOff * mirror, 0, rOff * mirror]);
            }

            if (cOff) {
                next.push([r + cOff * mirror, c, cOff * mirror, 0]);
            }
        }

        if (char === '|') {
            if (rOff) {
                next.push([r + rOff, c + cOff, rOff, cOff]);
            }

            if (cOff) {
                for (const mirror of [-1, 1]) {
                    next.push([r + mirror, c, mirror, 0]);
                }
            }
        }

        if (char === '-') {
            if (rOff) {
                for (const mirror of [-1, 1]) {
                    next.push([r, c + mirror, 0, mirror]);
                }
            }

            if (cOff) {
                next.push([r + rOff, c + cOff, rOff, cOff]);
            }
        }
        seen.add(JSON.stringify([r, c, rOff, cOff]));
    }

    const coordinate = [...seen].reduce((prev, curr) => {
        const [r, c, ,] = JSON.parse(curr);
        prev.add(JSON.stringify([r, c]));
        return prev;
    }, new Set());

    return coordinate.size;
}
