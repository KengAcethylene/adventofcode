const { readFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8')
    .split('\n\n')
    .map((row) => row.split('\n'));

const conditions = {};

for (const conds of rows[0]) {
    const [name, cond] = conds.slice(0, -1).split('{');
    const temp = cond.split(',');
    conditions[name] = [
        ...temp.slice(0, -1).map((cond) => {
            const [rule, next] = cond.split(':');
            return [rule[0], rule[1], parseInt(rule.slice(2)), next];
        }),
        temp.at(-1),
    ];
}

const mergedCondition = [[[], 'in']];

while (!mergedCondition.every((condition) => condition.at(-1) === 'A')) {
    const [prevCond, next] = mergedCondition.shift();

    //* if A, push back to array
    if (next === 'A') {
        mergedCondition.push([prevCond, next]);
        continue;
    }

    //* if R, ignore and stop process it
    if (next === 'R') {
        continue;
    }
    const avaliableCondition = conditions[next];

    //* map every possible way start from in -> x1 , in -> x2
    const reversedCondtion = [];
    for (const [key, operand, value, newNext] of avaliableCondition.slice(
        0,
        -1
    )) {
        const newPrevCond = [
            ...prevCond,
            ...reversedCondtion,
            [key, operand, value],
        ];
        mergedCondition.push([newPrevCond, newNext]);
        reversedCondtion.push([
            key,
            operand === '>' ? '<' : '>',
            operand === '>' ? value + 1 : value - 1,
        ]);
    }
    mergedCondition.push([
        [...prevCond, ...reversedCondtion],
        avaliableCondition.at(-1),
    ]);
}

const combination = mergedCondition.reduce(
    (prev, cur) => prev + processCombination(cur[0]),
    0
);
console.log(combination);

//* function
function processCombination(passedCondition) {
    const avaliable = {
        x: [1, 4001], //*format [1, 4001) --> have 4000 possible value
        m: [1, 4001],
        a: [1, 4001],
        s: [1, 4001],
    };

    for (const [key, operand, value] of passedCondition) {
        if (operand === '>') {
            avaliable[key][0] = Math.max(avaliable[key][0], value + 1);
        } else {
            avaliable[key][1] = Math.min(avaliable[key][1], value);
        }
    }
    const combination = Object.values(avaliable).reduce(
        (prev, cur) => prev * (cur[1] - cur[0]),
        1
    );
    return combination;
}
