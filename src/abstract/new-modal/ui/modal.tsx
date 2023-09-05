import './modal.css'

import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { keyListener } from '~/utils/dom-event'
import { getFirstFocusable } from '~/utils/dom-event/get-first-focusable'
import { useEventListener } from '~/utils/hooks'

import { c } from '../../../utils/core'

Modal.displayName = 'na-Modal'
ModalWrapper.displayName = Modal.displayName
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
  containerElement: Element
  opened: boolean
  firstFocused?: boolean
  onDismiss?: ((event: MouseEvent | KeyboardEvent) => void) | undefined
}

/**
 * Делаем Wrapper так как без него происходит преждевременная подписка в useEventListener
 */
export default function ModalWrapper(props: Props): JSX.Element | null {
  const { opened, ...modalProps } = props
  if (!opened) return null
  return <Modal {...modalProps} />
}

function Modal(props: Omit<Props, 'opened'>): JSX.Element {
  const { containerElement, children, firstFocused, onDismiss, ...divProps } = props

  const ref = useRef<HTMLDivElement | null>(null)
  const mouseDownRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (ref.current === null) return
    if (firstFocused) getFirstFocusable(ref.current)?.focus()
    else ref.current.focus()
  })

  useEventListener('keydown', _handleKeyDown)
  useEventListener('mousedown', (e) => (mouseDownRef.current = e.target as HTMLElement))
  useEventListener('mouseup', (e) => ref.current !== null && mouseDownRef.current === ref.current && onDismiss?.(e))

  return createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div {...divProps} ref={ref} tabIndex={-1} className={c(props.className, Modal.displayName)}>
      {children}
    </div>,
    containerElement
  )

  /**
   * Private
   */

  function _handleKeyDown(e: KeyboardEvent): void {
    keyListener({ key: 'Escape' }, () => onDismiss?.(e))(e)
    keyListener({ key: 'Tab' }, () => setTimeout(_returnFocus))(e)
  }

  function _returnFocus(): void {
    if (ref.current === null) return
    if (ref.current.contains(document.activeElement)) return
    getFirstFocusable(ref.current)?.focus()
  }
}
