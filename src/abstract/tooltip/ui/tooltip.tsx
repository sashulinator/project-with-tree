import { Point } from 'dom-align-ts'
import React, { forwardRef, useState } from 'react'

import Popover, { Overflow, Render } from '~/abstract/popover'
import { c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useDebounceCallback } from '~/utils/hooks'
import { ReactElementWithRef, setRefs } from '~/utils/react'

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
   * Overflow config
   */
  overflow?: Overflow | undefined

  /**
   * A function that is called when the popover is closed.
   */
  onClose?: ((e: MouseEvent | TouchEvent | KeyboardEvent) => void) | undefined

  /**
   * A function that is called when a click or touch event occurs outside the popover.
   */
  onClickOutside?: ((e: MouseEvent | TouchEvent) => void) | undefined

  /**
   * A function that is called when an escape key or touch event occurs.
   */
  onEscKeyDown?: ((e: KeyboardEvent) => void) | undefined
}

/**
 * See README.md
 */
export default function Tooltip(props: Props): JSX.Element {
  const {
    delay = 300,
    placement = 'tc',
    onClose,
    children,
    containerElement,
    className,
    renderBalloon,
    onClickOutside,
    onEscKeyDown,
    overflow,
    ...balloonProps
  } = props

  const [opened, setOpened] = useState(false)
  const [openWithDebounce, clearDebounce] = useDebounceCallback(() => setOpened(true), delay)

  return (
    <Popover
      opened={opened}
      placement={placement}
      onClose={onClose}
      onClickOutside={onClickOutside}
      overflow={overflow}
      onEscKeyDown={onEscKeyDown}
      containerElement={containerElement}
      contentProps={{ ...balloonProps, className: c(className, Tooltip.displayName) }}
      renderContent={renderBalloon}
      renderTarget={forwardRef(function Element(_, ref) {
        const { onMouseEnter, onMouseLeave } = children.props

        return React.cloneElement(children, {
          onMouseEnter: fns(onMouseEnter, openWithDebounce),
          onMouseLeave: fns(onMouseLeave, props.onClose as () => void, clearDebounce, () => setOpened(false)),
          ref: setRefs(children.ref, ref),
        })
      })}
    />
  )
}
