import React, { ForwardedRef, forwardRef, useState } from 'react'

import { Dictionary, c } from '../../../utils/core'
import { fns } from '../../../utils/function'
import { useDebounceCallback } from '../../../utils/hooks'
import { ReactElementWithRef, setRefs } from '../../../utils/react'
import Popover, { Offset, Overflow, Point, arePointsEqual, toPoints } from '../../popover'

Tooltip.displayName = 'a-Tooltip'

export interface Props<C extends Dictionary> extends React.HTMLAttributes<HTMLElement> {
  /**
   * Target
   */
  children: ReactElementWithRef<HTMLElement, React.HTMLAttributes<HTMLElement>>

  /**
   * Render Balloon
   */
  renderBalloon: (props: C & { points: Point[] }) => React.ReactNode

  /**
   * Props will be passed to `renderContent`
   */
  balloonProps?: C | undefined

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
export default function Tooltip<C extends Dictionary>(props: Props<C>): JSX.Element {
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
      targetProps={{ children, onClose: props.onClose, openWithDebounce, clearDebounce, setOpened }}
      renderTarget={Target}
    />
  )
}

// Private

type TargetProps = {
  children: ReactElementWithRef<HTMLElement, React.HTMLAttributes<HTMLElement>>
  onClose?: ((e: MouseEvent | TouchEvent | KeyboardEvent) => void) | undefined
  openWithDebounce: () => void
  clearDebounce: () => void
  setOpened: (value: boolean) => void
}

const Target = forwardRef(function Element(props: TargetProps, ref: ForwardedRef<HTMLElement>) {
  const { onMouseMoveCapture, onMouseLeave } = props.children.props

  return React.cloneElement(props.children, {
    onMouseMoveCapture: fns(onMouseMoveCapture, props.openWithDebounce),
    onMouseLeave: fns(onMouseLeave, props.onClose as () => void, props.clearDebounce, () => props.setOpened(false)),
    ref: setRefs(props.children.ref, ref),
  })
})
