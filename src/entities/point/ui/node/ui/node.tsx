import './node.css'

import clsx from 'clsx'
import { useLayoutEffect } from 'react'
import useMeasure from 'react-use-measure'

import { observeResize } from '~/utils/dom'
import { setRefs } from '~/utils/react'
import { State as ItemState } from '~/widgets/chart-item'

import { Point } from '../../../../point/types/point'

export interface NodeProps {
  state: ItemState<Point>
  isSelected: boolean
}

const WIDTH = 200

export default function Node(props: NodeProps): JSX.Element {
  const { data } = props.state
  const [setRef, { height }] = useMeasure()

  useLayoutEffect(() => {
    if (!props.state.ref.current) return
    const unsubscribe = observeResize(props.state.ref.current, (entry) => {
      const rect = entry.target.getBoundingClientRect()
      props.state.setWidth(Math.round(rect.width))
      props.state.setHeight(Math.round(rect.height))
    })
    return () => unsubscribe?.()
  }, [])

  return (
    <foreignObject width={WIDTH} height={height} style={{ overflow: 'visible' }}>
      <div
        data-id={data.id}
        className={clsx('PointNode', props.isSelected && '--selected')}
        style={{ width: WIDTH }}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref={setRefs(props.state.setRef, setRef)}
      >
        <div className='name'>{props.state.data.name}</div>
        <div className='links'>
          {data.links?.map((link) => {
            return (
              <div key={link.id} data-id={link.id}>
                {link.name}
              </div>
            )
          })}
        </div>
      </div>
    </foreignObject>
  )
}
