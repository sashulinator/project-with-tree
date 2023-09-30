import { createElement, memo } from 'react'

import { GestureDragEvent } from '~/ui/canvas'

import { ArbitrationNode, ControlGroupNode, Controller, DecisionPointNode, MainNode, OfferNode } from '../../..'
import { LinkListController } from '../../../../../../..'
import { Controller as ListController } from '../../list'

FactoryComponent.displayName = 'decision-Editor-w-Node-v-Factory'

export interface FactoryProps {
  controller: Controller
  list: ListController
  linkList: LinkListController
  onGestureDrag: (event: GestureDragEvent) => void
  select: () => void
  toggle: () => void
}

function FactoryComponent(props: FactoryProps): JSX.Element {
  let Component: (props: FactoryProps) => JSX.Element

  if (props.controller.point.level === 'decisionPoint') {
    Component = DecisionPointNode
  } else if (props.controller.point.level === 'offer') {
    Component = OfferNode
  } else if (props.controller.point.level === 'controlGroup') {
    Component = ControlGroupNode
  } else if (props.controller.point.level === 'arbitration') {
    Component = ArbitrationNode
  } else {
    Component = MainNode
  }

  return createElement(Component, props)
}

const FactoryPicker = memo(FactoryComponent)
FactoryPicker.displayName = FactoryComponent.displayName
export default FactoryPicker
