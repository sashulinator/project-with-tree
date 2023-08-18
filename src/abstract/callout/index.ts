/**
 * lib
 */
export { adjustPlacement } from './lib/adjust-placement'

/**
 * ui
 */
export { default } from './ui/callout'
export type { ContentProp, Props as CalloutProps } from './ui/callout'

/**
 * reexports
 */
export { flipPointHorizontally, flipPointVertically } from '../popover'
export type { Overflow, Offset, Point, Points, OnAligned as onAligned } from '../popover'
