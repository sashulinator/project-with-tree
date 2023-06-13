import React from 'react'

import { PointState } from '~/entities/point'
import { Link, LinkState } from '~/entities/rule'
import { Any } from '~/utils/core'
import { EmitterableDictionary } from '~/utils/emitter/dictionary'

interface LinksProps {
  linkStates: EmitterableDictionary<Any, LinkState<Any>>
  nodeStates: EmitterableDictionary<Any, PointState>
}

export default function Links(props: LinksProps): JSX.Element {
  return (
    <>
      {props.linkStates.values().map((l) => {
        return <div key={l.id} />
      })}
    </>
  )
}
