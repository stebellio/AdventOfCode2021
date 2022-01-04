import {PuzzleInput, solution1} from "../commons";

const puzzleInput = new PuzzleInput();

const matrix: number[][] = [];

puzzleInput.rows.forEach((row: string) => {
    let res: number[] = [];

    const numbers: string[] = row.split('');
    numbers.forEach((number: string) => {
        res.push(Number.parseInt(number));
    });
    matrix.push(res);
});

type AdicentNumbers = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

type lowPoint = {
    x: number,
    y: number,
    value: number
}

const getAdiacentNumbers = (x: number, y: number): AdicentNumbers => {
    const numbers: AdicentNumbers = {
        top: null,
        bottom: null,
        left: null,
        right: null
    }

    if (matrix[y - 1] !== undefined) {
        numbers.top = matrix[y - 1][x];
    }

    if (matrix[y + 1] !== undefined) {
        numbers.bottom = matrix[y + 1][x];
    }

    if (matrix[y][x - 1] !== undefined) {
        numbers.left = matrix[y][x - 1];
    }

    if (matrix[y][x + 1] !== undefined) {
        numbers.right = matrix[y][x + 1];
    }

    return numbers;
};
const getLowPoints = (): lowPoint[] => {
    let lowPoints: lowPoint[] = [];

    for (let y: number = 0; y < matrix.length; y++) {
        let row = matrix[y];

        for (let x: number = 0; x < row.length; x++) {
            const current: number = matrix[y][x];
            const numbers: AdicentNumbers = getAdiacentNumbers(x, y);

            const values = [];
            for (const prop in numbers) {
                if (numbers[prop] !== null) {
                    values.push(numbers[prop]);
                }
            }

            let tmp = values.filter(x => x <= current);

            if (!tmp.length) {
                lowPoints.push({
                    x: x,
                    y: y,
                    value: current
                });
            }

        }
    }

    return lowPoints;
}

const delimiter: number = 9;

const getBacins = (lowPoints: lowPoint[]): number[] => {
    const bacinsSize: number[] = [];

    lowPoints.forEach((lowPoint: lowPoint) => {
        let bacin : number[] = [];

        



    });

    return bacinsSize;
}

// Part 1
const lowPoints: lowPoint[] = getLowPoints();
let result: number = 0;
lowPoints.forEach((lowPoint: lowPoint) => {
    result += (1 + lowPoint.value);
})
solution1(result);

// Part2
let bacins = getBacins(lowPoints);
console.log(bacins);