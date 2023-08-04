import { memo } from 'react'

import { Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import Link, { MapperState } from '../../..'

import { StateDictionary as NodeStateDictionary } from '../../../../node'

export interface MapperProps {
  scale: number
  canvasTranslate: Position
  linkStates: MapperState
  nodeStates: NodeStateDictionary
}

function MapperComponent(props: MapperProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.linkStates.values().map((linkState) => {
        return (
          <Link
            key={linkState.id}
            scale={props.scale}
            canvasTranslate={props.canvasTranslate}
            nodeStates={props.nodeStates}
            state={linkState}
            linkStates={props.linkStates}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.linkStates.on('add', () => setTimeout(update)))
    uns.push(props.linkStates.on('remove', () => setTimeout(update)))
    uns.push(props.linkStates.on('update', () => setTimeout(update)))
  }
}

const Mapper = memo(MapperComponent)
export default Mapper
