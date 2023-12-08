const { readFileSync } = require('fs');

let sum = 0;

const lines = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');
for (const line of lines) {
    const [gameLine, ballLine] = line.split(':');
    const fewestBall = {};
    const gameId = gameLine.split(' ')[1];
    for (const balls of ballLine.split(';')) {
        for (const ball of balls.split(',')) {
            const [amount, colour] = ball.trim().split(' ');
            if (
                fewestBall[colour] === undefined ||
                amount > fewestBall[colour]
            ) {
                fewestBall[colour] = amount * 1;
            }
        }
    }

    const power = Object.values(fewestBall).reduce((prev, curr) => {
        return prev * curr;
    }, 1);
    sum += power;
}

console.log(sum);
