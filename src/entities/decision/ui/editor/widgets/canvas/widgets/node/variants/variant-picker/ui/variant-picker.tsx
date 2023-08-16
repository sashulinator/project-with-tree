import { createElement, memo } from 'react'

import { GestureDragEvent } from '~/ui/canvas'
import { Id } from '~/utils/core'

import { EnterNode, FilterNode, State as NodeState, OfferNode } from '../../..'
import { LinkListState, NodeListState } from '../../../../../../..'

VariantPickerComponent.displayName = 'decision-Editor-w-Node-v-VariantPicker'

export interface VariantPickerProps {
  state: NodeState
  linkListState: LinkListState
  nodeListState: NodeListState
  remove: (nodeId: Id) => void
  onGestureDrug: (event: GestureDragEvent) => void
}

function VariantPickerComponent(props: VariantPickerProps): JSX.Element {
  let Component: (props: VariantPickerProps) => JSX.Element

  if (props.state.point.type === 'FILTER') {
    Component = FilterNode
  } else if (props.state.point.type === 'OFFER') {
    Component = OfferNode
  } else {
    Component = EnterNode
  }

  return createElement(Component, props)
}

const VariantPicker = memo(VariantPickerComponent)
VariantPicker.displayName = VariantPickerComponent.displayName
export default VariantPicker