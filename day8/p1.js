const { readFileSync } = require('fs');
const lines = readFileSync(`${__dirname}/text.txt`,'utf-8').split('\n');
const instructions = lines[0];

const map = lines.slice(2).map(line => {
    const [key, paths] = line.split(' = ');
    const [left, right] = paths.split(', ');
    return [key, [left.slice(1), right.slice(0,-1)]]
}).reduce((prev, [key, paths]) => {
    prev[key] = paths;
    return prev;
},{})

let idx = 0, step = 0, destination = 'AAA';

while(destination !== 'ZZZ'){
    idx = idx === instructions.length ? 0: idx;
    destination = instructions[idx] === 'L' ? map[destination][0] : map[destination][1];
    step++;
    idx++;
}

console.log(step);
