import './node.sift.css'

import { useState } from 'react'

import { addToast } from '~/abstract/toast'
import { LinkStateDictionary } from '~/entities/decision/ui/links/state/state'
import { Node, NodeState } from '~/entities/point'
import { LinkState, Rule } from '~/entities/rule'
import { add, remove } from '~/utils/dictionary'
import { stopPropagation } from '~/utils/dom'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'

import { Joint } from '../../joint'
import { RuleSet } from '../../rule-set'

export interface SiftNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
}

/**
 * Node типа sift
 */
export function SiftNode(props: SiftNodeProps): JSX.Element {
  const [newJointTargetLink, setNewJointTargetLink] = useState(() =>
    LinkState.createDefaultInstance({ targetId: props.state.id })
  )
  const [newJointSourceLink, setNewJointSourceLink] = useState(() =>
    LinkState.createDefaultInstance({ sourceId: props.state.id })
  )

  useUpdate(subscribeOnUpdates)
  useUpdate(subscribeOnNewJointRuleEdited, [newJointTargetLink, newJointSourceLink])

  const targetLinks = props.linkStates.getLinksByTargetId(props.state.id)
  const sourceLinks = props.linkStates.getLinksBySourceId(props.state.id)

  return (
    <Node
      className='--sift'
      state={props.state}
      scale={props.scale}
      left={
        <div className='target-links'>
          {targetLinks.map((linkState) => {
            if (linkState.id === newJointTargetLink.id) return null

            return (
              <Joint
                key={linkState.id}
                linkId={linkState.id}
                isLinked={true}
                onClick={fns(stopPropagation, () => emitJointTarget(linkState))}
              />
            )
          })}
          <Joint
            className='--new'
            linkId={newJointTargetLink.id}
            isLinked={false}
            onClick={fns(stopPropagation, emitNewJointTarget)}
          />
        </div>
      }
    >
      {sourceLinks.map((linkState) => {
        if (linkState.id === newJointSourceLink.id) return null

        return (
          <RuleSet
            key={linkState.id}
            jointProps={{
              linkId: linkState.id,
              isLinked: Boolean(linkState.rule.value.targetId),
              onClick: fns(stopPropagation, () => emitRuleJoint(linkState)),
            }}
          >
            {linkState.rule.value.name}
          </RuleSet>
        )
      })}
      <div className='new-source-link'>
        <button onClick={fns(stopPropagation, emitCreateRuleButton)}>+</button>
        <Joint
          className='--new'
          linkId={newJointSourceLink.id}
          isLinked={false}
          onClick={fns(stopPropagation, emitNewJointSource)}
        />
      </div>
    </Node>
  )

  // Private

  function emitNewJointTarget(): void {
    const editingLinkState = props.linkStates.findEditingLinkState()

    if (!editingLinkState) {
      props.linkStates.editingId.value = newJointTargetLink.id
      props.linkStates.add(newJointTargetLink)
      return
    }

    if (editingLinkState.rule.value.targetId) {
      addToast({
        data: 'Линк от карточки можно прикреплять только к правилам. Вы же пытаетесь прикрепить от карточки к карточке',
        type: 'error',
      })
      return
    }
    if (editingLinkState.rule.value.sourceId === props.state.id) {
      addToast({
        data: 'Нельзя прикрепить линку к той же карточке',
        type: 'error',
      })
      return
    }

    editingLinkState.rule.value = add(editingLinkState.rule.value, 'targetId', props.state.id)
    props.linkStates.editingId.value = undefined
  }

  function emitJointTarget(linkState: LinkState): void {
    const editingLinkState = props.linkStates.findEditingLinkState()

    if (!editingLinkState) {
      linkState.rule.value = remove(linkState.rule.value, 'targetId')
      props.linkStates.editingId.value = linkState.id
      return
    }

    if (editingLinkState.rule.value.targetId) {
      addToast({
        data: 'Линк от карточки можно прикреплять только к правилам. Вы же пытаетесь прикрепить от карточки к карточке',
        type: 'error',
      })
      return
    }
  }

  function emitRuleJoint(linkState: LinkState): void {
    const editingLinkState = props.linkStates.findEditingLinkState()

    if (!editingLinkState) {
      if (linkState.rule.value.targetId) {
        const newLinkState = LinkState.createDefaultInstance({ targetId: linkState.rule.value.targetId })
        props.linkStates.add(newLinkState)
        linkState.rule.value = remove(linkState.rule.value, 'targetId')
        props.linkStates.editingId.value = newLinkState.id
        return
      }
      props.linkStates.editingId.value = linkState.id
      return
    }
    if (editingLinkState.rule.value.sourceId === props.state.id) {
      addToast({ data: 'Ошибка', type: 'error' })
      return
    }
    if (!editingLinkState.rule.value.targetId) {
      addToast({ data: 'Нельзя линковать правило с правилом', type: 'error' })
      return
    }
    if (editingLinkState.rule.value.targetId === props.state.id) {
      addToast({ data: 'Ошибка', type: 'error' })
      return
    }
    if (linkState.rule.value.targetId) {
      addToast({ data: 'Связь уже существует', type: 'error' })
      return
    }

    props.linkStates.remove(editingLinkState.id)
    linkState.rule.value = add(linkState.rule.value, 'targetId', editingLinkState.rule.value.targetId)

    props.linkStates.editingId.value = undefined
  }

  function emitCreateRuleButton(): LinkState {
    const linkState = LinkState.createDefaultInstance({ sourceId: props.state.id })
    props.linkStates.add(linkState)
    return linkState
  }

  function emitNewJointSource(): void {
    const editingLinkState = props.linkStates.findEditingLinkState()

    if (!editingLinkState) {
      props.linkStates.editingId.value = newJointSourceLink.id
      props.linkStates.add(newJointSourceLink)
      return
    }

    if (editingLinkState.rule.value.sourceId) {
      addToast({
        data: 'Линк от правила можно прикрепить только к карточке, вы же пытаетесь правило слинковать с правилом',
        type: 'error',
      })
      return
    }

    const rule: Rule = { ...editingLinkState.rule.value, sourceId: props.state.id }
    editingLinkState.rule.value = rule
    props.linkStates.editingId.value = undefined
  }

  function subscribeOnNewJointRuleEdited(_, uns: (() => void)[]): void {
    uns.push(
      newJointTargetLink.on('rule', ({ value }) => {
        if (value.sourceId) setNewJointTargetLink(LinkState.createDefaultInstance({ targetId: props.state.id }))
      })
    )
    uns.push(
      newJointSourceLink.on('rule', ({ value }) => {
        if (value.targetId) setNewJointSourceLink(LinkState.createDefaultInstance({ sourceId: props.state.id }))
      })
    )
  }

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
        if (item.rule.value.sourceId === props.state.id || item.rule.value.targetId === props.state.id)
          setTimeout(update)
      })
    )
  }
}
