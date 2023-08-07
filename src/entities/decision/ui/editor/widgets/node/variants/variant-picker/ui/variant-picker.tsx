import { createElement } from 'react'

import { GestureDragEvent } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { Prop } from '~/utils/notifier'

import { LinkListState } from '../../../../..'
import { State as NodeState, FilterNode, EnterNode } from '../../..'

VariantPicker.displayName = 'VariantPicker'

export interface VariantPickerProps {
  state: NodeState
  linkListStates: LinkListState
  selection: Prop<Id[]>
  remove: (nodeId: Id) => void
  onGestureDrug: (event: GestureDragEvent) => void
}

export default function VariantPicker(props: VariantPickerProps): JSX.Element {
  const Component = props.state.point.type === 'MAIN' ? EnterNode : FilterNode

  return createElement(Component, props)
}
