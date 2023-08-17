import './tooltip.scss'

import React, { forwardRef } from 'react'

import { Overflow, Point } from '~/abstract/align'
import Balloon from '~/abstract/balloon'
import ATooltip from '~/abstract/tooltip'
import { AppearFrom } from '~/ui/animation'
import { Position, c } from '~/utils/core'
import { setRefs } from '~/utils/react'

Tooltip.displayName = 'ui-Tooltip'

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /* Target  */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>

  /* Позиция для Content */
  placement?: Point

  /* Конфиг в случае overflow */
  overflow?: Overflow | undefined

  /* Контент */
  content: React.ReactNode

  /* Задержка */
  delay?: number | undefined

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
  const { delay = 1000, placement = 'tc', children, content, overflow, onClose, className, ...divProps } = props

  return (
    <ATooltip
      {...divProps}
      delay={delay}
      overflow={overflow}
      onClose={onClose}
      placement={placement}
      renderBalloon={forwardRef(function Element(props, ref): JSX.Element {
        return (
          <AppearFrom duration={100} {...getAnimationPosition(placement)} style={{ position: 'fixed', zIndex: 1 }}>
            <Balloon
              className={c(className, Tooltip.displayName)}
              placement={placement}
              ref={setRefs(ref)}
              contentProps={{ className: 'content', style: { position: 'absolute' } }}
              renderArrow={forwardRef(function Element(props, ref): JSX.Element {
                return <div className='arrow' ref={setRefs(ref)} style={{ position: 'absolute' }} />
              })}
            >
              {content}
            </Balloon>
          </AppearFrom>
        )
      })}
    >
      {children}
    </ATooltip>
  )

  function getAnimationPosition(placement: Point): { from: Position; to: Position } {
    const from = { x: 0, y: 0 }
    const to = { x: 0, y: 0 }

    if (placement.charAt(0) === 'b') {
      from.y = -5
      to.y = 5
      return { from, to }
    }
    if (placement.charAt(0) === 't') {
      from.y = 5
      to.y = -5
      return { from, to }
    }
    if (placement.charAt(1) === 'l') {
      from.x = 5
      to.x = -5
      return { from, to }
    }

    if (placement.charAt(1) === 'r') {
      from.x = -5
      to.x = 5
      return { from, to }
    }

    return { from, to }
  }
}
