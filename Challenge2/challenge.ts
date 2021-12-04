import {PuzzleInput, solution1, solution2} from "../commons";
const puzzleInput = new PuzzleInput();
type Position = {
    horizontal: number;
    depth: number;
    aim: number;
}

const calculatePosition = (direction: string, number: number): void  => {
    switch (direction) {
        case 'forward':
            currentPosition.horizontal += number;
            break;
        case 'down':
            currentPosition.depth += number;
            break;
        case 'up':
            currentPosition.depth -= number;
            break;
    }
}
const calculatePositionByAim = (direction: string, number: number): void => {
    switch (direction) {
        case 'down':
            currentPosition.aim += number;
            break;
        case 'up':
            currentPosition.aim -= number;
            break;
        case 'forward':
            currentPosition.horizontal += number;
            currentPosition.depth += (currentPosition.aim * number);
            break;
    }
}

// Part 1
let currentPosition: Position = {
    horizontal: 0,
    depth: 0,
    aim: 0
}
puzzleInput.rows.forEach((row: string|string[]) => {
    if (typeof row === "string") {
        row = row.split(' ');
    }

    calculatePosition(row[0], Number.parseInt(row[1]));
});
solution1(currentPosition.horizontal * currentPosition.depth);

// Part 2
currentPosition = {
    horizontal: 0,
    depth: 0,
    aim: 0
}
puzzleInput.rows.forEach((row: string|string[]) => {
    if (typeof row === "string") {
        row = row.split(' ');
    }

    calculatePositionByAim(row[0], Number.parseInt(row[1]));
});
solution2(currentPosition.horizontal * currentPosition.depth);
