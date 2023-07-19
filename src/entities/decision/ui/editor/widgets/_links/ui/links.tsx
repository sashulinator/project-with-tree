import { memo } from 'react'

import { Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../state/state'
import { Link } from './_link'
import { Dictionary } from '~/utils/emitter'
import { NodeState } from '../../_node'

interface LinksProps {
  scale: number
  canvasTranslate: Position
  linkStates: LinkStateDictionary
  nodeStates: Dictionary<NodeState>
}

function LinksComponent(props: LinksProps): JSX.Element {
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
            linkState={linkState}
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

export const Links = memo(LinksComponent)
