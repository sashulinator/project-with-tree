import './sift.css'

import { Id } from '~/utils/dictionary'

import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'
import { Joint, NewNode } from '~/ui/canvas'
import { GhostButton } from '~/ui/button'

import { LinkStateDictionary } from '../../../../_links'
import { NodeState } from '../../..'

import Toolbar from '../widgets/toolbar'
import Title from '../widgets/title'
import SourceLink from '../widgets/source-links'
import TargetLink from '../widgets/target-links/ui/target-links'

NewSiftNode.displayName = 'decisionCanvas-w-Node-v-Sift'

export interface NewSiftNodeProps {
  state: NodeState
  linkStates: LinkStateDictionary
  x: number | string
  y: number | string
  dataId: Id
  remove: () => void
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Node типа sift
 */
export function NewSiftNode(props: NewSiftNodeProps): JSX.Element {
  const { remove, linkStates, state, ...nodeProps } = props

  return (
    <NewNode
      {...nodeProps}
      className={NewSiftNode.displayName}
      title={<Title state={props.state} />}
      toolbar={<Toolbar state={props.state} remove={remove} />}
      sourceLinks={<SourceLink linkStates={linkStates} state={state} />}
      targetLinks={<TargetLink linkStates={linkStates} state={state} />}
    />
  )

  // Private
}
