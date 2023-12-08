const { readFileSync } = require('fs');

const table = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');
const multipy = {};

for (const [lineNumber, line] of table.entries()) {
    let digit = '';
    let charAt = -1;
    let lineAt = -1;
    let length = 0;
    for (const [charNumber, char] of Object.entries(line)) {
        if (!isNaN(parseInt(char))) {
            digit += char;

            if (charAt === -1) {
                charAt = parseInt(charNumber);
                lineAt = lineNumber;
            }

            length++;

            if (charNumber == line.length - 1) {
                const starPositions = gotStarPositions(
                    charAt,
                    lineAt,
                    length,
                    line.length,
                    table.length
                );
                for (const starPosition of starPositions) {
                    multipy[starPosition] = [
                        ...(multipy[starPosition] ?? []),
                        digit * 1,
                    ];
                }
                digit = '';
                charAt = -1;
                lineAt = -1;
                length = 0;
            }
        } else {
            if (digit) {
                const starPositions = gotStarPositions(
                    charAt,
                    lineAt,
                    length,
                    line.length,
                    table.length
                );
                for (const starPosition of starPositions) {
                    multipy[starPosition] = [
                        ...(multipy[starPosition] ?? []),
                        digit * 1,
                    ];
                }
                digit = '';
                charAt = -1;
                lineAt = -1;
                length = 0;
            }
        }
    }
}
const sum = Object.values(multipy)
    .filter((list) => list.length === 2)
    .map((list) => list.reduce((prev, curr) => curr * prev, 1))
    .reduce((prev, gear_ratio) => prev + gear_ratio, 0);
console.log(sum);

function gotStarPositions(charAt, lineAt, length, charMax, lineMax) {
    const positions = [];
    for (const lineNumber of [lineAt - 1, lineAt + 1]) {
        if (lineNumber < 0 || lineNumber >= lineMax) {
            continue;
        }
        for (
            let charNumber = charAt - 1;
            charNumber <= charAt + length;
            charNumber++
        ) {
            if (charNumber < 0 || charNumber >= charMax) {
                continue;
            }
            const char = table[lineNumber][charNumber];
            if (char === '*') {
                positions.push(`${lineNumber}.${charNumber}`);
            }
        }
    }
    for (const charEdge of [charAt - 1, charAt + length]) {
        if (charEdge < 0 || charEdge >= charMax) {
            continue;
        }
        const char = table[lineAt][charEdge];
        if (char === '*') {
            positions.push(`${lineAt}.${charEdge}`);
        }
    }

    return positions;
}
