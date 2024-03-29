/*
 * RandomID generator
 * Version 1.1
 * Author: Michael Vieira aka Themimitoof
 * GitHub page: https://github.com/themimitoof/node-randomid
 *
 */

function randomIntInc(low: number, high: number): number {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

export function generateId(chars = 8): string {
  const key: number[] = []

  var char = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'k',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]

  // First character
  key[0] = randomIntInc(0, char.length - 1)

  var result = char[key[0]]

  // Lasts characters
  for (var i = 1; i < chars; i++) {
    key[i] = randomIntInc(0, char.length - 1)

    result += char[key[i]]
  }

  return result
}
