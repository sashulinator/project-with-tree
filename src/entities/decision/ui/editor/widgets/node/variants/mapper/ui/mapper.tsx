import { memo } from 'react'

import { Id } from '~/utils/core'

import { useUpdate } from '~/utils/hooks'

import { LinkMapperState } from '../../../../..'
import { State } from '..'
import { VariantPicker, State as NodeState } from '../../../'

import { Prop } from '~/utils/notifier'
import { GestureDragEvent } from '~/ui/canvas'

export interface MapperProps {
  scale: number
  state: State
  selection: Prop<Id[]>
  linkMapperState: LinkMapperState
  remove: (id: Id) => void
  onGestureDrug: (state: NodeState) => (event: GestureDragEvent) => void
}

export function MapperComponent(props: MapperProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.state.values().map((nodeState) => {
        return (
          <VariantPicker
            remove={props.remove}
            key={nodeState.id}
            state={nodeState}
            linkStates={props.linkMapperState}
            selection={props.selection}
            onGestureDrug={props.onGestureDrug(nodeState)}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('update', update))
    uns.push(props.state.on('add', update))
    uns.push(props.state.on('remove', () => setTimeout(update)))
  }
}

const Mapper = memo(MapperComponent)
export default Mapper
