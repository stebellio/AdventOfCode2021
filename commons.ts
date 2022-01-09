import * as fs from 'fs';

export class PuzzleInput {

    private readonly _input: string;
    private readonly _rows: string[];

    constructor(number?: number) {

        let filename: string = 'input';

        number && (filename += number);

        this._input = fs.readFileSync(filename + '.txt', 'utf8');
        this._rows = this._input.split('\n');
    }

    get input(): string {
        return this._input;
    }

    get rows(): string[] {
        return this._rows;
    }
}

export function solution1(solution: any) {
    console.log('First solution: ' + solution);
}

export function solution2(solution: any) {
    console.log('Second solution: ' + solution);
}

export function bin2int(bin: string): number {
    return parseInt(bin, 2);
}

export function createSquareGrid(dimension: number, fill: any) {
    return Array(dimension).fill(fill).map(()=>Array(dimension).fill(fill))
}

export function transposeMatrix(data: any[]) {
    return Object.keys(data[0]).map(function(c) {
        return data.map(function(r) { return r[c]; });
    });
}

export const getIndicesOf = (searchStr: string, str: string, caseSensitive: boolean = false) => {
    let searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    let startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}