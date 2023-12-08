const { readFileSync } = require('fs');
const lines = readFileSync(`${__dirname}/text.txt`,'utf-8').split('\n');
const maps = lines.map((n)=> n.split(' '));

const cardValue = {
    'A' : 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2
}


console.log(maps.sort((a,b)=>{
    if (a[0] === b[0]){
        return 0;
    }
    const aOrder = Object.values(a[0]).reduce((prev,curr)=>{
        prev[curr] = prev[curr] === undefined ? 1 : prev[curr]+1;
        return prev;
    },[]);

    const bOrder = Object.values(b[0]).reduce((prev,curr)=>{
        prev[curr] = prev[curr] === undefined ? 1 : prev[curr]+1;
        return prev;
    },{});
    const aValue = Object.values(aOrder).sort();
    const bValue = Object.values(bOrder).sort();

    while(aValue.length > 0 || bValue.length > 0){
        const maxA = aValue.pop();
        const maxB = bValue.pop();
        if (maxA !== maxB){
            return maxA - maxB;
        }
    }

    for(let i = 0; i< a[0].length; i++){
        const aValue = cardValue[a[0][i]];
        const bValue = cardValue[b[0][i]];
        if (aValue !== bValue){
            return aValue - bValue;
        }
    }
}).reduce((prev,curr,idx)=>{
    prev += curr[1] * (idx+1)
    return prev;
},0))