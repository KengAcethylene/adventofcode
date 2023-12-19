const { readFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8')
    .split('\n\n')
    .map((row) => row.split('\n'));

const conditions = {};

for (const conds of rows[0]) {
    const [name, cond] = conds.split('{');
    conditions[name] = cond.slice(0, -1).split(',');
}

const mergedCondition = [[[], 'in']];
const passedCondition = [];

while (mergedCondition.length !== 0) {
    const [prevCond, next] = mergedCondition.shift();
    const copyPrevCond = JSON.parse(JSON.stringify(prevCond));

    //* if A, push to passedCondition array
    if (next === 'A') {
        passedCondition.push(prevCond);
        continue;
    }

    //* if R, ignore and stop process it
    if (next === 'R') {
        continue;
    }
    const avaliableCondition = conditions[next];

    //* map every possible way start from in -> x1 , in -> x2
    for (const [condIdx, cond] of avaliableCondition.entries()) {
        //* every conditions except first have to reverse from 'x>value --> x<value+1' and 'x<value --> x>value-1'
        const reversedCondtion = avaliableCondition
            .slice(0, condIdx)
            .map((cond) => {
                const [c] = cond.split(':');
                const valueInt = parseInt(c.slice(2));
                return `${c[0]}${c[1] === '<' ? '>' : '<'}${
                    c[1] === '<' ? valueInt - 1 : valueInt + 1
                }`;
            });
        const newPrevCond = [...copyPrevCond, ...reversedCondtion];

        //* every conditions except last have to add current condition
        const currentCond = cond.split(':');
        if (condIdx !== avaliableCondition.length - 1) {
            newPrevCond.push(currentCond[0]);
        }

        //* last itself is next
        mergedCondition.push([
            newPrevCond,
            condIdx !== avaliableCondition.length - 1 ? currentCond[1] : cond,
        ]);
    }
}

console.log(
    passedCondition.reduce((prev, cur) => prev + processCombination(cur), 0)
);

//* function
function processCombination(passedCondition) {
    const avaliable = {
        x: [1, 4001], //*format [1, 4001) --> have 4000 possible value
        m: [1, 4001],
        a: [1, 4001],
        s: [1, 4001],
    };

    for (const cond of passedCondition) {
        const valueIdx = cond[0];
        const operand = cond[1];
        const valueInt = parseInt(cond.slice(2));

        if (operand === '>') {
            avaliable[valueIdx][0] = Math.max(
                avaliable[valueIdx][0],
                valueInt + 1
            );
        } else {
            avaliable[valueIdx][1] = Math.min(avaliable[valueIdx][1], valueInt);
        }
    }
    const combination = Object.values(avaliable).reduce(
        (prev, cur) => prev * (cur[1] - cur[0]),
        1
    );
    return combination;
}
