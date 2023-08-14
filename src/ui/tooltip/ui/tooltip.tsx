import './tooltip.css'

import { Point } from 'dom-align-ts'
import React, { useState } from 'react'

import Balloon, { BalloonProps } from '~/ui/balloon'
import Callout from '~/ui/callout'
import { PopoverProps } from '~/ui/popover'
import { fns } from '~/utils/function'
import { useDebounceCallback } from '~/utils/hooks'

Tooltip.displayName = 'ui-Tooltip'

export interface Props {
  /* Target  */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>

  /* Позиция для Content */
  placement?: Point

  /* Конфиг в случае overflow */
  overflow?: PopoverProps['overflow']

  /* Контент */
  content: React.ReactNode

  /* Задержка */
  delay?: number

  /* Срабатывает при onClickOutside и onEscKeyDown */
  onClose?: (() => void) | undefined
}

/**
 * Компонент Tooltip
 *
 * @param props {@link Props}
 * @returns
 */
export default function Tooltip(props: Props): JSX.Element {
  const { delay = 300, content, placement = 'tc', children } = props

  const [isOpen, setOpen] = useState(false)
  const [openWithDebounce, clearDebounce] = useDebounceCallback(() => setOpen(true), delay)

  const clonedChildren = React.cloneElement(children, {
    onMouseEnter: fns(children.props.onMouseEnter, openWithDebounce),
    onMouseLeave: fns(children.props.onMouseLeave, clearDebounce, () => setOpen(false)),
  })

  return (
    <Callout placement={placement} contentProps={{ children: content }} renderContent={BaloonWrapper} isOpen={isOpen}>
      {clonedChildren}
    </Callout>
  )
}

type BaloonWrapperProps = Omit<BalloonProps, 'children'> & { children: React.ReactNode }

const BaloonWrapper = React.forwardRef<HTMLDivElement, BaloonWrapperProps>(function BubbleWrapper(props, ref) {
  return (
    <div className='mirion-tooltip' ref={ref}>
      <Balloon placement={props.placement || 'tc'}>
        <div className='mirion-tooltip__content'>{props.children}</div>
      </Balloon>
    </div>
  )
})
