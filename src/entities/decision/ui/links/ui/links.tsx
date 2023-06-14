import { NodeState } from '~/entities/point'
import { Link, LinkState } from '~/entities/rule'
import { Any, Id, Offset, Position } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom'
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
            data-id={linkState.id}
            key={linkState.id}
            scale={props.scale}
            canvasTranslate={props.canvasTranslate}
            sourceState={source}
            targetState={target}
            sourceOffset={getOffset(linkState.id, source)}
            targetOffset={getOffset(linkState.id, target)}
          />
        )
      })}
    </>
  )

  function getOffset(id: Id | undefined, nodeState: NodeState | undefined): Offset | null {
    if (!id) return null

    const jointEl = nodeState?.ref.value?.querySelector(`[data-link-id="${id.toString()}"]`)

    if (!jointEl || !nodeState) return null

    const OffsetInElement = getOffsetInElement(jointEl, nodeState?.ref.value)
    const jointRect = jointEl?.getBoundingClientRect() || { height: 0 }

    const ret = {
      left: (OffsetInElement.left + jointRect.width / 2) / props.scale,
      top: (OffsetInElement.top + jointRect.height / 2) / props.scale,
    }

    return ret
  }
}
