const { readFileSync } = require('fs');

const lines = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');
const seeds = lines[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((x) => parseInt(x));
const map = [];

let latestKey;
for (const line of lines.splice(1)) {
    if (line === '') {
        continue;
    }

    if (line.includes('map:')) {
        latestKey = line;
        continue;
    }
    map[latestKey] = [
        ...(map[latestKey] ?? []),
        line.split(' ').map((x) => parseInt(x)),
    ];
}

const sortMap = Object.entries(map).reduce((prev, [key, value]) => {
    prev[key] = value.sort((a, b) => a[1] - b[1]);
    return prev;
}, {});

function getLocation(seed) {
    return Object.values(sortMap).reduce((prev, curr) => {
        return getDestination(curr, prev);
    }, seed);
}

function getDestination(map, source) {
    const index = map.reduce((prev, curr, idx) => {
        const [, sourceStart] = curr;
        if (source >= sourceStart) {
            prev = idx;
        }
        return prev;
    }, -1);

    if (index === -1) {
        return source;
    }
    const [desStart, srcStart, length] = map[index];

    if (source >= srcStart + length) {
        return source;
    } else {
        return desStart + source - srcStart;
    }
}

const minLocation = seeds.reduce((prev, curr) => {
    const location = getLocation(curr);
    return location < prev ? location : prev;
}, Infinity);

console.log(minLocation);
