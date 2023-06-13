import React from 'react'

import { PointState, SiftNode } from '~/entities/point'
import { LinkState } from '~/entities/rule'
import { Any } from '~/utils/core'
import { EmitterableDictionary } from '~/utils/emitter/dictionary'

interface LinksProps {
  scale: number
  linkStates: EmitterableDictionary<Any, LinkState<Any>>
  nodeStates: EmitterableDictionary<Any, PointState>
}

export default function Links(props: LinksProps): JSX.Element {
  return (
    <>
      {props.nodeStates.values().map((nodeState) => {
        return <SiftNode key={nodeState.id} state={nodeState} scale={props.scale} />
      })}
    </>
  )
}
