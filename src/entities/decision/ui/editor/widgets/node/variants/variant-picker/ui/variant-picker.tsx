import { createElement, memo } from 'react'

import { GestureDragEvent } from '~/ui/canvas'
import { Id } from '~/utils/core'

import { EnterNode, FilterNode, State as NodeState } from '../../..'
import { LinkListState, NodeListState } from '../../../../..'

VariantPickerComponent.displayName = 'decision-Editor-w-Node-v-VariantPicker'

export interface VariantPickerProps {
  state: NodeState
  linkListState: LinkListState
  nodeListState: NodeListState
  remove: (nodeId: Id) => void
  onGestureDrug: (event: GestureDragEvent) => void
}

function VariantPickerComponent(props: VariantPickerProps): JSX.Element {
  const Component = props.state.point.type === 'MAIN' ? EnterNode : FilterNode

  return createElement(Component, props)
}

const VariantPicker = memo(VariantPickerComponent)
VariantPicker.displayName = VariantPickerComponent.displayName
export default VariantPicker
