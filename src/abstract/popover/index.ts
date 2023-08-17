/**
 * lib
 */
export * from './lib/to-points'
export { adjustPoints as adjustPlacement } from './lib/adjust-placement'

/**
 * ui
 */
export { default } from './ui/popover'
export type { Props as PopoverProps } from './ui/popover'

export { default as DepricatedPopover } from './ui/depricated-popover'
export type { Props as DepricatedPopoverProps } from './ui/depricated-popover'

/**
 * reexports
 */
export { flipPointHorizontally, flipPointVertically } from '../align'
export type { Overflow, Offset, Point, Points, OnAligned } from '../align'
