const { readFileSync } = require('fs');

const words = readFileSync(`${__dirname}/text.txt`, 'utf-8').split(',');

const boxes = new Array(256).fill('').map((_) => []);
const focalLength = {};

for (const word of words) {
    if (word.includes('-')) {
        const label = word.slice(0, -1);
        const idx = hash(label);
        boxes[idx] = boxes[idx].filter((x) => x !== label);
    } else {
        const [label, focal] = word.split('=');
        const idx = hash(label);
        if (boxes[idx].findIndex((x) => x === label) === -1) {
            boxes[idx].push(label);
        }
        focalLength[label] = focal * 1;
    }
}

const focusPower = boxes.reduce((prev, curr, boxIdx) => {
    return curr.length !== 0 ? prev + getFocusingPower(curr, boxIdx) : prev;
}, 0);

console.log(focusPower);

//* function
function hash(curr) {
    return curr.split('').reduce((prev, curr) => {
        prev = ((prev + curr.charCodeAt(0)) * 17) % 256;
        return prev;
    }, 0);
}

function getFocusingPower(curr, boxIdx) {
    return curr.reduce(
        (prev, label, slotIdx) =>
            prev + (boxIdx + 1) * (slotIdx + 1) * focalLength[label],
        0
    );
}
