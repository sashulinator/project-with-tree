import './movable.css'

import { animated, useSpring } from '@react-spring/web'
import { useDrag, useWheel } from '@use-gesture/react'

import clsx from 'clsx'
import React, { useRef, useState } from 'react'

import { has } from '~/utils/dictionary'
import { isElement } from '~/utils/dom'
import { useWindowSize } from '~/utils/hooks'

interface MovableProps {
  children: React.ReactNode
}

export default function Movable(props: MovableProps): JSX.Element | null {
  const { width = 500, height = 500 } = useWindowSize()
  const movableAreaRef = useRef<null | HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 300, y: 150 })
  const prevPosition = useRef({ x: 300, y: 150 })

  const [{ x, y }, api] = useSpring(() => position)

  function move(mx: number, my: number, last: boolean, el: Element): void {
    const newPosition = { x: position.x + mx, y: position.y + my }

    const elRect = el.getBoundingClientRect()

    const centerHPos = width / 2
    const centerVPos = height / 2
    const isHorizontallyToCenter = Math.abs(centerHPos - newPosition.x) < Math.abs(centerHPos - prevPosition.current.x)
    const isVerticallyToCenter = Math.abs(centerVPos - newPosition.y) < Math.abs(centerVPos - prevPosition.current.y)

    const limit = { x: [-elRect.width + 100, width - 100], y: [-elRect.height + 100, height - 100] } as Record<
      'x' | 'y',
      [number, number]
    >

    const isX = (newPosition.x > limit.x[0] && newPosition.x < limit.x[1]) || isHorizontallyToCenter
    const isY = (newPosition.y > limit.y[0] && newPosition.y < limit.y[1]) || isVerticallyToCenter

    const resPosition = {
      x: isX ? newPosition.x : prevPosition.current.x,
      y: isY ? newPosition.y : prevPosition.current.y,
    }

    prevPosition.current = resPosition
    api.set(resPosition)
    last && setPosition(resPosition)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
  const dragBind = useDrag(({ down, movement: [mx, my], event }): void => {
    if (has(event, 'target')) {
      const el = event.target
      if (isElement(el) && movableAreaRef.current) {
        if ((el.classList.contains('ms-Stack') || el.classList.contains('feat-Movable')) && movableAreaRef.current) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          move(mx, my, !down, movableAreaRef.current)
        }
      }
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const wheelBind = useWheel(({ last, movement: [mx, my] }): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    movableAreaRef.current && move(mx * -1, my * -1, last, movableAreaRef.current)
  })

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    <div {...dragBind()} {...wheelBind()} style={{ touchAction: 'none' }} className={clsx('feat-Movable')}>
      <animated.div ref={movableAreaRef} style={{ x, y }} className='feat-Movable_movableArea'>
        {props.children}
      </animated.div>
    </div>
  )
}
