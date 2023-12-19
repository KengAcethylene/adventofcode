const { readFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8')
    .split('\n\n')
    .map((row) => row.split('\n'));

const conditions = {};

for (const conds of rows[0]) {
    const [name, cond] = conds.split('{');
    conditions[name] = cond.slice(0, -1).split(',');
}

let sum = 0;

for (const input of rows[1]) {
    const inputObj = Object.fromEntries(
        input
            .slice(1, -1)
            .split(',')
            .map((x) => {
                const temp = x.split('=');
                temp[1] = parseInt(temp[1]);
                return temp;
            })
    );

    let next = 'in';

    while (next !== 'R' && next !== 'A') {
        const conds = conditions[next];
        for (const [idx, cond] of conds.entries()) {
            if (idx !== conds.length - 1) {
                const [stringCondition, n] = cond.split(':');
                const valueIdx = stringCondition[0];
                const operand = stringCondition[1];
                const valueCondition = parseInt(stringCondition.slice(2));
                const isPass =
                    operand === '<'
                        ? inputObj[valueIdx] < valueCondition
                        : inputObj[valueIdx] > valueCondition;
                if (isPass) {
                    next = n;
                    break;
                }
            } else {
                next = cond;
            }
        }
    }

    if (next === 'A') {
        sum += Object.values(inputObj).reduce((prev, cur) => prev + cur, 0);
    }
}
console.log(sum);
