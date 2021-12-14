import {PuzzleInput, solution1, solution2} from "../commons";

type ReproductiveCycle = {
    parent: number,
    child: number
}

const puzzleInput = new PuzzleInput();
const lanternFishes: number[] = [];
const cycle: ReproductiveCycle = {
    parent: 6,
    child: 8
}
puzzleInput.input.split(',').forEach((el: string) => {
    lanternFishes.push(Number.parseInt(el));
});

const iterateDays = (number: number, fishes: number[]) => {
    for (let i: number = 0; i < number; i++) {
        fishes.map((fish: number, index: number) => {

            if (fish > 0) {
                fishes[index]--;
            }
            else {
                fishes[index] = cycle.parent;
                fishes.push(cycle.child);
            }

        })
    }
    return fishes;
}

// Part 1
let fishes = iterateDays(80, lanternFishes);
solution1(fishes.length);

// Part 2
fishes = iterateDays(256, lanternFishes);
solution2(fishes.length);
