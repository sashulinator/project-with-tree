import styles from './ordered-list.module.css'

import { AnimationConfig, animated, config, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import { useRef } from 'react'

import { move } from '~/utils/list'
import { clamp } from '~/utils/number'

OrderedList.displayName = 'ui-OrderedList'

const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0, x = 0) =>
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  (index: number) =>
    active && index === originalIndex
      ? {
          y: Math.floor(curIndex / 3) * 100 + y,
          x: (curIndex % 3) * 100 + x,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string): boolean => key === 'zIndex',
          config: (key: string): Partial<AnimationConfig> => (key === 'y' ? config.stiff : config.default),
        }
      : {
          y: Math.floor(order.indexOf(index) / 3) * 100,
          x: (order.indexOf(index) % 3) * 100,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        }

export interface Props {
  items: string[]
}

export default function OrderedList(props: Props): JSX.Element {
  const { items } = props

  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order

  const [springs, api] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const bind = useDrag(({ args: [originalIndex], active, movement: [x, y] }) => {
    const curIndex = order.current.indexOf(originalIndex as number)
    const realCurIndex = curIndex + 1
    const origRow = Math.ceil(realCurIndex / 3)
    const origCol = realCurIndex % 3 === 0 ? 3 : realCurIndex % 3

    // console.log('origRow', origRow)
    // console.log('origCol', origCol)

    const curRow = clamp(Math.round((origRow * 100 + y) / 100), 1, Math.ceil(items.length / 3))
    const curCol = clamp(Math.round((origCol * 100 + x) / 100), 1, 3)

    const curItem = (curRow - 1) * 3 + curCol - 1
    console.log('curItem', curItem)

    const newOrder = move(order.current, curIndex, curItem)
    api.start(fn(newOrder, active, originalIndex as number, curIndex, y, x)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) order.current = newOrder
  })

  return (
    <div className={styles.content} style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, x, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            y,
            x,
            scale,
          }}
        >
          {items[i]}
        </animated.div>
      ))}
    </div>
  )
}
