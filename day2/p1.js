const { readFileSync } = require('fs');

const totalBall = {
    'red' : 12,
    'green': 13,
    'blue': 14
}

let sum = 0;

const lines = readFileSync(`${__dirname}/text.txt`,'utf-8').split('\n');
for (const line of lines){
    const [gameLine, ballLine] = line.split(':');
    let isGameInvalid =  false;
    const gameId = gameLine.split(' ')[1];
    for (const balls of ballLine.split(';')){
        for (const ball of balls.split(',')){
            const [amount, colour] = ball.trim().split(' ');
            if (amount > totalBall[colour]){
                isGameInvalid = true;
                break;
            }
        }

        if (isGameInvalid){
            break;
        }
    }

    if (!isGameInvalid){
        sum += gameId * 1;
    }
}

console.log(sum);