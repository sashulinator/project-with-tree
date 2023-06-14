import './node.css'

import clsx from 'clsx'

import { IsDragEvent } from '~/abstract/canvas'
import { LinkStateDictionary } from '~/entities/decision/ui/links/state/state'
import { NodeState } from '~/entities/point/ui/node/state'
import { Node as UINode } from '~/ui/canvas'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { Joint } from '../../joint'

export interface NodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
  left?: React.ReactNode
  children?: React.ReactNode
  isDrag?: (event: IsDragEvent) => boolean
}

export function Node(props: NodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <UINode
      left={
        <div>
          {props.linkStates.getLinksByTargetId(props.state.id).map((s) => {
            return <Joint key={s.id} linkId={s.id} />
          })}
        </div>
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ref={setRefs(props.state.ref.set as any)}
      className={clsx('point-Node')}
      nodeTitle={props.state.point.name}
      nodeDescription={props.state.point.description}
      position={props.state.position.value}
      lastPosition={props.state.position.last}
      scale={props.scale}
      onMove={props.state.position.move}
    >
      <div>
        {props.linkStates.getLinksBySourceId(props.state.id).map((s) => {
          return (
            <div key={s.id} className='flex' style={{ justifyContent: 'space-between' }}>
              <div>{s.rule.name}</div>
              <Joint linkId={s.id} />
            </div>
          )
        })}
      </div>
    </UINode>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('setPosition', update))
    uns.push(props.state.on('setWidth', update))
    uns.push(props.state.on('setHeight', update))
  }
}
