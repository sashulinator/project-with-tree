import { createElement, memo } from 'react'

import { GestureDragEvent } from '~/ui/canvas'
import { Id } from '~/utils/core'

import { ArbitrationNode, ControlGroupNode, EnterNode, FilterNode, Controller as NodeState, OfferNode } from '../../..'
import { LinkListController, NodeListController } from '../../../../../../..'

FactoryComponent.displayName = 'decision-Editor-w-Node-v-Factory'

export interface FactoryProps {
  state: NodeState
  linkListController: LinkListController
  nodeListController: NodeListController
  selectNodes: (ids: Id[]) => void
  toggle: () => void
  onGestureDrug: (event: GestureDragEvent) => void
}

function FactoryComponent(props: FactoryProps): JSX.Element {
  let Component: (props: FactoryProps) => JSX.Element

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

const FactoryPicker = memo(FactoryComponent)
FactoryPicker.displayName = FactoryComponent.displayName
export default FactoryPicker
