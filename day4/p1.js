const { readFileSync } = require('fs');

const lines = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');

const sum = lines
    .map((line) => {
        const [winingNums, poolNums] = line.split('|');
        const winingNumsSet = new Set(
            winingNums.split(':')[1].trim().split(/\s+/)
        );
        let length = 0;
        for (const nums of poolNums.trim().split(/\s+/)) {
            if (winingNumsSet.has(nums)) {
                length++;
            }
        }
        return length ? Math.pow(2, length - 1) : 0;
    })
    .reduce((prev, curr) => prev + curr, 0);

console.log(sum);
