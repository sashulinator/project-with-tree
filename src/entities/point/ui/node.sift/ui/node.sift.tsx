import uuid from 'uuid-random'

import { LinkStateDictionary } from '~/entities/decision/ui/links/state/state'
import { Node, NodeState } from '~/entities/point'
import { LinkState, Rule } from '~/entities/rule'
import { useUpdate } from '~/utils/hooks'

import { Joint } from '../../joint'

// import { RuleSet } from '../../rule-set'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SiftNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
}

/**
 * Node типа sift
 */
export function SiftNode(props: SiftNodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      state={props.state}
      scale={props.scale}
      left={
        <div className='incoming-links'>
          {props.linkStates.getLinksByTargetId(props.state.id).map((s) => {
            return <Joint key={s.id} linkId={s.id} />
          })}
        </div>
      }
      onClick={(): void => {
        if (!props.linkStates.editingId.value || props.state.id === props.linkStates.editingId.value) return

        props.linkStates.finishEditing(props.state.id)
      }}
    >
      {props.linkStates.getLinksBySourceId(props.state.id).map((s) => {
        return (
          <div key={s.id} className='flex' style={{ justifyContent: 'space-between' }}>
            <div>{s.rule.value.name}</div>
            <Joint linkId={s.id} />
          </div>
        )
      })}
      <button
        onClick={(e): void => {
          if (props.linkStates.editingId.value) return
          const rule: Rule = {
            id: uuid(),
            name: 'new-rule',
            sourceId: props.state.id,
          }
          props.linkStates.add(new LinkState({ id: rule.id, rule }))
          e.stopPropagation()
        }}
      >
        ДОБАВИТЬ
      </button>
    </Node>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(
      props.linkStates.on('add', ({ item }) => {
        if (item.rule.value.sourceId === props.state.id || item.rule.value.targetId === props.state.id) update()
      })
    )
    uns.push(
      props.linkStates.on('update', ({ item }) => {
        if (item.rule.value.sourceId === props.state.id || item.rule.value.targetId === props.state.id) update()
      })
    )
    uns.push(
      props.linkStates.on('remove', ({ key }) => {
        const item = props.linkStates.get(key)
        if (item.rule.value.sourceId === props.state.id || item.rule.value.targetId === props.state.id) update()
      })
    )
  }
}
