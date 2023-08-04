import { memo } from 'react'

import { Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { NodeMapperState } from '../../../../../'
import Link from '../../../'
import { State } from '../'

export interface MapperProps {
  scale: number
  canvasTranslate: Position
  state: State
  nodeMapperState: NodeMapperState
}

function MapperComponent(props: MapperProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.state.values().map((linkState) => {
        return (
          <Link
            key={linkState.id}
            scale={props.scale}
            canvasTranslate={props.canvasTranslate}
            nodeMapperState={props.nodeMapperState}
            state={linkState}
            mapperState={props.state}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('add', () => setTimeout(update)))
    uns.push(props.state.on('remove', () => setTimeout(update)))
    uns.push(props.state.on('update', () => setTimeout(update)))
  }
}

const Mapper = memo(MapperComponent)
export default Mapper
