const { readFileSync } = require('fs');
const lines = readFileSync(`${__dirname}/test2.txt`, 'utf-8').split('\n');
const instructions = lines[0];

const map = lines
    .slice(2)
    .map((line) => {
        const [key, paths] = line.split(' = ');
        const [left, right] = paths.split(', ');
        return [key, [left.slice(1), right.slice(0, -1)]];
    })
    .reduce((prev, [key, paths]) => {
        prev[key] = paths;
        return prev;
    }, {});

let idx = 0,
    step = 0,
    destination = Object.keys(map).filter((key) => key.endsWith('A'));
let answer = new Array(destination.length).fill(0).map((x) => {
    return { amount: 0, step: 0 };
});

let limit = 2;
while (!answer.every((step) => step.step === limit)) {
    idx = idx === instructions.length ? 0 : idx;
    for (const [desIdx, key] of destination.entries()) {
        destination[desIdx] =
            instructions[idx] === 'L' ? map[key][0] : map[key][1];
        if (destination[desIdx].endsWith('Z') && answer[desIdx].step < limit) {
            answer[desIdx].amount = step - answer[desIdx].amount;
            answer[desIdx].step++;
        }
    }
    step++;
    idx++;
}
const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);
console.log('%j', answer.map((x) => x.amount).reduce(lcm));
