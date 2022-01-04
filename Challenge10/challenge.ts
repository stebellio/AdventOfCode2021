import {PuzzleInput, solution1} from "../commons";

const puzzleInput = new PuzzleInput();

const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}
type Delimiter = {
    start: string,
    end: string
}

const ROUND: Delimiter = {
    start: '(',
    end: ')'
}
const SQUARE: Delimiter = {
    start: '[',
    end: ']'
}
const BRACE: Delimiter = {
    start: '{',
    end: '}'
}
const ARROW: Delimiter = {
    start: '<',
    end: '>'
}

const chunks: string[][] = [];
puzzleInput.rows.forEach((row: string) => {
    let chunk: string[] = [];
    row.split('').forEach((symbol: string) => {
        chunk.push(symbol);
    })
    chunks.push(chunk);
})

const isCorrupted = (chunk: string[]): string|boolean => {
    let corrupted_symbol: string|boolean = false;
    let chunk_end_symbol: string[] = [];

    chunk.forEach((symbol: string) => {

        switch (symbol) {
            case ROUND.start:
                chunk_end_symbol.push(ROUND.end);
                break;
            case SQUARE.start:
                chunk_end_symbol.push(SQUARE.end);
                break;
            case BRACE.start:
                chunk_end_symbol.push(BRACE.end);
                break;
            case ARROW.start:
                chunk_end_symbol.push(ARROW.end);
                break;
            default:
                let current_exprected_symbol: string = chunk_end_symbol[chunk_end_symbol.length - 1];

                if (current_exprected_symbol !== symbol && !corrupted_symbol) {
                   corrupted_symbol = symbol;
                }

                chunk_end_symbol.pop();
                break;
        }
    });

    return corrupted_symbol;
}
const getPoints = (symbols: string[]): number => {
    let res: number = 0;

    symbols.forEach((symbol: string) => {
        res += points[symbol];
    });

    return  res;
}

// Part 1
let corrupted_symbols: string[] = [];
chunks.forEach((chunk: string[]) => {
    const corrupted_symbol: string|boolean = isCorrupted(chunk);

    if (typeof corrupted_symbol === "string") {
        corrupted_symbols.push(corrupted_symbol);
    }
});
solution1(getPoints(corrupted_symbols));


