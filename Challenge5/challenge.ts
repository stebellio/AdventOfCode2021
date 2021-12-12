import {createSquareGrid, PuzzleInput, solution1, solution2} from "../commons";
const puzzleInput = new PuzzleInput();
type Coordinates = {
    x: number,
    y: number
}
type Line = {
    start: Coordinates,
    end: Coordinates
}

let simpleLines: Line[] = []; // Only horizontal or vetical lines, no diagonals
let diagonalLines: Line[] = []; // Only diagonal lines

// Data formatting
let dimension: number = 0;
puzzleInput.rows.forEach((row: string) => {
    const coordinates: string[] = row.split(' -> ');
    const first = coordinates[0].split(',');
    const second = coordinates[1].split(',');

    const line = {
        start: {
            x: Number.parseInt(first[0]),
            y: Number.parseInt(first[1])
        },
        end: {
            x: Number.parseInt(second[0]),
            y: Number.parseInt(second[1])
        }
    };

    if (line.start.x === line.end.x || line.start.y === line.end.y) {
        simpleLines.push(line);
    }
    else {
        diagonalLines.push(line);
    }

    // Get grid dimension
    if (line.start.x > dimension) {
        dimension = line.start.x;
    }

    if (line.end.x > dimension) {
        dimension = line.end.x;
    }

    if (line.start.y > dimension) {
        dimension = line.start.y;
    }

    if (line.end.y > dimension) {
        dimension = line.end.y;
    }
});
let board = createSquareGrid(dimension + 1, '.');

const drawSimpleLines = (board: string[][]) => {
    simpleLines.forEach((line: Line) => {
        if (line.start.x === line.end.x) {
            let start: number = (line.start.y < line.end.y) ? line.start.y : line.end.y;
            let end: number = (line.start.y < line.end.y) ? line.end.y : line.start.y;
            for (let i: number = start; i <= end; i++) {
                board[i][line.start.x] += '.';
            }
        }
        else {
            let start: number = (line.start.x < line.end.x) ? line.start.x : line.end.x;
            let end: number = (line.start.x < line.end.x) ? line.end.x : line.start.x;
            for (let i: number = start; i <= end; i++) {
                board[line.start.y][i] += '.';
            }
        }
    });
    return board;
}
const drawDiagonalLines = (board: string[][]) => {
    for (let i: number = 0; i < diagonalLines.length; i++) {
        const line: Line = diagonalLines[i];
        const range: number = Math.abs(line.start.x - line.end.x);

        let x: number = line.start.x;
        let y: number = line.start.y;

        for (let i = 0; i <= range; i++) {
            board[y][x] += '.';
            (line.start.x < line.end.x) ? x++ : x--;
            (line.start.y < line.end.y) ? y++ : y--;
        }

    }
    return board;
}
const calculateNumber = (number: number, board: string[][]): number => {
    let counter: number = 0;
    let match = '.';
    for (let i: number = 0; i < number; i++) {
        match += '.';
    }

    for (let xcounter: number = 0; xcounter < (dimension + 1); xcounter++) {
        for (let ycounter: number = 0; ycounter < (dimension + 1); ycounter++) {
            if (board[xcounter][ycounter].length >= match.length) {
                counter++;
            }

        }
    }
    return counter;
}

// Part 1
board = drawSimpleLines(board);
solution1(calculateNumber(2, board));

// Part 2
board = drawDiagonalLines(board);
solution2(calculateNumber(2, board));