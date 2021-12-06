import {PuzzleInput, solution1} from "../commons";

const puzzleInput = new PuzzleInput();
const blocks: string[] = puzzleInput.input.split('\n\n');
const getExtraction = (): number[] => {
    let array = [];
    blocks[0].split(',').forEach((el: string) => {
        array.push(Number.parseInt(el));
    });
    blocks.shift();
    return array;
}
const getBoards = (): number[][][] => {
    const maps: number[][][] = [];
    blocks.map((block: string, blockIndex: number) => {
        const formattedBlock: number[][] = [];
        block.split('\n').map((row: string, rowIndex: number) => {
            const formattedRow: number[] = [];
            row.split(' ').map((column: string, columnIndex: number) => {
                if (column !== '') {
                    formattedRow.push(Number.parseInt(column));
                }
            })
            formattedBlock.push(formattedRow);
        });
        maps.push(formattedBlock);
    });
    return maps;
}
const iterateMap = (callback) => {
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        for (let rowIndex = 0; rowIndex < boards[boardIndex].length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < boards[boardIndex][rowIndex].length; columnIndex++) {
                callback(boardIndex, rowIndex, columnIndex);
            }
        }
    }
}

// Part 1
const extraction: number[] = getExtraction();
const boards: number[][][] = getBoards();
let winner: number[][];
let lastNumber: number = 0;

for (let i = 0; i < extraction.length; i++) {
    let winnerBoard: number = 0;
    iterateMap((boardIndex: number, rowIndex: number) => {
        const result: number[] = boards[boardIndex][rowIndex].filter((column: number) => {
            return column !== extraction[i];
        });

        boards[boardIndex][rowIndex] = result;

        if (!result.length) {
            winnerBoard = boardIndex;
        }
    })

    if (winnerBoard) {
        winner = boards[winnerBoard];
        lastNumber = extraction[i];
        break;
    }
}

let unmarked: number = 0;
winner.forEach((row: number[]) => {
    row.forEach((number: number) => {
        unmarked += number;
    })
});
solution1(unmarked * lastNumber);
