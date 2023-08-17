/**
 * lib
 */
export { adjustPoints } from './lib/adjust-points'
export { arePointsEqual } from './lib/are-poins-equal'

/**
 * ui
 */
export { default } from './ui/align'
export type { Props as AlignProps, Overflow, Config, OnAligned, AlignResult } from './ui/align'

/**
 * reexports
 */
export { flipPointHorizontally, flipPointVertically } from 'dom-align-ts'
export type { Offset, Point, Points } from 'dom-align-ts'
