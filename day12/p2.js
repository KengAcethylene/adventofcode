const { readFileSync } = require('fs');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');

const cache = {}

let total = 0
for (const row of rows) {
    let [cfg, nums] = row.split(' ');
    cfg = new Array(5).fill(cfg).join('?');
    nums = new Array(5).fill(nums).join(',').split(',').map((x) => parseInt(x));
    const count = process(cfg, nums);
    total += count;
}

console.log(total);

function process(cfg, nums) {
    if (cfg === '') {
        return nums.length === 0 ? 1 : 0;
    }

    if (nums.length === 0) {
        return cfg.includes('#') ? 0 : 1;
    }

    let key = `${cfg}${nums.toString()}`
    if (cache[key] !== undefined){
        return cache[key];
    }

    let result = 0;

    if (".?".includes(cfg[0])) {
        result += process(cfg.slice(1), nums);
    }

    if ("#?".includes(cfg[0])) {
        if (nums[0] <= cfg.length && !cfg.slice(0, nums[0]).includes('.') && (cfg.length === nums[0] || cfg[nums[0]] !== '#')) {
            result += process(cfg.slice(nums[0] + 1), nums.slice(1))
        }
        else {
            result += 0;
        }
    }
    cache[key] = result;
    return result;
}