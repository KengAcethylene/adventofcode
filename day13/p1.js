const { readFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');
let pattern = [];
let sum = 0;
for (const row of rows){
    if (row !== ''){
        pattern.push(row)
    }else {
        let transposePattern = pattern[0].split('').map((_, colIndex) => pattern.map(row => row[colIndex])).map(row => row.join(""));
        const note = getMiddle(pattern)*100 + getMiddle(transposePattern);
        sum += note;
        pattern = []
    }
}

console.log(sum);

function getMiddle(patterns){
    for (let row = 0; row < patterns.length-1;row++){
        let left = row;
        let right = row+1;
        let isMirror = true;
        while(left >= 0 && right < patterns.length){
            if (patterns[left] !== patterns[right]){
                isMirror = false;
                break;
            }
            left--;
            right++;
        }
        if (isMirror){
            return row+1;
        }
    }

    return 0;
}