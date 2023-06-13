import { NodeState } from '~/entities/point'
import { Link, LinkState } from '~/entities/rule'
import { Any, Position } from '~/utils/core'
import { EmitterableDictionary } from '~/utils/emitter/dictionary'

interface LinksProps {
  scale: number
  canvasTranslate: Position
  linkStates: EmitterableDictionary<Any, LinkState<Any>>
  nodeStates: EmitterableDictionary<Any, NodeState>
}

export function Links(props: LinksProps): JSX.Element {
  return (
    <>
      {props.linkStates.values().map((linkState) => {
        const source = props.nodeStates.find(linkState.rule.sourceId)
        const target = props.nodeStates.find(linkState.rule.targetId)

        return (
          <Link
            key={linkState.id}
            scale={props.scale}
            canvasTranslate={props.canvasTranslate}
            sourceState={source}
            targetState={target}
            sourceOffset={{ left: 0, top: 0 }}
            targetOffset={{ left: 0, top: 0 }}
          />
        )
      })}
    </>
  )
}
