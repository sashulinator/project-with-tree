import { NodeState } from '../../../../_node'

import { Id } from '~/utils/core'

import { LinkStateDictionary } from '../../../../_links/state/state'

import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'

import { Filter } from '../../filter'
import { Enter } from '../../enter'
import { Prop } from '~/utils/notifier'
import { createElement } from 'react'

VariantPicker.displayName = 'VariantPicker'

export interface VariantPickerProps {
  state: NodeState
  linkStates: LinkStateDictionary
  selection: Prop<Id[]>
  remove: (nodeId: Id) => void
  onGestureDrug: (event: GestureDragEvent) => void
}

export function VariantPicker(props: VariantPickerProps): JSX.Element {
  const Component = props.state.point.type === 'MAIN' ? Enter : Filter

  return createElement(Component, props)
}
