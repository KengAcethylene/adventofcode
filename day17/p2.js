const { readFileSync } = require('fs');
const Heap = require('collections/heap');

const rows = readFileSync(`${__dirname}/text.txt`, 'utf-8')
    .split('\n')
    .map((x) => x.split('').map((y) => parseInt(y)));

const minHeap = new Heap([[0, 0, 0, 0, 0, 0]], null, compare);
const seen = new Set();

while (minHeap.length !== 0) {
    const [hl, r, c, dr, dc, step] = minHeap.pop();
    const key = tuple(r, c, dr, dc, step);

    if (c === rows[0].length - 1 && r === rows.length - 1 && step >= 4) {
        console.log(hl);
        break;
    }

    if (seen.has(key)) {
        continue;
    }
    seen.add(key);

    if (step < 10 && tuple(dr, dc) !== tuple(0, 0)) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows.length && nc >= 0 && nc < rows[0].length) {
            minHeap.push([hl + rows[nr][nc], nr, nc, dr, dc, step + 1]);
        }
    }
    if (step >= 4 || tuple(dr, dc) === tuple(0, 0)) {
        for (const [ndr, ndc] of [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ]) {
            if (
                tuple(ndr, ndc) !== tuple(dr, dc) &&
                tuple(ndr, ndc) !== tuple(-dr, -dc)
            ) {
                const nr = r + ndr;
                const nc = c + ndc;
                if (
                    nr >= 0 &&
                    nr < rows.length &&
                    nc >= 0 &&
                    nc < rows[0].length
                ) {
                    minHeap.push([hl + rows[nr][nc], nr, nc, ndr, ndc, 1]);
                }
            }
        }
    }
}

//* function
function tuple(...value) {
    return JSON.stringify(value);
}

function compare(a, b) {
    if (b[0] !== a[0]) {
        return b[0] - a[0];
    }

    if (b[1] !== a[1]) {
        return b[1] - a[1];
    }

    if (b[2] !== a[2]) {
        return b[2] - a[2];
    }

    if (b[3] !== a[3]) {
        return b[3] - a[3];
    }

    if (b[4] !== a[4]) {
        return b[4] - a[4];
    }

    if (b[5] !== a[5]) {
        return b[5] - a[5];
    }
}
