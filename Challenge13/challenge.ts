import {createSquareGrid, PuzzleInput, solution1, solution2, transposeMatrix} from "../commons";

const puzzleInput = new PuzzleInput();

// Types
enum Axis {
    x = 'x', y = 'y'
}
type Fold = {
    axis: Axis,
    value: number
}

const DOT = '#';
const EMPTY = '.';
const folds: Fold[] = [];

const sections: string[] = puzzleInput.input.split('\n\n');
const rows: string[] = sections[0].split('\n');

// Folds
sections[1].split('\n').forEach((f: string) => {
    let tmp = f.split('along ')[1];

    let identifier: string;
    let number: string;
    [identifier, number] = tmp.split('=');

    let axis: Axis = null;
    switch (identifier) {
        case Axis.x:
            axis = Axis.x;
            break;
        case Axis.y:
            axis = Axis.y;
            break;
    }
    folds.push({
        axis: axis,
        value: Number.parseInt(number)
    })
});

// Rows
const paper: string[][] = [];
const iterateRows = (rows: string[], callback) => {
    rows.forEach((row: string) => {
        let tmp: string[] = row.split(',');

        let x: number = Number.parseInt(tmp[0]);
        let y: number = Number.parseInt(tmp[1]);

        callback(x, y);
    })
};

let max_x: number = 0;
let max_y: number = 0;
iterateRows(rows, (x: number, y: number) => {
    if (x > max_x) max_x = x;
    if (y > max_y) max_y = y;
});
for (let y: number = 0; y <= max_y; y++) {
    let tmp: string[] = [];
    for (let x: number = 0; x <= max_x; x++) {
        tmp.push(EMPTY);
    }
    paper.push(tmp);
}
iterateRows(rows, (x: number, y: number) => {
    paper[y][x] = DOT;
});

// Functions
const unify = (first: string[][], second: string[][]): string[][] => {

    for (let y: number = 0; y < second.length; y++) {
        for (let x: number = 0; x < second[y].length; x++) {
            let value: string = second[y][x];

            if (value === DOT) {
                first[y][x] = DOT;
            }
        }
    }

    return first;
}
const foldPaper = (paper: string[][], fold: Fold): string[][] => {

    switch (fold.axis) {
        case Axis.y:
            paper = foldHorizontally(paper, fold.value);
            break;
        case Axis.x:
            paper = foldVertically(paper, fold.value);
            break;
    }

    return paper;
}
const foldHorizontally = (paper: string[][], row: number): string[][] => {

    let top: string[][] = [];
    let bottom: string[][] = [];

    for(let i: number = 0; i < paper.length; i++) {

        if (i < row) {
            top.push(paper[i]);
        }

        if (i > row) {
            bottom.push(paper[i]);
        }

    }

    let tmp: string[][] = [];

    for (let k = (bottom.length - 1); k >= 0; k--) {
        tmp.push(bottom[k]);
    }

    bottom = tmp;

    if (bottom.length > top.length) {
        return unify(bottom, top);
    }

    return unify(top, bottom);
}
const foldVertically = (paper: string[][], row: number) => {
    let left: string[][] = [];
    let right: string[][] = [];

    for(let y: number = 0; y < paper.length; y++) {
        let l: string[] = [];
        for (let x: number = 0; x < row; x++) {
            l.push(paper[y][x]);
        }
        left.push(l);
    }
    for(let y: number = 0; y < paper.length; y++) {
        let r: string[] = [];
        for (let x: number = (row + 1); x < paper[y].length; x++) {
            r.push(paper[y][x]);
        }
        right.push(r);
    }

    let tmp: string[][] = [];
    for (let i: number = 0; i < right.length; i++) {
        let r: string[] = right[i];
        let tmp2: string[] = [];
        for (let k = (r.length - 1); k >= 0; k--) {
            tmp2.push(r[k]);
        }
        tmp.push(tmp2);
    }

    right = tmp;

    if (right[0].length > left[0].length) {
        return unify(right, left);
    }

    return unify(left, right);
}
const countDots = (paper: string[][]): number => {
    let dots: number = 0;

    paper.forEach((row: string[]) => {
        row.forEach((el: string) => {
            if (el === DOT) {
                dots++;
            }
        })
    })

    return dots;
}
const draw = (paper: string[][]) => {
    paper.forEach((row: string[]) => {
        let row_string: string = '';
        row.forEach((el: string) => {
            row_string += el;
        })
        console.log(row_string);
    });
}

// Part 1
let first_fold: Fold = folds[0];
let result: string[][] = foldPaper(paper, first_fold);
solution1(countDots(result));

// Part2
let origami = paper;
folds.forEach((fold: Fold) => {
    origami = foldPaper(origami, fold);
})
solution2('');
draw(origami);

