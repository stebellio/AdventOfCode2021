import {PuzzleInput, solution1, solution2} from "../commons";

const puzzleInput = new PuzzleInput();

type Points = {
    ")": number,
    "]": number,
    "}": number,
    ">": number
}

let points: Points = {
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

// Part2
const invalidChunkCompletion: string[][] = [];
const multiplier: number = 5;
points = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}

chunks.forEach((chunk: string[]) => {
    if (isCorrupted(chunk)) {
        return;
    }

    let end_symbols: string[] = [];

    chunk.forEach((symbol: string) => {

        switch (symbol) {
            case ROUND.start:
                end_symbols.push(ROUND.end);
                break;
            case SQUARE.start:
                end_symbols.push(SQUARE.end);
                break;
            case BRACE.start:
                end_symbols.push(BRACE.end);
                break;
            case ARROW.start:
                end_symbols.push(ARROW.end);
                break;
            default:
                end_symbols.pop();
                break;
        }
    });

    invalidChunkCompletion.push(end_symbols.reverse());
});

let scores: number[] = [];
invalidChunkCompletion.forEach((symbols: string[]) => {
    let totalScore: number = 0;

    symbols.forEach((symbol: string) => {
        totalScore *= multiplier;
        totalScore += points[symbol];
    })

    scores.push(totalScore);
})

// scores.push(corrupted_score);

scores.sort((first: number, second: number) => {
    return first - second;
});

const winner_index = (scores.length / 2) - 0.5;
solution2(scores[winner_index]);


