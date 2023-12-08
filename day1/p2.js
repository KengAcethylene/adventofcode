const { readFileSync } = require('fs');

const lines = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');

const process = (line) => {
    const result = [
        ...line.matchAll(
            /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
        ),
    ];
    const numberMap = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    };
    let first = result.at(0).at(1);
    let last = result.at(-1).at(1);

    first = isNaN(parseInt(first)) ? numberMap[first] : first;
    last = isNaN(parseInt(last)) ? numberMap[last] : last;
    return first * 10 + last * 1;
};

const sum = lines.reduce((prev, line) => prev + process(line), 0);
console.log(sum);
