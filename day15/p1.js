const { readFileSync } = require('fs');

const words = readFileSync(`${__dirname}/text.txt`, 'utf-8').split(',');

const sum = words.reduce((prev, curr) => {
    return prev + hash(curr);
}, 0);

console.log(sum);

//* function
function hash(curr) {
    return curr.split('').reduce((prev, curr) => {
        prev = ((prev + curr.charCodeAt(0)) * 17) % 256;
        return prev;
    }, 0);
}
