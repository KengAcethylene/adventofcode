const { readFileSync } = require('fs');

const lines = readFileSync(`${__dirname}/test.txt`, 'utf-8').split('\n');

const steps = new Array(lines.length)
    .fill(0)
    .map((x) => new Array(lines[0].length).fill(0));
const map = {
    '|': [
        [0, -1],
        [0, 1],
    ],
    '-': [
        [-1, 0],
        [1, 0],
    ],
    F: [
        [1, 0],
        [0, 1],
    ],
    J: [
        [-1, 0],
        [0, -1],
    ],
    7: [
        [-1, 0],
        [0, 1],
    ],
    L: [
        [1, 0],
        [0, -1],
    ],
};
const [xSPos, ySPos] = lines.reduce((sPos, line, index) => {
    if (sPos === null) {
        const idx = line.indexOf('S');
        if (idx !== -1) {
            return [idx, index];
        }
    }
    return sPos;
}, null);

const queue = [];

for (const [adjOffX, adjOffY] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
]) {
    const adjXPos = xSPos + adjOffX;
    const adjYPos = ySPos + adjOffY;
    if (checkXPos(adjXPos) || checkYPos(adjYPos)) {
        continue;
    }

    const adj = lines[adjYPos][adjXPos];
    if (adj !== '.') {
        if (
            map[adj].some(([nextOffX, nextOffY]) => {
                const nextXPos = adjXPos + nextOffX;
                const nextYPos = adjYPos + nextOffY;
                if (checkXPos(nextXPos) || checkYPos(nextYPos)) {
                    return false;
                }
                return lines[nextYPos][nextXPos] === 'S';
            })
        ) {
            steps[adjYPos][adjXPos] = 1;
            queue.push([[xSPos, ySPos], [adjXPos, adjYPos], 0]);
        }
    }
}

while (true) {
    const [prevPos, curPos, step] = queue.shift();
    const curChar = lines[curPos[1]][curPos[0]];
    const curStep = steps[curPos[1]][curPos[0]];
    const [nextOffX, nextOffY] = map[curChar].filter(([offX, offY]) => {
        const nextX = curPos[0] + offX;
        const nextY = curPos[1] + offY;
        return !(nextX === prevPos[0] && nextY === prevPos[1]);
    })[0];

    if (curStep === 0) {
        steps[curPos[1]][curPos[0]] = step + 1;
        queue.push([
            [...curPos],
            [curPos[0] + nextOffX, curPos[1] + nextOffY],
            step + 1,
        ]);
    } else {
        if (curStep < step + 1) {
            break;
        } else {
            steps[curPos[1]][curPos[0]] = step + 1;
            queue.push([
                [...curPos],
                [curPos[0] + nextOffX, curPos[1] + nextOffY],
                step + 1,
            ]);
        }
    }
}

function checkXPos(xPos) {
    return xPos < 0 || xPos >= lines[0].length;
}

function checkYPos(yPos) {
    return yPos < 0 || yPos >= lines.length;
}
console.log(Math.max(...steps.map((x) => Math.max(...x))));
