const { log } = require('console');
const { readFileSync } = require('fs');

const lines = readFileSync(`${__dirname}/text.txt`,'utf-8').split('\n');
const seeds = lines[0].split(':')[1].trim().split(' ').map((x)=> (parseInt(x)));
let seedRanges = [];
const maps = [];
let map;

for (let i = 0; i< seeds.length; i+=2){
    seedRanges.push([seeds[i], seeds[i] + seeds[i+1]]);
}

for (const line of lines.slice(1)){
    if (line === ''){
        continue;
    }
    
    if (line.includes('map:')){
        map = [];
        maps.push(map)
        continue;
    }
    map.push(line.split(' ').map((x) => parseInt(x)));
}

for (const rules of maps){
    const mapped = [];
    while (seedRanges.length > 0){
        const [start,end] = seedRanges.pop();
        let isBreak = false;
        for (const [desStart,srcStart,length] of rules){
            const overlapStart = Math.max(start,srcStart);
            const overlapEnd = Math.min(end,srcStart+length);
            const off = desStart-srcStart;

            if (overlapStart < overlapEnd){
                mapped.push([overlapStart+off, overlapEnd+off]);
                if(overlapStart > start){
                    seedRanges.push([start,overlapStart]);
                }
                if (end > overlapEnd){
                    seedRanges.push([overlapEnd,end]);
                }
                isBreak = true;
                break;
            }
        }
        if (!isBreak){
            mapped.push([start,end]);
        }
    }
    seedRanges = mapped;
}
console.log(seedRanges.sort((a,b)=> a[0]-b[0])[0][0]);

