import './modal.css'

import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { keyListener } from '~/utils/dom-event'
import { getFirstFocusable } from '~/utils/dom-event/get-first-focusable'

import { c } from '../../../utils/core'
import { fns } from '../../../utils/function'

Modal.displayName = 'na-Modal'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
  containerElement: Element
  opened: boolean
  firstFocused?: boolean
  onDismiss?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => void)
    | undefined
}

export default function Modal(props: Props): JSX.Element | null {
  const { containerElement, children, firstFocused, opened, onKeyDown, onDismiss, onClick, ...divProps } = props

  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current === null) return
    if (firstFocused) getFirstFocusable(ref.current)?.focus()
    else ref.current.focus()
  })

  if (!opened) return null

  return createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      {...divProps}
      ref={ref}
      tabIndex={-1}
      onKeyDown={fns(onKeyDown, _handleKeyDown)}
      onClick={fns(onClick, (e) => e.target === ref.current && onDismiss?.(e))}
      className={c(props.className, Modal.displayName)}
    >
      {children}
    </div>,
    containerElement
  )

  /**
   * Private
   */

  function _handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    console.log('e', e)

    keyListener({ key: 'Escape' }, () => onDismiss?.(e))(e)
    keyListener({ key: 'Tab' }, () => setTimeout(_returnFocus))(e)
  }

  function _returnFocus(): void {
    if (ref.current === null) return
    if (ref.current.contains(document.activeElement)) return
    getFirstFocusable(ref.current)?.focus()
  }
}
