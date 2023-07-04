import './node-sift.css'

import { clsx } from 'clsx'
import { useState } from 'react'

import { addToast } from '~/abstract/toast'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links/state/state'
import { Node, NodeState } from '~/entities/point'
import { Rule, RuleLinkState } from '~/entities/rule'
import Editable from '~/ui/editable'
import UnstyledButton from '~/ui/unstyled-button'
import { Id, add, remove } from '~/utils/dictionary'
import { stopPropagation } from '~/utils/dom'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'

import { Joint, NewSource, RuleSet } from '../../../../../point/ui/node'

export interface SiftNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
  removeNode: (id: Id) => void
}

/**
 * Node типа sift
 */
export function SiftNode(props: SiftNodeProps): JSX.Element {
  const [newJointTargetLink, setNewJointTargetLink] = useState(() =>
    RuleLinkState.createDefaultInstance({ targetId: props.state.id })
  )
  const [newJointSourceLink, setNewJointSourceLink] = useState(() =>
    RuleLinkState.createDefaultInstance({ sourceId: props.state.id })
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
      dataId={props.state.id}
      nodeTitle={
        <>
          <button onClick={(): void => props.removeNode(props.state.id)}>delete</button>
          <Editable
            value={props.state.title.value}
            cannotBeEmpty={true}
            onChange={(ev): void => props.state.title.set(ev.currentTarget.value)}
          />
        </>
      }
      nodeDescription={
        props.state.description.value ? (
          <Editable
            value={props.state.description.value}
            placeholder='Описание'
            onChange={(ev): void => props.state.description.set(ev.currentTarget.value)}
          />
        ) : null
      }
      left={
        <div className='targetLinks'>
          {targetLinks.map((linkState) => {
            if (linkState.id === newJointTargetLink.id) return null

            return (
              <Joint
                key={linkState.id}
                linkId={linkState.id}
                variant='linked'
                onClick={fns(stopPropagation, () => emitJointTarget(linkState))}
              />
            )
          })}
          <Joint variant='new' linkId={newJointTargetLink.id} onClick={fns(stopPropagation, emitNewJointTarget)} />
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
              variant: Boolean(linkState.rule.value.targetId) ? 'linked' : 'unlinked',
              onClick: fns(stopPropagation, () => emitRuleJoint(linkState)),
            }}
          >
            {linkState.rule.value.name}
          </RuleSet>
        )
      })}
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <NewSource
          buttonProps={{
            onClick: fns(stopPropagation, emitCreateRuleButton),
          }}
          jointProps={{
            linkId: newJointSourceLink.id,
            onClick: fns(stopPropagation, emitNewJointSource),
          }}
        />
      </div>
      <UnstyledButton
        onClick={(): void => {
          props.state.computation.value = props.state.computation.value === 'parallel' ? 'successively' : 'parallel'
        }}
        className={clsx('computation', `--${props.state.computation.value || ''}`)}
      >
        {props.state.computation.value === 'parallel' ? 'Параллельно' : 'Последовательно'}
      </UnstyledButton>
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

  function emitJointTarget(linkState: RuleLinkState): void {
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

  function emitRuleJoint(linkState: RuleLinkState): void {
    const editingLinkState = props.linkStates.findEditingLinkState()

    if (!editingLinkState) {
      if (linkState.rule.value.targetId) {
        const newLinkState = RuleLinkState.createDefaultInstance({ targetId: linkState.rule.value.targetId })
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

  function emitCreateRuleButton(): RuleLinkState {
    const linkState = RuleLinkState.createDefaultInstance({ sourceId: props.state.id })
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
        if (value.sourceId) setNewJointTargetLink(RuleLinkState.createDefaultInstance({ targetId: props.state.id }))
      })
    )
    uns.push(
      newJointSourceLink.on('rule', ({ value }) => {
        if (value.targetId) setNewJointSourceLink(RuleLinkState.createDefaultInstance({ sourceId: props.state.id }))
      })
    )
  }

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
    uns.push(props.state.on('title', update))
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
