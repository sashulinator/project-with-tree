/**
 * lib
 */
export { placementToPoints } from './lib/placement-to-points'

/**
 * ui
 */
export { default } from './ui/popover'
export type { Props as PopoverProps } from './ui/popover'

/**
 * reexports
 */
export { flipPointHorizontally, flipPointVertically, adjustPoints, arePointsEqual } from '../align'
export type { Overflow, Offset, Point, Points, OnAligned } from '../align'
