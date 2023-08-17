import './tooltip.scss'

import React, { forwardRef } from 'react'

import { Overflow, Point } from '~/abstract/align'
import Balloon from '~/abstract/balloon'
import ATooltip from '~/abstract/tooltip'
import { AppearFrom } from '~/ui/animation'
import { c } from '~/utils/core'
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

  console.log('placement', placement)

  return (
    <ATooltip
      {...divProps}
      delay={delay}
      overflow={overflow}
      onClose={onClose}
      placement={placement}
      renderBalloon={forwardRef(function Element(props, ref): JSX.Element {
        return (
          <AppearFrom duration={100} from={{ y: 5 }} to={{ y: -5 }} style={{ position: 'fixed' }}>
            <Balloon
              className={c(className, Tooltip.displayName, `--${props.popoverProps.placement || ''}`)}
              placement={props.popoverProps.placement}
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
}
