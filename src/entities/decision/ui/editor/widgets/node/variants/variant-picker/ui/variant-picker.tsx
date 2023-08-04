import { State as NodeState } from '../../..'

import { Id } from '~/utils/core'

import { MapperState as LinkStateDictionary } from '../../../../link'

import { GestureDragEvent } from '~/ui/canvas'

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
