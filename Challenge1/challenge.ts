import {PuzzleInput, solution1, solution2} from "../commons";
const puzzleInput = new PuzzleInput();

const rows: string[] = puzzleInput.rows;

let current: number = 0;
let increase: number = 0;

const compare = (depth: number) => {
    if (current > 0 && depth > current) {
        increase++;
    }
}

// Part 1
rows.forEach((row: string) => {
    const depth: number = Number.parseInt(row);
    compare(depth);
    current = depth;
});
solution1(increase);

// Part 2
current = 0;
increase = 0;
for (let i = 2; i < rows.length; i++) {

    let depth: number =
        Number.parseInt(rows[i - 2]) +
        Number.parseInt(rows[i - 1]) +
        Number.parseInt(rows[i]);

    compare(depth);
    current = depth;

    if ((rows.length - i) < 2) {
        break;
    }
}
solution2(increase);

