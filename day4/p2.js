const { readFileSync } = require('fs');

const lines = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');

const totalCard = Array(lines.length).fill(1);

for (const [lineNumber, line] of lines.entries()) {
    const [winingNums, poolNums] = line.split('|');
    const winingNumsSet = new Set(winingNums.split(':')[1].trim().split(/\s+/));
    let length = 0;
    for (const nums of poolNums.trim().split(/\s+/)) {
        if (winingNumsSet.has(nums)) {
            length++;
        }
    }

    for (
        let lineNum = lineNumber + 1;
        lineNum <= lineNumber + length && lineNum < lines.length;
        lineNum++
    ) {
        totalCard[lineNum] += totalCard[lineNumber];
    }
}

console.log(totalCard.reduce((prev, curr) => prev + curr, 0));
