import {PuzzleInput, solution1, solution2} from "../commons";

const puzzleInput = new PuzzleInput();

type Position = {
    x: number,
    y: number
}

class Octopus {
    energy: number;
    position: Position;

    constructor(energy: number, position: Position) {
        this.energy = energy;
        this.position = position;
    }

    flashed(): boolean {
        return this.energy > 9;
    }
}

let totalOctopus: number = 0;

const getOctopues = (): Octopus[][] => {
    totalOctopus = 0;
    const octopuses: Octopus[][] = [];
    for (let y: number = 0; y < puzzleInput.rows.length; y++) {
        octopuses[y] = [];

        let row: string[] = puzzleInput.rows[y].split('');

        for (let x: number = 0; x < row.length; x++) {

            octopuses[y][x] = new Octopus(Number.parseInt(row[x]), {
                x: x,
                y: y
            });
            totalOctopus++;
        }
    }

    return octopuses;
}

let octopuses: Octopus[][] = getOctopues();

const iterateOctopuses = (callback) => {
    for(let y: number = 0; y < octopuses.length; y++) {
        for (let x: number = 0; x < octopuses[y].length; x++) {
            callback(octopuses[y][x]);
        }
    }
};
const getAdiacentOctopuses = (position: Position): Octopus[] => {
    let top: Position = {
        x: position.x,
        y: position.y - 1
    }
    let bottom: Position = {
        x: position.x,
        y: position.y + 1
    }
    let left: Position = {
        x: position.x - 1,
        y: position.y
    }
    let right: Position = {
        x: position.x + 1,
        y: position.y
    }
    let top_left: Position = {
        x: position.x - 1,
        y: position.y - 1
    }
    let top_right: Position = {
        x: position.x + 1,
        y: position.y - 1
    }
    let bottom_left: Position = {
        x: position.x - 1,
        y: position.y + 1
    }
    let bottom_right: Position = {
        x: position.x + 1,
        y: position.y + 1
    }

    let tmp: Position[] = [top, bottom, left, right, top_right, top_left, bottom_right, bottom_left];
    let res: Octopus[] = [];

    for (let i: number = 0; i < tmp.length; i++) {
        if (tmp[i].x >= 0 && tmp[i].x < 10 && tmp[i].y >= 0 && tmp[i].y < 10) {

            try {
                res.push(octopuses[tmp[i].y][tmp[i].x]);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return res;
}

// Part 1
let flashed: number = 0;
let exclude: Octopus[] = [];

for (let i: number = 0; i < 100; i++) {
    iterateOctopuses((octopus: Octopus) => {
        increaseEnergy(octopus);
    })

    exclude = [];
}
solution1(flashed);

// Part 2
octopuses = getOctopues();
exclude = [];

let step_number: number = 0;
while (true) {
    step_number++;
    iterateOctopuses((octopus: Octopus) => {
        increaseEnergy(octopus);
    })

    if (exclude.length === totalOctopus) {
        break;
    }

    exclude = [];
}
solution2(step_number);




function increaseEnergy (octopus: Octopus) {
    if (exclude.includes(octopus)) return;

    octopus.energy++;

    if (octopus.flashed()) {
        flashed++;
        octopus.energy = 0;
        exclude.push(octopus);
        getAdiacentOctopuses(octopus.position).forEach((adiacent: Octopus) => {
            increaseEnergy(adiacent);
        });
    }
}

