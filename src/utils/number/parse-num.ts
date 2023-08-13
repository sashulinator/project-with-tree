export function parseNum(num: string | number = '', defaultNumber = 0): number {
  if (typeof num === 'number') {
    if (Number.isNaN(num)) return defaultNumber
    return num
  }

  return parseInt(num, 10) || defaultNumber
}
