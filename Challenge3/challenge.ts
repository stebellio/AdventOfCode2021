import {bin2int, PuzzleInput, solution1, solution2} from "../commons";
const puzzleInput = new PuzzleInput();

type Rate = {
    gamma: string,
    epsilon: string
}

type SupportRate = {
    oxygen: string,
    c02: string
}

let rates: Rate = {
    gamma: '',
    epsilon: ''
}

let supportRates: SupportRate = {
    oxygen: '',
    c02: ''
}

// Part 1
let current = {
    zero: 0,
    one: 0,
    position: 0
}

const calculateBit = (row: string) => {
    row_length = row.length;
    let bits: string[] = row.split('');
    let bit: number = Number.parseInt(bits[current.position]);

    bit && current.one++;
    !bit && current.zero++;
}

let row_length: number = 2; // minimum length
while (current.position < row_length) {
    puzzleInput.rows.forEach((row: string) => calculateBit(row));

    rates.gamma += (+(current.one >= current.zero)).toString();
    rates.epsilon += (+!(current.one >= current.zero)).toString();
    current = {
        zero: 0,
        one: 0,
        position: current.position + 1
    }
}
solution1(bin2int(rates.gamma) * bin2int(rates.epsilon));

// Part 2
const getSupportRating = (rows: string[], oxygen: boolean) => {
    current.position = 0;
    current.zero = 0;
    current.one = 0;
    while (true) {
        rows = calculateSupportRating(rows,oxygen);
        current.position++;
        current.zero = 0;
        current.one = 0;

        if (rows.length === 1) {
            if (oxygen) {
                supportRates.oxygen += rows[0];
            }
            else {
                supportRates.c02 += rows[0];
            }
            break;
        }
    }
}
const calculateSupportRating = (rows: string[],oxygen :boolean) => {
    const ones: string[] = [];
    const zeros: string[] = [];

    rows.forEach((row: string) => {
        let bits: string[] = row.split('');
        let bit: number = Number.parseInt(bits[current.position]);

        if (bit) {
            current.one++;
            ones.push(row);
        }
        else  {
            current.zero++;
            zeros.push(row);
        }
    });

    if (oxygen) {
        if (current.one >= current.zero) {
            return ones;
        }

        return zeros;
    }
    else {
        if (current.one >= current.zero) {
            return zeros;
        }

        return ones;
    }
}

let rowsO: string[] = puzzleInput.rows;
let rowsC: string[] = puzzleInput.rows;
getSupportRating(rowsO, true);
getSupportRating(rowsC, false);

solution2(bin2int(supportRates.oxygen) * bin2int(supportRates.c02));

