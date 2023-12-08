const { readFileSync } = require('fs');

const table = readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n');

let sum = 0;

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
                const isSymbolAdj = isThereSymbolAdjacent(
                    charAt,
                    lineAt,
                    length,
                    line.length,
                    table.length
                );
                if (isSymbolAdj) {
                    sum += digit * 1;
                }
                digit = '';
                charAt = -1;
                lineAt = -1;
                length = 0;
            }
        } else {
            if (digit) {
                const isSymbolAdj = isThereSymbolAdjacent(
                    charAt,
                    lineAt,
                    length,
                    line.length,
                    table.length
                );
                if (isSymbolAdj) {
                    sum += digit * 1;
                }
                digit = '';
                charAt = -1;
                lineAt = -1;
                length = 0;
            }
        }
    }
}

console.log(sum);

function isThereSymbolAdjacent(charAt, lineAt, length, charMax, lineMax) {
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
            if (isNaN(parseInt(char)) && char !== '.') {
                return true;
            }
        }
    }
    for (const charEdge of [charAt - 1, charAt + length]) {
        if (charEdge < 0 || charEdge >= charMax) {
            continue;
        }
        const char = table[lineAt][charEdge];
        if (isNaN(parseInt(char)) && char !== '.') {
            return true;
        }
    }

    return false;
}
