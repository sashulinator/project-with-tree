import { COLUMN_GAP } from '../constants/gap'

/**
 * Вычисляет x координату колонки для переданного x
 * @param x координата x
 * @returns
 */
export function getColumnX(x: number): number {
  const xModulo = x % COLUMN_GAP
  const toLeft = xModulo < COLUMN_GAP / 2
  return toLeft ? x - xModulo : x + COLUMN_GAP - xModulo
}
