import {PuzzleInput, solution1, solution2, transposeMatrix} from "../commons";

type Extraction = {
    last: number,
    numbers: number[],
    winners: string[][][],
    winners_board_number: number[]
}

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
const getBoards = (): string[][][] => {
    const maps: string[][][] = [];
    blocks.map((block: string, blockIndex: number) => {
        const formattedBlock: string[][] = [];
        block.split('\n').map((row: string, rowIndex: number) => {
            const formattedRow: string[] = [];
            row.split(' ').map((column: string, columnIndex: number) => {
                if (column !== '') {
                    formattedRow.push(column);
                }
            })
            formattedBlock.push(formattedRow);
        });
        maps.push(formattedBlock);
    });
    return maps;
}
const checkRows = (matrix: string[][]): boolean => {
    let result: boolean = false;
    matrix.forEach((row: string[]) => {
        if (row.every((val) => val === '.')) {
            result = true;
        }
    });
    return result;
}

const extraction: number[] = getExtraction();
const extracted: Extraction = {
    last: null,
    numbers: [],
    winners: [],
    winners_board_number: []
}
const extract = (boards: string[][][], winners: number = 1) => {
    main_loop:
        for (let i: number = 0; i < extraction.length; i++) {
            const number = extraction[i];
            extracted.numbers.push(number);

            for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
                let board = boards[boardIndex];
                if (extracted.winners_board_number.includes(boardIndex)) {
                    continue;
                }

                for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
                    const row = board[rowIndex];

                    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                        const element: number = Number.parseInt(row[columnIndex]);

                        if (element === number) {
                            boards[boardIndex][rowIndex][columnIndex] = '.';
                        }
                    }
                }

                board = boards[boardIndex]; // Override changes

                // check for winner
                if (checkRows(board) || checkRows(transposeMatrix(board))) {

                    if (!extracted.winners_board_number.includes(boardIndex)) {
                        extracted.winners_board_number.push(boardIndex);
                        extracted.winners.push(board);
                        extracted.last = number;
                    }

                    if (winners === 1) {
                        break main_loop;
                    }
                }
            }
        }
}

// Part 1
extract(getBoards());
solution1(getResult(0));

// Part2
extracted.last = null;
extracted.numbers = [];
extracted.winners = [];
const boards = getBoards();
extract(getBoards(), boards.length);
solution2(getResult(extracted.winners.length - 1));

function getResult(winner: number): number {
    let unmarked = 0;
    extracted.winners[winner].forEach((row: string[]) => {
        row.forEach((element: string) => {
            if (element !== '.') {
                unmarked += Number.parseInt(element);
            }
        })
    });
    return unmarked * extracted.last;
}