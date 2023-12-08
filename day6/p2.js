const { readFileSync } = require('fs');
const [times, distances] = readFileSync(`${__dirname}/test.txt`, 'utf-8').split(
    '\n'
);
const timesMap = times
    .slice(times.indexOf(':') + 1)
    .trim()
    .split(/\s+/)
    .join('');
const distancesMap = distances
    .slice(distances.indexOf(':') + 1)
    .trim()
    .split(/\s+/)
    .join('');
let answer;

console.log(timesMap, distancesMap);
const middle = timesMap / 2;
const diff = Math.pow(Math.pow(timesMap, 2) / 4 - distancesMap, 0.5);

const range = [middle - diff, middle + diff];
const roundRange = [Math.ceil(middle - diff), Math.floor(middle + diff)];

if (roundRange[0] === range[0]) {
    roundRange[0]++;
}

if (roundRange[1] === range[1]) {
    roundRange[1]--;
}

console.log(roundRange);
answer = roundRange[1] - roundRange[0] + 1;

console.log(answer);
