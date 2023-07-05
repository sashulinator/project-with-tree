import './node-sift.css'

import { clsx } from 'clsx'
import { useState } from 'react'

import { addToast } from '~/abstract/toast'
import { Joint, NewSource, Node, NodeState, RuleSet } from '~/entities/point'
import { RuleLinkState } from '~/entities/rule'
import Button from '~/ui/button'
import Editable from '~/ui/editable'
import { Trash } from '~/ui/icon'
import UnstyledButton from '~/ui/unstyled-button'
import { assertDefined } from '~/utils/assertions/defined'
import { Id } from '~/utils/dictionary'
import { stopPropagation } from '~/utils/dom'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../_links'

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
  const sourceLinks = props.linkStates
    .getLinksBySourceId(props.state.id)
    .sort((a, b) => (a.index.value < b.index.value ? -1 : 1))

  return (
    <Node
      className='--sift'
      state={props.state}
      scale={props.scale}
      dataId={props.state.id}
      nodeTitle={
        <div style={{ display: 'flex' }}>
          <Editable
            value={props.state.title.value}
            cannotBeEmpty={true}
            onChange={(ev): void => props.state.title.set(ev.currentTarget.value)}
          />
          <Button
            square={true}
            variant='ghost'
            style={{ margin: '0 0 0 var(--l)' }}
            onClick={(): void => props.removeNode(props.state.id)}
          >
            <Trash />
          </Button>
        </div>
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
            nodeId={props.state.id}
            moveRuleSet={moveRuleSet}
            key={linkState.id}
            index={linkState.index.value}
            jointProps={{
              linkId: linkState.id,
              variant: Boolean(linkState.targetId.value) ? 'linked' : 'unlinked',
              onClick: fns(stopPropagation, () => emitRuleJoint(linkState)),
            }}
          >
            {linkState.rule.name}
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

  function moveRuleSet(dragIndex: number, hoverIndex: number): void {
    const dragState = sourceLinks.find((s) => s.index.value === dragIndex)
    const hoverState = sourceLinks.find((s) => s.index.value === hoverIndex)
    assertDefined(dragState)
    assertDefined(hoverState)
    hoverState.index.value = dragIndex
    dragState.index.value = hoverIndex
  }

  function emitNewJointTarget(): void {
    const editingLinkState = props.linkStates.findEditingLinkState()

    if (!editingLinkState) {
      props.linkStates.editingId.value = newJointTargetLink.id
      props.linkStates.add(newJointTargetLink)
      return
    }

    if (editingLinkState.targetId.value) {
      addToast({
        data: 'Линк от карточки можно прикреплять только к правилам. Вы же пытаетесь прикрепить от карточки к карточке',
        type: 'error',
      })
      return
    }
    if (editingLinkState.targetId.value === props.state.id) {
      addToast({
        data: 'Нельзя прикрепить линку к той же карточке',
        type: 'error',
      })
      return
    }

    editingLinkState.targetId.value = props.state.id
    props.linkStates.editingId.value = undefined
  }

  function emitJointTarget(linkState: RuleLinkState): void {
    const editingLinkState = props.linkStates.findEditingLinkState()

    if (!editingLinkState) {
      linkState.targetId.value = undefined
      props.linkStates.editingId.value = linkState.id
      return
    }

    if (editingLinkState.targetId.value) {
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
      if (linkState.targetId.value) {
        const newLinkState = RuleLinkState.createDefaultInstance({ targetId: linkState.targetId.value })
        props.linkStates.add(newLinkState)
        linkState.targetId.value = undefined
        props.linkStates.editingId.value = newLinkState.id
        return
      }
      props.linkStates.editingId.value = linkState.id
      return
    }
    if (editingLinkState.sourceId.value === props.state.id) {
      addToast({ data: 'Ошибка', type: 'error' })
      return
    }
    if (!editingLinkState.targetId.value) {
      addToast({ data: 'Нельзя линковать правило с правилом', type: 'error' })
      return
    }
    if (editingLinkState.targetId.value === props.state.id) {
      addToast({ data: 'Ошибка', type: 'error' })
      return
    }
    if (linkState.targetId.value) {
      addToast({ data: 'Связь уже существует', type: 'error' })
      return
    }

    props.linkStates.remove(editingLinkState.id)
    linkState.targetId.value = editingLinkState.targetId.value

    props.linkStates.editingId.value = undefined
  }

  function emitCreateRuleButton(): RuleLinkState {
    const linkState = RuleLinkState.createDefaultInstance({
      sourceId: props.state.id,
      i: sourceLinks.length,
    })
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

    if (editingLinkState.sourceId.value) {
      addToast({
        data: 'Линк от правила можно прикрепить только к карточке, вы же пытаетесь правило слинковать с правилом',
        type: 'error',
      })
      return
    }

    editingLinkState.sourceId.value = props.state.id
    props.linkStates.editingId.value = undefined
  }

  function subscribeOnNewJointRuleEdited(_, uns: (() => void)[]): void {
    uns.push(
      newJointTargetLink.on('targetId', ({ value }) => {
        if (value) setNewJointTargetLink(RuleLinkState.createDefaultInstance({ targetId: props.state.id }))
      })
    )
    uns.push(
      newJointSourceLink.on('targetId', ({ value }) => {
        if (value) setNewJointSourceLink(RuleLinkState.createDefaultInstance({ sourceId: props.state.id }))
      })
    )
  }

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
    uns.push(props.state.on('title', update))
    uns.push(
      props.linkStates.on('add', ({ item }) => {
        if (item.sourceId.value === props.state.id || item.targetId.value === props.state.id) update()
      })
    )
    uns.push(
      props.linkStates.on('update', ({ item }) => {
        if (item.sourceId.value === props.state.id || item.targetId.value === props.state.id) update()
      })
    )
    uns.push(
      props.linkStates.on('remove', ({ key }) => {
        const item = props.linkStates.get(key)
        if (item.sourceId.value === props.state.id || item.targetId.value === props.state.id) setTimeout(update)
      })
    )
  }
}
