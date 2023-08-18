/**
 * lib
 */
export { toPoints } from './lib/to-points'

/**
 * ui
 */
export { default } from './ui/popover'
export type { Props as PopoverProps, Render, RenderProps } from './ui/popover'

export { default as DepricatedPopover } from './ui/depricated-popover'
export type { Props as DepricatedPopoverProps } from './ui/depricated-popover'

/**
 * reexports
 */
export { flipPointHorizontally, flipPointVertically, adjustPoints } from '../align'
export type { Overflow, Offset, Point, Points, OnAligned } from '../align'
