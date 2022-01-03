import {PuzzleInput, solution1, solution2} from "../commons";
import constants = require("node:constants");

type Numbers = {
    0: string[],
    1: string[],
    2: string[],
    3: string[],
    4: string[],
    5: string[],
    6: string[],
    7: string[],
    8: string[],
    9: string[]
}

type Characters = {
    'a': string | string[],
    'b': string | string[],
    'c': string | string[],
    'd': string | string[],
    'e': string | string[],
    'f': string | string[],
    'g': string | string[],
}

type Entry = {
    segments: string[],
    output: string[]
}

const puzzleInput = new PuzzleInput();
const numbers: Numbers = {
    0: ['a', 'b', 'c', 'e', 'f', 'g'],
    1: ['c', 'f'],
    2: ['a', 'c', 'd', 'e', 'g'],
    3: ['a', 'c', 'd', 'f', 'g'],
    4: ['b', 'c', 'd', 'f'],
    5: ['a', 'b', 'd', 'f', 'g'],
    6: ['a', 'b', 'd', 'e', 'f', 'g'],
    7: ['a', 'c', 'f'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'c', 'd', 'f', 'g']
}
const uniqueLengths = [numbers[1].length, numbers[4].length, numbers[7].length, numbers[8].length];

const easyDigits: string[] = [];
const entries: Entry[] = [];

puzzleInput.rows.forEach((row: string) => {
    const tmp: string[] = row.split(' | ');
    let segments: string = tmp[0];
    let output: string = tmp[1];

    const entry: Entry = {
        segments: [],
        output: []
    };

    segments.split(' ').forEach((digit: string) => {
        entry.segments.push(digit);
    });

    output.split(' ').forEach((digit: string) => {
        easyDigits.push(digit);
        entry.output.push(digit);
    });

    entries.push(entry);
});

const getUniques = (digits: string[]): string[] => {
    const res: string[] = [];

    digits.forEach((digit: string) => {
        if (uniqueLengths.includes(digit.length)) {
            res.push(digit);
        }
    });

    res.sort((a, b) => {
        return a.length - b.length;
    })

    return res;
}
const getCharacters = ((segments: string[]) => {
    const res: string[] = [];
    segments.forEach((segment: string) => {
        res.push(segment);
    });

    res.sort((a, b) => {
        return a.length - b.length;
    })

    return res;
})
const compare = (characters: Characters, segments, unique: boolean = true): Characters => {

    if (unique) {
        characters.a = segments["3"].filter(x => !segments["2"].includes(x))[0];
        characters.b = segments["4"].filter(x => !segments["3"].includes(x));
        characters.c = segments["2"];
        characters.d = characters.b;

        characters.e = segments["7"].filter(x => !segments["4"].includes(x));
        if (typeof characters.e !== "string") {
            characters.e = characters.e.filter(x => ![characters.a].includes(x));
        }

        characters.f = characters.c;
        characters.g = characters.e;
    }
    else {
        segments["6"].forEach((el: string[]) => {
            let tmp = segments["7"].filter(x => !el.includes(x))[0];

            if (characters.c.includes(tmp)) {
                if (typeof characters.c !== "string") {
                    characters.f = characters.c.filter(x => x !== tmp)[0];
                }
                characters.c = tmp;
            }
            else if (characters.d.includes(tmp)) {
                if (typeof characters.d !== "string") {
                    characters.b = characters.d.filter(x => x !== tmp)[0];
                }
                characters.d = tmp;
            }
            else {
                if (typeof characters.e !== "string") {
                    characters.g = characters.e.filter(x => x !== tmp)[0];
                }
                characters.e = tmp;
            }
        });
    }

    return characters;
}
const decodeOutput = (entry: Entry, characters: Characters): number => {

    let resultNumbers: string = '';

    entry.output.forEach((row: string) => {
        let result: any[] = [];
        let digits: string[] = row.split('');

        digits.forEach((digit: string) => {
            switch (digit) {
                case characters.a:
                    result.push('a');
                    break;
                case characters.b:
                    result.push('b');
                    break;
                case characters.c:
                    result.push('c');
                    break;
                case characters.d:
                    result.push('d');
                    break;
                case characters.e:
                    result.push('e');
                    break;
                case characters.f:
                    result.push('f');
                    break;
                case characters.g:
                    result.push('g');
                    break;
                default:
                    break;
            }
        });
        result.sort();

        switch (JSON.stringify(result)) {
            case JSON.stringify(numbers["0"]):
                resultNumbers += 0;
                break;
            case JSON.stringify(numbers["1"]):
                resultNumbers += 1;
                break;
            case JSON.stringify(numbers["2"]):
                resultNumbers += 2;
                break;
            case JSON.stringify(numbers["3"]):
                resultNumbers += 3;
                break;
            case JSON.stringify(numbers["4"]):
                resultNumbers += 4;
                break;
            case JSON.stringify(numbers["5"]):
                resultNumbers += 5;
                break;
            case JSON.stringify(numbers["6"]):
                resultNumbers += 6;
                break;
            case JSON.stringify(numbers["7"]):
                resultNumbers += 7;
                break;
            case JSON.stringify(numbers["8"]):
                resultNumbers += 8;
                break;
            case JSON.stringify(numbers["9"]):
                resultNumbers += 9;
                break;
        }
    });

    return Number.parseInt(resultNumbers);
}

// Part 1
let uniques: string[] = getUniques(easyDigits);
solution1(uniques.length);

// Part 2
let result: number = 0;
entries.forEach((entry: Entry) => {
    let segments: string[] = getCharacters(entry.segments);
    let characters: Characters = {
        'a': null,
        'b': null,
        'c': null,
        'd': null,
        'e': null,
        'f': null,
        'g': null
    };

    const n = {
        2: segments[0].split(''),
        3: segments[1].split(''),
        4: segments[2].split(''),
        5: [
            segments[3].split(''),
            segments[4].split(''),
            segments[5].split('')
        ],
        6: [
            segments[6].split(''),
            segments[7].split(''),
            segments[8].split('')
        ],
        7: segments[9].split('')
    };

    characters = compare(compare(characters, n, true), n, false);
    result += decodeOutput(entry, characters);
});
solution2(result);