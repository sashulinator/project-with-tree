import React, { forwardRef, useState } from 'react'

import { c } from '../../../utils/core'
import { fns } from '../../../utils/function'
import { useDebounceCallback } from '../../../utils/hooks'
import { ReactElementWithRef, setRefs } from '../../../utils/react'
import Popover, { Offset, Overflow, Point, Render, arePointsEqual, toPoints } from '../../popover'

Tooltip.displayName = 'a-Tooltip'

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * Target
   */
  children: ReactElementWithRef<HTMLElement, React.HTMLAttributes<HTMLElement>>

  /**
   * Render Balloon
   */
  renderBalloon: Render

  /**
   * Props will be passed to `renderContent`
   */
  balloonProps?: Record<string, unknown> | undefined

  /**
   * Delay before opening
   */
  delay?: number | undefined

  /**
   * Tooltip placent
   */
  placement?: Point | undefined

  /**
   * The container element for the component; defaults to `document.body`.
   */
  containerElement?: HTMLElement | null | undefined

  /**
   * An optional x/y offset for the content
   */
  offset?: Offset | undefined

  /**
   * Overflow config
   */
  overflow?: Overflow | undefined

  /**
   * A function that is called when the popover is closed.
   */
  onClose?: ((e: MouseEvent | TouchEvent | KeyboardEvent) => void) | undefined
}

/**
 * See README.md
 */
export default function Tooltip(props: Props): JSX.Element {
  const { delay = 300, placement = 'tc', balloonProps, children, className, renderBalloon, ...popoverProps } = props

  const [opened, setOpened] = useState(false)
  const [openWithDebounce, clearDebounce] = useDebounceCallback(() => setOpened(true), delay)
  const points = toPoints(placement)
  const [adjustedPoints, setAdjustedPoints] = useState(points)

  return (
    <Popover
      {...popoverProps}
      opened={opened}
      points={points}
      onEscKeyDown={fns(props.onClose, () => setOpened(false))}
      className={c(className, Tooltip.displayName)}
      contentProps={balloonProps}
      renderContent={renderBalloon}
      onAligned={(result): void => {
        if (!arePointsEqual(result.adjustedPoints, adjustedPoints)) setAdjustedPoints(result.adjustedPoints)
      }}
      renderTarget={forwardRef(function Element(_, ref) {
        const { onMouseMoveCapture, onMouseLeave } = children.props
        return React.cloneElement(children, {
          onMouseMoveCapture: fns(onMouseMoveCapture, openWithDebounce),
          onMouseLeave: fns(onMouseLeave, props.onClose as () => void, clearDebounce, () => setOpened(false)),
          ref: setRefs(children.ref, ref),
        })
      })}
    />
  )
}
