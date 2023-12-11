const { readFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');

const galaxies = [];
const pairs = new Set();

const noExpandCol = new Set();
const noExpandRow = new Set();

const allCol = new Set([...Array(rows[0].length).keys()]);
const allRow = new Set([...Array(rows.length).keys()]);

for (const [r, row] of rows.entries()) {
    for (const [c, char] of Object.entries(row)) {
        if (char === '#') {
            const cIdx = parseInt(c);
            noExpandCol.add(cIdx);
            noExpandRow.add(r);
            galaxies.push([cIdx, r]);
        }
    }
}

const expandCol = different(allCol, noExpandCol);
const expandRow = different(allRow, noExpandRow);

// calculate ( [galaxies.length] c 2 )
for (const r of galaxies.keys()) {
    for (const c of galaxies.keys()) {
        if (c !== r && !pairs.has(`${c},${r}`) && !pairs.has(`${r},${c}`)) {
            pairs.add(`${r},${c}`);
        }
    }
}

let total = 0;
const expandRate = 1000000;
for (const pair of [...pairs]) {
    const [pos1, pos2] = pair.split(',');
    const galaxy1 = galaxies[pos1 * 1];
    const galaxy2 = galaxies[pos2 * 1];

    const step =
        Math.abs(galaxy1[0] - galaxy2[0]) +
        Math.abs(galaxy1[1] - galaxy2[1]) +
        [...expandCol].filter(
            (c) =>
                c > Math.min(galaxy1[0], galaxy2[0]) &&
                c < Math.max(galaxy1[0], galaxy2[0])
        ).length *
            (expandRate - 1) +
        [...expandRow].filter(
            (r) =>
                r > Math.min(galaxy1[1], galaxy2[1]) &&
                r < Math.max(galaxy1[1], galaxy2[1])
        ).length *
            (expandRate - 1);
    total += step;
}

console.log(total);
/**
 *
 * @param {Set} a
 * @param {Set} b
 */
function different(a, b) {
    return new Set([...a].filter((i) => !b.has(i)));
}
