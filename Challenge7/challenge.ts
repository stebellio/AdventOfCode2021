import {PuzzleInput, solution1, solution2} from "../commons";

const puzzleInput = new PuzzleInput();
const positions: number[] = [];
puzzleInput.input.split(',').forEach((el: string) => {
    positions.push(Number.parseInt(el));
});

const max_position: number = Math.max(...positions);

interface Alignment {
    fuel: number;
    moves: number
}

// Part 1
let alignment: Alignment = {
    fuel: null,
    moves: null
}

for (let move: number = 1; move < max_position; move++) {
    let fuel: number = 0;

    positions.forEach((position: number) => {
        fuel += Math.abs(position - move);
    });

    setMinimumFuelConsumption(fuel, move);

}
solution1(alignment.fuel);

// Part2
alignment = {
    fuel: null,
    moves: null
}

for (let move: number = 1; move < max_position; move++) {
    let fuel: number = 0;

    positions.forEach((position: number) => {
        let distance = Math.abs(position - move);
        for (let cost: number = 1; cost <= distance; cost++) {
            fuel += cost;
        }
    });

    setMinimumFuelConsumption(fuel, move);
}
solution2(alignment.fuel);

function setMinimumFuelConsumption(fuel: number, move: number) {
    if (alignment.fuel === null || fuel < alignment.fuel) {
        alignment.fuel = fuel;
        alignment.moves = move;
    }
}