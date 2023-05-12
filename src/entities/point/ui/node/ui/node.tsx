import './node.css'

import clsx from 'clsx'
import useMeasure from 'react-use-measure'

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
  const [ref, { height }] = useMeasure()

  return (
    <foreignObject width={WIDTH} height={height} style={{ overflow: 'visible' }}>
      <div
        data-id={data.id}
        className={clsx('PointNode', props.isSelected && '--selected')}
        style={{ width: WIDTH }}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref={setRefs(props.state.setRef, ref)}
      >
        <div className='name'>{props.state.data.name}</div>
        {data.links?.map((link) => {
          return (
            <div key={link.id} data-id={link.id}>
              {link.name}
            </div>
          )
        })}
      </div>
    </foreignObject>
  )
}
