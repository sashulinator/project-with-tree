import { createElement, memo } from 'react'

import { GestureDragEvent } from '~/ui/canvas'

import { ArbitrationNode, ControlGroupNode, EnterNode, FilterNode, State as NodeState, OfferNode } from '../../..'
import { LinkListState, NodeListState } from '../../../../../../..'

VariantPickerComponent.displayName = 'decision-Editor-w-Node-v-VariantPicker'

export interface VariantPickerProps {
  state: NodeState
  linkListState: LinkListState
  nodeListState: NodeListState
  onGestureDrug: (event: GestureDragEvent) => void
}

function VariantPickerComponent(props: VariantPickerProps): JSX.Element {
  let Component: (props: VariantPickerProps) => JSX.Element

  if (props.state.point.level === 'decisionPoint') {
    Component = FilterNode
  } else if (props.state.point.level === 'offer') {
    Component = OfferNode
  } else if (props.state.point.level === 'controlGroup') {
    Component = ControlGroupNode
  } else if (props.state.point.level === 'arbitration') {
    Component = ArbitrationNode
  } else {
    Component = EnterNode
  }

  return createElement(Component, props)
}

const VariantPicker = memo(VariantPickerComponent)
VariantPicker.displayName = VariantPickerComponent.displayName
export default VariantPicker
